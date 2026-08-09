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
      case 'Video': return <Video size={24} />;
      case 'Tv': return <Tv size={24} />;
      case 'Zap': return <Zap size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'Flame': return <Flame size={24} />;
      case 'Target': return <Target size={24} />;
      case 'FileCheck2': return <FileCheck2 size={24} />;
      case 'Users': return <Users size={24} />;
      case 'Award': return <Award size={24} />;
      default: return <Trophy size={24} />;
    }
  };

  return (
    <div className="page-container">
      {/* HERO HERO LEVEL & XP BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        borderRadius: 16,
        padding: 32,
        marginBottom: 28,
        boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800, color: '#fef08a', textTransform: 'uppercase', marginBottom: 8 }}>
              <Trophy size={14} /> GAMIFIED PROGRESSION SYSTEM
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              Achievements & Badge Showcase
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: 4 }}>
              Earn XP points and unlock official badges by completing video modules, checkpoints, and assessments!
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: 12, textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Total Badges Unlocked</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{unlockedCount} / {badgesList.length}</div>
          </div>
        </div>

        {/* LEVEL PROGRESS BAR */}
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: 18, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, color: '#fef08a', marginBottom: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Star size={16} fill="#fef08a" /> {levelName}
            </span>
            <span>{points} / {maxPoints} XP</span>
          </div>
          <div style={{ height: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${levelPercent}%`, background: 'linear-gradient(90deg, #f59e0b 0%, #10b981 100%)', borderRadius: 5, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* DYNAMIC BADGES GRID */}
      <div className="section-header-row">
        <h3 className="section-title">
          <Sparkles size={20} color="#4f46e5" /> Earned Badges ({unlockedCount} Unlocked)
        </h3>
        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Complete video modules to trigger automatic badge unlock notifications!
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 32 }}>
        {badgesList.map(badge => (
          <div
            key={badge.id}
            style={{
              background: badge.isUnlocked ? badge.bg : '#ffffff',
              border: `1px solid ${badge.isUnlocked ? badge.border : '#e2e8f0'}`,
              borderRadius: 14,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              boxShadow: badge.isUnlocked ? '0 4px 12px rgba(0,0,0,0.06)' : '0 2px 4px rgba(0,0,0,0.02)',
              opacity: badge.isUnlocked ? 1 : 0.65,
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: badge.isUnlocked ? badge.color : '#94a3b8',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  boxShadow: badge.isUnlocked ? `0 0 15px ${badge.color}40` : 'none'
                }}>
                  {renderIcon(badge.icon)}
                </div>

                <span className={`status-badge ${badge.isUnlocked ? 'status-completed' : 'status-locked'}`}>
                  {badge.isUnlocked ? '✓ Unlocked' : <><Lock size={12} /> Locked</>}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: 4 }}>
                {badge.title}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: badge.color, textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>
                {badge.category}
              </div>

              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                {badge.description}
              </p>
            </div>

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px dashed ${badge.isUnlocked ? badge.border : '#e2e8f0'}`, fontSize: '0.78rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{badge.isUnlocked ? 'Status: Active Badge' : 'Requirement'}</span>
              <strong style={{ color: badge.isUnlocked ? badge.color : '#0f172a' }}>
                {badge.isUnlocked ? 'Earned ✓' : 'Complete Video'}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
