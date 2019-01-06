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
  '#84bf96', '#fedcbd', '#2a5caa', '#b7ba6b', 'darkkhaki', '#1890ff',
];

/**
 * 文章具体内容标签
 */
export const ARTICLE_TAG_PICKER: string[] = [
  'React', 'Vue', 'Angular', 'TypeScript',
  'Canvas', 'HTTP', 'ES6', 'PornHub',
  'Python', 'Nginx', 'Java', 'C++',
  'Go', 'OS', 'Redis', 'NodeJS',
  '架构', '运营', '安全', 'MongoDB',
  'Mysql', '面试', 'C#', '云计算',
  '浏览器', 'JavaScript',
];

/**
 * 文章大方向的分类
 */
export const ARTICLE_TYPE_PICKER: string[] = [
  'Android', '前端',
  'iOS', '后端',
  '设计', '产品',
  '工具资源', '阅读',
  '人工智能', '运维'
];

/**
 * 对应文章大方向分类 -> 英文标识
 */
export const ARTICLE_TYPE_WITH_ENGLISH_PICKER: string[] = [
  'android', 'frontend',
  'ios', 'backend',
  'design', 'product',
  'tool', 'read',
  'ai', 'devops',
];

/**
 * 文章所属具体内容标签 + 对应颜色
 */
export const MERGED_ARTICLE_TAG: object = mixinObj(
  ARTICLE_TAG_PICKER,
  COLOR_PICKER,
);

/**
 * 表情字体符号
 */
export const EMOJI_PICKER: string[] = [
  ':grin:', ':smile:', ':wink:', ':relaxed:', ':kissing_heart:', ':stuck_out_tongue_winking_eye:',
  ':nerd_face:', ':rage:', ':scream:', ':imp:', ':zzz:', ':poop:',
  ':+1:', ':pray:', ':-1:', ':clap:', ':v:', ':slightly_smiling_face:',
  ':rofl:', ':joy:', ':flushed:', ':mask:', ':smiley_cat:', ':ok_hand:',
  ':writing_hand:', ':pig:', ':sun_with_face:', ':iphone:', ':heartbeat:', ':sparkling_heart:',
  ':heart:', ':arrow_right:', ':arrow_left:', ':underage:', ':u7981:', ':lock:', ':star:', ':hear_no_evil:', ':bikini:',
  ':expressionless:', ':eyes:', ':call_me_hand:',
];

/**
 * 分页 每页条数
 */
export const PAGE_SIZE: number = 5;

/**
 * 评论 | 回复每页条数
 */
export const COMMENT_PAGE_SIZE: number = 5;
export const REPLY_PAGE_SIZE: number = 3;