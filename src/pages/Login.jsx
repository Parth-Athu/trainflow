import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Lock,
  Mail,
  Zap,
  Globe,
  Award,
  UserCheck,
  GraduationCap
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
        background: '#090d16',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* PURE CSS AMBIENT BACKGROUND GRADIENT BLOBS */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(124,58,237,0.15) 55%, rgba(0,0,0,0) 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(79,70,229,0.15) 60%, rgba(0,0,0,0) 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* MAIN TWO-COLUMN ENTERPRISE SAAS CARD */}
      <div 
        style={{
          width: '100%',
          maxWidth: 1140,
          display: 'grid',
          gridTemplateColumns: '44% 56%',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* LEFT COLUMN: BRANDING & HACKATHON VALUE PROPOSITION */}
        <div 
          style={{
            background: 'linear-gradient(160deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div>
            {/* BRAND LOGO HEADER */}
            <div style={{ marginBottom: 28 }}>
              <TrainFlowLogo size={44} showText={true} textVariant="light" subtitle="ENTERPRISE ONBOARDING & CERTIFICATION" />
            </div>

            {/* HACKATHON EVENT BADGE */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(90deg, rgba(79, 70, 229, 0.3) 0%, rgba(16, 185, 129, 0.3) 100%)', border: '1px solid rgba(165, 180, 252, 0.3)', padding: '5px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800, color: '#fef08a', textTransform: 'uppercase', marginBottom: 16 }}>
              <Sparkles size={14} /> ARENA 2026 — Techathon | IMS Ahmedabad
            </div>

            <h1 style={{ fontSize: '1.95rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.25, marginBottom: 12 }}>
              Automated Role-Based Onboarding Across <span style={{ background: 'linear-gradient(90deg, #818cf8 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>12 Indian Branch Hubs</span>
            </h1>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 28 }}>
              Replaces manual training with a centralized 4-day digital workflow. Powered by an enterprise Rule Engine, anti-cheating assessment center, and manager certification desks.
            </p>

            {/* 3 VALUE CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 14, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>Role + Level Rule Engine</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Auto-assigns specialist sub-modules for each position.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 14, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>Controlled Assessment Center</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Timer tracking, tab exit warning monitor, and question shuffle.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 14, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#7c3aed', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>Branch Manager Certification</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Verified 100% eligibility check before issuing stable Certificate IDs.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 24, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Project Launchpad • 5-Member Team</span>
            <span>v4.0 Production</span>
          </div>
        </div>

        {/* RIGHT COLUMN: AUTHENTICATION FORM & DEMO PRESETS */}
        <div style={{ padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* TAB MODE SWITCHER */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: 'none',
                background: authMode === 'login' ? '#4f46e5' : 'transparent',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => setAuthMode('register')}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                border: 'none',
                background: authMode === 'register' ? '#4f46e5' : 'transparent',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Recruit Registration
            </button>
          </div>

          {authMode === 'login' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* ROLE SELECTION PILLS */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>
                  Select Account Role:
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('recruit')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: `1px solid ${selectedRole === 'recruit' ? '#4f46e5' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedRole === 'recruit' ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255,255,255,0.03)',
                      color: selectedRole === 'recruit' ? '#ffffff' : '#94a3b8',
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
                    <Users size={16} color={selectedRole === 'recruit' ? '#818cf8' : '#94a3b8'} />
                    <span>Recruit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('manager')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: `1px solid ${selectedRole === 'manager' ? '#4f46e5' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedRole === 'manager' ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255,255,255,0.03)',
                      color: selectedRole === 'manager' ? '#ffffff' : '#94a3b8',
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
                    <UserCheck size={16} color={selectedRole === 'manager' ? '#34d399' : '#94a3b8'} />
                    <span>Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('trainer')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: `1px solid ${selectedRole === 'trainer' ? '#4f46e5' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedRole === 'trainer' ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255,255,255,0.03)',
                      color: selectedRole === 'trainer' ? '#ffffff' : '#94a3b8',
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
                    <GraduationCap size={16} color={selectedRole === 'trainer' ? '#fbbf24' : '#94a3b8'} />
                    <span>Trainer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRolePill('hr')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: `1px solid ${selectedRole === 'hr' ? '#4f46e5' : 'rgba(255,255,255,0.12)'}`,
                      background: selectedRole === 'hr' ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255,255,255,0.03)',
                      color: selectedRole === 'hr' ? '#ffffff' : '#94a3b8',
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
                    <Building2 size={16} color={selectedRole === 'hr' ? '#f472b6' : '#94a3b8'} />
                    <span>HR Admin</span>
                  </button>
                </div>
              </div>

              {/* WORK EMAIL INPUT WITH LEFT ICON */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 6 }}>
                  Work Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 14, top: 13, color: '#94a3b8' }} />
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
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* PASSWORD INPUT WITH SHOW/HIDE EYE */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 14, top: 13, color: '#94a3b8' }} />
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
                      background: 'rgba(30, 41, 59, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
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
                      color: '#94a3b8',
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
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: 8,
                  boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
                  marginTop: 4,
                  transition: 'transform 0.15s ease'
                }}
              >
                {isLoading ? (
                  <span>Signing in to TrainFlow...</span>
                ) : (
                  <>
                    Sign In to TrainFlow Portal <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* 1-CLICK QUICK DEMO PRESETS GRID */}
              <div style={{ marginTop: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 }}>
                  ⚡ 1-Click Quick Demo Presets:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { setSelectedRole('recruit'); setLoginEmail('priya.sharma@trainflow.io'); onQuickLoginPreset({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' }); }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#ffffff' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#818cf8' }}>Priya Sharma</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Recruit • Ahmedabad</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('manager'); setLoginEmail('manager.ahmedabad@trainflow.io'); onQuickLoginPreset({ role: 'manager', name: 'Amit Shah (Branch Manager)' }); }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#ffffff' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#34d399' }}>Amit Shah</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Branch Manager Hub</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('trainer'); setLoginEmail('trainer@trainflow.io'); onQuickLoginPreset({ role: 'trainer', name: 'Regional Trainer' }); }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#ffffff' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24' }}>Regional Trainer</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Field Sign-offs</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('hr'); setLoginEmail('hr.admin@trainflow.io'); onQuickLoginPreset({ role: 'hr', name: 'HQ HR Operations' }); }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8, textAlign: 'left', cursor: 'pointer', color: '#ffffff' }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#f472b6' }}>HQ HR Admin</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>12 Hub Command</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* RECRUIT REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Full Name</label>
                <input type="text" value={regFullName} onChange={e => setRegFullName(e.target.value)} placeholder="e.g. Vikram Patel" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Work Email</label>
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="vikram@trainflow.io" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Mobile</label>
                  <input type="tel" value={regMobile} onChange={e => setRegMobile(e.target.value)} placeholder="+91 9876543210" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Requested Role</label>
                  <select value={regRequestedRole} onChange={e => setRegRequestedRole(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }}>
                    <option value="Sales Executive" style={{ background: '#0f172a' }}>Sales Executive</option>
                    <option value="Operations Associate" style={{ background: '#0f172a' }}>Operations Associate</option>
                    <option value="Marketing Associate" style={{ background: '#0f172a' }}>Marketing Associate</option>
                    <option value="Delivery Lead" style={{ background: '#0f172a' }}>Delivery Lead</option>
                    <option value="Customer Support" style={{ background: '#0f172a' }}>Customer Support</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Branch Hub</label>
                  <select value={regBranch} onChange={e => setRegBranch(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }}>
                    <option value="Ahmedabad" style={{ background: '#0f172a' }}>Ahmedabad Hub</option>
                    <option value="Surat" style={{ background: '#0f172a' }}>Surat Hub</option>
                    <option value="Rajkot" style={{ background: '#0f172a' }}>Rajkot Hub</option>
                    <option value="Vadodara" style={{ background: '#0f172a' }}>Vadodara Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
              </div>

              <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', marginTop: 4 }}>
                Submit Application for Manager Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
