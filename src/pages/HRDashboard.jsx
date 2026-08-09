import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  FileText, 
  BarChart3, 
  Eye, 
  CheckSquare, 
  Plus, 
  Search, 
  ShieldCheck, 
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  ListFilter,
  Layers,
  History,
  Award,
  Lock,
  X,
  BookOpen,
  Activity,
  Video,
  Users as UsersIcon,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import { BRANCH_HUBS } from '../data/recruits';
import { MODULES_CATALOG } from '../data/modules';
import { getStoredAuditLogs, verifyCertificateId } from '../utils/storage';
import { calculateRecruitProgress } from '../utils/learningEngine';
import { RecruitDetailsModal } from './RecruitDetails';

export const HRDashboard = ({ 
  rules, 
  onSaveRules, 
  recruits = [], 
  onApproveRecruit, 
  onRejectRecruit, 
  onIssueCertificate,
  activeSubTab = 'dashboard'
}) => {
  const [activeTab, setActiveTab] = useState(activeSubTab || 'command');
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedRecruitModal, setSelectedRecruitModal] = useState(null);
  const [editingRules, setEditingRules] = useState(rules);

  // Sync activeTab when activeSubTab changes
  useEffect(() => {
    if (activeSubTab && activeSubTab !== 'dashboard') {
      setActiveTab(activeSubTab);
    } else if (activeSubTab === 'dashboard') {
      setActiveTab('command');
    }
  }, [activeSubTab]);

  // HR Override state
  const [overrideRecruit, setOverrideRecruit] = useState(null);
  const [overrideReason, setOverrideReason] = useState('');

  // Certificate Verification Lookup state
  const [searchCertId, setSearchCertId] = useState('TF-2026-X8901');
  const [verificationResult, setVerificationResult] = useState(null);

  const auditLogs = getStoredAuditLogs();

  // Summary Metrics across all recruits
  const totalBranches = 12;
  const totalRecruitsCount = recruits.length || 284;
  const certifiedCount = recruits.filter(r => r.isCertified).length || 52;
  const activeCount = recruits.filter(r => r.approvalStatus === 'APPROVED' && !r.isCertified).length || 211;
  const pendingCount = recruits.filter(r => r.approvalStatus === 'PENDING_BRANCH_APPROVAL' || r.approvalStatus === 'PENDING_HR_APPROVAL').length || 20;
  const attentionCount = recruits.filter(r => r.status === 'Needs Attention').length || 21;
  const eligibleCount = recruits.filter(r => r.completedModuleIds?.length >= 10 && !r.isCertified).length || 12;

  // Filter recruits by drill-down branch if selected
  const displayRecruits = selectedBranchId 
    ? recruits.filter(r => (r.city || 'Ahmedabad').toLowerCase() === selectedBranchId.toLowerCase())
    : recruits;

  // Save modified HR rules
  const handleSaveRuleMatrix = () => {
    onSaveRules(editingRules);
  };

  // Perform HR Override
  const handleConfirmHROverride = () => {
    if (!overrideRecruit || !overrideReason.trim()) return;
    onIssueCertificate(overrideRecruit.id, 'HQ HR Operations', 'HR Admin', overrideReason.trim());
    setOverrideRecruit(null);
    setOverrideReason('');
  };

  // Run Certificate Verification Lookup
  const handleVerifyCertificate = (e) => {
    e.preventDefault();
    const res = verifyCertificateId(searchCertId);
    setVerificationResult(res);
  };

  return (
    <div className="page-container">
      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', color: '#ffffff', borderRadius: 16, padding: 28, marginBottom: 28, boxShadow: '0 10px 25px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 8 }}>
              <Building2 size={14} /> HQ HR OPERATIONS
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              NATIONAL TRAINING COMMAND CENTER
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: 4 }}>
              Global Supervision across 12 Indian Regional Branch Hubs & Enterprise Training Rule Engine
            </div>
          </div>

          {/* TAB SELECTION */}
          <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.08)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('command'); setSelectedBranchId(null); }}
              style={{ background: activeTab === 'command' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('branches'); setSelectedBranchId(null); }}
              style={{ background: activeTab === 'branches' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              12 Branches
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              style={{ background: activeTab === 'rules' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Rule Matrix
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              style={{ background: activeTab === 'catalog' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Module Catalog
            </button>
            <button
              onClick={() => setActiveTab('certver')}
              style={{ background: activeTab === 'certver' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Verify Certificate
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              style={{ background: activeTab === 'analytics' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              style={{ background: activeTab === 'audit' ? '#4f46e5' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Audit Log
            </button>
          </div>
        </div>

        {/* NATIONAL SUMMARY METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginTop: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Total Branches</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>{totalBranches}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Total Recruits</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>{totalRecruitsCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Active Training</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8' }}>{activeCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Certified</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{certifiedCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Cert Eligible</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{eligibleCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>Needs Attention</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444' }}>{attentionCount}</div>
          </div>
        </div>
      </div>

      {/* 1. NATIONAL BRANCH OVERVIEW GRID TAB */}
      {(activeTab === 'command' || activeTab === 'branches') && !selectedBranchId && (
        <div>
          <div className="section-header-row">
            <h3 className="section-title">
              <Building2 size={20} color="#4f46e5" /> 12 Regional Branch Command Centers
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {BRANCH_HUBS.map(hub => (
              <div key={hub.id} style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{hub.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Manager: <strong>{hub.manager}</strong></div>
                  </div>
                  <span className="status-badge status-completed">{hub.recruitsCount} Recruits</span>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    <span>Avg Training Progress</span>
                    <span style={{ color: '#4f46e5' }}>78%</span>
                  </div>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '78%', background: '#4f46e5', borderRadius: 3 }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginBottom: 14 }}>
                  <div>Certified: <strong>{hub.completedCount}</strong></div>
                  <div>Eligible: <strong style={{ color: '#10b981' }}>{Math.max(1, Math.round(hub.completedCount / 2))}</strong></div>
                  <div>Active: <strong>{hub.activeCount}</strong></div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => setSelectedBranchId(hub.id)}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  <Eye size={14} /> View Branch Command Center
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. MODULE CATALOG TAB */}
      {activeTab === 'catalog' && (
        <div>
          <div className="section-header-row">
            <h3 className="section-title">
              <BookOpen size={20} color="#4f46e5" /> Enterprise Module Catalog ({MODULES_CATALOG.length} Modules)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
            {MODULES_CATALOG.map(mod => (
              <div key={mod.id} style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="status-badge status-in-progress" style={{ fontWeight: 800 }}>
                    Day {mod.day} • {mod.type}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>
                    Track: {mod.track.toUpperCase()}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
                  {mod.title} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>({mod.id})</span>
                </h4>

                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: 12, lineHeight: 1.5 }}>
                  {mod.description || 'Structured learning module designed for role-specific onboarding competencies.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                  <span>Estimated Time: <strong>{mod.estimatedTime}</strong></span>
                  <span>Completion Criterion: <strong style={{ color: '#4f46e5' }}>{mod.completionCheck}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ANALYTICS & METRICS TAB */}
      {activeTab === 'analytics' && (
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={20} color="#4f46e5" /> National Training Analytics & Performance Velocity
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>National Completion Velocity</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#4f46e5', margin: '4px 0' }}>3.8 Days</div>
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>↑ 12% faster than 4-day target</div>
            </div>

            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Assessment Pass Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', margin: '4px 0' }}>94.2%</div>
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>High retention & compliance</div>
            </div>

            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 10, border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Certification Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', margin: '4px 0' }}>88.5%</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>52 Certified Recruits</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HR CERTIFICATE VERIFICATION LOOKUP TOOL TAB */}
      {activeTab === 'certver' && (
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 28, maxWidth: 650, margin: '0 auto 32px auto' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={22} color="#4f46e5" /> Official Certificate Verification Search
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 20 }}>
            Enter a unique Certificate ID (Format: <strong>TF-2026-XXXXXX</strong>) to verify authenticity and inspect issuance parameters.
          </p>

          <form onSubmit={handleVerifyCertificate} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. TF-2026-X8901"
              value={searchCertId}
              onChange={e => setSearchCertId(e.target.value)}
              style={{ fontWeight: 700 }}
              required
            />
            <button className="btn-primary" type="submit">
              <Search size={16} /> Verify Certificate
            </button>
          </form>

          {verificationResult && (
            <div style={{ background: verificationResult.isValid ? '#ecfdf5' : '#fef2f2', border: `1px solid ${verificationResult.isValid ? '#a7f3d0' : '#fca5a5'}`, borderRadius: 10, padding: 18, animation: 'slideIn 0.2s ease-out' }}>
              {verificationResult.isValid ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#065f46', fontWeight: 800, fontSize: '1.1rem', marginBottom: 10 }}>
                    <ShieldCheck size={24} /> ✓ CERTIFICATE VERIFIED & VALID
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.88rem', color: '#047857' }}>
                    <div>Recipient Candidate: <strong>{verificationResult.record.recipientName || verificationResult.recruit?.name || 'Priya Sharma'}</strong></div>
                    <div>Program: <strong>{verificationResult.record.programName}</strong></div>
                    <div>Assigned Position: <strong>{verificationResult.record.role} ({verificationResult.record.level})</strong></div>
                    <div>Regional Branch Hub: <strong>{verificationResult.record.branch} Hub</strong></div>
                    <div>Issued By: <strong>{verificationResult.record.issuedBy}</strong></div>
                    <div>Issued Date: <strong>{new Date(verificationResult.record.issuedAt).toLocaleDateString()}</strong></div>
                  </div>
                </div>
              ) : (
                <div style={{ color: '#991b1b', fontWeight: 700 }}>
                  ✕ Invalid Certificate ID. No matching issuance record found in TrainFlow registry.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. HR DRILL-DOWN BRANCH RECRUIT LIST VIEW */}
      {selectedBranchId && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Drill-down: {selectedBranchId} Regional Branch Recruits
            </h3>
            <button className="btn-secondary" onClick={() => setSelectedBranchId(null)}>
              ← Back to All 12 Branches
            </button>
          </div>

          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Recruit</th>
                  <th>Role & Level</th>
                  <th>Branch</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayRecruits.map(rec => {
                  const { percent } = calculateRecruitProgress(rec, rules);
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
                      <td>{rec.role} ({rec.level})</td>
                      <td>{rec.city} Hub</td>
                      <td>{percent}%</td>
                      <td>
                        <span className={`status-badge ${rec.isCertified ? 'status-completed' : 'status-in-progress'}`}>
                          {rec.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-secondary" onClick={() => setSelectedRecruitModal(rec)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                            <Eye size={14} /> Inspect
                          </button>

                          {!rec.isCertified && (
                            <button className="btn-secondary" onClick={() => setOverrideRecruit(rec)} style={{ padding: '4px 10px', fontSize: '0.78rem', color: '#d97706' }}>
                              HR Override
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. HR CONTROLLED CERTIFICATION OVERRIDE MODAL */}
      {overrideRecruit && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706' }}>HR CERTIFICATION OVERRIDE</h3>
              <button onClick={() => setOverrideRecruit(null)}><X size={20} color="#64748b" /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: 16 }}>
                You are performing an exceptional HR Admin certification override for: <strong>{overrideRecruit.name} ({overrideRecruit.id})</strong>.
              </p>

              <div className="form-group">
                <label className="form-label">Mandatory Override Reason (Required)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="State the justification for this administrative override..."
                  value={overrideReason}
                  onChange={e => setOverrideReason(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setOverrideRecruit(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleConfirmHROverride} disabled={!overrideReason.trim()} style={{ background: '#d97706', borderColor: '#d97706' }}>
                Confirm HR Override & Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. RULE MATRIX CONFIGURATION TAB */}
      {activeTab === 'rules' && (
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Role + Level Matrix Configuration</h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                HR Admin can update assigned tracks for any position. Changes immediately propagate to the Rule Engine!
              </div>
            </div>
            <button className="btn-primary" onClick={handleSaveRuleMatrix}>
              <CheckCircle2 size={16} /> Deploy Updated Rule Matrix
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Object.entries(editingRules).map(([roleName, levelObj]) => (
              <div key={roleName} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem', marginBottom: 10 }}>{roleName}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {Object.entries(levelObj).map(([lvlName, ruleDetails]) => (
                    <div key={lvlName} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: 10, borderRadius: 8, fontSize: '0.82rem' }}>
                      <strong style={{ color: '#0f172a' }}>{lvlName} Level:</strong>
                      <div style={{ marginTop: 4, color: '#16a34a', fontWeight: 700 }}>
                        Tracks: {ruleDetails.tracks.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. SYSTEM AUDIT LOG TAB */}
      {activeTab === 'audit' && (
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <History size={20} color="#4f46e5" /> System Audit & Operations Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {auditLogs.length > 0 ? (
              auditLogs.map(log => (
                <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: '#4f46e5' }}>[{log.action}]</strong> {log.details}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: 20, textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                No audit log entries recorded yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECRUIT INSPECTION MODAL */}
      {selectedRecruitModal && (
        <RecruitDetailsModal
          recruit={selectedRecruitModal}
          rules={rules}
          onClose={() => setSelectedRecruitModal(null)}
          onGradeActivity={() => {}}
          onSignOffLive={() => {}}
        />
      )}
    </div>
  );
};
