import React, {useMemo, useState} from 'react';
import NavigationList, {NavigationItem} from "@/components/NavigationList";
import {Blocks} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { getNavigationItems, getCategory, searchItems } from "@/utils/navigationData";

// 从JSON文件加载导航项数据
const allItems = getNavigationItems();
const categoryInfo = getCategory('blockchain');

function NavigationPage() {
  const [search, setSearch] = useState("");

  const highlightList = useMemo(() => {
    const q = search.trim().toLowerCase();
    
    // 如果有搜索关键词，使用综合搜索
    let filteredItems: NavigationItem[];
    if (q) {
      filteredItems = searchItems(q);
    } else {
      filteredItems = allItems;
    }
    
    // 添加高亮标记
    return filteredItems.map(item => ({
      ...item,
      highlight: !!q && (
        item.title.toLowerCase().includes(q) ||
        item.smallTitle.toLowerCase().includes(q)
      )
    }));
  }, [search]);

  return (
    <div 
      className="min-h-screen px-6 py-12 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-color-opacity-10), transparent)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-color-opacity-10), transparent)' }}
        />
      </div>
      
      <div className="relative z-10">
        <div className="pb-8 flex items-center justify-center">
          <SearchBar
            placeholder="搜索工具名称、标签或描述..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <NavigationList
            title={categoryInfo?.title || "区块链功能"}
            smallTitle={categoryInfo?.smallTitle || "区块链常用工具和功能快速入口"}
            icon={Blocks}
            dataSource={highlightList}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationPage;
