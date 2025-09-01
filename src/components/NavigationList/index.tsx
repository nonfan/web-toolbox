import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowRight, ExternalLink} from "lucide-react";

export interface NavigationItem {
  title: string;
  smallTitle: string;
  icon: string | React.FC;
  url: string;
  highlight?: boolean;
}

interface Props {
  dataSource: NavigationItem[];
  title: string;
  smallTitle: string;
  icon: React.FC
}

// 渲染图标组件
const RenderIcon: React.FC<{ icon: string | React.FC }> = ({icon}) => {
  if (typeof icon === "string") return null;
  const IconComponent = icon;
  return <IconComponent/>;
};

// 子组件：单个导航项
const NavigationItemCard: React.FC<{ item: NavigationItem }> = React.memo(({item}) => {
  const { icon, title, smallTitle, url } = item;
  const navigate = useNavigate();
  const isExternal = useMemo(() => /^https?:\/\//i.test(item.url), [item.url]);

  const handleGo = () => {
    if (isExternal) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  const cardClasses = useMemo(() => {
    const base = "group relative w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-16px)] m-2 transition-all duration-500 ease-out cursor-pointer rounded-2xl backdrop-blur-sm overflow-hidden select-none";
    const highlight = item.highlight
      ? "border-2 border-[var(--accent-color)] scale-[1.02] shadow-2xl transform-gpu"
      : "border border-[var(--border-color)] hover:-translate-y-3 hover:scale-[1.02] shadow-sm hover:shadow-2xl transform-gpu hover:z-10";
    return `${base} ${highlight}`;
  }, [item.highlight]);

  const cardStyle = useMemo(() => ({
    backgroundColor: item.highlight ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    boxShadow: item.highlight 
      ? '0 25px 50px -12px var(--shadow-color), 0 12px 25px -8px var(--shadow-color), inset 0 1px 0 var(--accent-color-opacity-10), 0 0 0 1px var(--accent-color)'
      : '0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color)',
    willChange: 'transform, box-shadow',
    contain: 'layout style paint',
  }), [item.highlight]);

  return (
    <article
      className={cardClasses}
      style={cardStyle}
      onClick={handleGo}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleGo();
        }
      }}
      aria-label={`${isExternal ? '访问外部网站' : '跳转到'}: ${title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent-color-opacity-10)] to-[var(--accent-color)] opacity-0 group-hover:opacity-8 transition-all duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse" style={{background: 'linear-gradient(90deg, transparent, var(--accent-color-opacity-10), transparent)'}} />
      
      <div className="relative flex items-center p-5 h-[130px]">
        <div 
          className="w-16 h-16 flex justify-center items-center rounded-2xl mr-5 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg"
          style={{ 
            backgroundColor: 'var(--accent-color-opacity-10)', 
            border: '1px solid var(--accent-color-opacity-10)',
            background: 'linear-gradient(135deg, var(--accent-color-opacity-10), transparent)'
          }}
        >
          <div className="text-2xl transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110">
            <RenderIcon icon={icon}/>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-bold text-lg truncate mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-all duration-500 ease-out group-hover:translate-x-1">
            {title}
          </h3>
          <p 
            className="text-sm leading-relaxed tracking-wide text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all duration-500 ease-out group-hover:translate-x-0.5 mb-4 truncate"
            title={smallTitle}
          >
            {smallTitle}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            {isExternal ? (
              <>
                <div className="nav-badge flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-xl" style={{ backgroundColor: 'var(--external-bg)', border: '2px solid var(--external-color)', boxShadow: '0 4px 12px var(--external-bg)' }}>
                  <ExternalLink className="w-4 h-4 text-[var(--external-color)] group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out drop-shadow-sm"/>
                  <span className="text-[var(--external-color)] font-bold tracking-wide text-xs uppercase drop-shadow-sm">外部链接</span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--external-color), transparent)' }} />
                </div>
              </>
            ) : (
              <>
                <div className="nav-badge flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-xl" style={{ backgroundColor: 'var(--success-bg)', border: '2px solid var(--success-color)', boxShadow: '0 4px 12px var(--success-bg)' }}>
                  <ArrowRight className="w-4 h-4 text-[var(--success-color)] group-hover:translate-x-1 group-hover:scale-125 transition-all duration-500 ease-out drop-shadow-sm"/>
                  <span className="text-[var(--success-color)] group-hover:translate-x-0.5 transition-all duration-500 font-bold tracking-wide text-xs uppercase drop-shadow-sm">内部页面</span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--success-color), transparent)' }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});
NavigationItemCard.displayName = 'NavigationItemCard';

// 父组件
const NavigationList: React.FC<Props> = ({dataSource, title, smallTitle, icon}) => {
  const headerIconStyle = useMemo(() => ({
    background: `linear-gradient(135deg, var(--accent-color), var(--accent-color)dd)`,
  }), []);

  const underlineStyle = useMemo(() => ({
    background: `linear-gradient(90deg, var(--accent-color), var(--accent-color)cc)`
  }), []);

  return (
    <>
      <header className="mb-8 ml-2 flex items-center gap-6 relative">
        <div className="relative group">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-500 ease-out hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl"
            style={{
              ...headerIconStyle,
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px -4px var(--shadow-color), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            <div className="text-white text-2xl transition-all duration-500 group-hover:scale-110 drop-shadow-lg">
              <RenderIcon icon={icon}/>
            </div>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }} />
          </div>
          <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" style={{ background: headerIconStyle.background }} />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-300">
              {title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--accent-color-opacity-10)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                工具集
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--accent-color-opacity-10)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                共 {dataSource.length} 个工具
              </div>
            </div>
          </div>
          <p className="text-base mt-1 text-[var(--text-secondary)] transition-colors duration-300 leading-relaxed">
            {smallTitle}
          </p>
          <div className="mt-4">
            <div 
              className="w-20 h-1.5 rounded-full transition-all duration-500 hover:w-24 hover:h-2"
              style={underlineStyle}
            />
          </div>
        </div>
      </header>
      <div className="flex flex-wrap -m-2">
        {dataSource.map((item) => (
          <NavigationItemCard key={item.title} item={item}/>
        ))}
      </div>
    </>
  );
};

export default NavigationList;