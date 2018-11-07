import { mixinObj } from '../utils/utils';

/**
 * 颜色选择
 */
export const COLOR_PICKER: string[] = [
  'magenta', 'red', 'volcano', 'orange',
  'gold', 'lime', 'green', 'cyan',
  'blue', 'geekblue', 'purple', 'pink',
  '#d50', '#09c', 'yellow', 'darkred',
  'yellowgreen', 'aqua', 'aquamarine', 'skyblue',
  '#84bf96', '#fedcbd', '#2a5caa', '#b7ba6b',
];

/**
 * 文章具体内容标签
 */
export const ARTICLE_TAG_PICKER: string[] = [
  'react', 'vue', 'angular', 'typescript',
  'canvas', 'HTTP', 'ES6', 'PornHub',
  'Python', 'Nginx', 'Java', 'C++',
  'Go', 'OS', 'Redis', 'NodeJS',
  '架构', '运营', '安全', 'MongoDB',
  'Mysql', '面试', 'C#', '云计算',
];

/**
 * 文章大方向的分类
 */
export const ARTICLE_TYPE_PICKER = [
  'Android', '前端',
  'iOS', '后端',
  '设计', '产品',
  '工具资源', '阅读',
  '人工智能', '运维'
];

/**
 * 文章所属具体内容标签 + 对应颜色
 */
export const MERGED_ARTICLE_TAG: object = mixinObj(
  ARTICLE_TAG_PICKER,
  COLOR_PICKER,
);
