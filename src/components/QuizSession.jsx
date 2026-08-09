import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Maximize2, 
  Lock,
  Trophy,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

// Fisher-Yates Question Randomizer
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const QuizSession = ({ 
  title, 
  questions = [], 
  passScore = 80, 
  durationMinutes = 10, 
  isMajorAssessment = false,
  onCompleteQuiz, 
  onSaveAttempt 
}) => {
  // Shuffle questions once on mount
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(durationMinutes * 60);

  // Anti-cheating warning state
  const [warningsCount, setWarningsCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScoreResult, setQuizScoreResult] = useState(null);

  const timerRef = useRef(null);
  const lastBlurTimeRef = useRef(0);

  // Countdown timer effect
  useEffect(() => {
    if (isSubmitted || isTerminated) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmitQuiz(true); // Auto-submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted, isTerminated]);

  // Anti-cheating window exit monitor
  useEffect(() => {
    if (isSubmitted || isTerminated || !isMajorAssessment) return;

    const handleWindowBlur = () => {
      const now = Date.now();
      if (now - lastBlurTimeRef.current < 2000) return; // Debounce
      lastBlurTimeRef.current = now;

      setWarningsCount(prev => {
        const next = prev + 1;
        if (next >= 3) {
          setIsTerminated(true);
          clearInterval(timerRef.current);
          if (onSaveAttempt) {
            onSaveAttempt({
              status: 'TERMINATED',
              score: 0,
              warnings: 3,
              timestamp: new Date().toISOString()
            });
          }
        } else {
          setShowWarningModal(true);
        }
        return next;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleWindowBlur();
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSubmitted, isTerminated, isMajorAssessment]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex] || shuffledQuestions[0];
  const totalQuestions = shuffledQuestions.length;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted || isTerminated) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Submit Quiz & Calculate Score
  const handleSubmitQuiz = (isAutoTimeout = false) => {
    if (isSubmitted || isTerminated) return;
    clearInterval(timerRef.current);

    let correctCount = 0;
    shuffledQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected !== undefined && selected === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = calculatedScore >= passScore;

    const resultObj = {
      score: calculatedScore,
      correctCount,
      totalQuestions,
      isPassed,
      passScore,
      warnings: warningsCount,
      timestamp: new Date().toISOString()
    };

    setQuizScoreResult(resultObj);
    setIsSubmitted(true);

    if (onSaveAttempt) {
      onSaveAttempt({
        status: isPassed ? 'PASSED' : 'FAILED',
        score: calculatedScore,
        passScore,
        warnings: warningsCount,
        timestamp: new Date().toISOString()
      });
    }

    if (onCompleteQuiz) {
      onCompleteQuiz(calculatedScore, isPassed);
    }
  };

  // 1. TERMINATED SECURITY SCREEN
  if (isTerminated) {
    return (
      <div style={{ maxWidth: 650, margin: '40px auto', background: '#ffffff', borderRadius: 16, border: '2px solid #fca5a5', padding: 32, textAlign: 'center', boxShadow: '0 10px 25px rgba(239,68,68,0.15)' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <ShieldAlert size={40} />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '4px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
          ● ASSESSMENT SECURITY TERMINATION
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
          Assessment Session Terminated
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: 500, margin: '0 auto 20px auto', lineHeight: 1.6 }}>
          You have exited the controlled assessment window 3 times during active evaluation. In accordance with TrainFlow integrity policy, this session has been locked.
        </p>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 14, borderRadius: 10, fontSize: '0.85rem', color: '#475569', textAlign: 'left', marginBottom: 24 }}>
          <div>Security Violations Recorded: <strong>3 Warnings Triggered</strong></div>
          <div>Audit Log Event: <strong>ASSESSMENT_TERMINATED</strong></div>
          <div>Branch Manager Notification: <strong>Sent to Amit Shah (Ahmedabad Hub)</strong></div>
        </div>
        <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#dc2626', borderColor: '#dc2626' }}>
          <RotateCcw size={16} /> Return to Onboarding Portal
        </button>
      </div>
    );
  }

  // 2. POST-QUIZ RESULTS & ANSWER EXPLANATIONS BREAKDOWN SCREEN
  if (isSubmitted && quizScoreResult) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#ffffff', borderRadius: 16, border: '1px solid #cbd5e1', padding: 32, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
        {/* SCORE HEADER BANNER */}
        <div style={{
          background: quizScoreResult.isPassed ? 'linear-gradient(135deg, #065f46 0%, #047857 100%)' : 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
          color: '#ffffff',
          borderRadius: 14,
          padding: 24,
          textAlign: 'center',
          marginBottom: 28
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
            {quizScoreResult.isPassed ? <Trophy size={36} color="#ffffff" /> : <XCircle size={36} color="#ffffff" />}
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 4px 0' }}>
            {quizScoreResult.isPassed ? 'Assessment Passed! 🎉' : 'Assessment Not Passed'}
          </h2>

          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: 14 }}>
            {quizScoreResult.isPassed 
              ? `Congratulations! You scored ${quizScoreResult.score}% (Required: ${quizScoreResult.passScore}%). +150 XP Earned!` 
              : `Your score: ${quizScoreResult.score}% (Required pass score: ${quizScoreResult.passScore}%). Review answer explanations below.`}
          </div>

          <div style={{ display: 'inline-flex', gap: 16, background: 'rgba(0,0,0,0.2)', padding: '8px 20px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Score: {quizScoreResult.score}%</span>
            <span>•</span>
            <span>Correct: {quizScoreResult.correctCount} / {quizScoreResult.totalQuestions}</span>
            <span>•</span>
            <span>Warnings: {quizScoreResult.warnings}</span>
          </div>
        </div>

        {/* DETAILED QUESTION-BY-QUESTION EXPLANATIONS BREAKDOWN */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={20} color="#4f46e5" /> Educational Explanations & Answer Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {shuffledQuestions.map((q, idx) => {
              const userSelected = selectedAnswers[idx];
              const isCorrect = userSelected === q.correctIndex;

              return (
                <div key={idx} style={{ background: '#f8fafc', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fca5a5'}`, borderRadius: 12, padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', flex: 1 }}>
                      Q{idx + 1}: {q.question}
                    </div>
                    <span className={`status-badge ${isCorrect ? 'status-completed' : 'status-needs-attention'}`}>
                      {isCorrect ? '✓ Correct (+15 XP)' : '✕ Incorrect'}
                    </span>
                  </div>

                  {/* OPTIONS LIST */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '10px 0', fontSize: '0.85rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionSelected = optIdx === userSelected;

                      let optBg = '#ffffff';
                      let optBorder = '#cbd5e1';
                      let optColor = '#334155';

                      if (isOptionCorrect) {
                        optBg = '#ecfdf5';
                        optBorder = '#6ee7b7';
                        optColor = '#065f46';
                      } else if (isOptionSelected && !isCorrect) {
                        optBg = '#fef2f2';
                        optBorder = '#fca5a5';
                        optColor = '#991b1b';
                      }

                      return (
                        <div key={optIdx} style={{ padding: '8px 12px', background: optBg, border: `1px solid ${optBorder}`, borderRadius: 8, color: optColor, fontWeight: isOptionCorrect || isOptionSelected ? 700 : 500 }}>
                          {String.fromCharCode(65 + optIdx)}. {opt} {isOptionCorrect && ' (Correct Answer ✓)'} {isOptionSelected && !isOptionCorrect && ' (Your Selection)'}
                        </div>
                      );
                    })}
                  </div>

                  {/* EDUCATIONAL EXPLANATION NOTE */}
                  <div style={{ background: '#ffffff', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem', color: '#475569', marginTop: 8 }}>
                    <strong style={{ color: '#4f46e5' }}>Key Learning Takeaway:</strong> {q.explanation || 'Review operational procedures and TrainFlow standard guidelines.'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BUTTON ACTION */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary" onClick={() => window.location.reload()} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            <CheckCircle2 size={18} /> Continue Onboarding Curriculum
          </button>
        </div>
      </div>
    );
  }

  // 3. ACTIVE QUIZ SESSION INTERFACE
  return (
    <div style={{ maxWidth: 850, margin: '0 auto', background: '#ffffff', borderRadius: 16, border: '1px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
      {/* WARNING MODAL */}
      {showWarningModal && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="modal-card" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#d97706', fontWeight: 800 }}>
                <AlertTriangle size={22} /> ASSESSMENT INTEGRITY WARNING
              </div>
            </div>
            <div className="modal-body" style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
              <p style={{ fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>
                Warning {warningsCount} of 2: Window Exit Detected!
              </p>
              <p>
                Switching browser tabs or leaving the active assessment window violates TrainFlow security policy.
              </p>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: 10, borderRadius: 8, color: '#b45309', marginTop: 10, fontSize: '0.82rem' }}>
                ⚠️ Triggering 3 warnings will result in immediate session termination.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setShowWarningModal(false)}>
                Return to Assessment Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ HEADER BAR */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#ffffff', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            {isMajorAssessment ? '🔒 HIGH-STAKES FINAL ASSESSMENT' : '🎯 SITUATIONAL KNOWLEDGE QUIZ'}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            {title}
          </h3>
        </div>

        {/* TIMER DISPLAY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: timeLeftSeconds < 120 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.15)', border: `1px solid ${timeLeftSeconds < 120 ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`, padding: '6px 14px', borderRadius: 20, fontWeight: 800, fontSize: '0.95rem' }}>
          <Clock size={16} color={timeLeftSeconds < 120 ? '#fca5a5' : '#ffffff'} />
          <span style={{ color: timeLeftSeconds < 120 ? '#fca5a5' : '#ffffff' }}>{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      {/* QUESTION NAVIGATOR PILLS BAR */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginRight: 8 }}>Navigator:</span>
        {shuffledQuestions.map((_, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCurrent = idx === currentQuestionIndex;

          return (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 800,
                border: '1px solid',
                borderColor: isCurrent ? '#4f46e5' : isAnswered ? '#10b981' : '#cbd5e1',
                background: isCurrent ? '#4f46e5' : isAnswered ? '#ecfdf5' : '#ffffff',
                color: isCurrent ? '#ffffff' : isAnswered ? '#047857' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* MAIN QUESTION & OPTIONS CARD */}
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: '0.85rem', color: '#64748b' }}>
          <span style={{ fontWeight: 800, color: '#4f46e5' }}>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>Pass Score Threshold: <strong>{passScore}%</strong></span>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: 20, lineHeight: 1.4 }}>
          {currentQuestion.question}
        </h3>

        {/* OPTIONS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {currentQuestion.options.map((optionText, optionIdx) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === optionIdx;

            return (
              <div
                key={optionIdx}
                onClick={() => handleSelectOption(optionIdx)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? '#4f46e5' : '#e2e8f0'}`,
                  background: isSelected ? '#eef2ff' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? '#4f46e5' : '#cbd5e1'}`,
                  background: isSelected ? '#4f46e5' : '#ffffff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  {String.fromCharCode(65 + optionIdx)}
                </div>

                <div style={{ fontSize: '0.92rem', color: isSelected ? '#3730a3' : '#0f172a', fontWeight: isSelected ? 700 : 500 }}>
                  {optionText}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
          <button
            className="btn-secondary"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft size={16} /> Previous Question
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              className="btn-primary"
              onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
            >
              Next Question <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => handleSubmitQuiz(false)}
              style={{ background: '#10b981', borderColor: '#10b981' }}
            >
              <CheckCircle2 size={16} /> Submit & Calculate Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
