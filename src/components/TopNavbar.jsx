import React, { useState } from 'react';
import { 
  Bell, 
  LogOut, 
  User, 
  MapPin, 
  Flame, 
  Trophy, 
  Menu, 
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const TopNavbar = ({ 
  title, 
  activeUser, 
  recruit, 
  onLogout, 
  pendingApprovalsCount = 0,
  onToggleMobileMenu 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const isRecruit = activeUser.role === 'recruit';
  const isManager = activeUser.role === 'manager';
  const isTrainer = activeUser.role === 'trainer';
  const isHR = activeUser.role === 'hr';

  const userCity = isRecruit ? (recruit?.city || 'Ahmedabad') : isManager ? 'Ahmedabad' : 'HQ Operations';

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* MOBILE HAMBURGER MENU TRIGGER */}
        <button
          className="icon-btn mobile-menu-trigger"
          onClick={onToggleMobileMenu}
          title="Open Menu"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {/* BRANCH LOCATION BADGE */}
        <div className="topbar-badge">
          <MapPin size={14} /> {userCity} Hub
        </div>

        {/* STREAK & XP BADGES FOR RECRUIT */}
        {isRecruit && recruit && (
          <>
            <div className="topbar-badge" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <Flame size={14} className="fire-animated" /> {recruit.streakDays || 4} Day Streak
            </div>

            <div className="topbar-badge" style={{ background: '#ecfdf5', color: '#047857' }}>
              <Trophy size={14} /> {recruit.points || 680} XP
            </div>
          </>
        )}

        {/* NOTIFICATIONS BELL */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            aria-label="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {pendingApprovalsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                background: '#ef4444',
                borderRadius: '50%'
              }} />
            )}
          </button>

          {/* NOTIFICATIONS POPOVER */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 48,
              width: 320,
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid #cbd5e1',
              padding: 16,
              zIndex: 2000,
              fontSize: '0.85rem'
            }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Notifications</span>
                <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={14} color="#64748b" /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pendingApprovalsCount > 0 ? (
                  <div style={{ padding: 10, background: '#fffbeb', borderRadius: 8, border: '1px solid #fde68a', color: '#92400e' }}>
                    <strong>Action Required:</strong> {pendingApprovalsCount} pending recruit approval applications awaiting review.
                  </div>
                ) : (
                  <div style={{ padding: 10, background: '#f8fafc', borderRadius: 8, color: '#64748b' }}>
                    ✓ All notifications cleared. System operational across 12 branch hubs.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SIGN OUT BUTTON */}
        <button
          className="btn-secondary"
          onClick={onLogout}
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </header>
  );
};
