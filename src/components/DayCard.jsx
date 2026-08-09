import React, { useState } from 'react';
import { Lock, CheckCircle2, PlayCircle, AlertTriangle, X } from 'lucide-react';

export const DayCard = ({ dayNumber, title, isUnlocked, isCompleted, isActive, onClick, prevDayTitle }) => {
  const [showLockedModal, setShowLockedModal] = useState(false);

  const handleClick = () => {
    if (!isUnlocked) {
      setShowLockedModal(true);
      return;
    }
    onClick();
  };

  let statusClass = 'status-in-progress';
  let statusText = 'In Progress';
  let icon = <PlayCircle size={14} />;

  if (isCompleted) {
    statusClass = 'status-completed';
    statusText = 'Completed';
    icon = <CheckCircle2 size={14} />;
  } else if (!isUnlocked) {
    statusClass = 'status-locked';
    statusText = 'Locked';
    icon = <Lock size={14} />;
  }

  return (
    <>
      <div
        className={`day-card ${isActive ? 'active-day' : ''} ${isCompleted ? 'completed-day' : ''} ${!isUnlocked ? 'locked-day' : ''}`}
        onClick={handleClick}
      >
        <div className="day-card-header">
          <span className="day-number-tag">Day {dayNumber}</span>
          <span className={`status-badge ${statusClass}`}>
            {icon} {statusText}
          </span>
        </div>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: 4 }}>
          {title || `Day ${dayNumber} Curriculum`}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
          {!isUnlocked
            ? `Complete Day ${dayNumber - 1} to unlock`
            : isCompleted
            ? '100% genuine completion achieved'
            : 'Tasks ready for completion'}
        </div>
      </div>

      {/* LOCKED DAY ALERT MODAL */}
      {showLockedModal && (
        <div className="modal-overlay" onClick={() => setShowLockedModal(false)}>
          <div className="modal-card" style={{ maxWidth: 450 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f59e0b', fontWeight: 800 }}>
                <AlertTriangle size={24} />
                <span>Day {dayNumber} Locked</span>
              </div>
              <button onClick={() => setShowLockedModal(false)}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%', background: '#fef3c7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px auto', color: '#d97706'
              }}>
                <Lock size={30} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>
                Prerequisite Training Incomplete
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                TrainFlow core rule dictates that Day {dayNumber} training remains locked until all required modules in <strong>Day {dayNumber - 1}</strong> are genuinely completed.
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button className="btn-primary" onClick={() => setShowLockedModal(false)}>
                Understood — Back to Active Day
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
