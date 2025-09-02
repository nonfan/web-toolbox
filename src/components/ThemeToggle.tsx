import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center justify-center
        w-13 h-13 rounded-2xl
        transition-all duration-500 ease-out
        hover:scale-110 active:scale-95
        backdrop-blur-sm
        group
      "
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderWidth: '2px',
        borderColor: 'var(--border-color)',
        color: 'var(--text-secondary)',
        boxShadow: '0 12px 32px -4px var(--shadow-color), 0 4px 12px -2px var(--shadow-color)',
        background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent-color)';
        e.currentTarget.style.borderColor = 'var(--accent-color)';
        e.currentTarget.style.boxShadow = '0 20px 40px -8px var(--shadow-color), 0 0 0 4px var(--accent-color-opacity-10), inset 0 1px 0 rgba(255,255,255,0.2)';
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px) rotate(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = '0 12px 32px -4px var(--shadow-color), 0 4px 12px -2px var(--shadow-color)';
        e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
      }}
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      <div className="relative overflow-hidden">
        <Sun 
          className={`
            w-6 h-6 transition-all duration-500 ease-out group-hover:scale-110
            ${theme === 'light' 
              ? 'rotate-0 opacity-100 transform translate-x-0 translate-y-0' 
              : 'rotate-180 opacity-0 absolute top-0 left-0 transform translate-x-2 -translate-y-2'
            }
          `} 
        />
        <Moon 
          className={`
            w-6 h-6 transition-all duration-500 ease-out group-hover:scale-110
            ${theme === 'dark' 
              ? 'rotate-0 opacity-100 transform translate-x-0 translate-y-0' 
              : '-rotate-180 opacity-0 absolute top-0 left-0 transform -translate-x-2 translate-y-2'
            }
          `} 
        />
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle, var(--accent-color), transparent)' }}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;