import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, ...props }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center bg-white dark:bg-[#18181c] border border-gray-200 dark:border-gray-700 rounded-full shadow-[0_2px_10px_0_rgba(80,80,100,0.07)] px-5 py-3 transition focus-within:border-blue-400">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none border-none px-3 text-base text-gray-800 dark:text-white placeholder:text-gray-400"
          type="text"
          placeholder="搜索"
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}
