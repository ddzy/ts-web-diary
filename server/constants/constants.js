
// 敏感信息过滤
const FILTER_SENSITIVE = {
  '__v': 0,
  userpwd: 0,
};


// 
const FILTER_AUTHOR = {
  author: 0,
};



// jwt 盐
const SECRET_FOR_TOKEN = 'WEB_DIARY_PROJECT';


// Website
const WEBSITE = {
  host: 'http://localhost',
  port: 8888,
};


// 七牛云 密钥
const QINIU_KEY = {
  AccessKey: 'n4eSoB1ITSy1zcht0nQQ2XTLyYNsqCpUuOYEJ4m6',
  SecretKey: 'z1RJP_OGgPA-oyuT2DjG53ICLF2DeUS5maSRt83b',
};


module.exports = {
  FILTER_SENSITIVE,
  FILTER_AUTHOR,
  SECRET_FOR_TOKEN,
  WEBSITE,
  QINIU_KEY,
};