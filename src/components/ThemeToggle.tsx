import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-6 right-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-white dark:bg-gray-800
        border-2 border-gray-200 dark:border-gray-600
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        text-gray-700 dark:text-gray-200
        hover:text-blue-500 dark:hover:text-blue-400
      "
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      <div className="relative">
        <Sun 
          className={`
            w-5 h-5 transition-all duration-300 
            ${theme === 'light' 
              ? 'rotate-0 opacity-100' 
              : 'rotate-90 opacity-0 absolute top-0 left-0'
            }
          `} 
        />
        <Moon 
          className={`
            w-5 h-5 transition-all duration-300 
            ${theme === 'dark' 
              ? 'rotate-0 opacity-100' 
              : '-rotate-90 opacity-0 absolute top-0 left-0'
            }
          `} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;