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
      request: 'user_friend_request',
      agree: 'user_friend_agree',
      refuse: 'user_friend_refuse',
    },
  },
  admin: {},
};