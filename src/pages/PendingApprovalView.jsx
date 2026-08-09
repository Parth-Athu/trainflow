import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, Building2, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

export const PendingApprovalView = ({ recruit, onSimulateHRApprove }) => {
  return (
    <div style={{ maxWidth: 750, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #cbd5e1', padding: 36, textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: '#fffbeb', color: '#d97706',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto',
          border: '2px solid #fde68a'
        }}>
          <Clock size={36} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '4px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
          ● PENDING BRANCH MANAGER APPROVAL
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
          Registration Application Submitted
        </h2>

        <p style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: 540, margin: '0 auto 24px auto', lineHeight: 1.6 }}>
          Thank you, <strong>{recruit.name}</strong>! Your registration application has been submitted to your assigned <strong>{recruit.city} Branch Hub</strong>.
        </p>

        {/* RECRUIT REQUEST SUMMARY BOX */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, textAlign: 'left', fontSize: '0.88rem', marginBottom: 28 }}>
          <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 8, fontSize: '0.92rem' }}>Submitted Registration Details:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>Applicant Name: <strong>{recruit.name} ({recruit.id})</strong></div>
            <div>Work Email: <strong>{recruit.email}</strong></div>
            <div>Requested Role: <strong>{recruit.requestedRole || recruit.role}</strong></div>
            <div>Requested Level: <strong>{recruit.requestedLevel || recruit.level}</strong></div>
            <div>Branch Hub: <strong>{recruit.city} Regional Hub</strong></div>
            <div>Status: <span style={{ color: '#d97706', fontWeight: 700 }}>● Pending Manager Review</span></div>
          </div>
        </div>

        {/* 5-STEP APPLICATION PROGRESSION TRACKER */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, textAlign: 'left', marginBottom: 28 }}>
          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginBottom: 14 }}>
            Application Progression Tracker:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#16a34a', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Step 1: Recruit Registration Submitted</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#d97706', fontWeight: 800 }}>
              <Clock size={18} />
              <span>Step 2: Branch Manager Review ({recruit.city} Hub)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#94a3b8' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
              <span>Step 3: Role & Level Matrix Confirmation</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#94a3b8' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
              <span>Step 4: Rule Engine Training Path Generation</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#94a3b8' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
              <span>Step 5: Day 1 Curriculum Access Unlocked</span>
            </div>
          </div>
        </div>

        {/* DEMO SHORTCUT BUTTON */}
        <button
          className="btn-primary"
          onClick={() => onSimulateHRApprove(recruit.id)}
          style={{ width: '100%', justifyContent: 'center', padding: 12, background: '#10b981', borderColor: '#10b981', fontSize: '0.95rem' }}
        >
          <UserCheck size={18} /> Simulate Branch Manager Approval & Unlock Day 1
        </button>
      </div>
    </div>
  );
};
