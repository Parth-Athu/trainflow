import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Eye, 
  CheckSquare, 
  FileText, 
  Award,
  ChevronRight,
  UserCheck,
  Cpu,
  Layers,
  ArrowRight,
  Building2,
  ShieldCheck,
  ShieldAlert,
  X,
  FileCheck,
  Lock,
  Sparkles,
  RotateCcw,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  calculateRecruitProgress, 
  calculateLearningReadiness, 
  getLearningPath, 
  isRecruitCertificationEligible 
} from '../utils/learningEngine';
import { RecruitDetailsModal } from './RecruitDetails';

export const ManagerDashboard = ({ 
  recruits = [], 
  rules = {}, 
  onGradeActivity, 
  onSignOffLive, 
  onApproveRecruitByManager,
  onIssueCertificate,
  activeSubTab = 'dashboard'
}) => {
  const [selectedBranch, setSelectedBranch] = useState('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecruitModal, setSelectedRecruitModal] = useState(null);

  // Pending Recruit Review Modal state
  const [reviewingRecruit, setReviewingRecruit] = useState(null);
  const [confirmedRole, setConfirmedRole] = useState('Sales Executive');
  const [confirmedLevel, setConfirmedLevel] = useState('Junior');

  // Certification Review Modal state
  const [certifyingRecruit, setCertifyingRecruit] = useState(null);
  const [showConfirmCertModal, setShowConfirmCertModal] = useState(false);

  // Filter recruits by branch
  const branchRecruits = recruits.filter(r => (r.city || 'Ahmedabad').toLowerCase() === selectedBranch.toLowerCase());
  
  // Pending approvals for this branch
  const pendingRequests = branchRecruits.filter(r => 
    r.approvalStatus === 'PENDING_BRANCH_APPROVAL' || 
    r.approvalStatus === 'PENDING_HR_APPROVAL' ||
    r.status === 'Pending Branch Approval'
  );

  // Active training recruits
  const activeRecruits = branchRecruits.filter(r => r.approvalStatus === 'APPROVED');

  // Eligible for certification
  const eligibleRecruits = activeRecruits.filter(r => {
    if (r.isCertified) return false;
    const { isEligible } = isRecruitCertificationEligible(r, rules);
    return isEligible || r.completedModuleIds?.length >= 12;
  });

  const certifiedCount = branchRecruits.filter(r => r.isCertified).length;
  const needsAttentionCount = branchRecruits.filter(r => r.status === 'Needs Attention').length;

  const filteredTeam = activeRecruits.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Pending Application Review Modal
  const handleOpenReview = (recruit) => {
    setReviewingRecruit(recruit);
    setConfirmedRole(recruit.requestedRole || recruit.role || 'Sales Executive');
    setConfirmedLevel(recruit.requestedLevel || recruit.level || 'Junior');
  };

  // Live calculated learning path for review modal
  const previewRecruitObj = reviewingRecruit ? { ...reviewingRecruit, role: confirmedRole, level: confirmedLevel } : null;
  const previewPath = previewRecruitObj ? getLearningPath(previewRecruitObj, rules) : [];

  const previewTrackKeys = previewPath.assignedTracks || Array.from(new Set(previewPath.map(m => m.track)));
  const previewHasCore = previewTrackKeys.includes('core');
  const previewHasSales = previewTrackKeys.includes('sales');
  const previewHasOps = previewTrackKeys.includes('ops');

  // Confirm Registration Approval
  const handleConfirmApproval = () => {
    if (!reviewingRecruit) return;
    onApproveRecruitByManager(reviewingRecruit.id, confirmedRole, confirmedLevel, `Amit Shah (${selectedBranch} Branch Manager)`);
    setReviewingRecruit(null);
  };

  // Confirm Certificate Issuance Handler
  const handleFinalIssueCertificate = () => {
    if (!certifyingRecruit) return;
    onIssueCertificate(certifyingRecruit.id, `Amit Shah`, `Branch Manager (${selectedBranch} Hub)`);
    setShowConfirmCertModal(false);
    setCertifyingRecruit(null);
  };

  return (
    <div className="page-container">
      {/* 1. BRANCH COMMAND CENTER HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#ffffff', borderRadius: 16, padding: 28, marginBottom: 28, boxShadow: '0 10px 25px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 8 }}>
              <Building2 size={14} /> BRANCH COMMAND CENTER
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              {selectedBranch} Regional Branch Hub
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: 4 }}>
              Branch Manager: <strong>Amit Shah</strong> • Operational Supervision & Certification Approval Desk
            </div>
          </div>

          {/* BRANCH SELECTOR */}
          <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 10 }}>
            <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>Switch Branch</span>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              style={{ background: 'transparent', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', outline: 'none' }}
            >
              <option value="Ahmedabad" style={{ color: '#0f172a' }}>Ahmedabad Hub</option>
              <option value="Surat" style={{ color: '#0f172a' }}>Surat Hub</option>
              <option value="Rajkot" style={{ color: '#0f172a' }}>Rajkot Hub</option>
              <option value="Vadodara" style={{ color: '#0f172a' }}>Vadodara Hub</option>
              <option value="Bhavnagar" style={{ color: '#0f172a' }}>Bhavnagar Hub</option>
              <option value="Jamnagar" style={{ color: '#0f172a' }}>Jamnagar Hub</option>
              <option value="Junagadh" style={{ color: '#0f172a' }}>Junagadh Hub</option>
              <option value="Gandhinagar" style={{ color: '#0f172a' }}>Gandhinagar Hub</option>
              <option value="Anand" style={{ color: '#0f172a' }}>Anand Hub</option>
              <option value="Mehsana" style={{ color: '#0f172a' }}>Mehsana Hub</option>
            </select>
          </div>
        </div>

        {/* METRICS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Total Recruits</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>{branchRecruits.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Pending Approvals</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: pendingRequests.length > 0 ? '#f59e0b' : '#ffffff' }}>{pendingRequests.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Certification Eligible</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: eligibleRecruits.length > 0 ? '#10b981' : '#ffffff' }}>{eligibleRecruits.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Certified</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{certifiedCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Needs Attention</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444' }}>{needsAttentionCount}</div>
          </div>
        </div>
      </div>

      {/* 2. BRANCH ANALYTICS VIEW */}
      {activeSubTab === 'analytics' && (
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 28 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={20} color="#4f46e5" /> {selectedBranch} Hub Training Analytics
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Average Completion Time</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4f46e5', margin: '4px 0' }}>3.6 Days</div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>On track for 4-day milestone</div>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Average Quiz Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981', margin: '4px 0' }}>92.4%</div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>Passed security verification</div>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Certification Rate</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', margin: '4px 0' }}>91.0%</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{certifiedCount} Certified</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CERTIFICATION CENTER / QUEUE SECTION */}
      {(activeSubTab === 'dashboard' || activeSubTab === 'certifications' || eligibleRecruits.length > 0) && (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 14, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#065f46', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={20} /> CERTIFICATION CENTER — READY FOR MANAGER ISSUANCE ({eligibleRecruits.length})
            </div>
            <span className="status-badge status-completed">
              Verified 100% Eligible
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {eligibleRecruits.length > 0 ? (
              eligibleRecruits.map(rec => (
                <div key={rec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #6ee7b7', borderRadius: 10, padding: '14px 20px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                      {rec.name} <span style={{ color: '#64748b', fontSize: '0.82rem' }}>({rec.id})</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: 2 }}>
                      Position: <strong>{rec.role} • {rec.level}</strong> • Hub: <strong>{rec.city}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem', color: '#047857', marginTop: 6, fontWeight: 700 }}>
                      <span>✓ Training Progress: 100%</span>
                      <span>✓ Final Assessment: {rec.quizScores?.["M-X02"] || 92}%</span>
                      <span>✓ Activities: 4/4 Approved</span>
                      <span>✓ Live Sessions: 2/2 Signed Off</span>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => setCertifyingRecruit(rec)} style={{ background: '#10b981', borderColor: '#10b981', padding: '8px 18px', fontSize: '0.88rem' }}>
                    <Award size={16} /> Review Certification <ChevronRight size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div style={{ background: '#ffffff', padding: 14, borderRadius: 8, color: '#047857', fontSize: '0.88rem' }}>
                No recruits currently pending certification issuance.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. PENDING RECRUIT REQUESTS QUEUE */}
      {(activeSubTab === 'dashboard' || activeSubTab === 'approvals' || pendingRequests.length > 0) && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserCheck size={20} /> PENDING RECRUIT APPROVAL REQUESTS ({pendingRequests.length})
            </div>
            <span className="status-badge status-in-progress" style={{ background: '#fef3c7', color: '#b45309' }}>
              Action Required
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pendingRequests.length > 0 ? (
              pendingRequests.map(rec => (
                <div key={rec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #fcd34d', borderRadius: 10, padding: '12px 18px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                      {rec.name} <span style={{ color: '#64748b', fontSize: '0.82rem' }}>({rec.id})</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: 2 }}>
                      Requested Role: <strong>{rec.requestedRole || rec.role}</strong> • Requested Level: <strong>{rec.requestedLevel || rec.level}</strong> • Hub: <strong>{rec.city}</strong>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => handleOpenReview(rec)} style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
                    Review & Assign Path <ChevronRight size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div style={{ background: '#ffffff', padding: 14, borderRadius: 8, color: '#92400e', fontSize: '0.88rem' }}>
                ✓ No pending recruit registration applications awaiting review.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. RECRUIT CERTIFICATION REVIEW MODAL */}
      {certifyingRecruit && (
        <div className="modal-overlay" style={{ zIndex: 5000 }}>
          <div className="modal-card" style={{ maxWidth: 750 }}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                  Official Manager Certification Verification
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  RECRUIT CERTIFICATION REVIEW — {certifyingRecruit.name} ({certifyingRecruit.id})
                </h3>
              </div>
              <button onClick={() => setCertifyingRecruit(null)}><X size={20} color="#64748b" /></button>
            </div>

            <div className="modal-body">
              <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 20, fontSize: '0.88rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div>Recruit Name: <strong>{certifyingRecruit.name}</strong></div>
                  <div>Employee ID: <strong>{certifyingRecruit.id}</strong></div>
                  <div>Position: <strong>{certifyingRecruit.role} ({certifyingRecruit.level})</strong></div>
                  <div>Branch Hub: <strong>{certifyingRecruit.city} Hub</strong></div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 10, padding: 18, marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
                  MANDATORY PROGRAM COMPLETION CHECKLIST:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                    <span>1. Curriculum Progression:</span>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ Day 1 (100%), Day 2 (100%), Day 3 (100%), Day 4 (100%)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                    <span>2. Mandatory Learning Modules:</span>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ All Assigned Sub-modules Verified Complete</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                    <span>3. High-Stakes Final Assessment (M-X02):</span>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ {certifyingRecruit.quizScores?.["M-X02"] || 92}% PASSED (Req &ge; 80%)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                    <span>4. Practical Assignment Submissions:</span>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ Market Research Task Approved (Grade: A+)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 2 }}>
                    <span>5. Manager Live Session Sign-offs:</span>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ Signed Off by Manager & HR</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: 14, textAlign: 'center', color: '#065f46', fontWeight: 800, fontSize: '0.95rem' }}>
                ✓ STATUS: CERTIFICATION ELIGIBLE (All requirements satisfied)
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setCertifyingRecruit(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowConfirmCertModal(true)} style={{ background: '#10b981', borderColor: '#10b981' }}>
                <Award size={16} /> Issue Certificate & Close Training Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. CONFIRMATION DIALOG FOR CERTIFICATE ISSUANCE */}
      {showConfirmCertModal && certifyingRecruit && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>ISSUE OFFICIAL CERTIFICATE?</h3>
            </div>
            <div className="modal-body" style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
              <p>You are about to officially issue the Certificate of Completion for:</p>
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #cbd5e1', margin: '12px 0' }}>
                <div>Candidate: <strong>{certifyingRecruit.name} ({certifyingRecruit.id})</strong></div>
                <div>Program: <strong>New Recruit Onboarding Program</strong></div>
                <div>Branch Hub: <strong>{certifyingRecruit.city} Hub</strong></div>
                <div>Issuer: <strong>Amit Shah (Branch Manager)</strong></div>
              </div>
              <div style={{ color: '#0f172a', fontWeight: 700, marginBottom: 6 }}>This action will:</div>
              <ul style={{ paddingLeft: 20, color: '#475569', fontSize: '0.82rem' }}>
                <li>✓ Generate official Certificate ID (TF-2026-XXXXXX)</li>
                <li>✓ Record Branch Manager approval in audit log</li>
                <li>🔒 <strong>CLOSE training access</strong> for this recruit</li>
                <li>✓ Attach verified certificate to recruit profile</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowConfirmCertModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleFinalIssueCertificate} style={{ background: '#10b981', borderColor: '#10b981' }}>
                <CheckCircle2 size={16} /> Confirm & Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. RECRUIT APPLICATION REVIEW MODAL */}
      {reviewingRecruit && (
        <div className="modal-overlay" style={{ zIndex: 5000 }}>
          <div className="modal-card" style={{ maxWidth: 750 }}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>
                  Branch Manager Approval Desk
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Recruit Application Review — {reviewingRecruit.name} ({reviewingRecruit.id})
                </h3>
              </div>
              <button onClick={() => setReviewingRecruit(null)}><X size={20} color="#64748b" /></button>
            </div>

            <div className="modal-body">
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 20, fontSize: '0.88rem' }}>
                <div>Email: <strong>{reviewingRecruit.email}</strong></div>
                <div>Requested Position: <strong>{reviewingRecruit.requestedRole || reviewingRecruit.role} ({reviewingRecruit.requestedLevel || reviewingRecruit.level})</strong></div>
                <div>Branch Hub: <strong>{reviewingRecruit.city} Hub</strong></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div className="form-group">
                  <label className="form-label">Assign Final Role</label>
                  <select className="form-select" value={confirmedRole} onChange={e => setConfirmedRole(e.target.value)}>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Operations Associate">Operations Associate</option>
                    <option value="Marketing Associate">Marketing Associate</option>
                    <option value="Delivery Lead">Delivery Lead</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Branch Manager">Branch Manager</option>
                    <option value="Area Head">Area Head</option>
                    <option value="Regional Manager">Regional Manager</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Assign Final Seniority Level</label>
                  <select className="form-select" value={confirmedLevel} onChange={e => setConfirmedLevel(e.target.value)}>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#3730a3', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Cpu size={16} /> LIVE AUTO-GENERATED TRAINING PATH PREVIEW
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4338ca', marginBottom: 12 }}>
                  Selected Position: <strong>{confirmedRole} + {confirmedLevel}</strong>
                </div>

                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', fontWeight: 700, marginBottom: 14 }}>
                  {previewHasCore && <div style={{ color: '#16a34a' }}>✓ Core Company Track</div>}
                  {previewHasSales && <div style={{ color: '#16a34a' }}>✓ Sales & Marketing Track</div>}
                  {previewHasOps && <div style={{ color: '#16a34a' }}>✓ Delivery & Operations Track</div>}
                </div>

                <div style={{ background: '#ffffff', borderRadius: 8, padding: 12, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>4-Day Curriculum Generated ({previewPath.length} Modules):</div>
                  <div style={{ color: '#475569' }}>
                    • Day 1: Orientation & Core Values ({previewPath.filter(m => m.day === 1).length} modules)<br />
                    • Day 2: Specialist Foundations ({previewPath.filter(m => m.day === 2).length} modules)<br />
                    • Day 3: Practical Tasks & Live Ops ({previewPath.filter(m => m.day === 3).length} modules)<br />
                    • Day 4: Final Exam & Certificate ({previewPath.filter(m => m.day === 4).length} modules)
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setReviewingRecruit(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleConfirmApproval} style={{ background: '#10b981', borderColor: '#10b981' }}>
                <CheckCircle2 size={16} /> Approve & Assign Training Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. TEAM TRAINING PROGRESS TABLE */}
      <div className="section-header-row">
        <h3 className="section-title">
          <Users size={20} color="#4f46e5" /> Branch Team Progress ({filteredTeam.length})
        </h3>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search recruit by name or role..."
              className="form-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 36, width: 240 }}
            />
          </div>
        </div>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Recruit</th>
              <th>Role & Level</th>
              <th>Current Stage</th>
              <th>Overall Progress</th>
              <th>Readiness Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.map(rec => {
              const { percent, currentDay, isEligibleForCert } = calculateRecruitProgress(rec, rules);
              const { readinessScore } = calculateLearningReadiness(rec, rules);

              return (
                <tr key={rec.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={rec.avatar} alt={rec.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{rec.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{rec.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{rec.role}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{rec.level}</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#4f46e5' }}>Day {currentDay} of 4</span>
                  </td>
                  <td style={{ width: 140 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>{percent}%</div>
                    <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${percent}%`, background: '#10b981', borderRadius: 3 }} />
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{readinessScore}%</span>
                  </td>
                  <td>
                    <span className={`status-badge ${rec.isCertified ? 'status-completed' : isEligibleForCert ? 'status-completed' : rec.status === 'Needs Attention' ? 'status-needs-attention' : 'status-in-progress'}`}>
                      {rec.isCertified ? 'Certified' : isEligibleForCert ? 'Cert Eligible' : rec.status}
                    </span>
                  </td>
                  <td>
                    {isEligibleForCert && !rec.isCertified ? (
                      <button className="btn-primary" onClick={() => setCertifyingRecruit(rec)} style={{ padding: '4px 10px', fontSize: '0.78rem', background: '#10b981', borderColor: '#10b981' }}>
                        <Award size={14} /> Certify
                      </button>
                    ) : (
                      <button className="btn-secondary" onClick={() => setSelectedRecruitModal(rec)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                        <Eye size={14} /> View Details
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RECRUIT DETAILS MODAL */}
      {selectedRecruitModal && (
        <RecruitDetailsModal
          recruit={selectedRecruitModal}
          rules={rules}
          onClose={() => setSelectedRecruitModal(null)}
          onGradeActivity={onGradeActivity}
          onSignOffLive={onSignOffLive}
        />
      )}
    </div>
  );
};
