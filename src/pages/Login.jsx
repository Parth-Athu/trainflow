import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
  Globe,
  Award
} from 'lucide-react';
import gsap from 'gsap';
import { TrainFlowLogo } from '../components/TrainFlowLogo';

export const Login = ({ onLoginSuccess, onRegisterSuccess, onQuickLoginPreset }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('recruit'); // 'recruit' | 'manager' | 'trainer' | 'hr'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

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

  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  // GSAP BACKGROUND & STAGGER ENTRANCE ANIMATIONS
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient floating blobs background motion
      gsap.to(blob1Ref.current, {
        y: 45,
        x: -30,
        rotation: 15,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(blob2Ref.current, {
        y: -50,
        x: 40,
        rotation: -20,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(blob3Ref.current, {
        scale: 1.25,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Stagger entrance animation for content cards
      gsap.from('.gsap-animate-card', {
        opacity: 0,
        y: 35,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Header logo pulse
      gsap.from('.gsap-logo', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [authMode]);

  // Handle Account Type dropdown change
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);

    if (newRole === 'recruit') {
      setLoginEmail('priya.sharma@trainflow.io');
    } else if (newRole === 'manager') {
      setLoginEmail('manager.ahmedabad@trainflow.io');
    } else if (newRole === 'trainer') {
      setLoginEmail('trainer@trainflow.io');
    } else if (newRole === 'hr') {
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
    }, 600);
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
    }, 700);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#090d16',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '30px 20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* GSAP FLOATING AMBIENT BACKGROUND BLOBS */}
      <div 
        ref={blob1Ref}
        className="gsap-blob-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(124,58,237,0.15) 60%, rgba(0,0,0,0) 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        ref={blob2Ref}
        className="gsap-blob-2"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(79,70,229,0.15) 60%, rgba(0,0,0,0) 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        ref={blob3Ref}
        className="gsap-blob-3"
        style={{
          position: 'absolute',
          top: '35%',
          left: '45%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* TWO-COLUMN ENTERPRISE SAAS LOGIN CONTAINER */}
      <div 
        style={{
          width: '100%',
          maxWidth: 1120,
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* LEFT COLUMN: BRAND PROPOSITION & VALUE CARDS */}
        <div 
          style={{
            background: 'linear-gradient(160deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div>
            {/* BRAND LOGO HEADER */}
            <div className="gsap-logo" style={{ marginBottom: 32 }}>
              <TrainFlowLogo size={42} showText={true} textVariant="light" subtitle="ENTERPRISE ONBOARDING & CERTIFICATION" />
            </div>

            <h1 className="gsap-animate-card" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 12 }}>
              Automated Role-Based Onboarding Across <span style={{ background: 'linear-gradient(90deg, #818cf8 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>12 Indian Branch Hubs</span>
            </h1>

            <p className="gsap-animate-card" style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 32 }}>
              Transform manual orientation into a high-impact 4-day digital training path. Powered by an enterprise Rule Engine, anti-cheating assessments, and manager certification desks.
            </p>

            {/* 3 VALUE CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="gsap-animate-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>Role-Based Rule Engine</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>Auto-assigns specialist sub-modules based on position & level.</div>
                </div>
              </div>

              <div className="gsap-animate-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>Controlled Assessment Center</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>Attention monitoring, timer tracking, and Fisher-Yates question shuffle.</div>
                </div>
              </div>

              <div className="gsap-animate-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: 16, borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#7c3aed', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>Branch Manager Certification</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>Verified 100% eligibility check before issuing stable Certificate IDs.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
            <span>ARENA 2026 — Techathon | IMS Ahmedabad</span>
            <span>v4.0 Production</span>
          </div>
        </div>

        {/* RIGHT COLUMN: AUTHENTICATION PANEL */}
        <div style={{ padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* TAB MODE SWITCHER */}
          <div className="gsap-animate-card" style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 28 }}>
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
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* ACCOUNT TYPE SELECTOR */}
              <div className="gsap-animate-card">
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: 6 }}>
                  Account Type
                </label>
                <select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="recruit" style={{ background: '#0f172a' }}>Recruit (Employee Onboarding)</option>
                  <option value="manager" style={{ background: '#0f172a' }}>Branch Manager (Ahmedabad Hub)</option>
                  <option value="trainer" style={{ background: '#0f172a' }}>Regional Trainer (Field Sign-offs)</option>
                  <option value="hr" style={{ background: '#0f172a' }}>HQ HR Admin (National Command)</option>
                </select>
              </div>

              {/* WORK EMAIL */}
              <div className="gsap-animate-card">
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 6 }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="e.g. priya.sharma@trainflow.io"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* PASSWORD WITH SHOW/HIDE EYE */}
              <div className="gsap-animate-card">
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 42px 12px 14px',
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

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="gsap-animate-card"
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
                  marginTop: 6,
                  transition: 'transform 0.15s ease'
                }}
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    Sign In to TrainFlow <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* DEMO ACCOUNTS ACCORDION TOGGLE */}
              <div className="gsap-animate-card" style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a5b4fc',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    margin: '0 auto'
                  }}
                >
                  <Sparkles size={14} /> Quick Demo Account Shortcuts {showDemoAccounts ? '▲' : '▼'}
                </button>

                {showDemoAccounts && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                      type="button"
                      onClick={() => { setSelectedRole('recruit'); setLoginEmail('priya.sharma@trainflow.io'); onQuickLoginPreset({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' }); }}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: 8, borderRadius: 6, fontSize: '0.8rem', textAlign: 'left', cursor: 'pointer' }}
                    >
                      👤 Recruit: <strong>Priya Sharma (Sales Executive)</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedRole('manager'); setLoginEmail('manager.ahmedabad@trainflow.io'); onQuickLoginPreset({ role: 'manager', name: 'Amit Shah (Branch Manager)' }); }}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: 8, borderRadius: 6, fontSize: '0.8rem', textAlign: 'left', cursor: 'pointer' }}
                    >
                      👔 Manager: <strong>Amit Shah (Ahmedabad Hub)</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedRole('hr'); setLoginEmail('hr.admin@trainflow.io'); onQuickLoginPreset({ role: 'hr', name: 'HQ HR Operations' }); }}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: 8, borderRadius: 6, fontSize: '0.8rem', textAlign: 'left', cursor: 'pointer' }}
                    >
                      🏢 HR Admin: <strong>HQ HR Operations</strong>
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            /* RECRUIT REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="gsap-animate-card">
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Full Name</label>
                <input type="text" value={regFullName} onChange={e => setRegFullName(e.target.value)} placeholder="e.g. Vikram Patel" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="gsap-animate-card">
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Work Email</label>
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="vikram@trainflow.io" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Mobile</label>
                  <input type="tel" value={regMobile} onChange={e => setRegMobile(e.target.value)} placeholder="+91 9876543210" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="gsap-animate-card">
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
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Level & Branch</label>
                  <select value={regBranch} onChange={e => setRegBranch(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }}>
                    <option value="Ahmedabad" style={{ background: '#0f172a' }}>Ahmedabad Hub</option>
                    <option value="Surat" style={{ background: '#0f172a' }}>Surat Hub</option>
                    <option value="Rajkot" style={{ background: '#0f172a' }}>Rajkot Hub</option>
                    <option value="Vadodara" style={{ background: '#0f172a' }}>Vadodara Hub</option>
                  </select>
                </div>
              </div>

              <div className="gsap-animate-card">
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: 4 }}>Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.88rem' }} />
              </div>

              <button type="submit" disabled={isLoading} className="gsap-animate-card" style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', marginTop: 6 }}>
                Submit Application for Manager Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
