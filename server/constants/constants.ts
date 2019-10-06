// ** 敏感信息过滤 **
export const FILTER_SENSITIVE = {
  '__v': 0,
  userpwd: 0,
};


// ** jwt盐 **
export const SECRET_FOR_TOKEN = 'WEB_DIARY_PROJECT';


// ** Website **
export const WEBSITE = {
  host: 'http://localhost',
  port: 8888,
};


// ** 七牛云 密钥 **
export const QINIU_KEY = {
  AccessKey: 'n4eSoB1ITSy1zcht0nQQ2XTLyYNsqCpUuOYEJ4m6',
  SecretKey: 'z1RJP_OGgPA-oyuT2DjG53ICLF2DeUS5maSRt83b',
  Domain: 'oos.twd.yyge.top',
  Bucket: 'duan-twd',
};

/**
 * 第三方账号绑定相关
 */
export const BIND_THIRD_PARTY_INFO = {
  github: {
    client_id: 'fce9ff3b1d6b896c1349',
    client_secret: 'dc660851f5525e526710f2132f2bfe911d6a3cc4',
    access_token_uri: 'https://github.com/login/oauth/access_token',
    user_info_uri: 'https://api.github.com/user',
  },
};

/**
 * 随机的用户名前缀
 */
export const DEFAULT_USER_NAME_PREFIX = ['User_', 'Sunny_', 'U_'];

/**
 * 随机的用户名内容
 */
export const DEFAULT_USER_NAME_CONTENT = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'M', 'N', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
 * 默认的话题列表
 */
export const DEFAULT_TOPIC_LIST = [
  {
    name: '上班摸鱼',
    description: '来分享下你上班看到的好东西吧~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%B8%8A%E7%8F%AD%E6%91%B8%E9%B1%BC.png',
  },
  {
    name: '一图胜千言',
    description: '能用图, 就不要用字.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%B8%80%E5%9B%BE%E8%83%9C%E5%8D%83%E8%A8%80.png',
  },
  {
    name: '今天学到了',
    description: '日拱一卒, 功不唐捐. 一起来分享下你今天听到的有意思的事情, 或者学习的冷知识.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BB%8A%E5%A4%A9%E5%AD%A6%E5%88%B0%E4%BA%86.png',
  },
  {
    name: '提问回答',
    description: '所提的问题要同技术、程序员有关, 参考方向: 技术前景、最优解、编程问题..., 涉及编程开发的问题其描述需尽可能详细.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%8F%90%E9%97%AE%E5%9B%9E%E7%AD%94.png',
  },
  {
    name: '今日最佳',
    description: 'The best or nothing.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BB%8A%E6%97%A5%E6%9C%80%E4%BD%B3.png',
  },
  {
    name: '优秀开源推荐',
    description: '来推荐你觉得优秀的开源项目 (项目介绍+项目地址) 不限于开源框架、开发工具~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BC%98%E7%A7%80%E5%BC%80%E6%BA%90%E6%8E%A8%E8%8D%90.png',
  },
  {
    name: '应用安利',
    description: '分享好玩、高颜值、实用的 APP、插件、扩展、小程序、H5... 记得附上他们的介绍和下载地址哟',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%BA%94%E7%94%A8%E5%AE%89%E5%88%A9.png',
  },
  {
    name: '内推招聘',
    description: '与大厂面对面, 零距离',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%86%85%E6%8E%A8%E6%8B%9B%E8%81%98.png',
  },
  {
    name: '开发工具推荐',
    description: '来推荐一些你常用的能帮你提高效率的开发工具, 不限于 IDE, 开发框架, 构建工具',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7%E6%8E%A8%E8%8D%90.png',
  },
  {
    name: '你怎么看?',
    description: '如何看待如何看待..., 对此, 你怎么看? 来这里分享下你想和掘金小伙伴讨论的问题吧~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BD%A0%E6%80%8E%E4%B9%88%E7%9C%8B.png',
  },
  {
    name: '划个知识点',
    description: '分享下你刚学到的知识点, 不仅限于代码笔记',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%88%92%E4%B8%AA%E7%9F%A5%E8%AF%86%E7%82%B9.png',
  },
  {
    name: '我的开源项目',
    description: '来沸点曝光你的优秀开源项目',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%88%91%E7%9A%84%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE.png',
  },
  {
    name: '树洞一下',
    description: '来分享下你的开心和不开心',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%A0%91%E6%B4%9E%E4%B8%80%E4%B8%8B.png',
  },
  {
    name: '人在职场',
    description: '人在职场哪能时时顺风顺水, 来聊聊工作中开心与不开心的事',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BA%BA%E5%9C%A8%E8%81%8C%E5%9C%BA.png',
  },
  {
    name: 'New 资讯',
    description: '来分享你刚看到过的商业科技 / 互联网 / 科技数码资讯吧~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/New%20%E5%92%A8%E8%AF%A2.png',
  },
  {
    name: 'AMA',
    description: '邀请各领域技术大牛通过「你问我答」的形式回答你的问题, 让大家在技术、工作、生活方面有所成长.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/AMA.png',
  },
  {
    name: '这个设计有点优秀',
    description: '来分享你生活、工作中看到的好看、另类设计~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E8%BF%99%E4%B8%AA%E8%AE%BE%E8%AE%A1%E6%9C%89%E7%82%B9%E4%BC%98%E7%A7%80.png',
  },
  {
    name: '下班打卡',
    description: '下班的同学来打个卡, 聊聊今天过得怎么样~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%B8%8B%E7%8F%AD%E6%89%93%E5%8D%A1.png',
  },
  {
    name: '程序员鼓励师',
    description: '来分享下治愈、鼓励你的图片, 不只是那些喵星人、汪星人、兔星人、鼠星人... Gakki 亦可 (≧▽≦)',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E7%A8%8B%E5%BA%8F%E5%91%98%E9%BC%93%E5%8A%B1%E5%B8%88.png',
  },
  {
    name: '朴素一餐',
    description: '分享一下咱程序员每天都吃了啥.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%9C%B4%E7%B4%A0%E4%B8%80%E9%A4%90.png',
  },
  {
    name: '读书笔记',
    description: '读不在三更五鼓, 功只怕一曝十寒.',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0.png',
  },
  {
    name: '好文推荐',
    description: '在这里分享你发现的优质, 可以自荐, 所有沸点在发布后 24 小时没能获得 3 个点赞将会从话题下移除, 但原内容保留(≧▽≦)',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%A5%BD%E6%96%87%E6%8E%A8%E8%8D%90.png',
  },
  {
    name: '定个小目标',
    description: '先定个小目标, 完成了记得评论个 Done~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%AE%9A%E4%B8%AA%E5%B0%8F%E7%9B%AE%E6%A0%87.png',
  },
  {
    name: '求职中',
    description: '在这里发布你的求职信息',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%B1%82%E8%81%8C%E4%B8%AD.png',
  },
  {
    name: '代码秀',
    description: '不论语言, 不计行数, show show 你的代码片段. 建议用在线代码图片 Carbon 生成图片, Carbon 链接：https://carbon.now.sh/carbon.now.sh',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%B1%82%E8%81%8C%E4%B8%AD.png',
  },
  {
    name: '什么值得买',
    description: '一起来分享你买过的好东西吧~',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E4%BB%80%E4%B9%88%E5%80%BC%E5%BE%97%E4%B9%B0.png',
  },
  {
    name: '年终总结',
    description: '一年又要结束了, 年初的小目标完成的怎么样啦?',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E5%B9%B4%E7%BB%88%E6%80%BB%E7%BB%93.png',
  },
  {
    name: '进击的 React',
    description: '一年又要结束了, 年初的小目标完成的怎么样啦?',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E8%BF%9B%E5%87%BB%E7%9A%84%20React.png',
  },
  {
    name: '报 offer',
    description: '分享你获得的 offer',
    coverImgUrl: 'https://oos.twd.yyge.top/2019/9/20/admin/topic/images/cover/%E6%8A%A5%20offer.png',
  },
];

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
};