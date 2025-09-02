import React, {useEffect} from "react";
import {useLocation, useRoutes} from "react-router-dom";
import routes from "@/routes";
import ThemeToggle from "@/components/ThemeToggle";
import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import {searchItems} from "@/utils/navigationData";
import {useSearch} from "@/contexts/SearchContext";

function Layout() {
  const element = useRoutes(routes);
  const location = useLocation();
  const {search, setSearch, setSearchResults} = useSearch();

  // 定义首页路径列表
  const homePages = ['/'];
  const isHomePage = homePages.includes(location.pathname);

  // 更新搜索结果
  useEffect(() => {
    if (!isHomePage) {
      setSearchResults(null);
      return;
    }

    const results = search.trim() ? searchItems(search) : null;
    setSearchResults(results);
  }, [search, isHomePage, setSearchResults]);

  return (
    <div className="relative min-h-screen">
       {/*固定定位的UI元素*/}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* 左上角：BackButton */}
        <div className="absolute top-6 left-6 pointer-events-auto">
          <BackButton/>
        </div>

        {/* 右上角：ThemeToggle */}
        <div className={`${isHomePage ? 'hidden' : ''} sm:flex absolute top-6 right-6 pointer-events-auto`}>
          <ThemeToggle/>
        </div>


        {/* 顶部居中：SearchBar (仅首页显示) */}
        {isHomePage && (
          <div className="flex gap-2 absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-auto w-full max-w-md px-4">
            <SearchBar
              placeholder="搜索工具名称、标签或描述..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full"
            />
            <div className="flex sm:hidden">
              <ThemeToggle/>
            </div>
          </div>
        )}
      </div>

      <div>
        {element}
      </div>
    </div>
  );
}

export default Layout;
