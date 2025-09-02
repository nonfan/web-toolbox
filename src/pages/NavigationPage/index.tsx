import React, {useMemo, useState} from 'react';
import NavigationList, {NavigationItem} from "@/components/NavigationList";
import {Blocks} from "lucide-react";
import { getNavigationItems, getAllCategories, getItemsByCategory } from "@/utils/navigationData";
import { useSearch } from "@/contexts/SearchContext";

// 从JSON文件加载导航项数据
const allItems = getNavigationItems();
const allCategories = getAllCategories();

function NavigationPage() {
  const { search, searchResults } = useSearch();
  
  // 按类别分组的数据
  const categoryGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    
    if (q) {
      // 如果有搜索，只显示一个搜索结果组
      const filteredItems = searchResults || allItems;
      const result = filteredItems.map(item => ({
        ...item,
        highlight: !!q && (
          item.title.toLowerCase().includes(q) ||
          item.smallTitle.toLowerCase().includes(q)
        )
      }));
      
      return [{
        category: { id: 'search', title: '搜索结果', smallTitle: `找到 ${result.length} 个结果`, iconName: 'Blocks' },
        items: result
      }];
    } else {
      // 没有搜索时，按类别分组显示
      return allCategories.map(category => ({
        category,
        items: getItemsByCategory(category.id)
      })).filter(group => group.items.length > 0);
    }
  }, [search, searchResults]);

  return (
    <div 
      className="min-h-screen pt-30 px-6 py-12 relative overflow-hidden"
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
        <div className="max-w-8xl mx-auto space-y-16">
          {categoryGroups.map((group, index) => (
            <NavigationList
              key={group.category.id}
              title={group.category.title}
              smallTitle={group.category.smallTitle}
              icon={Blocks}
              dataSource={group.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavigationPage;
