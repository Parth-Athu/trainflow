import React, { useState } from 'react';
import { 
  Layers, 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Building2,
  GraduationCap,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle
} from 'lucide-react';

export const Login = ({ onLoginSuccess, onRegisterSuccess, onQuickLoginPreset }) => {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  
  // Sign In Form State
  const [email, setEmail] = useState('priya.sharma@trainflow.in');
  const [password, setPassword] = useState('password123');
  const [selectedRoleAccount, setSelectedRoleAccount] = useState('recruit');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regRole, setRegRole] = useState('Sales Executive');
  const [regLevel, setRegLevel] = useState('Junior');
  const [regBranch, setRegBranch] = useState('Ahmedabad');

  // Collapsible Demo Section
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid work email address.');
      return;
    }

    if (!password) {
      setAuthError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(email, password, selectedRoleAccount);
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({
        name: regName,
        email: regEmail,
        password: regPassword || 'password123',
        mobile: regMobile || '+91 98765 43210',
        role: regRole,
        level: regLevel,
        city: regBranch
      });
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      color: '#ffffff',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '45% 55%', gap: 40, alignItems: 'center' }}>
        
        {/* LEFT PANEL: BRAND & CONCISE VALUE PROPOSITION */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 46, height: 46, background: '#4f46e5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(79,70,229,0.5)' }}>
              <Layers size={28} color="#ffffff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>TrainFlow</h1>
              <div style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>
                ENTERPRISE MULTI-BRANCH ONBOARDING PLATFORM
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '2.3rem', fontWeight: 900, lineHeight: 1.2, color: '#ffffff', marginBottom: 16 }}>
            Automated Role-Based Onboarding Across 12 Regional Hubs
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 28 }}>
            TrainFlow automatically assigns personalized training paths based on role, level, and branch — while giving managers and HR complete visibility.
          </p>

          {/* 3 CONCISE VALUE CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 14, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>✓ Role-Based Learning</div>
                <div style={{ fontSize: '0.82rem', color: '#a5b4fc', marginTop: 2 }}>Role + Level automatically determines training curriculum.</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 14, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>✓ Controlled Assessments</div>
                <div style={{ fontSize: '0.82rem', color: '#a5b4fc', marginTop: 2 }}>Secure fullscreen assessments with integrity monitoring.</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: 14, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>✓ Multi-Branch Management</div>
                <div style={{ fontSize: '0.82rem', color: '#a5b4fc', marginTop: 2 }}>Supervise onboarding across all 12 regional hubs.</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: ENTERPRISE AUTHENTICATION CARD */}
        <div style={{ background: '#ffffff', color: '#0f172a', borderRadius: 24, padding: 36, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid #cbd5e1' }}>
          
          {/* TABS HEADER */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 12, marginBottom: 24 }}>
            <button
              onClick={() => { setActiveTab('signin'); setAuthError(null); }}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 9,
                fontSize: '0.9rem',
                fontWeight: 800,
                background: activeTab === 'signin' ? '#ffffff' : 'transparent',
                color: activeTab === 'signin' ? '#4f46e5' : '#64748b',
                boxShadow: activeTab === 'signin' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setAuthError(null); }}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 9,
                fontSize: '0.9rem',
                fontWeight: 800,
                background: activeTab === 'register' ? '#ffffff' : 'transparent',
                color: activeTab === 'register' ? '#4f46e5' : '#64748b',
                boxShadow: activeTab === 'register' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Recruit Self-Register
            </button>
          </div>

          {/* INLINE ERROR DISPLAY */}
          {authError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px 14px', borderRadius: 10, fontSize: '0.85rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} /> {authError}
            </div>
          )}

          {activeTab === 'signin' ? (
            <form onSubmit={handleSignInSubmit}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Welcome Back</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 20 }}>Sign in to your TrainFlow portal</p>

              {/* ACCOUNT TYPE SELECTOR */}
              <div className="form-group">
                <label className="form-label">Account Type</label>
                <select
                  className="form-select"
                  value={selectedRoleAccount}
                  onChange={e => setSelectedRoleAccount(e.target.value)}
                  style={{ fontWeight: 700, color: '#4f46e5' }}
                >
                  <option value="recruit">Recruit Portal</option>
                  <option value="manager">Branch Manager Portal</option>
                  <option value="trainer">Trainer Portal</option>
                  <option value="hr">HR Admin Portal</option>
                </select>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                  Your dashboard permissions are determined by your account role.
                </div>
              </div>

              {/* WORK EMAIL */}
              <div className="form-group">
                <label className="form-label">Work Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: 13, color: '#94a3b8' }} />
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ paddingLeft: 40 }}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD WITH SHOW/HIDE TOGGLE */}
              <div className="form-group" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                  <a href="#forgot" onClick={e => e.preventDefault()} style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: 13, color: '#94a3b8' }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingLeft: 40, paddingRight: 40 }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON WITH SPINNER */}
              <button
                className="btn-primary"
                type="submit"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center', padding: 12, fontSize: '0.95rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin-animated" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Account <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>Recruit Self-Registration</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 14 }}>
                Submitting sends an application to your assigned Branch Manager for role approval.
              </p>

              <div className="form-group" style={{ marginBottom: 10 }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rahul Patel"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 10 }}>
                <label className="form-label">Work Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="rahul.patel@trainflow.in"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Job Role</label>
                  <select className="form-select" value={regRole} onChange={e => setRegRole(e.target.value)}>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Operations Associate">Operations Associate</option>
                    <option value="Marketing Associate">Marketing Associate</option>
                    <option value="Delivery Lead">Delivery Lead</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Branch Manager">Branch Manager</option>
                    <option value="Area Head">Area Head</option>
                    <option value="Regional Manager">Regional Manager</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Seniority Level</label>
                  <select className="form-select" value={regLevel} onChange={e => setRegLevel(e.target.value)}>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Branch Hub</label>
                <select className="form-select" value={regBranch} onChange={e => setRegBranch(e.target.value)}>
                  <option value="Ahmedabad">Ahmedabad Hub</option>
                  <option value="Surat">Surat Hub</option>
                  <option value="Rajkot">Rajkot Hub</option>
                  <option value="Vadodara">Vadodara Hub</option>
                  <option value="Bhavnagar">Bhavnagar Hub</option>
                  <option value="Jamnagar">Jamnagar Hub</option>
                  <option value="Junagadh">Junagadh Hub</option>
                  <option value="Gandhinagar">Gandhinagar Hub</option>
                  <option value="Anand">Anand Hub</option>
                  <option value="Mehsana">Mehsana Hub</option>
                  <option value="Jaipur">Jaipur Hub</option>
                  <option value="Indore">Indore Hub</option>
                </select>
              </div>

              <button className="btn-primary" type="submit" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center', padding: 12, fontSize: '0.92rem' }}>
                {isSubmitting ? <Loader2 size={18} className="spin-animated" /> : 'Create Recruit Account'}
              </button>
            </form>
          )}

          {/* ⚡ COLLAPSIBLE DEMO ACCOUNTS SECTION */}
          <div style={{ marginTop: 24, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            <button
              type="button"
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                background: 'none',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#64748b',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              <span>⚡ Demo Accounts Shortcuts</span>
              {showDemoAccounts ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showDemoAccounts && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, animation: 'slideIn 0.2s ease-out' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => onQuickLoginPreset({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' })}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                >
                  👤 Approved Recruit
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => onQuickLoginPreset({ role: 'recruit', recruitId: 'R-11', name: 'Rahul Patel (R-11)' })}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'flex-start', color: '#b45309', borderColor: '#fde68a' }}
                >
                  ⏳ Pending Recruit
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => onQuickLoginPreset({ role: 'manager', name: 'Amit Shah (Branch Mgr)' })}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                >
                  🏢 Branch Manager
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => onQuickLoginPreset({ role: 'trainer', name: 'Regional Trainer' })}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                >
                  🎓 Field Trainer
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => onQuickLoginPreset({ role: 'hr', name: 'HQ HR Operations' })}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'center', gridColumn: 'span 2', background: '#312e81', borderColor: '#312e81' }}
                >
                  🌐 HR Admin (National Command)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
