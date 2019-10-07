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
  '#32CCBC', '#F6416C', '#0396FF', '#F8D800', '#9F44D3',
  '#0E197D', '#D939CD',
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
  '浏览器', 'JavaScript', 'CSS', 'Git',
  'VSCode', 'Vim', 'HTML5', 'Terminal',
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
 * 文章类型 英文 -> 中文
 */
export const ARTICLE_TYPE_EN_TO_CN: object = mixinObj(
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
  ARTICLE_TYPE_PICKER,
);

/**
 * 文章类型 中文 -> 英文
 */
export const ARTICLE_TYPE_CN_TO_EN: object = mixinObj(
  ARTICLE_TYPE_PICKER,
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
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
 * 默认分页 每页条数
 */
export const PAGE_SIZE: number = 5;

/**
 * 文章评论 | 回复每页条数
 */
export const COMMENT_PAGE_SIZE: number = 5;
export const REPLY_PAGE_SIZE: number = 3;

/**
 * 通知列表的每页条数 - 中
 */
export const NOTICE_PAGE_SIZE_MEDIUM: number = 5;

/**
 * 沸点列表的每页条数 - 中
 */
export const PIN_LIST_PAGE_SIZE_MEDIUM = 5;

/**
 * 沸点评论的每页条数 - 小
 */
export const PIN_COMMENT_PAGE_SIZE_SMALL = 3;

/**
 * 沸点回复的每页条数 - 小
 */
export const PIN_REPLY_PAGE_SIZE_SMALL = 2;

/**
 * 聊天消息的每页条数 - 大
 */
export const CHAT_MESSAGE_PAGE_SIZSE_LARGE = 7;

/**
 * 我的足迹列表的每页条数 - 中
 */
export const TRACK_PAGE_SIZE_MEDIUM = 5;


/**
 * socket端口信息
 */
export const SOCKET_CONNECTION_INFO = {
  schema: 'ws',
  domain: 'localhost',
  port: 8888,
};

/**
 * 应用的客户端IP地址信息
 */
export const CLIENT_WEBSITE_INFO = {
  schema: 'http',
  domain: 'localhost',
  port: 3000,
};

/**
 * 应用的服务端IP地址信息
 */
export const SERVER_WEBSITE_INFO = {
  schema: 'http',
  domain: 'localhost',
  port: 8888,
};

/**
 * [react-monaco-editor]
 */
export const MONACO_EDITOR_CODE_LANGUAGE_LIST = [
  'html', 'css', 'javascript', 'typescript',
  'less', 'json', 'xml', 'php',
  'markdown', 'go', 'cpp', 'java',
];

/**
 * 第三方账号绑定相关
 */
export const BIND_THIRD_PARTY_INFO = {
  github: {
    get_code_uri: 'https://github.com/login/oauth/authorize',
    client_id: 'fce9ff3b1d6b896c1349',
    client_secret: 'dc660851f5525e526710f2132f2bfe911d6a3cc4',
  },
};

/**
 * 通知的类型
 */
export const NOTIFICATION_TYPE = {
  user: {
    friend: {
      request: 'notification_user_friend_request',
      agree: 'notification_user_friend_agree',
      refuse: 'notification_user_friend_refuse',
    },
    star: {
      article: {
        self: 'notification_user_star_article',
        comment: 'notification_user_star_article_comment',
      },
      pin: {
        self: 'notification_user_star_pin',
        comment: 'notification_user_star_pin_comment',
      },
    },
    attention: {
      people: 'notification_user_attention_people',
      topic: 'notification_user_attention_topic',
    },
  },
  admin: {},
};

/**
 * 动态类型(我关注的用户动态 + 话题动态)
 */
export const ACTIVITY_TYPE = {

};

/**
 * 我的足迹类型
 */
export const TRACK_TYPE = {
  star: {
    article: {
      self: `track_star_article`,
      comment: `track_star_article_comment`,
    },
    pin: {
      self: `track_star_pin`,
      comment: `track_star_pin_comment`,
    },
  },
  attention: {
    people: `track_attention_people`,
    topic: `track_attention_topic`,
  },
  create: {
    article: 'track_create_article',
    pin: 'track_create_pin',
  },
  collection: {
    article: 'track_collection_article',
  },
};