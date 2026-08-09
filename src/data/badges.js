import React from 'react';
import { 
  Video, 
  Tv, 
  Target, 
  ShieldCheck, 
  Flame, 
  Trophy, 
  FileCheck2, 
  Users, 
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const BADGES_CATALOG = [
  {
    id: 'video_novice',
    title: 'Video Apprentice 🎬',
    category: 'Video Completion',
    description: 'Completed your first video training module with verified watch time.',
    icon: 'Video',
    color: '#4f46e5',
    bg: '#eef2ff',
    border: '#c7d2fe'
  },
  {
    id: 'video_master',
    title: 'Video Master 📺',
    category: 'Video Mastery',
    description: 'Successfully completed all assigned video modules in your onboarding curriculum.',
    icon: 'Tv',
    color: '#6366f1',
    bg: '#e0e7ff',
    border: '#a5b4fc'
  },
  {
    id: 'checkpoint_pro',
    title: 'Checkpoint Pro ⚡',
    category: 'Interactive Checkpoints',
    description: 'Cleared mid-video 2-minute interactive knowledge checkpoints without skipping.',
    icon: 'Zap',
    color: '#3b82f6',
    bg: '#dbeafe',
    border: '#93c5fd'
  },
  {
    id: 'policy_champion',
    title: 'Policy Champion 📜',
    category: 'Compliance',
    description: 'Verified Code of Conduct, Data Security, and Core Company Values.',
    icon: 'ShieldCheck',
    color: '#10b981',
    bg: '#ecfdf5',
    border: '#a7f3d0'
  },
  {
    id: 'streak_flame',
    title: 'Streak Flame 🔥',
    category: 'Consistency',
    description: 'Maintained an active 4-day learning streak in TrainFlow.',
    icon: 'Flame',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa'
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace 🎯',
    category: 'Assessment Excellence',
    description: 'Scored 90% or higher on a situational quiz or major assessment.',
    icon: 'Target',
    color: '#ec4899',
    bg: '#fce7f3',
    border: '#fbcfe8'
  },
  {
    id: 'practical_star',
    title: 'Practical Star 🛠️',
    category: 'Practical Skills',
    description: 'Submitted a practical assignment that was approved by your Branch Manager (Grade: A+).',
    icon: 'FileCheck2',
    color: '#8b5cf6',
    bg: '#f3e8ff',
    border: '#ddd6fe'
  },
  {
    id: 'live_participant',
    title: 'Live Session Star 🤝',
    category: 'Manager Mentorship',
    description: 'Completed live operational session with digital sign-off from Branch Manager.',
    icon: 'Users',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a'
  },
  {
    id: 'graduate_master',
    title: 'Verified Graduate 🏆',
    category: 'Program Completion',
    description: 'Officially certified by Branch Manager and earned verified Certificate of Completion.',
    icon: 'Award',
    color: '#059669',
    bg: '#d1fae5',
    border: '#6ee7b7'
  }
];

/**
 * CALCULATES UNLOCKED BADGES FOR A RECRUIT DYNAMICALLY
 */
export const getRecruitBadges = (recruit) => {
  if (!recruit) return [];

  const completedIds = recruit.completedModuleIds || [];
  const quizScores = Object.values(recruit.quizScores || {});
  const signOffs = recruit.signOffs || {};
  const activitySub = recruit.activitySubmissions || {};

  // Check Video Novice (1 video completed)
  const videoNoviceUnlocked = completedIds.some(id => ['M-C01', 'M-S01', 'M-O01', 'M-M01'].includes(id));
  
  // Check Video Master (3+ videos completed)
  const videoCompletedCount = completedIds.filter(id => ['M-C01', 'M-S01', 'M-O01', 'M-M01', 'M-D01'].includes(id)).length;
  const videoMasterUnlocked = videoCompletedCount >= 3;

  // Check Checkpoint Pro (mid-video checkpoints cleared)
  const checkpointUnlocked = completedIds.length >= 2;

  // Check Policy Champion
  const policyUnlocked = completedIds.includes('M-C02') || completedIds.includes('M-C01');

  // Check Streak Flame
  const streakUnlocked = (recruit.streakDays || 0) >= 3;

  // Check Quiz Ace (Score >= 90%)
  const maxQuizScore = quizScores.length > 0 ? Math.max(...quizScores) : 0;
  const quizAceUnlocked = maxQuizScore >= 90;

  // Check Practical Star
  const hasApprovedActivity = Object.values(activitySub).some(sub => sub.status === 'APPROVED');

  // Check Live Participant
  const hasLiveSignOff = Object.keys(signOffs).length > 0 || completedIds.includes('M-S04');

  // Check Graduate Master
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
