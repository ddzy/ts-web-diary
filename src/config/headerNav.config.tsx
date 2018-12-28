
/**
 * 头部导航 配置
 */
export interface IHeaderNavConfigStaticOptions {
  path: string;
  name: string;
};


const headerNavConfig: IHeaderNavConfigStaticOptions[] = [
  { path: '/home', name: '首页' },
  { path: '/activities', name: '动态' },
  { path: '/topics', name: '话题' },
  { path: '/community', name: '社区' },
];


export default headerNavConfig;