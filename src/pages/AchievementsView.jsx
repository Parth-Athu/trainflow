import React from 'react';
import { 
  Trophy, 
  Star, 
  Flame, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Tv, 
  Zap, 
  Target, 
  FileCheck2, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';
import { getRecruitBadges } from '../data/badges';

export const AchievementsView = ({ recruit, onNavigateTab }) => {
  const badgesList = getRecruitBadges(recruit);
  const unlockedCount = badgesList.filter(b => b.isUnlocked).length;

  const points = recruit?.points || 680;
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

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Video': return <Video size={20} />;
      case 'Tv': return <Tv size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'Flame': return <Flame size={20} />;
      case 'Target': return <Target size={20} />;
      case 'FileCheck2': return <FileCheck2 size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Award': return <Award size={20} />;
      default: return <Trophy size={20} />;
    }
  };

  return (
    <div className="page-container">
      {/* COMPACT LEVEL & XP BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        borderRadius: 14,
        padding: '20px 24px',
        marginBottom: 20,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.12)', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 800, color: '#fef08a', textTransform: 'uppercase', marginBottom: 6 }}>
              <Trophy size={13} /> GAMIFIED PROGRESSION SYSTEM
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Achievements & Badge Showcase
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: 2 }}>
              Earn XP points and unlock official badges by completing video modules, checkpoints, and assessments!
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 10, textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Total Badges Unlocked</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#10b981' }}>{unlockedCount} / {badgesList.length}</div>
          </div>
        </div>

        {/* LEVEL PROGRESS BAR */}
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, color: '#fef08a', marginBottom: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Star size={14} fill="#fef08a" /> {levelName}
            </span>
            <span>{points} / {maxPoints} XP</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${levelPercent}%`, background: 'linear-gradient(90deg, #f59e0b 0%, #10b981 100%)', borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* DYNAMIC BADGES GRID */}
      <div className="section-header-row">
        <h3 className="section-title">
          <Sparkles size={18} color="#4f46e5" /> Earned Badges ({unlockedCount} Unlocked)
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          Complete video modules to trigger automatic badge unlock notifications!
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {badgesList.map(badge => (
          <div
            key={badge.id}
            style={{
              background: badge.isUnlocked ? badge.bg : '#ffffff',
              border: `1px solid ${badge.isUnlocked ? badge.border : '#e2e8f0'}`,
              borderRadius: 12,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: badge.isUnlocked ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
              opacity: badge.isUnlocked ? 1 : 0.6,
              transition: 'all 0.15s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: badge.isUnlocked ? badge.color : '#94a3b8',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}>
                  {renderIcon(badge.icon)}
                </div>

                <span className={`status-badge ${badge.isUnlocked ? 'status-completed' : 'status-locked'}`}>
                  {badge.isUnlocked ? '✓ Unlocked' : <><Lock size={11} /> Locked</>}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: 2 }}>
                {badge.title}
              </div>

              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: badge.color, textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.4 }}>
                {badge.category}
              </div>

              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
                {badge.description}
              </p>
            </div>

            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${badge.isUnlocked ? badge.border : '#e2e8f0'}`, fontSize: '0.74rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{badge.isUnlocked ? 'Status: Active Badge' : 'Requirement'}</span>
              <strong style={{ color: badge.isUnlocked ? badge.color : '#0f172a' }}>
                {badge.isUnlocked ? 'Earned ✓' : 'Complete Module'}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
