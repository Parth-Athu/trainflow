import React from 'react';
import { 
  BookOpen, 
  Award, 
  Users, 
  Sliders, 
  CheckCircle, 
  Layers, 
  BarChart3, 
  LogOut,
  Sparkles,
  ShieldAlert,
  FileText,
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Building2,
  History,
  Trophy,
  Activity,
  UserCheck,
  Target
} from 'lucide-react';
import { TrainFlowLogo } from './TrainFlowLogo';

export const Sidebar = ({ 
  activeUser, 
  currentTab, 
  setCurrentTab, 
  recruit,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  onCloseMobile
}) => {
  const isRecruit = activeUser.role === 'recruit';
  const isManager = activeUser.role === 'manager';
  const isTrainer = activeUser.role === 'trainer';
  const isHR = activeUser.role === 'hr';

  const handleNavClick = (tabKey) => {
    setCurrentTab(tabKey);
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* MOBILE DRAWER OVERLAY */}
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* COLLAPSE DESKTOP TOGGLE BUTTON */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* SIDEBAR HEADER WITH BRAND LOGO */}
        <div className="sidebar-header" style={{ padding: '20px 22px' }}>
          <TrainFlowLogo size={32} showText={!isCollapsed} textVariant="light" subtitle="ENTERPRISE ONBOARDING" />
        </div>

        {/* ROLE-SPECIFIC NAVIGATION */}
        <div className="sidebar-nav-container">
          {/* RECRUIT PORTAL */}
          {isRecruit && (
            <>
              <div className="nav-section-label">RECRUIT PORTAL</div>
              
              <button
                className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
                title="My Learning Path"
              >
                <BookOpen size={18} />
                <span className="nav-text">My Learning Path</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'quiz' ? 'active' : ''}`}
                onClick={() => handleNavClick('quiz')}
                title="Situational Quiz"
              >
                <Target size={18} color="#ec4899" />
                <span className="nav-text">Situational Quiz 🎯</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleNavClick('profile')}
                title="My Profile"
              >
                <User size={18} />
                <span className="nav-text">My Profile</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'achievements' ? 'active' : ''}`}
                onClick={() => handleNavClick('achievements')}
                title="Achievements"
              >
                <Trophy size={18} />
                <span className="nav-text">Achievements</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'certificate' ? 'active' : ''}`}
                onClick={() => handleNavClick('certificate')}
                title="Certificate"
              >
                <Award size={18} />
                <span className="nav-text">Certificate {recruit?.isCertified ? '✓' : ''}</span>
              </button>
            </>
          )}

          {/* BRANCH MANAGER OPERATIONS */}
          {isManager && (
            <>
              <div className="nav-section-label">BRANCH OPERATIONS</div>

              <button
                className={`nav-item ${currentTab === 'dashboard' || currentTab === 'team' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
                title="My Team Progress"
              >
                <Users size={18} />
                <span className="nav-text">My Team Progress</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'approvals' ? 'active' : ''}`}
                onClick={() => handleNavClick('approvals')}
                title="Pending Approvals"
              >
                <UserCheck size={18} />
                <span className="nav-text">Pending Approvals</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'certifications' ? 'active' : ''}`}
                onClick={() => handleNavClick('certifications')}
                title="Certification Center"
              >
                <Award size={18} />
                <span className="nav-text">Certification Center</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleNavClick('analytics')}
                title="Branch Analytics"
              >
                <BarChart3 size={18} />
                <span className="nav-text">Branch Analytics</span>
              </button>
            </>
          )}

          {/* TRAINER OPERATIONS */}
          {isTrainer && (
            <>
              <div className="nav-section-label">TRAINER OPERATIONS</div>

              <button
                className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
                title="Assigned Recruits"
              >
                <GraduationCap size={18} />
                <span className="nav-text">Assigned Recruits</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'reviews' || currentTab === 'approvals' ? 'active' : ''}`}
                onClick={() => handleNavClick('reviews')}
                title="Practical Grading & Sign-offs"
              >
                <CheckCircle size={18} />
                <span className="nav-text">Practical Grading & Sign-offs</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleNavClick('analytics')}
                title="Training Progress"
              >
                <Activity size={18} />
                <span className="nav-text">Training Progress</span>
              </button>
            </>
          )}

          {/* HR ADMIN NATIONAL COMMAND */}
          {isHR && (
            <>
              <div className="nav-section-label">NATIONAL COMMAND</div>

              <button
                className={`nav-item ${currentTab === 'dashboard' || currentTab === 'command' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
                title="HR Overview"
              >
                <BarChart3 size={18} />
                <span className="nav-text">HR Overview</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'rules' ? 'active' : ''}`}
                onClick={() => handleNavClick('rules')}
                title="Role Configuration"
              >
                <Sliders size={18} />
                <span className="nav-text">Role Configuration</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'catalog' ? 'active' : ''}`}
                onClick={() => handleNavClick('catalog')}
                title="Module Catalog"
              >
                <FileText size={18} />
                <span className="nav-text">Module Catalog</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'branches' ? 'active' : ''}`}
                onClick={() => handleNavClick('branches')}
                title="Branch Management"
              >
                <Building2 size={18} />
                <span className="nav-text">Branch Management</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'audit' ? 'active' : ''}`}
                onClick={() => handleNavClick('audit')}
                title="Audit Logs"
              >
                <History size={18} />
                <span className="nav-text">Audit Logs</span>
              </button>

              <button
                className={`nav-item ${currentTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleNavClick('analytics')}
                title="Analytics"
              >
                <Activity size={18} />
                <span className="nav-text">Analytics</span>
              </button>
            </>
          )}
        </div>

        {/* PINNED SIDEBAR FOOTER PROFILE */}
        <div className="sidebar-footer" onClick={() => isRecruit && handleNavClick('profile')} style={{ cursor: isRecruit ? 'pointer' : 'default' }}>
          <img
            src={
              recruit?.avatar ||
              (isHR
                ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                : isTrainer
                ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80")
            }
            alt="Avatar"
            className="user-avatar-img"
          />
          {!isCollapsed && (
            <div className="user-info-meta">
              <div className="user-name-text">
                {isRecruit ? recruit?.name : isManager ? 'Amit Shah' : isTrainer ? 'Field Trainer' : 'HQ HR Operations'}
              </div>
              <div className="user-role-badge">
                {isRecruit ? `${recruit?.role} (${recruit?.level})` : isManager ? 'Branch Manager' : isTrainer ? 'Regional Trainer' : 'HR Admin'}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
