import React from 'react';
import { Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';

export const LearningReadinessWidget = ({ readinessScore, avgQuizScore, nextAction, onActionClick }) => {
  let scoreColor = '#10b981'; // green
  if (readinessScore < 60) scoreColor = '#ef4444';
  else if (readinessScore < 80) scoreColor = '#f59e0b';

  return (
    <div className="readiness-card">
      <div className="readiness-header">
        <span className="readiness-title">
          <Sparkles size={16} /> Learning Readiness Index
        </span>
        <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 12, color: '#e0e7ff', fontWeight: 800 }}>
          AI EVALUATED
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '12px 0 8px 0' }}>
        <div className="readiness-score-display" style={{ color: scoreColor, fontSize: '2.4rem', fontWeight: 900, lineHeight: 1 }}>
          {readinessScore}%
        </div>
        <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={14} color="#10b981" /> High Retention & Velocity
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
          Quiz Score: <strong>{avgQuizScore}% Avg</strong>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
          Practical Skills: <strong style={{ color: '#34d399' }}>Verified ✓</strong>
        </div>
      </div>

      <div className="readiness-recommendation" onClick={onActionClick} style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: 12, marginTop: 10, transition: 'all 0.2s ease' }}>
        <div style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 800, letterSpacing: 0.5 }}>
          NEXT RECOMMENDED ACTION
        </div>
        <div style={{ fontWeight: 800, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', fontSize: '0.88rem' }}>
          <span>{nextAction}</span>
          <ArrowUpRight size={16} color="#818cf8" />
        </div>
      </div>
    </div>
  );
};
