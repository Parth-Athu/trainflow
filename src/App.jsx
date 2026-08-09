import React, { useState, useEffect } from 'react';
import { 
  getStoredRecruits, 
  saveRecruits, 
  getStoredRules, 
  saveRules, 
  getActiveUserSession, 
  setActiveUserSession, 
  resetAllDemoData,
  registerNewRecruit,
  approveRecruitByManager,
  issueRecruitCertificate,
  rejectRecruitApplication
} from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { Toast } from './components/Toast';
import { Login } from './pages/Login';
import { RecruitDashboard } from './pages/RecruitDashboard';
import { RecruitProfile } from './pages/RecruitProfile';
import { AchievementsView } from './pages/AchievementsView';
import { ModulePage } from './pages/ModulePage';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { HRDashboard } from './pages/HRDashboard';
import { PendingApprovalView } from './pages/PendingApprovalView';
import { CertificateView } from './components/CertificateView';
import { getLearningPath, isModuleCompleted, calculateRecruitProgress } from './utils/learningEngine';

export function App() {
  const [recruits, setRecruits] = useState(() => getStoredRecruits());
  const [rules, setRules] = useState(() => getStoredRules());
  const [activeUser, setActiveUser] = useState(() => getActiveUserSession());
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [activeModule, setActiveModule] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // SIDEBAR COLLAPSE & MOBILE DRAWER STATE
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
  };

  // Sync state to LocalStorage
  useEffect(() => {
    saveRecruits(recruits);
  }, [recruits]);

  useEffect(() => {
    saveRules(rules);
  }, [rules]);

  useEffect(() => {
    setActiveUserSession(activeUser);
  }, [activeUser]);

  // Current active recruit object
  const currentRecruit = recruits.find(r => r.id === (activeUser.recruitId || 'R-01')) || recruits[0];
  const pendingApprovalsCount = recruits.filter(r => 
    r.approvalStatus === 'PENDING_BRANCH_APPROVAL' || 
    r.approvalStatus === 'PENDING_HR_APPROVAL' ||
    r.status === 'Pending Branch Approval'
  ).length;

  // User Switcher / Auth Presets Handler
  const handleSwitchUser = (userObj) => {
    setActiveUser(userObj);
    setIsLoggedOut(false);
    setCurrentTab('dashboard');
    setActiveModule(null);
  };

  // Login Success Handler
  const handleLoginSuccess = (email, password, selectedRole) => {
    const found = recruits.find(r => r.email.toLowerCase() === email.toLowerCase());

    if (selectedRole === 'manager' || email.includes('manager')) {
      handleSwitchUser({ role: 'manager', name: 'Amit Shah (Branch Manager)' });
      showToast('Logged in as Ahmedabad Branch Manager', 'success');
    } else if (selectedRole === 'trainer' || email.includes('trainer')) {
      handleSwitchUser({ role: 'trainer', name: 'Regional Trainer' });
      showToast('Logged in as Field Trainer', 'success');
    } else if (selectedRole === 'hr' || email.includes('hr')) {
      handleSwitchUser({ role: 'hr', name: 'HQ HR Operations' });
      showToast('Logged in as HR Admin', 'success');
    } else if (found) {
      handleSwitchUser({ role: 'recruit', recruitId: found.id, name: `${found.name} (${found.id})` });
      showToast(`Welcome back, ${found.name}!`, 'success');
    } else {
      handleSwitchUser({ role: 'recruit', recruitId: 'R-01', name: 'Priya Sharma (R-01)' });
      showToast('Logged in as Priya Sharma', 'success');
    }
  };

  // Registration Success Handler
  const handleRegisterSuccess = (formData) => {
    const res = registerNewRecruit(formData);
    if (res.success && res.recruit) {
      setRecruits(getStoredRecruits());
      handleSwitchUser({ role: 'recruit', recruitId: res.recruit.id, name: `${res.recruit.name} (${res.recruit.id})` });
      showToast('Registration submitted! Application sent to Branch Manager for approval.', 'info');
    } else {
      showToast(res.message || 'Registration failed', 'error');
    }
  };

  // Branch Manager Approve Recruit Handler
  const handleApproveRecruitByManager = (recruitId, confirmedRole, confirmedLevel, reviewerName) => {
    const updated = approveRecruitByManager(recruitId, confirmedRole, confirmedLevel, reviewerName);
    setRecruits(updated);
    showToast('Recruit Approved! Learning path automatically generated. Day 1 is now available.', 'success');
  };

  // Issue Certificate Handler
  const handleIssueCertificate = (recruitId, issuerName, issuerRole, overrideReason) => {
    const updated = issueRecruitCertificate(recruitId, issuerName, issuerRole, overrideReason);
    setRecruits(updated);
    showToast('Official Certificate Issued! Training Access Closed.', 'success');
  };

  // HR Reject Recruit Handler
  const handleRejectRecruit = (recruitId) => {
    const updated = rejectRecruitApplication(recruitId);
    setRecruits(updated);
    showToast('Recruit registration application rejected.', 'error');
  };

  // Award XP Handler
  const handleAwardXP = (amount, reason) => {
    if (!currentRecruit || amount <= 0) {
      if (reason) showToast(reason, 'info');
      return;
    }

    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== currentRecruit.id) return rec;
        return {
          ...rec,
          points: (rec.points || 0) + amount
        };
      });
    });

    if (reason) showToast(`+${amount} XP Earned! ${reason}`, 'success');
  };

  // Assessment Attempt Persistence Handler
  const handleSaveAssessmentAttempt = (moduleId, attemptObj, isPassed) => {
    if (!currentRecruit) return;

    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== currentRecruit.id) return rec;

        const existingAttempts = rec.assessmentAttempts?.[moduleId] || [];
        const updatedAttemptsMap = {
          ...(rec.assessmentAttempts || {}),
          [moduleId]: [...existingAttempts, attemptObj]
        };

        let updatedCompleted = rec.completedModuleIds || [];
        let addedPoints = 0;
        if (isPassed) {
          updatedCompleted = Array.from(new Set([...updatedCompleted, moduleId]));
          addedPoints = 150;
        }

        const updatedQuizScores = {
          ...(rec.quizScores || {}),
          [moduleId]: attemptObj.score
        };

        return {
          ...rec,
          assessmentAttempts: updatedAttemptsMap,
          completedModuleIds: updatedCompleted,
          quizScores: updatedQuizScores,
          points: (rec.points || 0) + addedPoints
        };
      });
    });

    if (attemptObj.status === 'TERMINATED') {
      showToast('Assessment Terminated! Exited assessment window 2 times.', 'error');
    } else if (isPassed) {
      showToast(`Assessment Passed! Score: ${attemptObj.score}% (+150 XP)`, 'success');
    } else {
      showToast(`Assessment Not Passed. Score: ${attemptObj.score}% (Pass: ${attemptObj.passScore}%)`, 'error');
    }
  };

  // Module Completion Handler (UNLOCKS BADGES & AWARDS XP)
  const handleCompleteModule = (moduleId, quizScore) => {
    if (!currentRecruit) return;

    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== currentRecruit.id) return rec;

        const updatedCompleted = Array.from(new Set([...(rec.completedModuleIds || []), moduleId]));
        const updatedQuizScores = quizScore !== undefined 
          ? { ...(rec.quizScores || {}), [moduleId]: quizScore }
          : (rec.quizScores || {});

        return {
          ...rec,
          completedModuleIds: updatedCompleted,
          quizScores: updatedQuizScores,
          points: (rec.points || 0) + 100
        };
      });
    });
    showToast('Module complete! +100 XP Earned & Badge Unlocked in Achievements! 🎉', 'success');
  };

  // Activity Submission Handler
  const handleSubmitActivity = (moduleId, activityData) => {
    if (!currentRecruit) return;

    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== currentRecruit.id) return rec;

        return {
          ...rec,
          activitySubmissions: {
            ...(rec.activitySubmissions || {}),
            [moduleId]: activityData
          }
        };
      });
    });
    showToast('Practical activity submitted for Manager review!', 'success');
  };

  // Manager Activity Grading Handler
  const handleGradeActivity = (recruitId, moduleId, gradeObj) => {
    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== recruitId) return rec;

        const existingSub = rec.activitySubmissions?.[moduleId] || {};
        const updatedSubmissions = {
          ...(rec.activitySubmissions || {}),
          [moduleId]: {
            ...existingSub,
            ...gradeObj
          }
        };

        let updatedCompleted = rec.completedModuleIds || [];
        let addedPoints = 0;
        if (gradeObj.status === 'APPROVED') {
          updatedCompleted = Array.from(new Set([...updatedCompleted, moduleId]));
          addedPoints = 120;
        }

        return {
          ...rec,
          activitySubmissions: updatedSubmissions,
          completedModuleIds: updatedCompleted,
          points: (rec.points || 0) + addedPoints
        };
      });
    });
    showToast(`Assignment ${gradeObj.status === 'APPROVED' ? 'Approved & Graded (+120 XP) — Practical Star Badge Unlocked!' : 'Revision Requested'}`, 'success');
  };

  // Live Module Sign-off Handler
  const handleSignOffLive = (recruitId, moduleId, signedBy) => {
    setRecruits(prevRecruits => {
      return prevRecruits.map(rec => {
        if (rec.id !== recruitId) return rec;

        const updatedSignOffs = {
          ...(rec.signOffs || {}),
          [moduleId]: {
            signedBy: signedBy || 'Branch Manager',
            signedAt: new Date().toISOString()
          }
        };

        const updatedCompleted = Array.from(new Set([...(rec.completedModuleIds || []), moduleId]));

        return {
          ...rec,
          signOffs: updatedSignOffs,
          completedModuleIds: updatedCompleted,
          points: (rec.points || 0) + 100
        };
      });
    });
    showToast('Live session sign-off recorded! (+100 XP) — Live Session Star Badge Unlocked!', 'success');
  };

  // HR Rules Save Handler
  const handleSaveRules = (newRules) => {
    setRules(newRules);
    showToast('Training Rule Matrix saved & deployed!', 'success');
  };

  if (isLoggedOut) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
        onQuickLoginPreset={handleSwitchUser}
      />
    );
  }

  // Check if active recruit is pending approval
  const isPendingApproval = activeUser.role === 'recruit' && (
    currentRecruit?.approvalStatus === 'PENDING_BRANCH_APPROVAL' || 
    currentRecruit?.approvalStatus === 'PENDING_HR_APPROVAL' ||
    currentRecruit?.status === 'Pending Branch Approval'
  );

  return (
    <div className="app-container">
      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="main-layout">
        {/* FIXED SIDEBAR */}
        <Sidebar
          activeUser={activeUser}
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setActiveModule(null);
          }}
          recruit={currentRecruit}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* MAIN CONTENT AREA */}
        <div className={`content-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <TopNavbar
            title={
              activeModule 
                ? activeModule.title 
                : isPendingApproval
                ? 'Registration Pending Branch Approval'
                : currentTab === 'quiz'
                ? 'Interactive Situational Quiz Session'
                : currentTab === 'profile'
                ? 'Recruit Employee Profile'
                : currentTab === 'achievements'
                ? 'Achievements & Badge Showcase'
                : currentTab === 'certificate' 
                ? 'Official Certificate of Completion'
                : activeUser.role === 'recruit' 
                ? 'Recruit Onboarding Dashboard' 
                : activeUser.role === 'manager' 
                ? 'Branch Command Center & Team Progress'
                : activeUser.role === 'trainer'
                ? 'Trainer Operations & Field Sign-offs'
                : 'National Training Command Center'
            }
            activeUser={activeUser}
            recruit={currentRecruit}
            onLogout={() => {
              setIsLoggedOut(true);
              showToast('Signed out of TrainFlow', 'info');
            }}
            pendingApprovalsCount={pendingApprovalsCount}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* PAGE ROUTING */}
          {activeModule ? (
            <ModulePage
              module={activeModule}
              recruit={currentRecruit}
              onBack={() => setActiveModule(null)}
              onCompleteModule={handleCompleteModule}
              onSubmitActivity={handleSubmitActivity}
              onTriggerSignOff={(modId, signedBy) => handleSignOffLive(currentRecruit.id, modId, signedBy)}
              onSaveAssessmentAttempt={handleSaveAssessmentAttempt}
              onAwardXP={handleAwardXP}
            />
          ) : activeUser.role === 'recruit' ? (
            isPendingApproval ? (
              <PendingApprovalView
                recruit={currentRecruit}
                onSimulateHRApprove={(recId) => handleApproveRecruitByManager(recId, 'Sales Executive', 'Junior', 'Ahmedabad Branch Manager')}
              />
            ) : currentTab === 'quiz' ? (
              <ModulePage
                module={getLearningPath(currentRecruit, rules).find(m => m.id === 'M-C03') || getLearningPath(currentRecruit, rules)[2]}
                recruit={currentRecruit}
                onBack={() => setCurrentTab('dashboard')}
                onCompleteModule={handleCompleteModule}
                onSubmitActivity={handleSubmitActivity}
                onTriggerSignOff={(modId, signedBy) => handleSignOffLive(currentRecruit.id, modId, signedBy)}
                onSaveAssessmentAttempt={handleSaveAssessmentAttempt}
                onAwardXP={handleAwardXP}
              />
            ) : currentTab === 'profile' ? (
              <RecruitProfile
                recruit={currentRecruit}
                rules={rules}
                onNavigateTab={(tab) => setCurrentTab(tab)}
              />
            ) : currentTab === 'achievements' ? (
              <AchievementsView
                recruit={currentRecruit}
                onNavigateTab={(tab) => setCurrentTab(tab)}
              />
            ) : currentTab === 'certificate' ? (
              <div className="page-container">
                <CertificateView recruit={currentRecruit} />
              </div>
            ) : (
              <RecruitDashboard
                recruit={currentRecruit}
                rules={rules}
                onOpenModule={(mod) => setActiveModule(mod)}
                onNavigateToCert={() => setCurrentTab('certificate')}
              />
            )
          ) : activeUser.role === 'manager' || activeUser.role === 'trainer' ? (
            <ManagerDashboard
              recruits={recruits}
              rules={rules}
              onGradeActivity={handleGradeActivity}
              onSignOffLive={handleSignOffLive}
              onApproveRecruitByManager={handleApproveRecruitByManager}
              onIssueCertificate={handleIssueCertificate}
              activeSubTab={currentTab}
            />
          ) : (
            <HRDashboard
              rules={rules}
              onSaveRules={handleSaveRules}
              recruits={recruits}
              onApproveRecruit={(recId) => handleApproveRecruitByManager(recId, 'Sales Executive', 'Junior', 'HQ HR Operations')}
              onRejectRecruit={handleRejectRecruit}
              onIssueCertificate={handleIssueCertificate}
              activeSubTab={currentTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
