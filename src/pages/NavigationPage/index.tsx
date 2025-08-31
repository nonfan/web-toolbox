import React, {useMemo, useState} from 'react';
import NavigationList, {NavigationItem} from "@/components/NavigationList";
import KeySvg from "@/assets/KeySvg";
import {Blocks} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import EthereumAvatar from "@/assets/EthereumAvatar";
import ThemeToggle from "@/components/ThemeToggle";

const items: NavigationItem[] = [
  {title: "生成助记词", smallTitle: "基于密码生成助记词和 Keystore 文件", icon: KeySvg, url: "/mnemonic-wallet"},
  {title: "Ethereum Blockies Base64", smallTitle: "一个用于生成块状 identicons 作为 base64 编码 PNG 的小型库。", icon: EthereumAvatar, url: "https://www.npmjs.com/package/ethereum-blockies-base64"},
  // 更多项...
];

function NavigationPage() {
  const [search, setSearch] = useState("");

  // 计算带高亮的数据源，使用 useMemo 优化性能
  const highlightList = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.map(item => ({
      ...item,
      highlight:
        !!q &&
        (item.title.toLowerCase().includes(q) ||
          item.smallTitle.toLowerCase().includes(q))
    }));
  }, [search]);

  return (
    <div className="bg-white dark:bg-[#1b1b1d] min-h-screen px-5 py-10 relative">
      <ThemeToggle />
      <div className="pb-4 flex items-center">
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
