import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, ...props }: SearchBarProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div 
        className="flex items-center rounded-full px-5 py-3 transition-all duration-200 focus-within:ring-2"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderWidth: '1px',
          borderColor: 'var(--border-color)',
          boxShadow: '0 4px 12px var(--shadow-color)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-color)';
          e.currentTarget.style.boxShadow = `0 4px 12px var(--shadow-color), 0 0 0 3px var(--accent-color)20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow-color)';
        }}
      >
        <Search
          className="w-5 h-5"
          style={{ color: 'var(--text-tertiary)' }}
        />
        <input
          className="flex-1 bg-transparent outline-none border-none px-3 text-base"
          style={{
            color: 'var(--text-primary)'
          }}
          type="text"
          placeholder={props.placeholder || "搜索关键词..."}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}