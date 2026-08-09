import { MODULES_CATALOG } from '../data/modules';
import { DEFAULT_ROLE_RULES, FALLBACK_RULE } from '../data/rules';

/**
 * CORE RULE ENGINE FUNCTION
 * Evaluates recruit Role + Level against centralized rules.
 * Automatically determines track assignment and required sub-modules.
 */
export const getLearningPath = (recruit, rules = DEFAULT_ROLE_RULES, catalogModules = MODULES_CATALOG) => {
  if (!recruit) {
    const emptyList = [];
    emptyList.day1 = [];
    emptyList.day2 = [];
    emptyList.day3 = [];
    emptyList.day4 = [];
    emptyList.assignedTracks = ["core", "final"];
    emptyList.matchedRule = { role: 'Unknown', level: 'Unknown', tracks: ["core"] };
    return emptyList;
  }

  const role = recruit.role || "Customer Support";
  const level = recruit.level || "Junior";

  let ruleMatch = null;
  let assignedTrackKeys = ["core"];

  if (recruit.customTracks && Array.isArray(recruit.customTracks)) {
    assignedTrackKeys = Array.from(new Set([...recruit.customTracks, "core"]));
    ruleMatch = { role, level, tracks: assignedTrackKeys, levelDesc: "HR Custom Override" };
  } else if (rules[role] && rules[role][level]) {
    ruleMatch = rules[role][level];
    assignedTrackKeys = ruleMatch.tracks || ["core"];
  } else {
    ruleMatch = FALLBACK_RULE;
    assignedTrackKeys = FALLBACK_RULE.tracks;
  }

  const fullTrackKeys = Array.from(new Set([...assignedTrackKeys, "core", "final"]));

  let filteredModules = catalogModules.filter(m => fullTrackKeys.includes(m.track));

  filteredModules.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.id.localeCompare(b.id);
  });

  const day1 = filteredModules.filter(m => m.day === 1);
  const day2 = filteredModules.filter(m => m.day === 2);
  const day3 = filteredModules.filter(m => m.day === 3);
  const day4 = filteredModules.filter(m => m.day === 4);

  Object.defineProperties(filteredModules, {
    day1: { value: day1, enumerable: false, writable: true },
    day2: { value: day2, enumerable: false, writable: true },
    day3: { value: day3, enumerable: false, writable: true },
    day4: { value: day4, enumerable: false, writable: true },
    assignedTracks: { value: assignedTrackKeys, enumerable: false, writable: true },
    matchedRule: { value: ruleMatch, enumerable: false, writable: true },
    allModules: { value: filteredModules, enumerable: false, writable: true }
  });

  return filteredModules;
};

/**
 * Checks if a specific module is considered fully complete for a recruit
 */
export const isModuleCompleted = (recruit, moduleId) => {
  if (!recruit || !moduleId) return false;

  const catalogModule = MODULES_CATALOG.find(m => m.id === moduleId);
  if (!catalogModule) return false;

  // 1. If it's an ACTIVITY, must be APPROVED by manager
  if (catalogModule.type === 'ACTIVITY') {
    const sub = recruit.activitySubmissions?.[moduleId];
    return sub && sub.status === 'APPROVED';
  }

  // 2. If it's a LIVE module, check if marked completed OR has valid signOff
  if (catalogModule.type === 'LIVE') {
    const hasSignOff = !!recruit.signOffs?.[moduleId];
    const isCompleted = recruit.completedModuleIds?.includes(moduleId);
    return hasSignOff || isCompleted;
  }

  // 3. For VIDEO, READING, SITUATIONAL_QUIZ, SYSTEM
  return (recruit.completedModuleIds || []).includes(moduleId);
};

/**
 * Validates whether a specific Day (1, 2, 3, 4) is unlocked for a recruit.
 * DAY 1 is always unlocked.
 * DAY N (N > 1) is unlocked ONLY IF all assigned modules in Day N-1 are 100% completed!
 */
export const isDayUnlocked = (recruit, day, learningPath) => {
  if (day <= 1) return true;

  for (let d = 1; d < day; d++) {
    const previousDayModules = learningPath.filter(m => m.day === d);
    const allCompleted = previousDayModules.every(m => isModuleCompleted(recruit, m.id));
    if (!allCompleted) return false;
  }

  return true;
};

/**
 * CERTIFICATION ELIGIBILITY ENGINE
 * Verifies if recruit satisfies all mandatory completion checks.
 */
export const isRecruitCertificationEligible = (recruit, rules = DEFAULT_ROLE_RULES) => {
  if (!recruit) return { isEligible: false, status: 'NOT_ELIGIBLE', checks: [] };

  const learningPath = getLearningPath(recruit, rules);
  if (learningPath.length === 0) return { isEligible: false, status: 'NOT_ELIGIBLE', checks: [] };

  const day1Modules = learningPath.filter(m => m.day === 1);
  const day2Modules = learningPath.filter(m => m.day === 2);
  const day3Modules = learningPath.filter(m => m.day === 3);
  const day4Modules = learningPath.filter(m => m.day === 4);

  const day1Done = day1Modules.length > 0 && day1Modules.every(m => isModuleCompleted(recruit, m.id));
  const day2Done = day2Modules.length > 0 && day2Modules.every(m => isModuleCompleted(recruit, m.id));
  const day3Done = day3Modules.length > 0 && day3Modules.every(m => isModuleCompleted(recruit, m.id));
  const day4Done = day4Modules.length > 0 && day4Modules.every(m => isModuleCompleted(recruit, m.id));

  const allModulesDone = learningPath.every(m => isModuleCompleted(recruit, m.id));

  // Check activities
  const activityModules = learningPath.filter(m => m.type === 'ACTIVITY');
  const activitiesDone = activityModules.every(m => {
    const sub = recruit.activitySubmissions?.[m.id];
    return sub && sub.status === 'APPROVED';
  });

  // Check live sessions
  const liveModules = learningPath.filter(m => m.type === 'LIVE');
  const liveSessionsDone = liveModules.every(m => {
    return !!recruit.signOffs?.[m.id] || (recruit.completedModuleIds || []).includes(m.id);
  });

  // Check Final Exam (M-X02)
  const finalExamScore = recruit.quizScores?.["M-X02"] || 0;
  const finalExamPassed = finalExamScore >= 80 || (recruit.completedModuleIds || []).includes("M-X02");

  // Check security terminations
  const attemptsMap = recruit.assessmentAttempts || {};
  const finalAttempts = attemptsMap["M-X02"] || [];
  const latestAttempt = finalAttempts[finalAttempts.length - 1];
  const isTerminated = latestAttempt && latestAttempt.status === 'TERMINATED';

  const checks = [
    { name: 'Day 1 Curriculum Complete', passed: day1Done },
    { name: 'Day 2 Curriculum Complete', passed: day2Done },
    { name: 'Day 3 Curriculum Complete', passed: day3Done },
    { name: 'Day 4 Curriculum Complete', passed: day4Done },
    { name: 'All Assigned Modules Completed', passed: allModulesDone },
    { name: 'Practical Activities Approved', passed: activitiesDone },
    { name: 'Live Sessions Signed Off', passed: liveSessionsDone },
    { name: 'Final Assessment Score >= 80%', passed: finalExamPassed },
    { name: 'No Assessment Security Terminations', passed: !isTerminated }
  ];

  const isEligible = checks.every(c => c.passed) && recruit.approvalStatus === 'APPROVED';

  return {
    isEligible,
    status: isEligible ? 'ELIGIBLE' : 'NOT_ELIGIBLE',
    checks,
    finalExamScore,
    completedCount: learningPath.filter(m => isModuleCompleted(recruit, m.id)).length,
    totalCount: learningPath.length
  };
};

/**
 * Calculates recruit overall progress stats
 */
export const calculateRecruitProgress = (recruit, rules = {}) => {
  const learningPath = getLearningPath(recruit, rules);
  if (learningPath.length === 0) return { percent: 0, completedCount: 0, totalCount: 0, currentDay: 1 };

  let completedCount = 0;
  learningPath.forEach(m => {
    if (isModuleCompleted(recruit, m.id)) {
      completedCount++;
    }
  });

  const percent = Math.round((completedCount / learningPath.length) * 100);

  let currentDay = 1;
  for (let d = 1; d <= 4; d++) {
    if (isDayUnlocked(recruit, d, learningPath)) {
      currentDay = d;
    } else {
      break;
    }
  }

  const { isEligible } = isRecruitCertificationEligible(recruit, rules);

  return {
    percent,
    completedCount,
    totalCount: learningPath.length,
    currentDay,
    isEligibleForCert: isEligible,
    learningPath
  };
};

/**
 * UNIQUE DIFFERENTIATOR: Learning Readiness Calculator Score (%)
 */
export const calculateLearningReadiness = (recruit, rules = {}) => {
  const { percent, currentDay, learningPath } = calculateRecruitProgress(recruit, rules);

  const quizScores = Object.values(recruit.quizScores || {});
  const avgQuizScore = quizScores.length > 0 
    ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
    : 75;

  let activityScore = 50;
  const activitySub = recruit.activitySubmissions?.["M-S03"];
  if (activitySub) {
    if (activitySub.status === 'APPROVED') activityScore = 100;
    else if (activitySub.status === 'PENDING') activityScore = 75;
    else if (activitySub.status === 'NEEDS_REVISION') activityScore = 40;
  }

  const velocityScore = currentDay * 25;

  const overallReadiness = Math.round(
    (percent * 0.40) +
    (avgQuizScore * 0.35) +
    (activityScore * 0.15) +
    (velocityScore * 0.10)
  );

  let nextAction = "Complete Day 1 Foundation Modules";
  const pendingModule = learningPath.find(m => !isModuleCompleted(recruit, m.id) && isDayUnlocked(recruit, m.day, learningPath));
  
  if (recruit.accessClosed || recruit.isCertified) {
    nextAction = "Program Certified & Access Closed";
  } else if (pendingModule) {
    nextAction = `Complete "${pendingModule.title}" (${pendingModule.type})`;
  } else if (percent === 100) {
    nextAction = "Ready for Branch Manager Certification";
  }

  return {
    readinessScore: Math.min(100, overallReadiness),
    avgQuizScore: Math.round(avgQuizScore),
    nextAction
  };
};
