import React from 'react';
import { Award, Lock, CheckCircle2, Printer, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateView = ({ recruit }) => {
  const isEligible = recruit?.isCertified || recruit?.completedModuleIds?.length >= 10;
  const certId = recruit?.certificateId || `TF-2026-${recruit?.id || 'R-01'}-9841`;
  const completionDate = recruit?.certifiedAt ? new Date(recruit.certifiedAt).toLocaleDateString() : new Date().toLocaleDateString();

  const handleTriggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  React.useEffect(() => {
    if (isEligible) {
      handleTriggerConfetti();
    }
  }, [isEligible]);

  if (!isEligible) {
    return (
      <div style={{ background: '#ffffff', borderRadius: 12, padding: 40, textAlign: 'center', border: '1px solid #e2e8f0', maxWidth: 600, margin: '40px auto' }}>
        <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#94a3b8' }}>
          <Lock size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Certificate Locked</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
          Complete all assigned modules in Day 1, Day 2, Day 3, Day 4, and pass the Final Assessment exam to unlock your official TrainFlow digital certificate.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 850, margin: '0 auto' }}>
      {/* CLOSED ACCESS BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        color: '#ffffff',
        padding: '16px 24px',
        borderRadius: 12,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(6, 95, 70, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>PROGRAM SUCCESSFULLY COMPLETED</div>
            <div style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>
              TRAINING ACCESS CLOSED ✓ — Your onboarding requirements have been verified.
            </div>
          </div>
        </div>
        <button className="btn-secondary" onClick={() => window.print()} style={{ background: '#ffffff', color: '#065f46', borderColor: '#ffffff' }}>
          <Printer size={16} /> Print / Save PDF
        </button>
      </div>

      {/* FORMAL CERTIFICATE FRAME */}
      <div className="certificate-frame">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <Award size={36} color="#4f46e5" />
          <div className="certificate-header-logo">TRAINFLOW</div>
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
          Official Certificate of Completion
        </div>

        <div style={{ fontSize: '1rem', color: '#475569', fontStyle: 'italic' }}>
          This is to certify that
        </div>

        <div className="certificate-recipient">
          {recruit.name}
        </div>

        <div style={{ fontSize: '1rem', color: '#334155', maxWidth: 550, margin: '0 auto 24px auto', lineHeight: 1.6 }}>
          has successfully completed the intensive <strong>4-Day Role-Based Employee Onboarding & Training Program</strong> for the position of:
        </div>

        <div style={{
          display: 'inline-block',
          background: '#eef2ff',
          border: '1px solid #c7d2fe',
          color: '#4338ca',
          fontWeight: 800,
          fontSize: '1.1rem',
          padding: '8px 24px',
          borderRadius: 30,
          marginBottom: 32
        }}>
          {recruit.role} ({recruit.level}) • {recruit.city} Branch
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, borderTop: '1px solid #cbd5e1', paddingTop: 24, textAlign: 'left' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Completion Date</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{completionDate}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 8 }}>Certificate ID: <strong>{certId}</strong></div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#16a34a', fontWeight: 800, fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> Verified Enterprise Issuer
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
              TrainFlow Corporate HR System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
