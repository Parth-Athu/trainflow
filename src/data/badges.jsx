import React from 'react';

export const BADGES_CATALOG = [
  {
    id: 'video_novice',
    title: 'Video Apprentice 🎬',
    category: 'Video Completion',
    description: 'Completed your first video training module with verified watch time.',
    color: '#4f46e5',
    bg: '#eef2ff',
    border: '#c7d2fe',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad1)" />
        <path d="M12 14H24C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26H12C10.9 26 10 25.1 10 24V16C10 14.9 10.9 14 12 14Z" fill="#ffffff" opacity="0.9" />
        <path d="M26 19L30 16V24L26 21V19Z" fill="#ffffff" />
        <circle cx="18" cy="20" r="3" fill="#4f46e5" />
        <defs>
          <linearGradient id="bGrad1" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'video_master',
    title: 'Video Master 📺',
    category: 'Video Mastery',
    description: 'Successfully completed all assigned video modules in your onboarding curriculum.',
    color: '#6366f1',
    bg: '#e0e7ff',
    border: '#a5b4fc',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad2)" />
        <rect x="9" y="12" width="22" height="15" rx="3" fill="#ffffff" opacity="0.9" />
        <path d="M15 29L25 29" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16.5L23 19.5L18 22.5V16.5Z" fill="#6366f1" />
        <circle cx="28" cy="11" r="3" fill="#fef08a" />
        <defs>
          <linearGradient id="bGrad2" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'checkpoint_pro',
    title: 'Checkpoint Pro ⚡',
    category: 'Interactive Checkpoints',
    description: 'Cleared mid-video 2-minute interactive knowledge checkpoints without skipping.',
    color: '#3b82f6',
    bg: '#dbeafe',
    border: '#93c5fd',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad3)" />
        <path d="M22 10L12 22H20L18 30L28 18H20L22 10Z" fill="#ffffff" />
        <defs>
          <linearGradient id="bGrad3" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'policy_champion',
    title: 'Policy Champion 📜',
    category: 'Compliance',
    description: 'Verified Code of Conduct, Data Security, and Core Company Values.',
    color: '#10b981',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad4)" />
        <path d="M20 10L28 14V20C28 25 24.5 29 20 30.5C15.5 29 12 25 12 20V14L20 10Z" fill="#ffffff" opacity="0.9" />
        <path d="M17 20L19.5 22.5L23.5 17.5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="bGrad4" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'streak_flame',
    title: 'Streak Flame 🔥',
    category: 'Consistency',
    description: 'Maintained an active 4-day learning streak in TrainFlow.',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad5)" />
        <path d="M21 10C21 10 24 13 24 16C24 18 22.5 19.5 21 21C22 21 26 20 26 16C26 23 20 29 15 24C14 23 13.5 21.5 13.5 20C13.5 17 16 14.5 17.5 13C18 14 18.5 15 18.5 16C19.5 14 21 10 21 10Z" fill="#ffffff" />
        <defs>
          <linearGradient id="bGrad5" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace 🎯',
    category: 'Assessment Excellence',
    description: 'Scored 90% or higher on a situational quiz or major assessment.',
    color: '#ec4899',
    bg: '#fce7f3',
    border: '#fbcfe8',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad6)" />
        <circle cx="20" cy="20" r="10" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="6" fill="#ffffff" />
        <circle cx="20" cy="20" r="3" fill="#ec4899" />
        <defs>
          <linearGradient id="bGrad6" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'practical_star',
    title: 'Practical Star 🛠️',
    category: 'Practical Skills',
    description: 'Submitted a practical assignment that was approved by your Branch Manager (Grade: A+).',
    color: '#8b5cf6',
    bg: '#f3e8ff',
    border: '#ddd6fe',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad7)" />
        <path d="M14 14L22 22M26 14L18 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="20,10 22,15 27,15 23,18 24,23 20,20 16,23 17,18 13,15 18,15" fill="#fef08a" />
        <defs>
          <linearGradient id="bGrad7" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'live_participant',
    title: 'Live Session Star 🤝',
    category: 'Manager Mentorship',
    description: 'Completed live operational session with digital sign-off from Branch Manager.',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad8)" />
        <path d="M13 22C13 22 15 20 18 22C21 24 23 22 25 21L28 24C28 24 24 28 20 26C16 24 14 26 13 22Z" fill="#ffffff" opacity="0.9" />
        <circle cx="15" cy="15" r="3" fill="#ffffff" />
        <circle cx="25" cy="15" r="3" fill="#ffffff" />
        <defs>
          <linearGradient id="bGrad8" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'graduate_master',
    title: 'Verified Graduate 🏆',
    category: 'Program Completion',
    description: 'Officially certified by Branch Manager and earned verified Certificate of Completion.',
    color: '#059669',
    bg: '#d1fae5',
    border: '#6ee7b7',
    svgIcon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#bGrad9)" />
        <path d="M12 15L20 11L28 15L20 19L12 15Z" fill="#ffffff" />
        <path d="M15 18V24C15 25.5 17.5 27 20 27C22.5 27 25 25.5 25 24V18" stroke="#ffffff" strokeWidth="2" />
        <path d="M28 16.5V23.5" stroke="#fef08a" strokeWidth="2" />
        <defs>
          <linearGradient id="bGrad9" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export const getRecruitBadges = (recruit) => {
  if (!recruit) return [];

  const completedIds = recruit.completedModuleIds || [];
  const quizScores = Object.values(recruit.quizScores || {});
  const signOffs = recruit.signOffs || {};
  const activitySub = recruit.activitySubmissions || {};

  const videoNoviceUnlocked = completedIds.some(id => ['M-C01', 'M-S01', 'M-O01', 'M-M01'].includes(id));
  const videoCompletedCount = completedIds.filter(id => ['M-C01', 'M-S01', 'M-O01', 'M-M01', 'M-D01'].includes(id)).length;
  const videoMasterUnlocked = videoCompletedCount >= 3;
  const checkpointUnlocked = completedIds.length >= 2;
  const policyUnlocked = completedIds.includes('M-C02') || completedIds.includes('M-C01');
  const streakUnlocked = (recruit.streakDays || 0) >= 3;
  const maxQuizScore = quizScores.length > 0 ? Math.max(...quizScores) : 0;
  const quizAceUnlocked = maxQuizScore >= 90;
  const hasApprovedActivity = Object.values(activitySub).some(sub => sub.status === 'APPROVED');
  const hasLiveSignOff = Object.keys(signOffs).length > 0 || completedIds.includes('M-S04');
  const graduateUnlocked = recruit.isCertified || recruit.certificationStatus === 'CERTIFIED';

  return BADGES_CATALOG.map(badge => {
    let isUnlocked = false;

    if (badge.id === 'video_novice') isUnlocked = videoNoviceUnlocked;
    if (badge.id === 'video_master') isUnlocked = videoMasterUnlocked;
    if (badge.id === 'checkpoint_pro') isUnlocked = checkpointUnlocked;
    if (badge.id === 'policy_champion') isUnlocked = policyUnlocked;
    if (badge.id === 'streak_flame') isUnlocked = streakUnlocked;
    if (badge.id === 'quiz_ace') isUnlocked = quizAceUnlocked;
    if (badge.id === 'practical_star') isUnlocked = hasApprovedActivity;
    if (badge.id === 'live_participant') isUnlocked = hasLiveSignOff;
    if (badge.id === 'graduate_master') isUnlocked = graduateUnlocked;

    return {
      ...badge,
      isUnlocked,
      unlockedAt: isUnlocked ? (recruit.certifiedAt || '2026-08-09') : null
    };
  });
};
