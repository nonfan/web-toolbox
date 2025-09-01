import React, {useMemo, useState} from 'react';
import NavigationList, {NavigationItem} from "@/components/NavigationList";
import KeySvg from "@/assets/KeySvg";
import {Blocks} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import EthereumAvatarSvg from "@/assets/EthereumAvatarSvg";

const items: NavigationItem[] = [
  {title: "生成助记词", smallTitle: "基于密码生成助记词和 Keystore 文件", icon: KeySvg, url: "/mnemonic-wallet"},
  {title: "Ethereum Blockies Base64", smallTitle: "一个用于生成块状 identicons 作为 base64 编码 PNG 的小型库。", icon: EthereumAvatarSvg, url: "https://www.npmjs.com/package/ethereum-blockies-base64"},
  // 更多项...
];

function NavigationPage() {
  const [search, setSearch] = useState("");

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
            placeholder="搜索功能和工具..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <NavigationList
            title="区块链功能"
            smallTitle="区块链常用工具和功能快速入口"
            icon={Blocks}
            dataSource={highlightList}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationPage;
