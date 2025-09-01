import { NavigationItem } from "@/components/NavigationList";
import navigationData from "@/data/navigation.json";
import KeySvg from "@/assets/KeySvg";
import EthereumAvatarSvg from "@/assets/EthereumAvatarSvg";
import { Blocks } from "lucide-react";

// 图标映射表
const iconMap = {
  KeySvg: KeySvg,
  EthereumAvatarSvg: EthereumAvatarSvg,
  Blocks: Blocks,
};

// 转换JSON数据为NavigationItem格式，包含原始数据用于搜索
export const getNavigationItems = (): (NavigationItem & { tags: string[], description: string })[] => {
  return navigationData.navigationItems.map(item => ({
    title: item.title,
    smallTitle: item.smallTitle,
    icon: iconMap[item.iconName as keyof typeof iconMap],
    url: item.url,
    tags: item.tags,
    description: item.description
  }));
};

// 获取分类信息
export const getCategory = (categoryId: string) => {
  return navigationData.categories.find(cat => cat.id === categoryId);
};

// 按分类筛选项目
export const getItemsByCategory = (categoryId: string): NavigationItem[] => {
  return navigationData.navigationItems
    .filter(item => item.category === categoryId)
    .map(item => ({
      title: item.title,
      smallTitle: item.smallTitle,
      icon: iconMap[item.iconName as keyof typeof iconMap],
      url: item.url
    }));
};

// 综合搜索函数 - 支持标题、描述和标签搜索
export const searchItems = (query: string): NavigationItem[] => {
  if (!query.trim()) return getNavigationItems();
  
  const searchTerm = query.toLowerCase().trim();
  
  return navigationData.navigationItems
    .filter(item => {
      // 搜索标题
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      // 搜索描述
      const descMatch = item.smallTitle.toLowerCase().includes(searchTerm) || 
                       item.description.toLowerCase().includes(searchTerm);
      // 搜索标签
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      return titleMatch || descMatch || tagMatch;
    })
    .map(item => ({
      title: item.title,
      smallTitle: item.smallTitle,
      icon: iconMap[item.iconName as keyof typeof iconMap],
      url: item.url
    }));
};

export default navigationData;