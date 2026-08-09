import React from 'react';

export const TrainFlowLogo = ({ 
  size = 36, 
  showText = true, 
  textVariant = 'light', // 'light' | 'dark'
  subtitle = 'ENTERPRISE ONBOARDING' 
}) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, userSelect: 'none' }}>
      {/* BRAND MARK SVG */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(79, 70, 229, 0.4))' }}
      >
        <defs>
          <linearGradient id="tfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>

          <linearGradient id="tfGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="tfGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <filter id="tfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* LAYER 3 (BOTTOM ACCENT LAYER) */}
        <path 
          d="M 20 70 L 50 85 L 80 70 L 50 55 Z" 
          fill="url(#tfGrad3)" 
          opacity="0.75"
        />

        {/* LAYER 2 (MIDDLE FLOW LAYER) */}
        <path 
          d="M 20 48 L 50 63 L 80 48 L 50 33 Z" 
          fill="url(#tfGrad1)" 
        />

        {/* LAYER 1 (TOP CROWN LAYER WITH SPARK) */}
        <path 
          d="M 20 26 L 50 41 L 80 26 L 50 11 Z" 
          fill="url(#tfGrad2)" 
          filter="url(#tfGlow)"
        />

        {/* CONNECTING NODE DOTS */}
        <circle cx="50" cy="11" r="4" fill="#ffffff" />
        <circle cx="80" cy="26" r="4" fill="#ffffff" />
        <circle cx="50" cy="41" r="4" fill="#ffffff" />
        <circle cx="20" cy="48" r="3.5" fill="#ffffff" opacity="0.9" />
      </svg>

      {/* TYPOGRAPHY */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: size * 0.58,
            fontWeight: 900,
            letterSpacing: '-0.5px',
            color: textVariant === 'light' ? '#ffffff' : '#0f172a',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            Train<span style={{ color: '#818cf8' }}>Flow</span>
          </div>
          {subtitle && (
            <div style={{
              fontSize: Math.max(9, size * 0.24),
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: textVariant === 'light' ? '#a5b4fc' : '#64748b',
              textTransform: 'uppercase',
              marginTop: 3
            }}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
