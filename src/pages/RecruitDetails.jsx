import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Award, 
  CheckSquare, 
  ShieldAlert, 
  Star 
} from 'lucide-react';
import { calculateRecruitProgress, isModuleCompleted } from '../utils/learningEngine';

export const RecruitDetailsModal = ({ recruit, rules, onClose, onGradeActivity, onSignOffLive }) => {
  const { percent, completedCount, totalCount, currentDay, learningPath } = calculateRecruitProgress(recruit, rules);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('A+');

  const pendingActivity = recruit.activitySubmissions?.["M-S03"];
  const assessmentAttemptsMap = recruit.assessmentAttempts || {};

  const handleApprove = () => {
    onGradeActivity(recruit.id, "M-S03", {
      status: 'APPROVED',
      grade: selectedGrade,
      feedback: feedbackText || 'Great regional analysis and actionable market strategy!'
    });
  };

  const handleReject = () => {
    onGradeActivity(recruit.id, "M-S03", {
      status: 'NEEDS_REVISION',
      grade: null,
      feedback: feedbackText || 'Please add at least 2 more competitor pricing data points.'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 850 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={recruit.avatar} alt={recruit.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{recruit.name} ({recruit.id})</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{recruit.role} • {recruit.level} • {recruit.city} Hub</div>
            </div>
          </div>
          <button onClick={onClose}><X size={22} color="#64748b" /></button>
        </div>

        <div className="modal-body">
          {/* STATS OVERVIEW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Overall Progress</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4f46e5' }}>{percent}%</div>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Current Day</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Day {currentDay}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Completed Modules</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{completedCount}/{totalCount}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Streak</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{recruit.streakDays} Days 🔥</div>
            </div>
          </div>

          {/* ASSESSMENT INTEGRITY & ATTEMPT LOGS SECTION */}
          {Object.keys(assessmentAttemptsMap).length > 0 && (
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 16, marginBottom: 24 }}>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldAlert size={18} color="#4f46e5" /> Assessment Integrity & Security History Log
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Object.entries(assessmentAttemptsMap).map(([modId, attempts]) => {
                  const latest = Array.isArray(attempts) ? attempts[attempts.length - 1] : attempts;
                  const isTerminated = latest.status === 'TERMINATED';

                  return (
                    <div key={modId} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: isTerminated ? '#fef2f2' : '#ffffff',
                      border: `1px solid ${isTerminated ? '#fca5a5' : '#cbd5e1'}`,
                      borderRadius: 8,
                      fontSize: '0.85rem'
                    }}>
                      <div>
                        <strong style={{ color: '#0f172a' }}>Module {modId}:</strong> {latest.status} (Score {latest.score}%)
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Time: {latest.timeTaken || 'N/A'} • Security Warnings: <strong>{latest.warnings || 0}/2</strong>
                        </div>
                      </div>

                      {isTerminated ? (
                        <span className="status-badge status-needs-attention">
                          ⚠️ Terminated (2 Warnings)
                        </span>
                      ) : (
                        <span className={`status-badge ${latest.status === 'PASSED' ? 'status-completed' : 'status-in-progress'}`}>
                          {latest.status}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PENDING ACTIVITY GRADING SECTION */}
          {pendingActivity && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={18} /> Practical Assignment Submission: Market Research Task (M-S03)
                </div>
                <span className="status-badge status-in-progress" style={{ background: '#fef3c7', color: '#b45309' }}>
                  {pendingActivity.status}
                </span>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #fcd34d', padding: 14, borderRadius: 8, fontSize: '0.9rem', color: '#334155', marginBottom: 16 }}>
                <strong>Recruit Submission:</strong>
                <p style={{ marginTop: 4, fontStyle: 'italic' }}>"{pendingActivity.text}"</p>
                {pendingActivity.fileUrl && (
                  <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700 }}>
                    📎 Attached File: {pendingActivity.fileUrl}
                  </div>
                )}
              </div>

              {pendingActivity.status === 'PENDING' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Grade Rating</label>
                    <select className="form-select" value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}>
                      <option value="A+">A+ (Exceeds Expectations)</option>
                      <option value="A">A (Meets Standards)</option>
                      <option value="B">B (Satisfactory)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Manager Feedback Notes</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      placeholder="Add encouragement or specific guidance..."
                      value={feedbackText}
                      onChange={e => setFeedbackText(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button className="btn-success" onClick={handleApprove}>
                      <CheckCircle2 size={16} /> Approve & Grade Task
                    </button>
                    <button className="btn-secondary" onClick={handleReject} style={{ color: '#ef4444' }}>
                      <AlertCircle size={16} /> Request Revision
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DETAILED CURRICULUM PROGRESS BREAKDOWN */}
          <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', marginBottom: 12 }}>
            Curriculum Module Progress Matrix
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {learningPath.map(module => {
              const completed = isModuleCompleted(recruit, module.id);
              const signOff = recruit.signOffs?.[module.id];

              return (
                <div key={module.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', marginRight: 8 }}>Day {module.day}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{module.title}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: 8 }}>({module.type})</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {module.type === 'LIVE' && !signOff && (
                      <button
                        className="btn-secondary"
                        onClick={() => onSignOffLive(recruit.id, module.id, 'Branch Manager')}
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                      >
                        <CheckSquare size={12} /> Manager Sign-off
                      </button>
                    )}

                    {completed ? (
                      <span className="status-badge status-completed"><CheckCircle2 size={12} /> Completed</span>
                    ) : (
                      <span className="status-badge status-in-progress">In Progress</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
