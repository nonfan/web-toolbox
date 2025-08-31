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
  const { icon, title, smallTitle, url, highlight } = item;
  const navigate = useNavigate();
  const isExternal = useMemo(() => /^https?:\/\//i.test(item.url), [item.url]);

  const handleGo = () => {
    if (isExternal) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  return (
    <div
      className={`
        w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-16px)] 
        m-2 transition-all duration-300 cursor-pointer rounded-2xl
        ${
          highlight
            ? "border-2 border-blue-500 shadow-lg shadow-blue-200/30 scale-105 bg-blue-50 dark:bg-blue-950"
            : "border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500"
        }
      `}
      onClick={handleGo}
    >
      <div className="flex items-center p-4 h-[120px]">
        <div className="overflow-hidden w-14 h-14 flex justify-center items-center rounded-full mr-4 bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-all duration-500">
          <div className="transform hover:rotate-[360deg] transition-all duration-700">
            <RenderIcon icon={icon}/>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="font-semibold text-base truncate text-gray-900 dark:text-white mb-1">{title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug tracking-wide line-clamp-2 mb-2">
            {smallTitle}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            {isExternal ? (
              <>
                <ExternalLink className="w-4 h-4 text-blue-500"/>
                <span className="text-blue-500">站外网站</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 text-gray-400"/>
                <span className="text-gray-500 dark:text-gray-400">站内跳转</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
NavigationItemCard.displayName = 'NavigationItemCard';

// 父组件
const NavigationList: React.FC<Props> = ({dataSource, title, smallTitle, icon}) => {
  return (
    <>
      <div className="mb-5 ml-2 flex items-center gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-700">
          <RenderIcon icon={icon}/>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{smallTitle}</div>
          {/* 可选渐变下划线 */}
          <div className="mt-2 w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"></div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {dataSource.map((item) => (
          <NavigationItemCard key={item.title} item={item}/>
        ))}
      </div>
    </>
  );
};

export default NavigationList;
