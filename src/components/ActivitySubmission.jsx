import React, { useState } from 'react';
import { FileCheck2, UploadCloud, Clock, CheckCircle2, AlertCircle, Send, FileText } from 'lucide-react';

export const ActivitySubmission = ({ module, existingSubmission, onSubmitActivity }) => {
  const [submissionText, setSubmissionText] = useState(existingSubmission?.text || '');
  const [fileName, setFileName] = useState(existingSubmission?.fileUrl || '');

  const isSubmitted = !!existingSubmission;
  const status = existingSubmission?.status || 'NOT_SUBMITTED';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    onSubmitActivity({
      text: submissionText,
      fileUrl: fileName || 'Branch_Task_Submission.pdf',
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
      grade: null,
      feedback: null
    });
  };

  const handleSimulateFile = () => {
    setFileName(`${module.title.replace(/\s+/g, '_')}_Document.pdf`);
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileCheck2 color="#9333ea" size={24} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Practical Assignment Submission</h3>
        </div>
        
        {status === 'APPROVED' && (
          <span className="status-badge status-completed" style={{ padding: '6px 12px' }}>
            <CheckCircle2 size={14} /> Approved & Graded ({existingSubmission.grade || 'A+'})
          </span>
        )}

        {status === 'PENDING' && (
          <span className="status-badge status-in-progress" style={{ backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fde68a', padding: '6px 12px' }}>
            <Clock size={14} /> Submitted — Waiting Manager Review
          </span>
        )}

        {status === 'NEEDS_REVISION' && (
          <span className="status-badge status-needs-attention" style={{ padding: '6px 12px' }}>
            <AlertCircle size={14} /> Revision Requested by Manager
          </span>
        )}
      </div>

      {/* TASK INSTRUCTIONS */}
      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: '#6b21a8', marginBottom: 6 }}>Assignment Instructions:</div>
        <div style={{ fontSize: '0.9rem', color: '#4c1d95', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {module.activityInstructions || "Complete the required regional market audit task and submit your findings below for manager evaluation."}
        </div>
      </div>

      {/* MANAGER FEEDBACK BANNER (IF REVIEWED) */}
      {existingSubmission?.feedback && (
        <div style={{
          background: status === 'APPROVED' ? '#ecfdf5' : '#fef2f2',
          border: `1px solid ${status === 'APPROVED' ? '#a7f3d0' : '#fca5a5'}`,
          borderRadius: 8,
          padding: 16,
          marginBottom: 20
        }}>
          <div style={{ fontWeight: 700, color: status === 'APPROVED' ? '#065f46' : '#991b1b', marginBottom: 4 }}>
            Manager Review & Feedback:
          </div>
          <div style={{ fontSize: '0.9rem', color: status === 'APPROVED' ? '#047857' : '#b91c1c' }}>
            "{existingSubmission.feedback}"
          </div>
        </div>
      )}

      {/* SUBMISSION FORM */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Written Findings & Strategy Notes *</label>
          <textarea
            className="form-textarea"
            rows={5}
            placeholder="Type your strategic findings, client pain points, or solution proposal here..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            disabled={status === 'APPROVED' || status === 'PENDING'}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Supporting Document Attachment (Optional)</label>
          {fileName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 8 }}>
              <FileText size={20} color="#4f46e5" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', flex: 1 }}>{fileName}</span>
              {status !== 'APPROVED' && status !== 'PENDING' && (
                <button type="button" onClick={() => setFileName('')} style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.8rem' }}>
                  Remove
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleSimulateFile}
              disabled={status === 'APPROVED' || status === 'PENDING'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <UploadCloud size={18} /> Attach Sample Analysis PDF
            </button>
          )}
        </div>

        {status !== 'APPROVED' && status !== 'PENDING' && (
          <button
            type="submit"
            className={`btn-primary ${!submissionText.trim() ? 'btn-disabled' : ''}`}
            disabled={!submissionText.trim()}
            style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
          >
            <Send size={18} /> Submit Activity for Manager Review
          </button>
        )}
      </form>
    </div>
  );
};
