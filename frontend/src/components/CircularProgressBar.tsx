import { useState, useEffect } from 'react';

export const CircularProgressBar = ({ 
  size = 200, 
  strokeWidth = 8, 
  progress = 0, 
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  duration = 1000
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [progress]);

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-30"
          />
          
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all ease-out"
            style={{
              transitionDuration: `${duration}ms`
            }}
          />
        </svg>
        
        {/* Percentage text */}
        {showPercentage && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-2xl font-semibold"
            style={{ color }}
          >
            {Math.round(animatedProgress)}%
          </div>
        )}
      </div>
    </div>
  );
};