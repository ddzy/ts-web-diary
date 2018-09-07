const utility = require('utility');

const { WEBSITE } = require('../constants/constants');



/**
 * 加密
 * @param {string} pwd 密码
 */
function md5(pwd) {
  pwd = 'web_diary_project' + pwd; 

  return utility.md5(utility.md5(pwd));
}



/**
 * 格式化静态资源路径
 * @param {string} path 路径
 */
function formatPath(path) {
  
  const website = Object.values(WEBSITE).join(':');

  return path && website + path
    .slice(path.indexOf('\\'))
    .replace(/\\/g, '/')

}


/**
 * 取随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
function getRandom(min, max) {
  return ~~(Math.random()*(max-min)+min);
}



/**
 * 判断是否数组 
 * @param {*} obj 任意数
 */
function isArray(obj) {
  return ({}).toString.call(null, obj) === '[object Array]';
}




module.exports = {
  md5,
  formatPath,
  getRandom,
  isArray,
};

