import React from 'react';
import { UserCheck, Shield, User, RotateCcw, Sparkles, Clock, LogOut } from 'lucide-react';

export const DemoHeader = ({ activeUser, onSwitchUser, onResetData, onLogout }) => {
  return (
    <div className="demo-header-banner">
      <div className="demo-banner-left">
        <span className="demo-pill">DEMO SWITCHER</span>
        <span className="demo-banner-title">
          <Sparkles size={16} inline="true" style={{ verticalAlign: 'middle', marginRight: 4 }} />
          TrainFlow Switcher: Test Self-Registration, HR Approval & 4-Day Path
        </span>
      </div>

      <div className="demo-switcher-group">
        <button
          className={`demo-switch-btn ${activeUser.role === 'recruit' && activeUser.recruitId === 'R-01' ? 'active' : ''}`}
          onClick={() => onSwitchUser({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' })}
          title="Approved Ahmedabad Sales Executive"
        >
          <User size={14} />
          R-01 (Approved)
        </button>

        <button
          className={`demo-switch-btn ${activeUser.role === 'recruit' && activeUser.recruitId === 'R-11' ? 'active' : ''}`}
          onClick={() => onSwitchUser({ role: 'recruit', recruitId: 'R-11', name: 'Aniket Varma (R-11)' })}
          title="Pending HR Approval Recruit"
          style={{ borderColor: '#fde68a', color: activeUser.recruitId === 'R-11' ? '#ffffff' : '#fef08a' }}
        >
          <Clock size={14} />
          R-11 (Pending HR)
        </button>

        <button
          className={`demo-switch-btn ${activeUser.role === 'manager' ? 'active' : ''}`}
          onClick={() => onSwitchUser({ role: 'manager', recruitId: null, name: 'Branch Manager (Ahmedabad)' })}
          title="Branch Officer View"
        >
          <UserCheck size={14} />
          Branch Officer
        </button>

        <button
          className={`demo-switch-btn ${activeUser.role === 'hr' ? 'active' : ''}`}
          onClick={() => onSwitchUser({ role: 'hr', recruitId: null, name: 'HR Admin (Ananya Roy)' })}
          title="HR Approval Officer"
        >
          <Shield size={14} />
          HR Admin
        </button>

        <button
          className="demo-switch-btn reset-btn"
          onClick={onResetData}
          title="Reset demo dataset to initial state"
        >
          <RotateCcw size={14} />
          Reset State
        </button>

        <button
          className="demo-switch-btn"
          onClick={onLogout}
          title="Log out to Auth Screen"
          style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
