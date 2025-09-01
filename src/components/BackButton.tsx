import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '', style = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 主页面路径列表 - 在这些页面隐藏返回按钮
  const hideOnPaths = ['/', '/navigation'];
  
  // 如果当前路径在隐藏列表中，不渲染按钮
  if (hideOnPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        fixed top-6 left-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-2xl
        transition-all duration-500 ease-out
        hover:scale-110 active:scale-95
        backdrop-blur-sm
        group
        ${className}
      `}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderWidth: '2px',
        borderColor: 'var(--border-color)',
        color: 'var(--text-secondary)',
        boxShadow: '0 12px 32px -4px var(--shadow-color), 0 4px 12px -2px var(--shadow-color)',
        background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent-color)';
        e.currentTarget.style.borderColor = 'var(--accent-color)';
        e.currentTarget.style.boxShadow = '0 20px 40px -8px var(--shadow-color), 0 0 0 4px var(--accent-color-opacity-10), inset 0 1px 0 rgba(255,255,255,0.2)';
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px) rotate(-5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = '0 12px 32px -4px var(--shadow-color), 0 4px 12px -2px var(--shadow-color)';
        e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
      }}
      aria-label="返回上一页"
      title="返回上一页"
    >
      <div className="relative overflow-hidden">
        <ArrowLeft 
          className="w-6 h-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-x-0.5" 
        />
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle, var(--accent-color), transparent)' }}
        />
      </div>
    </button>
  );
};

export default BackButton;