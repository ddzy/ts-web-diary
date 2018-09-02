
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


module.exports = {
  FILTER_SENSITIVE,
  FILTER_AUTHOR,
  SECRET_FOR_TOKEN,
  WEBSITE,
};