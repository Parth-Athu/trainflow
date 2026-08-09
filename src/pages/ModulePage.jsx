import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  Lock, 
  Award, 
  Video, 
  FileText, 
  Users, 
  FileCheck2, 
  HelpCircle, 
  Maximize2,
  Clock,
  Sparkles,
  CheckSquare,
  AlertCircle,
  Upload,
  Send,
  RefreshCw,
  X
} from 'lucide-react';
import { FullscreenAssessment } from '../components/FullscreenAssessment';
import { RewardModal } from '../components/RewardModal';
import { QuizSession } from '../components/QuizSession';

// Micro-Quiz Component for embedded video quizzes
const QuizRunner = ({ quiz, onQuizPass }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const passed = selectedOption === quiz.correctIndex;
    setIsPassed(passed);
    setSubmitted(true);
    if (passed) {
      onQuizPass();
    }
  };

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: 20, marginTop: 16 }}>
      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4f46e5', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <HelpCircle size={18} /> Module Completion Micro-Quiz
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: 14 }}>
        {quiz.question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {quiz.options.map((opt, idx) => {
          let optionClass = 'form-input';
          let borderCol = '#cbd5e1';
          let bgCol = '#ffffff';

          if (selectedOption === idx) {
            borderCol = '#4f46e5';
            bgCol = '#eef2ff';
          }

          if (submitted) {
            if (idx === quiz.correctIndex) {
              borderCol = '#10b981';
              bgCol = '#ecfdf5';
            } else if (selectedOption === idx && !isPassed) {
              borderCol = '#ef4444';
              bgCol = '#fef2f2';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: `2px solid ${borderCol}`,
                background: bgCol,
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: selectedOption === idx ? 700 : 500,
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: `2px solid ${borderCol}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800
              }}>
                {String.fromCharCode(65 + idx)}
              </div>
              {opt}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button className="btn-primary" onClick={handleSubmit} disabled={selectedOption === null}>
          Submit Answer
        </button>
      ) : (
        <div>
          {isPassed ? (
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={18} /> Correct! (+100 XP) Module Verified Complete!
            </div>
          ) : (
            <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.88rem' }}>
              Incorrect answer. Click below to retry.
              <button
                className="btn-secondary"
                onClick={() => { setSubmitted(false); setSelectedOption(null); }}
                style={{ marginLeft: 12, padding: '4px 10px', fontSize: '0.78rem' }}
              >
                Retry Micro-Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Activity Submission Form Component
const ActivitySubmission = ({ module, existingSubmission, onSubmitActivity }) => {
  const [submissionText, setSubmissionText] = useState(existingSubmission?.text || '');
  const [isSubmitted, setIsSubmitted] = useState(!!existingSubmission);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    onSubmitActivity({
      text: submissionText,
      fileAttached: "market_research_report_v1.pdf",
      submittedAt: new Date().toISOString(),
      status: "PENDING"
    });
    setIsSubmitted(true);
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
        Practical Activity Assignment Submission
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 20 }}>
        Complete the assignment requirements below and submit for Branch Manager / Trainer review.
      </p>

      {existingSubmission?.status === 'APPROVED' ? (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: 20, color: '#065f46' }}>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={22} color="#10b981" /> Practical Activity Approved (Grade: A+)
          </div>
          <div style={{ fontSize: '0.88rem', color: '#047857' }}>
            Reviewed & approved by <strong>Amit Shah (Branch Manager)</strong>.
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #6ee7b7', padding: 12, borderRadius: 8, marginTop: 12, fontSize: '0.85rem' }}>
            <strong>Manager Feedback:</strong> Excellent research quality and competitor analysis!
          </div>
        </div>
      ) : existingSubmission?.status === 'PENDING' ? (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 20, color: '#92400e' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={20} /> Assignment Submitted — Pending Review
          </div>
          <p style={{ fontSize: '0.85rem', color: '#b45309' }}>
            Your assignment is currently in your Branch Manager's review queue.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Submission Notes & Key Findings</label>
            <textarea
              className="form-textarea"
              rows={5}
              placeholder="Detail your practical findings, customer conversation notes, or research analysis..."
              value={submissionText}
              onChange={e => setSubmissionText(e.target.value)}
              required
            />
          </div>

          <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 10, padding: 16, textAlign: 'center', marginBottom: 20 }}>
            <Upload size={24} color="#64748b" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 700 }}>Attached File: market_research_report_v1.pdf (Simulated)</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PDF, DOCX, or XLSX up to 10MB</div>
          </div>

          <button className="btn-primary" type="submit" style={{ padding: '12px 24px' }}>
            <Send size={16} /> Submit Assignment for Review
          </button>
        </form>
      )}
    </div>
  );
};

export const ModulePage = ({ 
  module, 
  recruit, 
  onBack, 
  onCompleteModule, 
  onSubmitActivity, 
  onTriggerSignOff,
  onSaveAssessmentAttempt,
  onAwardXP
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
  const [maxWatchedTimeSeconds, setMaxWatchedTimeSeconds] = useState(0);
  const [clearedCheckpoints, setClearedCheckpoints] = useState({});
  const [activeCheckpointIndex, setActiveCheckpointIndex] = useState(null);
  
  const [readingScrollPercent, setReadingScrollPercent] = useState(0);
  const [readingAcknowledged, setReadingAcknowledged] = useState(false);
  
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardDetails, setRewardDetails] = useState({ xp: 100, badge: 'Video Apprentice 🎬', title: 'Module Completed!' });

  const [showFullscreenExam, setShowFullscreenExam] = useState(false);

  const videoDurationSeconds = 600; // 10 minutes simulated
  const videoWatchedPercent = Math.min(100, Math.round((maxWatchedTimeSeconds / videoDurationSeconds) * 100));

  const isCompleted = (recruit.completedModuleIds || []).includes(module.id);
  const activitySub = recruit.activitySubmissions?.[module.id];
  const hasSignOff = !!recruit.signOffs?.[module.id];
  const liveSessionAttended = hasSignOff || isCompleted;

  const isMajorAssessment = module.type === 'SYSTEM' || module.id === 'M-X02';

  // 2-Minute Mid-Video Checkpoints
  const checkpointTimes = [120, 240, 360, 480];
  const checkpointQuestions = [
    {
      time: 120,
      question: "Checkpoint 1 (2:00): What is TrainFlow's core rule for track assignment?",
      options: [
        "Recruits manually pick their track",
        "Role + Level automatically determines track",
        "Manager randomly assigns tracks",
        "HR assigns tracks manually"
      ],
      correctIndex: 1
    },
    {
      time: 240,
      question: "Checkpoint 2 (4:00): Under what condition is Day 2 unlocked for a recruit?",
      options: [
        "After waiting 24 hours",
        "Only when 100% of Day 1 modules are completed",
        "When manager approves verbally",
        "Day 2 is unlocked by default"
      ],
      correctIndex: 1
    },
    {
      time: 360,
      question: "Checkpoint 3 (6:00): What is the SLA response window for resolving high-priority dispatch blockers?",
      options: ["48 hours", "24 hours", "2 hours", "7 days"],
      correctIndex: 2
    },
    {
      time: 480,
      question: "Checkpoint 4 (8:00): How does TrainFlow ensure cross-functional alignment between Sales and Operations?",
      options: [
        "By waiting for client complaints",
        "Automated hand-off protocol in ERP within 2 hours",
        "No communication between teams",
        "Manual physical paperwork delivery"
      ],
      correctIndex: 1
    }
  ];

  // Video Timer Effect
  const videoIntervalRef = useRef(null);
  useEffect(() => {
    if (isPlaying && module.type === 'VIDEO') {
      videoIntervalRef.current = setInterval(() => {
        setCurrentTimeSeconds(prev => {
          const nextTime = prev + 1;

          setMaxWatchedTimeSeconds(prevMax => Math.max(prevMax, nextTime));

          const checkpointIdx = checkpointTimes.findIndex((t, idx) => nextTime === t && !clearedCheckpoints[idx]);
          if (checkpointIdx !== -1) {
            setIsPlaying(false);
            clearInterval(videoIntervalRef.current);
            setActiveCheckpointIndex(checkpointIdx);
          }

          if (nextTime >= videoDurationSeconds) {
            setIsPlaying(false);
            clearInterval(videoIntervalRef.current);
            if (!module.quiz) {
              handleModuleFinish();
            }
          }

          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(videoIntervalRef.current);
  }, [isPlaying, clearedCheckpoints, module.type]);

  const handleModuleFinish = () => {
    onCompleteModule(module.id);
    setRewardDetails({ xp: 100, badge: 'Video Apprentice 🎬', title: 'Video Module Completed!' });
    setShowRewardModal(true);
  };

  const handleSeek = (newSeconds) => {
    if (newSeconds <= maxWatchedTimeSeconds) {
      setCurrentTimeSeconds(newSeconds);
    }
  };

  const handleClearCheckpoint = (checkpointIdx) => {
    setClearedCheckpoints(prev => ({ ...prev, [checkpointIdx]: true }));
    setActiveCheckpointIndex(null);
    setIsPlaying(true);
    onAwardXP(50, "Cleared 2-Minute Mid-Video Checkpoint!");
  };

  const handleSimulateReadScroll = () => {
    setReadingScrollPercent(100);
  };

  const handleAcknowledgeReading = () => {
    setReadingAcknowledged(true);
    onCompleteModule(module.id);
    setRewardDetails({ xp: 100, badge: 'Policy Champion 📜', title: 'Policy Reading Verified!' });
    setShowRewardModal(true);
  };

  const handleMicroQuizPass = () => {
    onCompleteModule(module.id);
    setRewardDetails({ xp: 100, badge: 'Video Master 📺', title: 'Module Quiz Passed!' });
    setShowRewardModal(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // FULLSCREEN MAJOR ASSESSMENT OVERLAY
  if (showFullscreenExam) {
    return (
      <FullscreenAssessment
        module={module}
        recruit={recruit}
        onClose={() => setShowFullscreenExam(false)}
        onCompleteExam={(score, attempts) => {
          setShowFullscreenExam(false);
          const isPassed = score >= 80;
          onSaveAssessmentAttempt(module.id, {
            status: isPassed ? 'PASSED' : 'FAILED',
            score,
            attemptsCount: attempts.length,
            timestamp: new Date().toISOString()
          }, isPassed);
        }}
      />
    );
  }

  return (
    <div className="page-container">
      {/* REWARD MODAL */}
      {showRewardModal && (
        <RewardModal
          xpAmount={rewardDetails.xp}
          badgeName={rewardDetails.badge}
          title={rewardDetails.title}
          onClose={() => setShowRewardModal(false)}
        />
      )}

      {/* TOP BACK BUTTON BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button className="btn-secondary" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={16} /> Back to 4-Day Learning Path
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="status-badge status-in-progress">
            Day {module.day} • {module.track.toUpperCase()} TRACK
          </span>
          {isCompleted && (
            <span className="status-badge status-completed">
              <CheckCircle2 size={14} /> Module Verified
            </span>
          )}
        </div>
      </div>

      {/* MODULE HEADER TITLE */}
      <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #e2e8f0', padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
          {module.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
          {module.description}
        </p>
      </div>

      {/* RENDER MODULE CONTENT BY TYPE */}
      {module.type === 'SITUATIONAL_QUIZ' ? (
        /* DEDICATED SITUATIONAL QUIZ SESSION */
        <QuizSession
          title={module.title}
          questions={module.questions || [
            {
              question: "Scenario: A client demands a custom discount not listed in standard tariff tables. How do you respond?",
              options: [
                "Give discount immediately to close sale",
                "Explain tariff policy and escalate to manager via ERP for approval within 2 hours",
                "Refuse customer without offering alternatives",
                "Ignore the request"
              ],
              correctIndex: 1,
              explanation: "TrainFlow standard requires escalating custom tariff requests to the Branch Manager via ERP."
            },
            {
              question: "Scenario: Dispatch vehicle breaks down mid-route. What is the immediate operational protocol?",
              options: [
                "Wait until tomorrow",
                "Notify Regional Logistics Hub via app & dispatch backup unit within SLA window",
                "Cancel delivery",
                "Ask client to collect package"
              ],
              correctIndex: 1,
              explanation: "Immediate logistics protocol is triggering backup dispatch via TrainFlow ERP."
            }
          ]}
          passScore={80}
          durationMinutes={10}
          isMajorAssessment={false}
          onCompleteQuiz={(score, isPassed) => {
            if (isPassed) {
              handleModuleFinish();
            }
          }}
          onSaveAttempt={(attempt) => {
            onSaveAssessmentAttempt(module.id, attempt, attempt.status === 'PASSED');
          }}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          {/* MAIN MODULE CONTENT AREA */}
          <div>
            {/* 1. VIDEO MODULE */}
            {module.type === 'VIDEO' && (
              <div style={{ background: '#ffffff', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#0f172a', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80"
                    alt="Video thumbnail"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                  />

                  {/* OVERLAY PLAY BUTTON */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ background: '#4f46e5', color: '#ffffff', border: 'none', width: 68, height: 68, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 25px rgba(79,70,229,0.6)', transition: 'transform 0.2s ease' }}
                    >
                      {isPlaying ? <PauseCircle size={36} /> : <PlayCircle size={36} style={{ marginLeft: 4 }} />}
                    </button>
                  </div>

                  {/* VIDEO TIMER BAR */}
                  <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,23,42,0.85)', padding: '8px 14px', borderRadius: 8, color: '#ffffff', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span>{formatTime(currentTimeSeconds)}</span>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${videoWatchedPercent}%`, background: '#10b981', borderRadius: 3 }} />
                    </div>
                    <span>{formatTime(videoDurationSeconds)}</span>
                  </div>
                </div>

                {/* 2-MIN CHECKPOINT POPUP */}
                {activeCheckpointIndex !== null && (
                  <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b45309', fontWeight: 800, fontSize: '0.95rem', marginBottom: 8 }}>
                      <Sparkles size={18} /> 2-MIN MID-VIDEO KNOWLEDGE CHECKPOINT (+50 XP)
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: 12 }}>
                      {checkpointQuestions[activeCheckpointIndex].question}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {checkpointQuestions[activeCheckpointIndex].options.map((opt, idx) => (
                        <button
                          key={idx}
                          className="btn-secondary"
                          onClick={() => {
                            if (idx === checkpointQuestions[activeCheckpointIndex].correctIndex) {
                              handleClearCheckpoint(activeCheckpointIndex);
                            }
                          }}
                          style={{ justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.85rem' }}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIDEO CONTROLS & DEMO PROGRESS BUTTON */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button className="btn-secondary" onClick={() => handleSeek(Math.max(0, currentTimeSeconds - 10))} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      <RotateCcw size={14} /> Rewind 10s
                    </button>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                      Watch Progress: <strong>{videoWatchedPercent}%</strong> (100% required to unlock quiz)
                    </span>
                  </div>

                  {videoWatchedPercent < 100 && (
                    <button className="btn-secondary" onClick={() => { setMaxWatchedTimeSeconds(videoDurationSeconds); setCurrentTimeSeconds(videoDurationSeconds); }} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                      Simulate 100% Video Playback
                    </button>
                  )}
                </div>

                {/* EMBEDDED MICRO-QUIZ AFTER VIDEO WATCHED */}
                {module.quiz && videoWatchedPercent === 100 && (
                  <div style={{ marginTop: 24 }}>
                    <QuizRunner quiz={module.quiz} onQuizPass={handleMicroQuizPass} />
                  </div>
                )}
              </div>
            )}

            {/* 2. READING MODULE */}
            {module.type === 'READING' && (
              <div style={{ background: '#ffffff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Reading Scroll Progress: <strong>{readingScrollPercent}%</strong>
                  </span>
                  {readingScrollPercent < 100 && (
                    <button className="btn-secondary" onClick={handleSimulateReadScroll} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                      Scroll to End (100%)
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, marginBottom: 24, whiteSpace: 'pre-line', maxHeight: 350, overflowY: 'auto', paddingRight: 10 }}>
                  {module.readingContent || `TRAINFLOW ENTERPRISE POLICY & OPERATIONAL CODE\n\n1. SCOPE & COMPLIANCE:\nAll recruits must strictly adhere to role-specific SLAs, client confidentiality protocols, and data security mandates.\n\n2. DISPATCH & SLA MANAGEMENT:\nHigh-priority dispatch blockers must be logged in TrainFlow ERP within 2 hours of occurrence.\n\n3. CODE OF CONDUCT:\nMaintain integrity, operational transparency, and cross-functional team respect at all times.`}
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <input
                    type="checkbox"
                    id="ack-check"
                    checked={readingAcknowledged || isCompleted}
                    onChange={handleAcknowledgeReading}
                    disabled={isCompleted || readingScrollPercent < 100}
                    style={{ width: 18, height: 18, accentColor: '#4f46e5', cursor: 'pointer' }}
                  />
                  <label htmlFor="ack-check" style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', cursor: 'pointer' }}>
                    I acknowledge that I have read, understood, and agree to adhere to this company policy.
                  </label>
                </div>

                {module.quiz && readingScrollPercent === 100 && (readingAcknowledged || isCompleted) && (
                  <QuizRunner quiz={module.quiz} onQuizPass={handleMicroQuizPass} />
                )}
              </div>
            )}

            {/* 3. LIVE SESSION MODULE */}
            {module.type === 'LIVE' && (
              <div style={{ background: '#ffffff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: 8, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#a16207', fontWeight: 800, fontSize: '1.05rem', marginBottom: 6 }}>
                    <Users size={22} /> Live Session Verification Required
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#854d0e', lineHeight: 1.5 }}>
                    This module represents a live interactive session. Completion requires digital sign-off from your <strong>{module.sessionDetails?.signOffRole || 'Branch Manager'}</strong>.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem', color: '#334155', marginBottom: 24 }}>
                  <div>Location / Hub: <strong>{module.sessionDetails?.location || 'Ahmedabad Regional Hub'}</strong></div>
                  <div>Scheduled Time: <strong>{module.sessionDetails?.scheduledTime || 'Day 3 • 10:00 AM - 11:30 AM'}</strong></div>
                  <div>Session Agenda: <strong>{module.sessionDetails?.agenda || 'Manager Meet & Operational SLA Review'}</strong></div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 8, padding: 20, textAlign: 'center' }}>
                  {hasSignOff ? (
                    <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <CheckCircle2 size={20} /> Verified & Signed off by {recruit.signOffs[module.id]?.signedBy || 'Branch Manager'}
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 14 }}>
                        {liveSessionAttended ? 'Waiting for Manager / HR verification sign-off.' : 'Click below after attending the session.'}
                      </div>

                      {!hasSignOff && (
                        <button
                          className="btn-primary"
                          onClick={() => onTriggerSignOff(module.id, 'Branch Manager (Ahmedabad)')}
                        >
                          <CheckSquare size={18} /> Simulate Manager Verification Sign-off
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. PRACTICAL ACTIVITY MODULE */}
            {module.type === 'ACTIVITY' && (
              <ActivitySubmission
                module={module}
                existingSubmission={activitySub}
                onSubmitActivity={(subData) => onSubmitActivity(module.id, subData)}
              />
            )}

            {/* 5. MAJOR FULLSCREEN ASSESSMENTS */}
            {isMajorAssessment && (
              <div style={{ background: '#ffffff', borderRadius: 12, padding: 32, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Maximize2 size={30} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                  High-Stakes Fullscreen Assessment
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: 500, margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                  This assessment is conducted under <strong>controlled fullscreen mode</strong> with attention monitoring, timer tracking, and question randomization.
                </p>

                <button className="btn-primary" onClick={() => setShowFullscreenExam(true)} style={{ padding: '12px 28px', fontSize: '1rem', margin: '0 auto' }}>
                  <Maximize2 size={18} /> Open Fullscreen Assessment Center
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#ffffff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>
                Module Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Module ID:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{module.id}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Training Track:</span>
                  <div style={{ fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>{module.track}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Estimated Duration:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{module.estimatedTime}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Completion Check:</span>
                  <div style={{ fontWeight: 700, color: '#059669' }}>{module.completionCheck}</div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Verification Status:</span>
                  <div style={{ marginTop: 4 }}>
                    {isCompleted ? (
                      <span className="status-badge status-completed"><CheckCircle2 size={12} /> Verified Complete</span>
                    ) : (
                      <span className="status-badge status-in-progress">In Progress</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
