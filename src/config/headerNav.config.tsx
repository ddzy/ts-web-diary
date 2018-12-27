
/**
 * 头部导航 配置
 */
export interface IHeaderNavConfigStaticOptions {
  path: string;
  name: string;
};


const headerNavConfig: IHeaderNavConfigStaticOptions[] = [
  { path: '/home', name: '首页' },
  { path: '/publish', name: '创作', },
  { path: '/me', name: '我的' },
  { path: '/commnity', name: '社区' },
];


export default headerNavConfig;