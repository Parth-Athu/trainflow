import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  Trophy, 
  Star, 
  Flame, 
  ShieldCheck, 
  Target, 
  Award, 
  ShieldAlert, 
  Clock, 
  Maximize2, 
  ExternalLink,
  Download,
  Lock
} from 'lucide-react';
import { 
  calculateRecruitProgress, 
  calculateLearningReadiness, 
  isRecruitCertificationEligible 
} from '../utils/learningEngine';

export const RecruitProfile = ({ recruit, rules, onNavigateTab }) => {
  const { percent, completedCount, totalCount, currentDay, learningPath } = calculateRecruitProgress(recruit, rules);
  const { readinessScore, nextAction } = calculateLearningReadiness(recruit, rules);
  const { isEligible } = isRecruitCertificationEligible(recruit, rules);

  const isCertified = recruit.isCertified || recruit.certificationStatus === 'CERTIFIED';

  // Gamified XP Level
  const points = recruit.points || 680;
  let levelName = "Level 2 Specialist";
  let maxPoints = 1000;
  if (points >= 1000) {
    levelName = "Level 3 Onboarding Master 🏆";
    maxPoints = 1200;
  } else if (points < 500) {
    levelName = "Level 1 Onboarding Apprentice";
    maxPoints = 500;
  }
  const levelPercent = Math.min(100, Math.round((points / maxPoints) * 100));

  // Assigned Tracks
  const assignedTrackKeys = learningPath.assignedTracks || Array.from(new Set(learningPath.map(m => m.track)));
  const hasCore = assignedTrackKeys.includes('core');
  const hasSales = assignedTrackKeys.includes('sales');
  const hasOps = assignedTrackKeys.includes('ops');

  // Assessment Attempts Map
  const attemptsMap = recruit.assessmentAttempts || {};
  const allAttempts = Object.values(attemptsMap).flat();
  const totalAttemptsCount = allAttempts.length || 4;
  const passedAttemptsCount = allAttempts.filter(a => a.status === 'PASSED').length || 3;
  const passRate = totalAttemptsCount > 0 ? Math.round((passedAttemptsCount / totalAttemptsCount) * 100) : 75;
  const warningsCount = allAttempts.reduce((acc, a) => acc + (a.warnings || 0), 0) || 1;

  return (
    <div className="page-container">
      {/* 1. HERO AVATAR CARD */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        borderRadius: 16,
        padding: 32,
        marginBottom: 24,
        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative' }}>
          <img
            src={recruit.avatar}
            alt={recruit.name}
            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid #818cf8' }}
          />
          <span style={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            width: 18,
            height: 18,
            background: '#10b981',
            borderRadius: '50%',
            border: '3px solid #0f172a'
          }} />
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: isCertified ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)', border: `1px solid ${isCertified ? '#10b981' : '#818cf8'}`, color: isCertified ? '#34d399' : '#a5b4fc', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
            ● {isCertified ? 'GRADUATE • CERTIFIED' : (recruit.approvalStatus || 'APPROVED ACCOUNT')}
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px 0', color: '#ffffff' }}>
            {recruit.name} <span style={{ fontSize: '1.1rem', color: '#a5b4fc', fontWeight: 600 }}>({recruit.id})</span>
          </h1>

          <div style={{ fontSize: '0.95rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 4 }}>
            <span><Briefcase size={15} style={{ verticalAlign: 'text-top', marginRight: 4 }} /> {recruit.role} • {recruit.level}</span>
            <span><MapPin size={15} style={{ verticalAlign: 'text-top', marginRight: 4 }} /> {recruit.city} Hub</span>
            <span><Calendar size={15} style={{ verticalAlign: 'text-top', marginRight: 4 }} /> Joined Aug 2026</span>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN GRID: PERSONAL INFO & LEARNING READINESS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* PERSONAL INFO CARD */}
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={18} color="#4f46e5" /> Personal Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
              <span style={{ color: '#64748b' }}>Email Address:</span>
              <strong style={{ color: '#0f172a' }}>{recruit.email}</strong>
            </div>

            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
              <span style={{ color: '#64748b' }}>Regional Branch:</span>
              <strong style={{ color: '#0f172a' }}>{recruit.city} Regional Hub</strong>
            </div>

            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
              <span style={{ color: '#64748b' }}>Department:</span>
              <strong style={{ color: '#0f172a' }}>{recruit.department || 'Sales & Enterprise Operations'}</strong>
            </div>

            <div style={{ display: 'flex', justify: 'space-between', paddingBottom: 4 }}>
              <span style={{ color: '#64748b' }}>Joining Date:</span>
              <strong style={{ color: '#0f172a' }}>August 1, 2026</strong>
            </div>
          </div>
        </div>

        {/* LEARNING READINESS CARD */}
        <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={18} color="#4f46e5" /> Learning Readiness Index
            </h3>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4f46e5' }}>{readinessScore}%</span>
          </div>

          <div style={{ height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ height: '100%', width: `${readinessScore}%`, background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)', borderRadius: 5 }} />
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12, fontSize: '0.85rem', color: '#334155' }}>
            <strong style={{ color: '#4f46e5' }}>Recommended Action:</strong>
            <div style={{ marginTop: 2, color: '#475569', fontWeight: 600 }}>{nextAction}</div>
          </div>
        </div>
      </div>

      {/* 3. YOUR AUTO-GENERATED LEARNING PATH CARD */}
      <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            🧠 Your Auto-Generated Learning Path
          </h3>
          <button className="btn-secondary" onClick={() => onNavigateTab('dashboard')} style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            View 4-Day Learning Path <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: '0.9rem', color: '#4f46e5', marginBottom: 8 }}>
            <span>{recruit.role} ({recruit.level})</span>
            <ArrowRight size={14} />
            <span>RULE ENGINE EVALUATION</span>
            <ArrowRight size={14} />
            <span style={{ color: '#10b981' }}>TRACK ASSIGNMENT</span>
          </div>

          <div style={{ display: 'flex', gap: 16, fontSize: '0.88rem', fontWeight: 700, marginTop: 10 }}>
            {hasCore && <div style={{ color: '#16a34a' }}>✓ Core Company Track</div>}
            {hasSales && <div style={{ color: '#16a34a' }}>✓ Sales & Marketing Track</div>}
            {hasOps && <div style={{ color: '#16a34a' }}>✓ Delivery & Operations Track</div>}
          </div>
        </div>
      </div>

      {/* 4. XP & ACHIEVEMENTS CARD */}
      <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            🏆 XP & Achievements
          </h3>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star size={18} fill="#f59e0b" /> {levelName} ({points} / {maxPoints} XP)
          </div>
        </div>

        <div style={{ height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: '100%', width: `${levelPercent}%`, background: 'linear-gradient(90deg, #f59e0b 0%, #10b981 100%)', borderRadius: 5 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: 12, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={24} color="#10b981" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#065f46' }}>Policy Champion</div>
              <div style={{ fontSize: '0.72rem', color: '#047857' }}>Code of Conduct verified</div>
            </div>
          </div>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: 12, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Target size={24} color="#4f46e5" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#3730a3' }}>Checkpoint Master</div>
              <div style={{ fontSize: '0.72rem', color: '#4338ca' }}>Mid-video checkpoints</div>
            </div>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: 12, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Flame size={24} color="#f97316" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#9a3412' }}>Streak Flame</div>
              <div style={{ fontSize: '0.72rem', color: '#c2410c' }}>{recruit.streakDays} Days Streak</div>
            </div>
          </div>

          <div style={{ background: isCertified ? '#ecfdf5' : '#f8fafc', border: `1px solid ${isCertified ? '#a7f3d0' : '#e2e8f0'}`, padding: 12, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={24} color={isCertified ? '#10b981' : '#94a3b8'} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: isCertified ? '#065f46' : '#64748b' }}>Graduate</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isCertified ? 'Certificate Earned' : 'Locked until Day 4'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ASSESSMENT INTEGRITY CARD */}
      <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          🔐 Assessment Integrity & Security Log
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total Attempts</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>{totalAttemptsCount} Attempts</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Pass Rate</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#10b981' }}>{passRate}%</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Security Warnings</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: warningsCount > 0 ? '#ef4444' : '#10b981' }}>{warningsCount} Warning</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, fontSize: '0.85rem' }}>
            <strong style={{ color: '#065f46' }}>M-S02 Customer Conversations Assessment</strong>
            <span className="status-badge status-completed">✓ 90% (Passed)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, fontSize: '0.85rem' }}>
            <strong style={{ color: '#991b1b' }}>M-D04 Escalation Handling Assessment</strong>
            <span className="status-badge status-needs-attention">⚠️ Terminated (2 Warnings)</span>
          </div>
        </div>
      </div>

      {/* 6. CERTIFICATION STATUS CARD (DYNAMICALLY UPDATED) */}
      <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              🎓 Onboarding Program Certification
            </h3>

            {isCertified ? (
              <div style={{ fontSize: '0.88rem', color: '#065f46', fontWeight: 700 }}>
                🎓 CERTIFIED • Certificate ID: <strong>{recruit.certificateId || 'TF-2026-X8921'}</strong> • Issued By: <strong>{recruit.approvedBy || 'Amit Shah (Branch Manager)'}</strong>
              </div>
            ) : isEligible ? (
              <div style={{ fontSize: '0.88rem', color: '#16a34a', fontWeight: 700 }}>
                ✓ Ready for Branch Manager Certification Approval (Training 100% Complete)
              </div>
            ) : (
              <div style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Day {currentDay} of 4 • Program Progress: <strong>{percent}%</strong> (Waiting for completion)
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {isCertified ? (
              <>
                <button className="btn-primary" onClick={() => onNavigateTab('certificate')}>
                  <Award size={16} /> View Certificate
                </button>
                <button className="btn-secondary" onClick={() => onNavigateTab('certificate')}>
                  <Download size={16} /> Download (PDF)
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => onNavigateTab('certificate')} disabled={!isEligible} style={{ opacity: isEligible ? 1 : 0.6 }}>
                <Award size={16} /> {isEligible ? 'View Certification Status' : 'In Progress'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
