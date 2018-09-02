
/**
 * 头部导航 配置
 */
const headerNavConfig: object[] = [
  {
    path: '/publish',
    value: '创作',
    children: null,
  },
  {
    // path: new RegExp(`\/edit\/\w*`),
    path: '/edit/',
    value: '编辑',
    children: null,
  },
  {
    path: '/me',
    value: '我的',
    children: null,
  },
];


export default headerNavConfig;