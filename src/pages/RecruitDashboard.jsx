import React, { useState } from 'react';
import { 
  calculateRecruitProgress, 
  calculateLearningReadiness, 
  isDayUnlocked, 
  isModuleCompleted,
  getLearningPath
} from '../utils/learningEngine';
import { DayCard } from '../components/DayCard';
import { ModuleCard } from '../components/ModuleCard';
import { LearningReadinessWidget } from '../components/LearningReadinessWidget';
import { 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Trophy, 
  Flame, 
  Layers, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  ArrowRight,
  Cpu,
  Star,
  Award,
  ShieldCheck,
  Lock,
  Download
} from 'lucide-react';

export const RecruitDashboard = ({ recruit, rules, onOpenModule, onNavigateToCert }) => {
  const { percent, completedCount, totalCount, currentDay, learningPath } = calculateRecruitProgress(recruit, rules);
  const { readinessScore, avgQuizScore, nextAction } = calculateLearningReadiness(recruit, rules);
  const [selectedDayTab, setSelectedDayTab] = useState(currentDay);
  const [showWhyModal, setShowWhyModal] = useState(false);

  const activeDayModules = learningPath.filter(m => m.day === selectedDayTab);
  const activeDayUnlocked = isDayUnlocked(recruit, selectedDayTab, learningPath);

  const isTrainingClosed = recruit.accessClosed || recruit.isCertified || recruit.trainingAccess === 'CLOSED';

  // Calculate Level based on XP Points
  const points = recruit.points || 0;
  let recruitLevelName = "Level 1 Onboarding Apprentice";
  let nextLevelPoints = 500;
  if (points >= 1000) {
    recruitLevelName = "Level 3 Onboarding Master 🏆";
    nextLevelPoints = 1200;
  } else if (points >= 500) {
    recruitLevelName = "Level 2 Onboarding Specialist ⭐";
    nextLevelPoints = 1000;
  }
  const levelPercent = Math.min(100, Math.round((points / nextLevelPoints) * 100));

  // Derive active tracks
  const assignedTrackKeys = learningPath.assignedTracks || Array.from(new Set(learningPath.map(m => m.track)));
  const hasCore = assignedTrackKeys.includes('core');
  const hasSales = assignedTrackKeys.includes('sales');
  const hasOps = assignedTrackKeys.includes('ops');

  const activeTrackLabels = [];
  if (hasCore) activeTrackLabels.push('Core');
  if (hasSales) activeTrackLabels.push('Sales & Marketing');
  if (hasOps) activeTrackLabels.push('Delivery & Ops');

  return (
    <div className="page-container">
      {/* 1. TRAINING ACCESS CLOSED GATE (IF CERTIFIED) */}
      {isTrainingClosed && (
        <div style={{
          background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
          color: '#ffffff',
          borderRadius: 16,
          padding: 32,
          marginBottom: 28,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          textAlign: 'center'
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'
          }}>
            <Award size={40} color="#ffffff" />
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
            🎓 PROGRAM CERTIFIED & COMPLETED
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>
            Congratulations, {recruit.name}! 🎉
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#d1fae5', maxWidth: 600, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            You have successfully completed the <strong>New Recruit Onboarding Program</strong> and officially earned your Verified Certificate of Completion!
          </p>

          <div style={{ display: 'inline-flex', gap: 20, background: 'rgba(0,0,0,0.2)', padding: '12px 24px', borderRadius: 12, fontSize: '0.88rem', marginBottom: 24 }}>
            <div>Certificate ID: <strong>{recruit.certificateId || 'TF-2026-X8921'}</strong></div>
            <div>Issued By: <strong>{recruit.approvedBy || 'Amit Shah (Ahmedabad Branch Manager)'}</strong></div>
            <div style={{ color: '#fef08a' }}>Training Access: <strong>🔒 CLOSED</strong></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button className="btn-primary" onClick={onNavigateToCert} style={{ background: '#ffffff', color: '#065f46', fontWeight: 800, padding: '12px 24px' }}>
              <Award size={18} /> View Official Certificate
            </button>
            <button className="btn-secondary" onClick={onNavigateToCert} style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', padding: '12px 24px' }}>
              <Download size={18} /> Download Certificate (PDF)
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="hero-welcome-card" style={{ opacity: isTrainingClosed ? 0.85 : 1 }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: '#e0e7ff', marginBottom: 12 }}>
              <Cpu size={14} /> Learning Path Generated Automatically
            </div>
            
            <h2 className="hero-greeting">Good morning, {recruit.name} 👋</h2>
            <div className="hero-subtitle">
              Your training modules were automatically selected based on your role and seniority level.
            </div>

            {/* GAMIFIED LEVEL & XP PROGRESS BAR */}
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 800, color: '#fef08a', marginBottom: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={14} fill="#fef08a" /> {recruitLevelName}
                </span>
                <span>{points} / {nextLevelPoints} XP</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${levelPercent}%`, background: 'linear-gradient(90deg, #f59e0b 0%, #10b981 100%)', borderRadius: 4, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* AUTOMATIC RULE BANNER */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '14px 18px',
              marginBottom: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem' }}>
                  <div><span style={{ color: '#94a3b8' }}>Role:</span> <strong style={{ color: '#ffffff' }}>{recruit.role}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>Level:</span> <strong style={{ color: '#ffffff' }}>{recruit.level}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>Tracks:</span> <strong style={{ color: '#818cf8' }}>{activeTrackLabels.join(' • ')}</strong></div>
                </div>

                <button
                  onClick={() => setShowWhyModal(!showWhyModal)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#e0e7ff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer'
                  }}
                >
                  <HelpCircle size={14} />
                  Why these modules?
                  {showWhyModal ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px dashed rgba(255,255,255,0.15)',
                fontSize: '0.75rem',
                color: '#a5b4fc',
                fontWeight: 700
              }}>
                <span>{recruit.role.toUpperCase()} + {recruit.level.toUpperCase()}</span>
                <ArrowRight size={12} />
                <span>RULE ENGINE</span>
                <ArrowRight size={12} />
                <span style={{ color: '#10b981' }}>YOUR PERSONALIZED 4-DAY PATH</span>
              </div>
            </div>

            {/* EXPANDABLE RULE EXPLANATION SECTION */}
            {showWhyModal && (
              <div style={{
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: 10,
                padding: 18,
                marginBottom: 16,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                border: '1px solid #cbd5e1',
                animation: 'slideIn 0.2s ease-out'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4f46e5', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Cpu size={16} /> How your learning path was generated
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: 12 }}>
                  TrainFlow rules automatically match your assigned position (<strong>{recruit.role} - {recruit.level}</strong>) against centralized company training standards.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.82rem' }}>
                  <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Assigned Tracks:</div>
                    <div style={{ color: '#16a34a', fontWeight: 700 }}>✓ Core Company Foundation</div>
                    {hasSales && <div style={{ color: '#16a34a', fontWeight: 700 }}>✓ Sales & Marketing Track</div>}
                    {hasOps && <div style={{ color: '#16a34a', fontWeight: 700 }}>✓ Delivery & Operations Track</div>}
                  </div>

                  <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Track Restrictions:</div>
                    {!hasSales && <div style={{ color: '#dc2626' }}>✗ Sales & Marketing (Not required for role)</div>}
                    {!hasOps && <div style={{ color: '#dc2626' }}>✗ Delivery & Operations (Not required for role)</div>}
                    {hasSales && hasOps && <div style={{ color: '#059669' }}>✓ Full Specialist Access (Manager Level)</div>}
                  </div>
                </div>
              </div>
            )}

            {/* OVERALL PROGRESS BAR */}
            <div style={{ marginTop: 12, maxWidth: 500 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6 }}>
                <span>Overall Program Progress</span>
                <span style={{ color: '#818cf8' }}>{percent}% ({completedCount}/{totalCount} Modules)</span>
              </div>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 5, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
                    borderRadius: 5,
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            <div className="metrics-inline">
              <div className="hero-stat-box">
                <Target size={20} color="#818cf8" />
                <div>
                  <div className="hero-stat-val">Day {currentDay} of 4</div>
                  <div className="hero-stat-lbl">Active Stage</div>
                </div>
              </div>

              <div className="hero-stat-box">
                <Flame size={20} color="#f97316" className="fire-animated" />
                <div>
                  <div className="hero-stat-val">{recruit.streakDays} Days</div>
                  <div className="hero-stat-lbl">Active Streak 🔥</div>
                </div>
              </div>

              <div className="hero-stat-box">
                <Trophy size={20} color="#10b981" />
                <div>
                  <div className="hero-stat-val">{points} XP</div>
                  <div className="hero-stat-lbl">Total XP Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* DIFFERENTIATOR WIDGET */}
          <LearningReadinessWidget
            readinessScore={readinessScore}
            avgQuizScore={avgQuizScore}
            nextAction={nextAction}
            onActionClick={() => {
              if (isTrainingClosed) {
                onNavigateToCert();
                return;
              }
              const pending = activeDayModules.find(m => !isModuleCompleted(recruit, m.id));
              if (pending) onOpenModule(pending);
              else if (percent === 100) onNavigateToCert();
            }}
          />
        </div>
      </div>

      {/* GAMIFIED ACHIEVEMENTS & BADGES SHOWCASE */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 28 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={18} color="#f59e0b" /> My Badges & Achievements
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: 14, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#10b981', color: '#ffffff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#065f46' }}>Policy Champion</div>
              <div style={{ fontSize: '0.75rem', color: '#047857' }}>Code of Conduct verified</div>
            </div>
          </div>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: 14, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#4f46e5', color: '#ffffff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#3730a3' }}>Checkpoint Master</div>
              <div style={{ fontSize: '0.75rem', color: '#4338ca' }}>Mid-video checkpoints cleared</div>
            </div>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: 14, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#f97316', color: '#ffffff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#9a3412' }}>Streak Flame</div>
              <div style={{ fontSize: '0.75rem', color: '#c2410c' }}>Active learning streak</div>
            </div>
          </div>

          <div style={{ background: recruit.isCertified ? '#ecfdf5' : '#f8fafc', border: `1px solid ${recruit.isCertified ? '#a7f3d0' : '#e2e8f0'}`, padding: 14, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: recruit.isCertified ? '#10b981' : '#94a3b8', color: '#ffffff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: recruit.isCertified ? '#065f46' : '#64748b' }}>Graduate</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{recruit.isCertified ? 'Certificate Earned' : 'Locked until Day 4'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-DAY SEQUENTIAL TRACK CARDS */}
      <div className="section-header-row">
        <h3 className="section-title">
          <Target size={20} color="#4f46e5" /> 4-Day Sequential Curriculum
        </h3>
        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Rule: Day N+1 unlocks only after Day N completion
        </span>
      </div>

      <div className="days-grid">
        {[1, 2, 3, 4].map(dayNum => {
          const dayModules = learningPath.filter(m => m.day === dayNum);
          const dayUnlocked = isDayUnlocked(recruit, dayNum, learningPath);
          const dayCompleted = dayModules.length > 0 && dayModules.every(m => isModuleCompleted(recruit, m.id));
          
          let dayTitle = "Orientation & Core Values";
          if (dayNum === 2) dayTitle = "Specialist Role Foundations";
          if (dayNum === 3) dayTitle = "Practical Tasks & Live Ops";
          if (dayNum === 4) dayTitle = "Final Exam & Certification";

          return (
            <DayCard
              key={dayNum}
              dayNumber={dayNum}
              title={dayTitle}
              isUnlocked={dayUnlocked}
              isCompleted={dayCompleted}
              isActive={selectedDayTab === dayNum}
              onClick={() => setSelectedDayTab(dayNum)}
            />
          );
        })}
      </div>

      {/* MODULES LIST FOR SELECTED DAY */}
      <div className="section-header-row">
        <h3 className="section-title">
          Day {selectedDayTab} Learning Modules ({activeDayModules.length})
        </h3>
        {isTrainingClosed ? (
          <span className="status-badge status-completed">
            🔒 Training Access Closed — Program Certified
          </span>
        ) : !activeDayUnlocked && (
          <span className="status-badge status-locked">
            🔒 Complete previous day modules to unlock
          </span>
        )}
      </div>

      <div className="modules-grid">
        {activeDayModules.map(module => {
          const completed = isModuleCompleted(recruit, module.id);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={completed}
              isDayUnlocked={isTrainingClosed ? false : activeDayUnlocked}
              onOpenModule={(mod) => {
                if (isTrainingClosed) onNavigateToCert();
                else onOpenModule(mod);
              }}
              recruit={recruit}
            />
          );
        })}
      </div>
    </div>
  );
};
