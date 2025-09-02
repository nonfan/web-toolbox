import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavigationItem } from '@/components/NavigationList';

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  searchResults: NavigationItem[] | null;
  setSearchResults: (results: NavigationItem[] | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<NavigationItem[] | null>(null);

  const value = {
    search,
    setSearch,
    searchResults,
    setSearchResults,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};