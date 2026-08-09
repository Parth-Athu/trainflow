import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Building2, 
  Calendar, 
  Copy,
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';
import { TrainFlowLogo } from './TrainFlowLogo';

export const CertificateView = ({ recruit, onBackToDashboard }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [verifySearchId, setVerifySearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  if (!recruit) return null;

  const isCertified = recruit.isCertified || recruit.certificationStatus === 'CERTIFIED';
  const certId = recruit.certificateId || 'TF-2026-X8901';
  const certifiedDate = recruit.certifiedAt || '2026-08-09';
  const city = recruit.city || 'Ahmedabad';

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Handle Copy Verification Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://trainflow.io/verify/${certId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle Certificate Lookup Verification Search
  const handleVerifySearch = (e) => {
    e.preventDefault();
    if (verifySearchId.trim().toUpperCase() === certId.toUpperCase()) {
      setVerificationResult({
        valid: true,
        candidateName: recruit.name,
        role: recruit.role,
        level: recruit.level,
        branch: city,
        certId: certId,
        date: certifiedDate,
        issuer: 'Amit Shah (Branch Manager)'
      });
    } else {
      setVerificationResult({
        valid: false,
        message: 'No active certificate record found matching this ID.'
      });
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: 60 }}>
      {/* 1. DEDICATED CERTIFICATE PAGE TOOLBAR & STATUS HEADER */}
      <div 
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>Official Enterprise Diploma Certificate</span>
              <span className="status-badge status-completed" style={{ fontSize: '0.68rem' }}>
                <CheckCircle2 size={11} /> CERTIFIED & VERIFIED
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
              Certificate ID: <strong style={{ color: '#0f172a' }}>{certId}</strong> • Issued for: <strong>{recruit.name}</strong> ({city} Hub)
            </div>
          </div>
        </div>

        {/* TOOLBAR ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-secondary" onClick={handleCopyLink} style={{ fontSize: '0.78rem' }}>
            <Copy size={13} /> {copiedLink ? 'Link Copied! ✓' : 'Copy Verification Link'}
          </button>
          <button className="btn-primary" onClick={handlePrint} style={{ fontSize: '0.78rem' }}>
            <Printer size={13} /> Print Diploma
          </button>
        </div>
      </div>

      {/* 2. HIGH-END GOLD FOIL ENTERPRISE DIPLOMA CERTIFICATE */}
      <div 
        className="printable-certificate-card"
        style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: 40,
          border: '12px solid #0f172a',
          outline: '3px solid #d97706',
          outlineOffset: '-7px',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          maxWidth: 960,
          margin: '0 auto 32px auto',
          color: '#0f172a',
          fontFamily: "'Inter', Georgia, serif"
        }}
      >
        {/* CORNER DECORATIVE GOLD ORNAMENTS */}
        <div style={{ position: 'absolute', top: 14, left: 14, width: 24, height: 24, borderTop: '3px solid #d97706', borderLeft: '3px solid #d97706' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, borderTop: '3px solid #d97706', borderRight: '3px solid #d97706' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 14, width: 24, height: 24, borderBottom: '3px solid #d97706', borderLeft: '3px solid #d97706' }} />
        <div style={{ position: 'absolute', bottom: 14, right: 14, width: 24, height: 24, borderBottom: '3px solid #d97706', borderRight: '3px solid #d97706' }} />

        {/* BRAND HEADER & LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'inline-block', marginBottom: 8 }}>
            <TrainFlowLogo size={42} showText={true} textVariant="dark" subtitle="ENTERPRISE ONBOARDING & CERTIFICATION" />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: 2 }}>
            ARENA 2026 — Techathon | IMS Ahmedabad • National Standard
          </div>
        </div>

        {/* DIPLOMA TITLE */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 6px 0', fontFamily: 'Georgia, serif' }}>
            Certificate of Completion
          </h1>
          <div style={{ width: 120, height: 3, background: 'linear-gradient(90deg, #d97706 0%, #059669 100%)', margin: '0 auto' }} />
        </div>

        {/* CANDIDATE CONFERRAL BODY */}
        <div style={{ textAlign: 'center', marginBottom: 32, lineHeight: 1.8 }}>
          <p style={{ fontSize: '0.92rem', color: '#475569', fontStyle: 'italic', margin: 0 }}>
            This official enterprise diploma certifies that
          </p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e3a8a', margin: '8px 0', fontFamily: 'Georgia, serif', textDecoration: 'underline', textDecorationColor: '#d97706' }}>
            {recruit.name}
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#334155', maxWidth: 640, margin: '0 auto' }}>
            has successfully fulfilled all 4-day sequential onboarding requirements, situational quizzes, and practical operational sign-offs as assigned for the position of
          </p>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginTop: 8 }}>
            {recruit.role} • {recruit.level} Specialist ({city} Hub)
          </div>
        </div>

        {/* DUAL OFFICIAL SIGNATURES & METALLIC FOIL STAMP */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36, paddingTop: 20, borderTop: '1px solid #cbd5e1' }}>
          {/* SIGNATURE 1: BRANCH MANAGER */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, cursive, serif', fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', fontStyle: 'italic', marginBottom: 2 }}>
              Amit Shah
            </div>
            <div style={{ width: 140, height: 1, background: '#0f172a', margin: '0 auto 4px auto' }} />
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a' }}>Amit Shah</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Branch Manager ({city} Hub)</div>
          </div>

          {/* EMBOSSED GOLD FOIL STAMP SEAL */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fef08a 0%, #d97706 100%)',
              border: '3px solid #b45309',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 6px 16px rgba(217, 119, 6, 0.3)',
              margin: '0 auto 6px auto',
              color: '#78350f'
            }}>
              <ShieldCheck size={26} color="#78350f" />
              <span style={{ fontSize: '0.58rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>OFFICIAL SEAL</span>
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#78350f' }}>VERIFIED DIPLOMA</div>
          </div>

          {/* SIGNATURE 2: HQ HR OPERATIONS */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, cursive, serif', fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', fontStyle: 'italic', marginBottom: 2 }}>
              Nehal Sharma
            </div>
            <div style={{ width: 140, height: 1, background: '#0f172a', margin: '0 auto 4px auto' }} />
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a' }}>Nehal Sharma</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>HQ HR Operations Director</div>
          </div>
        </div>

        {/* FOOTER VERIFICATION METADATA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: 24, paddingTop: 10, borderTop: '1px stroke #f1f5f9' }}>
          <span>Certificate ID: <strong>{certId}</strong></span>
          <span>Issue Date: <strong>{certifiedDate}</strong></span>
          <span>Verification URL: <strong>trainflow.io/verify/{certId}</strong></span>
        </div>
      </div>

      {/* 3. PUBLIC CERTIFICATE VERIFICATION LOOKUP CARD */}
      <div 
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          padding: 20,
          maxWidth: 960,
          margin: '0 auto'
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ShieldCheck size={18} color="#059669" /> Public Certificate Verification Lookup
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 14 }}>
          Third-party employers & HR managers can verify diploma authenticity by typing the Certificate ID below:
        </div>

        <form onSubmit={handleVerifySearch} style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#64748b' }} />
            <input
              type="text"
              value={verifySearchId}
              onChange={e => setVerifySearchId(e.target.value)}
              placeholder="e.g. TF-2026-X8901"
              required
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
            Verify Certificate ID
          </button>
        </form>

        {/* VERIFICATION RESULT DISPLAY */}
        {verificationResult && (
          <div style={{ marginTop: 14, padding: 14, borderRadius: 10, background: verificationResult.valid ? '#ecfdf5' : '#fef2f2', border: `1px solid ${verificationResult.valid ? '#a7f3d0' : '#fca5a5'}` }}>
            {verificationResult.valid ? (
              <div style={{ color: '#047857', fontSize: '0.82rem' }}>
                <div style={{ fontWeight: 800, marginBottom: 2 }}>✓ AUTHENTIC CERTIFICATE RECORD FOUND</div>
                <div>Issued to: <strong>{verificationResult.candidateName}</strong> ({verificationResult.role} • {verificationResult.branch} Hub) on <strong>{verificationResult.date}</strong> by <strong>{verificationResult.issuer}</strong>.</div>
              </div>
            ) : (
              <div style={{ color: '#b91c1c', fontSize: '0.82rem', fontWeight: 700 }}>
                ❌ {verificationResult.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
