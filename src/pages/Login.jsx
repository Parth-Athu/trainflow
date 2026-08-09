import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Users, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  BarChart3 
} from 'lucide-react';
import { TrainFlowLogo } from '../components/TrainFlowLogo';

export const Login = ({ onLoginSuccess, onRegisterSuccess, onQuickLoginPreset }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('recruit'); // 'recruit' | 'manager' | 'trainer' | 'hr'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('priya.sharma@trainflow.io');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regRequestedRole, setRegRequestedRole] = useState('Sales Executive');
  const [regRequestedLevel, setRegRequestedLevel] = useState('Junior');
  const [regBranch, setRegBranch] = useState('Ahmedabad');

  // Handle Account Type Pill Selection
  const handleSelectRolePill = (roleKey) => {
    setSelectedRole(roleKey);
    if (roleKey === 'recruit') {
      setLoginEmail('priya.sharma@trainflow.io');
    } else if (roleKey === 'manager') {
      setLoginEmail('manager.ahmedabad@trainflow.io');
    } else if (roleKey === 'trainer') {
      setLoginEmail('trainer@trainflow.io');
    } else if (roleKey === 'hr') {
      setLoginEmail('hr.admin@trainflow.io');
    }
  };

  // Submit Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(loginEmail, loginPassword, selectedRole);
    }, 500);
  };

  // Submit Registration Handler
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess({
        name: regFullName,
        email: regEmail,
        password: regPassword,
        mobile: regMobile,
        requestedRole: regRequestedRole,
        requestedLevel: regRequestedLevel,
        city: regBranch
      });
    }, 600);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '40px 20px',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* MAIN ACADEMIC LEARNING PORTAL CARD */}
      <div 
        style={{
          width: '100%',
          maxWidth: 1120,
          display: 'grid',
          gridTemplateColumns: '44% 56%',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
          position: 'relative'
        }}
      >
        {/* LEFT COLUMN: ROYAL NAVY ACADEMIC PROPOSITION PANEL */}
        <div 
          style={{
            background: 'linear-gradient(160deg, #1e3a8a 0%, #0f172a 100%)',
            color: '#ffffff',
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            position: 'relative'
          }}
        >
          <div>
            {/* BRAND LOGO */}
            <div style={{ marginBottom: 28 }}>
              <TrainFlowLogo size={42} showText={true} textVariant="light" subtitle="ENTERPRISE LEARNING PORTAL" />
            </div>

            {/* ACADEMIC EVENT BADGE */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '5px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800, color: '#fef08a', textTransform: 'uppercase', marginBottom: 18 }}>
              <GraduationCap size={16} /> ARENA 2026 — Techathon | IMS Ahmedabad
            </div>

            <h1 style={{ fontSize: '1.95rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 12 }}>
              Structured Role Onboarding & <span style={{ color: '#93c5fd' }}>Professional Certification</span>
            </h1>

            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 32 }}>
              TrainFlow centralizes employee training across 12 branch hubs in India. Delivering role-tailored 4-day learning paths, interactive checkpoints, and manager-verified diplomas.
            </p>

            {/* 3 ACADEMIC STUDY VALUE CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>Structured 4-Day Curriculum</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: 2 }}>Sequential day-by-day learning modules with prerequisite locks.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>Verified Diploma & Certificate</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: 2 }}>Official manager-signed certificates with unique ID validation.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', color: '#fef08a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BarChart3 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>Skill Competency & Analytics</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: 2 }}>Real-time readiness index tracking & assessment scoring.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Project Launchpad • 5-Member Team</span>
            <span>v4.0 Production</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CLEAN ACADEMIC SIGN IN FORM */}
        <div style={{ padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff' }}>
          {/* TAB MODE SWITCHER */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 24 }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: 'none',
                background: authMode === 'login' ? '#1e3a8a' : 'transparent',
                color: authMode === 'login' ? '#ffffff' : '#475569',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Sign In to Learning Portal
            </button>

            <button
              onClick={() => setAuthMode('register')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: 'none',
                background: authMode === 'register' ? '#1e3a8a' : 'transparent',
                color: authMode === 'register' ? '#ffffff' : '#475569',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              New Recruit Registration
            </button>
          </div>

          {authMode === 'login' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* ROLE SELECTION PILLS */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>
                  Select Account Role:
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('recruit')}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: `2px solid ${selectedRole === 'recruit' ? '#1e3a8a' : '#cbd5e1'}`,
                      background: selectedRole === 'recruit' ? '#eff6ff' : '#f8fafc',
                      color: selectedRole === 'recruit' ? '#1e3a8a' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <BookOpen size={18} color={selectedRole === 'recruit' ? '#1e3a8a' : '#64748b'} />
                    <span>Recruit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('manager')}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: `2px solid ${selectedRole === 'manager' ? '#1e3a8a' : '#cbd5e1'}`,
                      background: selectedRole === 'manager' ? '#eff6ff' : '#f8fafc',
                      color: selectedRole === 'manager' ? '#1e3a8a' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <UserCheck size={18} color={selectedRole === 'manager' ? '#059669' : '#64748b'} />
                    <span>Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('trainer')}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: `2px solid ${selectedRole === 'trainer' ? '#1e3a8a' : '#cbd5e1'}`,
                      background: selectedRole === 'trainer' ? '#eff6ff' : '#f8fafc',
                      color: selectedRole === 'trainer' ? '#1e3a8a' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <GraduationCap size={18} color={selectedRole === 'trainer' ? '#d97706' : '#64748b'} />
                    <span>Trainer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('hr')}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: `2px solid ${selectedRole === 'hr' ? '#1e3a8a' : '#cbd5e1'}`,
                      background: selectedRole === 'hr' ? '#eff6ff' : '#f8fafc',
                      color: selectedRole === 'hr' ? '#1e3a8a' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Building2 size={18} color={selectedRole === 'hr' ? '#7c3aed' : '#64748b'} />
                    <span>HR Admin</span>
                  </button>
                </div>
              </div>

              {/* WORK EMAIL INPUT */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: 6 }}>
                  Work Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 14, top: 13, color: '#64748b' }} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="e.g. priya.sharma@trainflow.io"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: 10,
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 14, top: 13, color: '#64748b' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 42px 12px 42px',
                      borderRadius: 10,
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 10,
                  border: 'none',
                  background: '#1e3a8a',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.3)',
                  marginTop: 4,
                  transition: 'background 0.15s ease'
                }}
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    Sign In to Learning Portal <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* 1-CLICK QUICK DEMO PRESETS GRID */}
              <div style={{ marginTop: 10, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 }}>
                  ⚡ 1-Click Quick Demo Presets:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { setSelectedRole('recruit'); setLoginEmail('priya.sharma@trainflow.io'); onQuickLoginPreset({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' }); }}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#0f172a' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#1e3a8a' }}>Priya Sharma</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Recruit • Ahmedabad</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('manager'); setLoginEmail('manager.ahmedabad@trainflow.io'); onQuickLoginPreset({ role: 'manager', name: 'Amit Shah (Branch Manager)' }); }}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#0f172a' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#059669' }}>Amit Shah</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Branch Manager Hub</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('trainer'); setLoginEmail('trainer@trainflow.io'); onQuickLoginPreset({ role: 'trainer', name: 'Regional Trainer' }); }}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#0f172a' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#d97706' }}>Regional Trainer</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Field Sign-offs</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('hr'); setLoginEmail('hr.admin@trainflow.io'); onQuickLoginPreset({ role: 'hr', name: 'HQ HR Operations' }); }}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#0f172a' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#7c3aed' }}>HQ HR Admin</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>12 Hub Command</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* RECRUIT REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Full Name</label>
                <input type="text" value={regFullName} onChange={e => setRegFullName(e.target.value)} placeholder="e.g. Vikram Patel" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Work Email</label>
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="vikram@trainflow.io" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Mobile</label>
                  <input type="tel" value={regMobile} onChange={e => setRegMobile(e.target.value)} placeholder="+91 9876543210" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Requested Role</label>
                  <select value={regRequestedRole} onChange={e => setRegRequestedRole(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }}>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Operations Associate">Operations Associate</option>
                    <option value="Marketing Associate">Marketing Associate</option>
                    <option value="Delivery Lead">Delivery Lead</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Branch Hub</label>
                  <select value={regBranch} onChange={e => setRegBranch(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }}>
                    <option value="Ahmedabad">Ahmedabad Hub</option>
                    <option value="Surat">Surat Hub</option>
                    <option value="Rajkot">Rajkot Hub</option>
                    <option value="Vadodara">Vadodara Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: 4 }}>Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }} />
              </div>

              <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#059669', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', marginTop: 4 }}>
                Submit Application for Manager Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
