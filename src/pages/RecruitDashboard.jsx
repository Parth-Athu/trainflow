import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  Trophy, 
  Star, 
  PlayCircle, 
  FileText, 
  Users, 
  FileCheck2, 
  Maximize2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Target,
  Zap
} from 'lucide-react';
import { calculateRecruitProgress, getLearningPath } from '../utils/learningEngine';

export const RecruitDashboard = ({ recruit, rules, onOpenModule, onNavigateToCert }) => {
  if (!recruit) return null;

  const { percent, currentDay, completedCount, totalCount } = calculateRecruitProgress(recruit, rules);
  const learningPath = getLearningPath(recruit, rules);
  const assignedTracks = learningPath.assignedTracks || ['core', 'sales'];

  const selectedDay = Math.min(4, Math.max(1, currentDay));
  const currentDayModules = learningPath.filter(m => m.day === selectedDay);

  const isCertified = recruit.isCertified || recruit.certificationStatus === 'CERTIFIED';

  const renderTypeIcon = (type) => {
    switch (type) {
      case 'VIDEO': return <PlayCircle size={18} color="#4f46e5" />;
      case 'READING': return <FileText size={18} color="#059669" />;
      case 'LIVE': return <Users size={18} color="#d97706" />;
      case 'ACTIVITY': return <FileCheck2 size={18} color="#7c3aed" />;
      case 'SITUATIONAL_QUIZ': return <Target size={18} color="#ec4899" />;
      case 'SYSTEM': return <Maximize2 size={18} color="#4f46e5" />;
      default: return <BookOpen size={18} color="#4f46e5" />;
    }
  };

  return (
    <div className="page-container">
      {/* 1. HERO WELCOME & GAMIFIED LEVEL BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#ffffff',
          borderRadius: 14,
          padding: '22px 26px',
          marginBottom: 20,
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 6 }}>
              <Sparkles size={13} /> {recruit.role} • {recruit.level} Level
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Welcome back, {recruit.name}! 👋
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: 3 }}>
              Assigned Regional Hub: <strong>{recruit.city || 'Ahmedabad'} Hub</strong> • Rule Engine Track: <strong style={{ color: '#34d399', textTransform: 'uppercase' }}>{assignedTracks.join(' + ')}</strong>
            </div>
          </div>

          {/* PROGRESS METRIC BOX */}
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: 10, textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Curriculum Completed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: percent === 100 ? '#10b981' : '#ffffff' }}>{percent}%</div>
          </div>
        </div>

        {/* GAMIFIED LEVEL & XP PROGRESS BAR */}
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#fef08a', marginBottom: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Star size={13} fill="#fef08a" /> Level 2 Specialist ({recruit.points || 680} XP)
            </span>
            <span>{completedCount} of {totalCount} Sub-modules Completed</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(90deg, #38bdf8 0%, #10b981 100%)', borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* 2. IF PROGRAM CERTIFIED & ACCESS CLOSED CARD */}
      {isCertified && (
        <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', color: '#ffffff', borderRadius: 14, padding: 22, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 14px rgba(16,185,129,0.2)' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>
              🎓 PROGRAM CERTIFIED & COMPLETED
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Official Certificate Issued by Branch Manager</h3>
            <div style={{ fontSize: '0.82rem', color: '#a7f3d0', marginTop: 2 }}>
              Certificate ID: <strong>{recruit.certificateId || 'TF-2026-X8901'}</strong> • Training Access: <strong>🔒 CLOSED</strong>
            </div>
          </div>

          <button className="btn-primary" onClick={onNavigateToCert} style={{ background: '#ffffff', color: '#047857', border: 'none', fontWeight: 800, padding: '8px 18px' }}>
            View Official Certificate <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* 3. 4-DAY SEQUENTIAL CURRICULUM GRID */}
      <div className="section-header-row">
        <h3 className="section-title">
          <BookOpen size={18} color="#4f46e5" /> 4-Day Sequential Onboarding Path
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          Day 2 unlocks automatically after Day 1 is 100% complete
        </span>
      </div>

      <div className="days-grid">
        {[1, 2, 3, 4].map(dayNum => {
          const isCurrent = dayNum === currentDay;
          const dayModules = learningPath.filter(m => m.day === dayNum);
          const dayCompletedCount = dayModules.filter(m => (recruit.completedModuleIds || []).includes(m.id)).length;
          const isDayDone = dayModules.length > 0 && dayCompletedCount === dayModules.length;
          const isLocked = dayNum > currentDay && !isDayDone;

          return (
            <div
              key={dayNum}
              className={`day-card ${isCurrent ? 'active-day' : ''}`}
              style={{
                opacity: isLocked ? 0.6 : 1,
                borderColor: isDayDone ? '#a7f3d0' : isCurrent ? '#4f46e5' : '#e2e8f0',
                background: isDayDone ? '#f0fdf4' : isCurrent ? '#eef2ff' : '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isCurrent ? '#4f46e5' : '#64748b', textTransform: 'uppercase' }}>
                  Day {dayNum}
                </span>
                <span className={`status-badge ${isDayDone ? 'status-completed' : isCurrent ? 'status-in-progress' : 'status-locked'}`}>
                  {isDayDone ? 'Done ✓' : isCurrent ? 'Active' : <><Lock size={10} /> Locked</>}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: 4 }}>
                {dayNum === 1 ? 'Orientation & Core' : dayNum === 2 ? 'Specialist Competencies' : dayNum === 3 ? 'Practical & Live Ops' : 'Final Exam & Cert'}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {dayCompletedCount} of {dayModules.length} Modules Done
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. MODULE CARDS LIST FOR ACTIVE DAY */}
      <div className="section-header-row">
        <h3 className="section-title">
          <Zap size={18} color="#4f46e5" /> Day {selectedDay} Required Learning Modules ({currentDayModules.length})
        </h3>
      </div>

      <div className="modules-grid">
        {currentDayModules.map(mod => {
          const isDone = (recruit.completedModuleIds || []).includes(mod.id);

          return (
            <div key={mod.id} className="module-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: isDone ? '#ecfdf5' : '#eef2ff',
                  border: `1px solid ${isDone ? '#a7f3d0' : '#c7d2fe'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}>
                  {renderTypeIcon(mod.type)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>{mod.title}</span>
                    <span className="status-badge status-in-progress" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {mod.type}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', gap: 14 }}>
                    <span>Track: <strong style={{ color: '#4f46e5', textTransform: 'uppercase' }}>{mod.track}</strong></span>
                    <span>Duration: <strong>{mod.estimatedTime}</strong></span>
                    <span>Completion: <strong style={{ color: '#059669' }}>{mod.completionCheck}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                {isDone ? (
                  <button className="btn-secondary" onClick={() => onOpenModule(mod)} style={{ fontSize: '0.78rem', padding: '5px 12px', color: '#047857' }}>
                    <CheckCircle2 size={14} /> Review Module
                  </button>
                ) : (
                  <button className="btn-primary" onClick={() => onOpenModule(mod)} style={{ fontSize: '0.78rem', padding: '5px 14px' }}>
                    Open Module <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
