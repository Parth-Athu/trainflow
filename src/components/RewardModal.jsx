import React, { useEffect } from 'react';
import { Trophy, Award, Flame, Star, Sparkles, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardModal = ({ title, xpAmount, badgeName, onClose }) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay" style={{ zIndex: 6500 }} onClick={onClose}>
      <div
        className="modal-card"
        style={{
          maxWidth: 440,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#ffffff',
          border: '2px solid #818cf8',
          animation: 'badgePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-body" style={{ padding: 36 }}>
          <div style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)'
          }}>
            <Trophy size={40} color="#ffffff" />
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
            REWARD UNLOCKED!
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8, color: '#ffffff' }}>
            {title || 'Checkpoint Cleared! 🎯'}
          </h3>

          {xpAmount && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              color: '#34d399',
              fontWeight: 900,
              fontSize: '1.4rem',
              padding: '8px 24px',
              borderRadius: 30,
              margin: '12px 0'
            }}>
              <Star size={24} color="#34d399" fill="#34d399" /> +{xpAmount} XP REWARD
            </div>
          )}

          {badgeName && (
            <div style={{ fontSize: '0.9rem', color: '#e0e7ff', marginTop: 4 }}>
              Badge Earned: <strong>{badgeName}</strong> 🏆
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
              Awesome! Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
