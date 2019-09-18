
/**
 * 头部导航 配置
 */
export interface IHeaderNavConfigStaticOptions {
  path: string;
  name: string;
};


const headerNavConfig: IHeaderNavConfigStaticOptions[] = [
  { path: '/home', name: '首页' },
  { path: '/pin', name: '沸点' },
  { path: '/topic', name: '话题' },
  { path: '/chat', name: '社区' },
];


export default headerNavConfig;