import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, ...props }: SearchBarProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full shadow-[0_2px_10px_0_rgba(80,80,100,0.07)] dark:shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] px-5 py-3 transition-all duration-200 focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/20">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none border-none px-3 text-base text-gray-800 dark:text-white placeholder:text-gray-400"
          type="text"
          placeholder={props.placeholder || "搜索"}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}
