import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

export const QuizRunner = ({ quiz, onQuizPass, onQuizFail }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
        No quiz questions configured for this module.
      </div>
    );
  }

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    const hasPassed = calculatedScore >= (quiz.passScore || 80);

    setScore(calculatedScore);
    setPassed(hasPassed);
    setSubmitted(true);

    if (hasPassed) {
      onQuizPass(calculatedScore);
    } else {
      if (onQuizFail) onQuizFail(calculatedScore);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setPassed(false);
  };

  const allAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div style={{ background: '#ffffff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, borderBottom: '1px solid #f1f5f9', pb: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <HelpCircle color="#4f46e5" size={24} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Knowledge Verification Quiz</h3>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, background: '#eef2ff', color: '#4f46e5', padding: '4px 10px', borderRadius: 20 }}>
          Pass Mark: {quiz.passScore || 80}%
        </span>
      </div>

      {/* QUESTION LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {quiz.questions.map((q, qIndex) => {
          const selectedOpt = selectedAnswers[q.id];
          const isCorrect = selectedOpt === q.correctIndex;

          return (
            <div key={q.id} style={{ background: '#f8fafc', padding: 20, borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: 14 }}>
                {qIndex + 1}. {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((opt, optIndex) => {
                  let optStyle = {
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontSize: '0.9rem',
                    color: '#334155',
                    cursor: submitted ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  };

                  if (selectedOpt === optIndex) {
                    optStyle.borderColor = '#4f46e5';
                    optStyle.background = '#eef2ff';
                    optStyle.fontWeight = '700';
                  }

                  if (submitted) {
                    if (optIndex === q.correctIndex) {
                      optStyle.background = '#ecfdf5';
                      optStyle.borderColor = '#10b981';
                      optStyle.color = '#065f46';
                      optStyle.fontWeight = '700';
                    } else if (selectedOpt === optIndex && optIndex !== q.correctIndex) {
                      optStyle.background = '#fef2f2';
                      optStyle.borderColor = '#ef4444';
                      optStyle.color = '#991b1b';
                    }
                  }

                  return (
                    <div
                      key={optIndex}
                      style={optStyle}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                    >
                      <span>{opt}</span>
                      {submitted && optIndex === q.correctIndex && (
                        <CheckCircle2 size={18} color="#10b981" />
                      )}
                      {submitted && selectedOpt === optIndex && optIndex !== q.correctIndex && (
                        <XCircle size={18} color="#ef4444" />
                      )}
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div style={{
                  marginTop: 14,
                  padding: 12,
                  background: isCorrect ? '#ecfdf5' : '#fffbeb',
                  border: `1px solid ${isCorrect ? '#a7f3d0' : '#fde68a'}`,
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  color: isCorrect ? '#065f46' : '#92400e'
                }}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SUBMISSION / RESULT ACTIONS */}
      <div style={{ marginTop: 24, pt: 16, borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!submitted ? (
          <button
            className={`btn-primary ${!allAnswered ? 'btn-disabled' : ''}`}
            disabled={!allAnswered}
            onClick={handleSubmitQuiz}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Submit Quiz & Check Score
            <ArrowRight size={18} />
          </button>
        ) : (
          <div style={{ width: '100%' }}>
            <div style={{
              background: passed ? '#ecfdf5' : '#fef2f2',
              border: `1px solid ${passed ? '#a7f3d0' : '#fca5a5'}`,
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              textAlign: 'center'
            }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: passed ? '#065f46' : '#991b1b', marginBottom: 4 }}>
                {passed ? '🎉 Quiz Passed!' : '❌ Pass Condition Not Met'}
              </h4>
              <p style={{ fontSize: '0.9rem', color: passed ? '#047857' : '#b91c1c' }}>
                Your Score: <strong>{score}%</strong> (Required: {quiz.passScore || 80}%)
              </p>
            </div>

            {!passed && (
              <button className="btn-secondary" onClick={handleRetry} style={{ width: '100%', justifyContent: 'center' }}>
                <RotateCcw size={16} /> Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
