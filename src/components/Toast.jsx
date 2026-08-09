import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  let bgColor = '#ecfdf5';
  let borderColor = '#a7f3d0';
  let textColor = '#065f46';
  let icon = <CheckCircle2 size={20} color="#10b981" />;

  if (type === 'error') {
    bgColor = '#fef2f2';
    borderColor = '#fca5a5';
    textColor = '#991b1b';
    icon = <AlertCircle size={20} color="#ef4444" />;
  } else if (type === 'info') {
    bgColor = '#eff6ff';
    borderColor = '#93c5fd';
    textColor = '#1e40af';
    icon = <Info size={20} color="#3b82f6" />;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: bgColor,
      border: `1px solid ${borderColor}`,
      color: textColor,
      padding: '12px 20px',
      borderRadius: 10,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      zIndex: 3000,
      fontWeight: 700,
      fontSize: '0.9rem',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {icon}
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: 2, display: 'flex', alignItems: 'center' }}>
        <X size={16} />
      </button>
    </div>
  );
};
