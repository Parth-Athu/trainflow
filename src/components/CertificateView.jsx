import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Download, Printer, Share2 } from 'lucide-react';
import { TrainFlowLogo } from './TrainFlowLogo';

export const CertificateView = ({ recruit }) => {
  if (!recruit) return null;

  const isCertified = recruit.isCertified || recruit.certificationStatus === 'CERTIFIED';
  const certId = recruit.certificateId || 'TF-2026-X8901';
  const issuedDate = recruit.certifiedAt ? new Date(recruit.certifiedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'August 9, 2026';
  const issuerName = recruit.certifiedBy || 'Amit Shah (Branch Manager)';

  return (
    <div style={{ maxWidth: 850, margin: '0 auto', paddingBottom: 40 }}>
      {/* ACTION BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Official Certificate of Completion
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Unique Certificate ID: <strong>{certId}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={() => window.print()} style={{ fontSize: '0.85rem' }}>
            <Printer size={16} /> Print Certificate
          </button>
          <button className="btn-primary" onClick={() => alert(`Certificate ${certId} downloaded as PDF!`)} style={{ background: '#10b981', borderColor: '#10b981', fontSize: '0.85rem' }}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* OFFICIAL CERTIFICATE CARD CONTAINER */}
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        border: '12px solid #0f172a',
        padding: 44,
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        color: '#0f172a',
        textAlign: 'center'
      }}>
        {/* INNER DECORATIVE BORDER */}
        <div style={{ border: '2px solid #c7d2fe', padding: 32, borderRadius: 12, position: 'relative' }}>
          
          {/* TOP SEAL HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <TrainFlowLogo size={44} showText={true} textVariant="dark" subtitle="OFFICIAL VERIFIED DIPLOMA" />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: 1 }}>REGISTRY ID</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a' }}>{certId}</div>
            </div>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%)', margin: '16px 0 28px 0' }} />

          {/* MAIN CERTIFICATE TEXT */}
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
            CERTIFICATE OF COMPLETION
          </div>

          <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 16 }}>
            This is to officially certify that
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: 1 }}>
            {recruit.name}
          </h1>

          <div style={{ fontSize: '0.95rem', color: '#475569', maxWidth: 550, margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            has successfully completed the complete multi-branch onboarding curriculum for the position of<br />
            <strong style={{ color: '#4f46e5', fontSize: '1.05rem' }}>{recruit.role} ({recruit.level})</strong> at the <strong>{recruit.city || 'Ahmedabad'} Regional Branch Hub</strong>.
          </div>

          {/* VERIFIED STAMP BADGE */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ecfdf5', border: '2px solid #10b981', color: '#065f46', padding: '8px 24px', borderRadius: 30, fontWeight: 900, fontSize: '0.95rem', marginBottom: 32, boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
            <ShieldCheck size={20} color="#10b981" /> PROGRAM VERIFIED & CERTIFIED
          </div>

          {/* SIGNATURES ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 24, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'serif', fontSize: '1.4rem', fontWeight: 700, color: '#3730a3', fontStyle: 'italic', marginBottom: 4 }}>
                {issuerName}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>AUTHORIZED BRANCH MANAGER</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{recruit.city || 'Ahmedabad'} Regional Hub</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'serif', fontSize: '1.4rem', fontWeight: 700, color: '#3730a3', fontStyle: 'italic', marginBottom: 4 }}>
                HQ HR Operations
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>NATIONAL ONBOARDING DIRECTOR</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Date: {issuedDate}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
