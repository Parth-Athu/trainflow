import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  Flame, 
  Trophy, 
  LogOut, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { TrainFlowLogo } from './TrainFlowLogo';

export const TopNavbar = ({ 
  title, 
  activeUser, 
  recruit, 
  onLogout,
  pendingApprovalsCount = 0,
  onToggleMobileMenu
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const city = recruit?.city || 'Ahmedabad';
  const points = recruit?.points || 680;
  const streakDays = recruit?.streakDays || 4;

  return (
    <header className="top-navbar">
      {/* LEFT TITLE WITH MOBILE MENU TOGGLE & BRAND LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1, overflow: 'hidden' }}>
        {/* MOBILE MENU HAMBURGER TRIGGER */}
        <button
          onClick={onToggleMobileMenu}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#334155',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-menu-trigger"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* LOGO ICON & BREADCRUMB PAGE TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, overflow: 'hidden' }}>
          <div style={{ flexShrink: 0 }}>
            <TrainFlowLogo size={22} showText={false} />
          </div>
          <h1 
            className="top-navbar-title" 
            style={{ 
              fontSize: '0.98rem', 
              fontWeight: 800, 
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* RIGHT METRICS & USER CONTROLS (FLEX SHRINK 0 PREVENTS OVERLAP) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {/* LOCATION BADGE */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          padding: '4px 10px',
          borderRadius: 20,
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#334155'
        }}>
          <MapPin size={12} color="#4f46e5" />
          <span>{city} Hub</span>
        </div>

        {/* STREAK BADGE */}
        {activeUser.role === 'recruit' && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#c2410c'
          }}>
            <Flame size={13} color="#f97316" fill="#f97316" />
            <span>{streakDays} Day Streak</span>
          </div>
        )}

        {/* XP BADGE */}
        {activeUser.role === 'recruit' && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#047857'
          }}>
            <Trophy size={13} color="#10b981" />
            <span>{points} XP</span>
          </div>
        )}

        {/* NOTIFICATIONS BELL */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              color: '#475569',
              position: 'relative'
            }}
          >
            <Bell size={15} />
            {pendingApprovalsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 15,
                height: 15,
                borderRadius: '50%',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION POPOVER */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 40,
              width: 280,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: 14,
              zIndex: 1000
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Notifications ({pendingApprovalsCount})</span>
                <X size={14} style={{ cursor: 'pointer' }} onClick={() => setShowNotifications(false)} />
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pendingApprovalsCount > 0 ? (
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: 8, borderRadius: 6, color: '#b45309' }}>
                    ⚠️ {pendingApprovalsCount} recruit registration applications pending branch approval.
                  </div>
                ) : (
                  <div style={{ color: '#64748b' }}>No unread notifications. System operating normally.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SIGN OUT BUTTON */}
        <button
          className="btn-secondary"
          onClick={onLogout}
          style={{ padding: '5px 11px', fontSize: '0.78rem' }}
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </header>
  );
};
