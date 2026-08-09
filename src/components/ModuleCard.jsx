import React from 'react';
import { 
  Video, 
  FileText, 
  Users, 
  FileCheck2, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const ModuleCard = ({ module, isCompleted, isDayUnlocked, onOpenModule, recruit }) => {
  const getTypeBadge = (type) => {
    switch (type) {
      case 'VIDEO':
        return { icon: <Video size={18} />, label: 'VIDEO', class: 'type-video' };
      case 'READING':
        return { icon: <FileText size={18} />, label: 'READING', class: 'type-reading' };
      case 'LIVE':
        return { icon: <Users size={18} />, label: 'LIVE SESSION', class: 'type-live' };
      case 'ACTIVITY':
        return { icon: <FileCheck2 size={18} />, label: 'PRACTICAL TASK', class: 'type-activity' };
      case 'SITUATIONAL_QUIZ':
        return { icon: <HelpCircle size={18} />, label: 'SITUATIONAL QUIZ', class: 'type-quiz' };
      case 'SYSTEM':
        return { icon: <Award size={18} />, label: 'SYSTEM ASSESSMENT', class: 'type-video' };
      default:
        return { icon: <FileText size={18} />, label: type, class: 'type-reading' };
    }
  };

  const typeConfig = getTypeBadge(module.type);
  const activitySub = recruit?.activitySubmissions?.[module.id];
  const isPendingReview = module.type === 'ACTIVITY' && activitySub?.status === 'PENDING';
  const isNeedsRevision = module.type === 'ACTIVITY' && activitySub?.status === 'NEEDS_REVISION';

  return (
    <div className={`module-card ${isCompleted ? 'completed' : ''}`}>
      <div className="module-left-info">
        <div className={`module-type-icon ${typeConfig.class}`}>
          {typeConfig.icon}
        </div>
        <div>
          <div className="module-title-text">{module.title}</div>
          <div className="module-meta-tags">
            <span style={{ fontWeight: 700, color: '#475569' }}>{typeConfig.label}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {module.estimatedTime}
            </span>
            <span>•</span>
            <span style={{ color: '#64748b' }}>Check: {module.completionCheck}</span>
          </div>
        </div>
      </div>

      <div className="module-right-actions">
        {isCompleted ? (
          <span className="status-badge status-completed" style={{ padding: '6px 12px' }}>
            <CheckCircle2 size={14} /> Completed
          </span>
        ) : isPendingReview ? (
          <span className="status-badge status-in-progress" style={{ backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
            <Clock size={14} /> Submitted — Pending Review
          </span>
        ) : isNeedsRevision ? (
          <span className="status-badge status-needs-attention" style={{ padding: '6px 12px' }}>
            <AlertCircle size={14} /> Needs Revision
          </span>
        ) : !isDayUnlocked ? (
          <span className="status-badge status-locked">
            <Lock size={12} /> Locked
          </span>
        ) : null}

        <button
          className={`btn-primary ${!isDayUnlocked ? 'btn-disabled' : ''}`}
          disabled={!isDayUnlocked}
          onClick={() => onOpenModule(module)}
        >
          {isCompleted ? 'Review Module' : isPendingReview ? 'View Submission' : 'Open Module'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
