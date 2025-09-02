import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-block z-50">
      {/* 触发元素 */}
      {children}

      {/* Tooltip 内容 */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2
          hidden group-hover:block
          px-3 py-2 rounded-lg shadow-lg text-sm whitespace-pre-line
          bg-white text-black border border-gray-300
          dark:bg-black dark:text-white dark:border-gray-700
          z-50
        `}
      >
        {content}

        {/* 箭头 */}
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45
            bg-white border-r border-b border-gray-300
            dark:bg-black dark:border-gray-700
          `}
        />
      </div>
    </div>
  );
};

export default Tooltip;
