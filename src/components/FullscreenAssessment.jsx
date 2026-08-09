import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  RotateCcw, 
  FileText, 
  Check, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

/**
 * Fisher-Yates Question Randomization Helper
 */
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const FullscreenAssessment = ({ 
  module, 
  recruit, 
  onClose, 
  onSaveAttempt 
}) => {
  const [stage, setStage] = useState('prestart'); // 'prestart' | 'active' | 'terminated' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(10 * 60); // 10 mins default
  const [warningCount, setWarningCount] = useState(0);
  const [activeWarningModal, setActiveWarningModal] = useState(null); // 1 | 2 | null
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [attemptResult, setAttemptResult] = useState(null);

  // Anti-cheating debounce guard to prevent multiple co-occurring events from triggering extra warnings
  const isProcessingViolationRef = useRef(false);
  const timerRef = useRef(null);

  const quizData = module.quiz || module.scenario || {};
  const passScoreRequired = quizData.passScore || 80;
  const initialDurationMins = module.id === 'M-X02' ? 20 : 10;

  // Existing attempt history for this recruit & module
  const attemptHistory = recruit?.assessmentAttempts?.[module.id] || [];

  // Start Assessment Handler
  const handleStartAssessment = () => {
    // 1. Randomize questions for this attempt
    const rawQuestions = quizData.questions || [];
    const randomized = shuffleArray(rawQuestions);
    setQuestions(randomized);

    // 2. Request Fullscreen Mode
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    // 3. Reset state
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(initialDurationMins * 60);
    setWarningCount(0);
    setActiveWarningModal(null);
    setShowSubmitConfirm(false);
    setStage('active');
  };

  // Timer Effect
  useEffect(() => {
    if (stage === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmitOnTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  // Anti-Cheating Attention Monitor (visibilitychange, fullscreenchange, blur)
  useEffect(() => {
    if (stage !== 'active') return;

    const handleViolation = (reason) => {
      if (isProcessingViolationRef.current) return;
      isProcessingViolationRef.current = true;

      setTimeout(() => {
        isProcessingViolationRef.current = false;
      }, 1500); // 1.5s debounce cooldown

      setWarningCount(prevCount => {
        const nextCount = prevCount + 1;
        if (nextCount === 1) {
          setActiveWarningModal(1);
        } else if (nextCount === 2) {
          setActiveWarningModal(2);
        } else if (nextCount >= 3) {
          handleTerminateAssessment(reason);
        }
        return nextCount;
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation('Tab switch / window hidden');
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleViolation('Exited browser fullscreen mode');
      }
    };

    const handleWindowBlur = () => {
      // Debounced window blur check
      if (document.visibilityState === 'hidden' || !document.fullscreenElement) {
        handleViolation('Window lost focus');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [stage]);

  // Handle Auto Submit when Timer hits 00:00
  const handleAutoSubmitOnTimeExpired = () => {
    calculateAndSaveAttempt('Time Expired', warningCount);
  };

  // Handle Assessment Termination on 3rd violation
  const handleTerminateAssessment = (reason) => {
    clearInterval(timerRef.current);
    try {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    } catch (e) {}

    const terminationAttempt = {
      attemptId: `ATT-${Date.now()}`,
      recruitId: recruit.id,
      assessmentId: module.id,
      attemptNumber: attemptHistory.length + 1,
      score: calculateCurrentScore(),
      passScore: passScoreRequired,
      warnings: 2,
      status: 'TERMINATED',
      terminationReason: reason || 'Repeatedly exited assessment environment',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    onSaveAttempt(module.id, terminationAttempt, false);
    setAttemptResult(terminationAttempt);
    setStage('terminated');
  };

  // Calculate current score
  const calculateCurrentScore = () => {
    if (!questions || questions.length === 0) return 0;
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  // Normal Submission Handler
  const calculateAndSaveAttempt = (submitReason = 'Normal Submission', warningsUsed = warningCount) => {
    clearInterval(timerRef.current);
    try {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    } catch (e) {}

    const score = calculateCurrentScore();
    const isPassed = score >= passScoreRequired;

    const timeSpentSeconds = (initialDurationMins * 60) - timeLeftSeconds;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`;

    const attemptRecord = {
      attemptId: `ATT-${Date.now()}`,
      recruitId: recruit.id,
      assessmentId: module.id,
      attemptNumber: attemptHistory.length + 1,
      score,
      passScore: passScoreRequired,
      warnings: Math.min(2, warningsUsed),
      status: isPassed ? 'PASSED' : 'FAILED',
      timeTaken: timeSpentFormatted,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    onSaveAttempt(module.id, attemptRecord, isPassed);
    setAttemptResult(attemptRecord);
    setStage('results');
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  // ================= STAGE 1: PRE-START SCREEN WITH INTEGRITY POLICY =================
  if (stage === 'prestart') {
    return (
      <div style={{ maxWidth: 800, margin: '30px auto', padding: '0 20px' }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
          <button className="btn-secondary" onClick={onClose} style={{ marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back to Module Overview
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ background: '#eef2ff', padding: 10, borderRadius: 10, color: '#4f46e5' }}>
              <Maximize2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>
                High-Stakes Controlled Assessment
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                {module.title}
              </h2>
            </div>
          </div>

          {/* ASSESSMENT DETAILS BAR */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 24 }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Time Limit</span>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{initialDurationMins} Minutes</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Pass Condition</span>
              <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.05rem' }}>Score $\ge$ {passScoreRequired}%</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Security Mode</span>
              <div style={{ fontWeight: 800, color: '#4f46e5', fontSize: '1.05rem' }}>Controlled Fullscreen</div>
            </div>
          </div>

          {/* ASSESSMENT INTEGRITY POLICY WORDING */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400e', fontWeight: 800, fontSize: '0.95rem', marginBottom: 6 }}>
              <ShieldAlert size={20} /> TRAINFLOW ENTERPRISE ASSESSMENT INTEGRITY POLICY
            </div>
            <p style={{ fontSize: '0.88rem', color: '#b45309', lineHeight: 1.6 }}>
              This assessment evaluates job-critical competencies. To maintain compliance and security across all 12 regional branch hubs, this test runs in a controlled fullscreen environment. Exiting the fullscreen window or switching browser tabs triggers automated security warnings. Exceeding 2 warnings will immediately terminate your attempt and report the violation to your Branch Manager and HR.
            </p>
          </div>

          {/* ATTEMPT HISTORY TIMELINE */}
          {attemptHistory.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
                Previous Attempt History ({attemptHistory.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {attemptHistory.map((att, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <div>
                      <strong>Attempt {att.attemptNumber || idx + 1}:</strong> Score {att.score}%
                      <span style={{ color: '#64748b', marginLeft: 8 }}>({att.timeTaken})</span>
                    </div>
                    <span className={`status-badge ${att.status === 'PASSED' ? 'status-completed' : att.status === 'TERMINATED' ? 'status-needs-attention' : 'status-in-progress'}`}>
                      {att.status} {att.warnings ? `(${att.warnings} Warnings)` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="btn-primary" onClick={handleStartAssessment} style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: '1rem' }}>
            <Maximize2 size={18} /> Launch Fullscreen Assessment
          </button>
        </div>
      </div>
    );
  }

  // ================= STAGE 2: TERMINATED SCREEN =================
  if (stage === 'terminated') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#0f172a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5000,
        padding: 20
      }}>
        <div style={{ maxWidth: 550, width: '100%', background: '#1e293b', border: '2px solid #ef4444', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#ef4444' }}>
            <XCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fca5a5', marginBottom: 8 }}>
            ASSESSMENT TERMINATED
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 24 }}>
            Your assessment attempt was terminated because the controlled assessment environment was exited repeatedly.
          </p>

          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 10, padding: 16, textAlign: 'left', fontSize: '0.85rem', marginBottom: 24 }}>
            <div style={{ color: '#fca5a5', fontWeight: 700 }}>Security Log Summary:</div>
            <div style={{ marginTop: 4, color: '#e2e8f0' }}>Status: <strong>FAILED / TERMINATED</strong></div>
            <div style={{ color: '#e2e8f0' }}>Security Warnings Issued: <strong>2 of 2</strong></div>
            <div style={{ color: '#e2e8f0' }}>Reason: <strong>{attemptResult?.terminationReason}</strong></div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: 8 }}>
              This violation log has been saved to your recruit record and flagged on the Branch Manager & HR dashboards.
            </div>
          </div>

          <button className="btn-primary" onClick={onClose} style={{ background: '#ef4444', borderColor: '#ef4444', width: '100%', justifyContent: 'center' }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ================= STAGE 3: RESULTS SCREEN =================
  if (stage === 'results') {
    const isPassed = attemptResult?.status === 'PASSED';

    return (
      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 36, textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: isPassed ? '#ecfdf5' : '#fef2f2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: isPassed ? '#10b981' : '#ef4444'
          }}>
            {isPassed ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: isPassed ? '#065f46' : '#991b1b', marginBottom: 4 }}>
            {isPassed ? '🎉 Assessment Passed!' : '✕ Pass Condition Not Met'}
          </h2>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 24 }}>
            {module.title}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: '#f8fafc', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 24 }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Your Score</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isPassed ? '#10b981' : '#ef4444' }}>{attemptResult?.score}%</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Required Pass</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{passScoreRequired}%</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Time Taken</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4f46e5', marginTop: 4 }}>{attemptResult?.timeTaken}</div>
            </div>
          </div>

          {/* CONFIDENTIAL LEARNING FEEDBACK */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 16, textAlign: 'left', fontSize: '0.88rem', color: '#334155', marginBottom: 24 }}>
            <strong>Assessment Feedback & Key Takeaways:</strong>
            <p style={{ marginTop: 4, color: '#475569', lineHeight: 1.5 }}>
              {isPassed 
                ? 'Excellent situational judgment! You demonstrated clear alignment with TrainFlow operational SLAs and customer obsession principles.' 
                : 'Review regional escalation protocols and customer conversation guidelines before retrying.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {!isPassed && (
              <button className="btn-secondary" onClick={handleStartAssessment} style={{ flex: 1, justifyContent: 'center' }}>
                <RotateCcw size={16} /> Retake Assessment
              </button>
            )}
            <button className="btn-primary" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
              Return to Module Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= STAGE 4: ACTIVE FULLSCREEN ASSESSMENT MODE =================
  const currentQuestion = questions[currentQuestionIndex] || {};
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = questions.length > 0 ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) : 0;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#f8fafc',
      color: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 4000,
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      {/* TOP ASSESSMENT NAVIGATION BAR */}
      <div style={{
        background: '#0f172a',
        color: '#ffffff',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#4f46e5', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Maximize2 size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: 0.5 }}>TRAINFLOW CONTROLLED ASSESSMENT</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{module.title} • Question {currentQuestionIndex + 1} of {questions.length}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* TIMER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: '0.95rem', fontWeight: 800, color: timeLeftSeconds < 120 ? '#ef4444' : '#e0e7ff' }}>
            <Clock size={16} /> Timer: {formatTimer(timeLeftSeconds)}
          </div>

          {/* WARNING COUNT BADGE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: warningCount > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.08)', border: `1px solid ${warningCount > 0 ? '#fca5a5' : 'rgba(255,255,255,0.15)'}`, padding: '6px 12px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 700, color: warningCount > 0 ? '#fca5a5' : '#cbd5e1' }}>
            <AlertTriangle size={14} /> Warnings: {warningCount}/2
          </div>

          <button className="btn-primary" onClick={() => setShowSubmitConfirm(true)} style={{ background: '#10b981', borderColor: '#10b981', padding: '6px 16px', fontSize: '0.85rem' }}>
            Submit Assessment
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ height: 4, background: '#e2e8f0', width: '100%' }}>
        <div style={{ height: '100%', width: `${progressPercent}%`, background: '#4f46e5', transition: 'width 0.3s ease' }} />
      </div>

      {/* ASSESSMENT CONTENT LAYOUT */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 280px', maxContent: '1200px', width: '100%', margin: '0 auto', overflow: 'hidden' }}>
        {/* MAIN QUESTION AREA */}
        <div style={{ padding: 36, overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* SCENARIO CONTEXT CARD */}
            {quizData.scenario?.context && (
              <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 12, padding: 20, marginBottom: 24, fontSize: '0.92rem', color: '#3730a3', lineHeight: 1.6 }}>
                <strong style={{ display: 'block', marginBottom: 4, color: '#312e81' }}>Scenario Context:</strong>
                {quizData.scenario.context}
              </div>
            )}

            {/* QUESTION TEXT */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 20, lineHeight: 1.4 }}>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h3>

            {/* RADIO OPTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {currentQuestion.options?.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQuestion.id] === optIndex;
                return (
                  <div
                    key={optIndex}
                    onClick={() => {
                      setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optIndex }));
                    }}
                    style={{
                      background: isSelected ? '#eef2ff' : '#ffffff',
                      border: `2px solid ${isSelected ? '#4f46e5' : '#cbd5e1'}`,
                      borderRadius: 10,
                      padding: '14px 18px',
                      fontSize: '0.95rem',
                      color: isSelected ? '#312e81' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#4f46e5' : '#94a3b8'}`,
                      background: isSelected ? '#4f46e5' : '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff' }} />}
                    </div>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: 20, marginTop: 24 }}>
            <button
              className="btn-secondary"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              <ArrowLeft size={16} /> Previous Question
            </button>

            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              Answered {answeredCount} of {questions.length} Questions
            </span>

            {currentQuestionIndex < questions.length - 1 ? (
              <button className="btn-primary" onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                Next Question <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={() => setShowSubmitConfirm(true)} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Review & Submit <Check size={16} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT QUESTION NAVIGATOR SIDEBAR */}
        <div style={{ background: '#ffffff', borderLeft: '1px solid #e2e8f0', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Question Navigator
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = currentQuestionIndex === idx;

              return (
                <button
                  key={q.id || idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  style={{
                    height: 42,
                    borderRadius: 8,
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: isCurrent ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                    background: isAnswered ? '#ecfdf5' : '#ffffff',
                    color: isAnswered ? '#065f46' : isCurrent ? '#4f46e5' : '#475569',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}
                >
                  {idx + 1} {isAnswered && <Check size={12} />}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', background: '#f8fafc', padding: 12, borderRadius: 8, fontSize: '0.78rem', color: '#64748b', border: '1px solid #e2e8f0' }}>
            🔒 Controlled exam mode active. Switching tabs or exiting fullscreen triggers security warnings.
          </div>
        </div>
      </div>

      {/* WARNING MODAL 1 */}
      {activeWarningModal === 1 && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 450, textAlign: 'center' }}>
            <div className="modal-body" style={{ padding: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <AlertTriangle size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400e', marginBottom: 8 }}>
                ⚠️ Assessment Warning (1 of 2)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#b45309', lineHeight: 1.5, marginBottom: 20 }}>
                You have left the controlled assessment environment. Your assessment timer is still active. Exiting the assessment environment again will terminate your attempt.
              </p>
              <button className="btn-primary" onClick={() => { setActiveWarningModal(null); try { document.documentElement.requestFullscreen(); } catch (e) {} }} style={{ width: '100%', justifyContent: 'center' }}>
                Return to Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WARNING MODAL 2 */}
      {activeWarningModal === 2 && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 450, textAlign: 'center' }}>
            <div className="modal-body" style={{ padding: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <ShieldAlert size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b', marginBottom: 8 }}>
                ⚠️ FINAL WARNING (2 of 2)
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#b91c1c', lineHeight: 1.5, marginBottom: 20 }}>
                You have left the assessment environment again. <strong>ONE MORE VIOLATION</strong> will immediately terminate this assessment and submit a security report to HR.
              </p>
              <button className="btn-primary" onClick={() => { setActiveWarningModal(null); try { document.documentElement.requestFullscreen(); } catch (e) {} }} style={{ background: '#ef4444', borderColor: '#ef4444', width: '100%', justifyContent: 'center' }}>
                Return to Assessment Immediately
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitConfirm && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 460 }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Submit Assessment Confirmation</h3>
            </div>
            <div className="modal-body" style={{ fontSize: '0.9rem', color: '#334155' }}>
              <p>Are you sure you want to submit your assessment answers for grading?</p>
              <div style={{ margin: '14px 0', background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1' }}>
                <div>Answered Questions: <strong>{answeredCount} / {questions.length}</strong></div>
                <div>Unanswered Questions: <strong>{questions.length - answeredCount}</strong></div>
              </div>
              {questions.length - answeredCount > 0 && (
                <div style={{ color: '#d97706', fontSize: '0.82rem', fontWeight: 700 }}>
                  ⚠️ Unanswered questions will be scored as incorrect.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowSubmitConfirm(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => calculateAndSaveAttempt('Normal Submission', warningCount)} style={{ background: '#10b981', borderColor: '#10b981' }}>
                Confirm & Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
