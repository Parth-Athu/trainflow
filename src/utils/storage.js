import { INITIAL_RECRUITS } from '../data/recruits';
import { DEFAULT_ROLE_RULES } from '../data/rules';

const RECRUITS_KEY = 'trainflow_recruits_v4';
const RULES_KEY = 'trainflow_rules_v4';
const ACTIVE_USER_KEY = 'trainflow_active_user_v4';
const AUDIT_LOGS_KEY = 'trainflow_audit_logs_v4';

export const getStoredRecruits = () => {
  const data = localStorage.getItem(RECRUITS_KEY);
  if (!data) {
    localStorage.setItem(RECRUITS_KEY, JSON.stringify(INITIAL_RECRUITS));
    return INITIAL_RECRUITS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_RECRUITS;
  }
};

export const saveRecruits = (recruits) => {
  localStorage.setItem(RECRUITS_KEY, JSON.stringify(recruits));
};

export const getStoredAuditLogs = () => {
  const data = localStorage.getItem(AUDIT_LOGS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const addAuditLogEntry = (action, details) => {
  const logs = getStoredAuditLogs();
  const newEntry = {
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action,
    details
  };
  logs.unshift(newEntry);
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs));
  return logs;
};

/**
 * Generates a stable unique Certificate ID (Format: TF-2026-XXXXXX)
 */
export const generateStableCertificateId = (recruitId) => {
  const cleanId = (recruitId || '01').replace(/[^0-9]/g, '');
  return `TF-2026-X89${cleanId.padStart(2, '0')}`;
};

/**
 * ISSUES OFFICIAL CERTIFICATE BY BRANCH MANAGER OR HR ADMIN
 */
export const issueRecruitCertificate = (
  recruitId, 
  issuerName = 'Amit Shah', 
  issuerRole = 'Branch Manager', 
  overrideReason = null
) => {
  const recruits = getStoredRecruits();
  const index = recruits.findIndex(r => r.id === recruitId);

  if (index !== -1) {
    const rec = recruits[index];
    const certId = rec.certificateId || generateStableCertificateId(rec.id);
    const finalScore = rec.quizScores?.["M-X02"] || 92;

    const certRecord = {
      recruitId: rec.id,
      certificateId: certId,
      programName: "New Recruit Onboarding Program",
      role: rec.role,
      level: rec.level,
      branch: rec.city,
      issuedBy: issuerName,
      issuedByRole: issuerRole,
      issuedAt: new Date().toISOString(),
      finalAssessmentScore: finalScore,
      completionPercentage: 100,
      overrideReason: overrideReason || null,
      status: "CERTIFIED"
    };

    recruits[index] = {
      ...rec,
      isCertified: true,
      accessClosed: true,
      certificationStatus: "CERTIFIED",
      trainingAccess: "CLOSED",
      certificateId: certId,
      certifiedAt: certRecord.issuedAt,
      certificateRecord: certRecord,
      status: "Completed"
    };

    saveRecruits(recruits);

    const logMsg = overrideReason 
      ? `HR OVERRIDE: ${issuerName} (${issuerRole}) issued certificate ${certId} to ${rec.name} (${rec.id}). Reason: ${overrideReason}`
      : `${issuerName} (${issuerRole}) issued official Certificate ${certId} to ${rec.name} (${rec.id}). Training Access CLOSED.`;

    addAuditLogEntry(overrideReason ? 'CERTIFICATION_OVERRIDE' : 'CERTIFICATE_ISSUED', logMsg);
    addAuditLogEntry('TRAINING_ACCESS_CLOSED', `Training access CLOSED for recruit ${rec.name} (${rec.id}).`);
  }
  return recruits;
};

/**
 * VERIFIES ANY CERTIFICATE BY CERTIFICATE ID
 */
export const verifyCertificateId = (certId) => {
  if (!certId) return { isValid: false };
  const recruits = getStoredRecruits();
  const found = recruits.find(r => 
    (r.certificateId || '').toUpperCase() === certId.trim().toUpperCase() ||
    (r.certificateRecord?.certificateId || '').toUpperCase() === certId.trim().toUpperCase()
  );

  if (found) {
    return {
      isValid: true,
      recruit: found,
      record: found.certificateRecord || {
        recruitId: found.id,
        certificateId: found.certificateId || certId,
        programName: "New Recruit Onboarding Program",
        role: found.role,
        level: found.level,
        branch: found.city,
        issuedBy: found.approvedBy || "Amit Shah (Branch Manager)",
        issuedAt: found.certifiedAt || "2026-08-09",
        status: "VALID"
      }
    };
  }
  return { isValid: false };
};

export const registerNewRecruit = (recruitFormData) => {
  const recruits = getStoredRecruits();

  const existing = recruits.find(r => r.email.toLowerCase() === recruitFormData.email.toLowerCase());
  if (existing) {
    return { success: false, message: 'An account with this email already exists!' };
  }

  const nextIdNum = recruits.length + 1;
  const newId = `R-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;

  const newRecruit = {
    id: newId,
    name: recruitFormData.name,
    email: recruitFormData.email,
    password: recruitFormData.password || 'password123',
    requestedRole: recruitFormData.role || 'Sales Executive',
    requestedLevel: recruitFormData.level || 'Junior',
    role: recruitFormData.role || 'Sales Executive',
    level: recruitFormData.level || 'Junior',
    city: recruitFormData.city || 'Ahmedabad',
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Pending Branch Approval',
    approvalStatus: 'PENDING_BRANCH_APPROVAL',
    approvedAt: null,
    approvedBy: null,
    completedModuleIds: [],
    activitySubmissions: {},
    signOffs: {},
    quizScores: {},
    streakDays: 0,
    points: 0,
    isCertified: false,
    accessClosed: false
  };

  recruits.unshift(newRecruit);
  saveRecruits(recruits);

  addAuditLogEntry('RECRUIT_REGISTRATION', `${newRecruit.name} (${newId}) registered for ${newRecruit.role} (${newRecruit.level}) in ${newRecruit.city} Hub`);

  return { success: true, recruit: newRecruit };
};

export const approveRecruitByManager = (recruitId, confirmedRole, confirmedLevel, reviewerName = 'Branch Manager') => {
  const recruits = getStoredRecruits();
  const index = recruits.findIndex(r => r.id === recruitId);

  if (index !== -1) {
    const prev = recruits[index];
    recruits[index] = {
      ...prev,
      role: confirmedRole || prev.role || prev.requestedRole,
      level: confirmedLevel || prev.level || prev.requestedLevel,
      approvalStatus: 'APPROVED',
      approvedAt: new Date().toISOString(),
      approvedBy: reviewerName,
      status: 'In Progress'
    };
    saveRecruits(recruits);

    addAuditLogEntry('BRANCH_MANAGER_APPROVAL', `${reviewerName} approved ${prev.name} (${recruitId}). Assigned Role: ${confirmedRole}, Level: ${confirmedLevel}. 4-Day Learning Path Generated.`);
  }
  return recruits;
};

export const rejectRecruitApplication = (recruitId, reason = 'Registration criteria not met') => {
  const recruits = getStoredRecruits();
  const index = recruits.findIndex(r => r.id === recruitId);

  if (index !== -1) {
    recruits[index] = {
      ...recruits[index],
      approvalStatus: 'REJECTED',
      rejectionReason: reason,
      status: 'Rejected'
    };
    saveRecruits(recruits);

    addAuditLogEntry('RECRUIT_REJECTED', `Application ${recruitId} rejected. Reason: ${reason}`);
  }
  return recruits;
};

export const getStoredRules = () => {
  const data = localStorage.getItem(RULES_KEY);
  if (!data) {
    localStorage.setItem(RULES_KEY, JSON.stringify(DEFAULT_ROLE_RULES));
    return DEFAULT_ROLE_RULES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_ROLE_RULES;
  }
};

export const saveRules = (rules) => {
  localStorage.setItem(RULES_KEY, JSON.stringify(rules));
};

export const getActiveUserSession = () => {
  const data = localStorage.getItem(ACTIVE_USER_KEY);
  if (!data) {
    const defaultUser = { role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' };
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return { role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' };
  }
};

export const setActiveUserSession = (userObj) => {
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(userObj));
};

export const resetAllDemoData = () => {
  localStorage.setItem(RECRUITS_KEY, JSON.stringify(INITIAL_RECRUITS));
  localStorage.setItem(RULES_KEY, JSON.stringify(DEFAULT_ROLE_RULES));
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' }));
  localStorage.removeItem(AUDIT_LOGS_KEY);
};
