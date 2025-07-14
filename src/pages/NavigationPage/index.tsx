import React, {useState} from 'react';
import NavigationList, {NavigationItem} from "@/components/NavigationList";
import KeySvg from "@/assets/KeySvg";
import {Blocks} from "lucide-react";
import SearchBar from "@/components/SearchBar";

const items: NavigationItem[] = [
  {title: "生成助记词", smallTitle: "基于密码生成助记词和 Keystore 文件", icon: KeySvg, url: "/mnemonic-wallet"},
  // 更多项...
];

function NavigationPage() {
  const [search, setSearch] = useState("");

  // 计算带高亮的数据源
  const q = search.trim().toLowerCase();
  const highlightList = items.map(item => ({
    ...item,
    highlight:
      !!q &&
      (item.title.toLowerCase().includes(q) ||
        item.smallTitle.toLowerCase().includes(q))
  }));

  console.log(highlightList)

  return (
    <div className="bg-white dark:bg-[#1b1b1d] min-h-screen px-5 py-10">
      <div className="pb-5 flex items-center">
        <SearchBar
          placeholder="搜索关键词..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <NavigationList
        title="区块链功能"
        smallTitle="区块链常用工具和功能快速入口"
        icon={Blocks}
        dataSource={highlightList}
      />
    </div>
  );
}

export default NavigationPage;
