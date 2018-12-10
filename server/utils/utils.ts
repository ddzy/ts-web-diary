import * as utility from 'utility';

import {
  WEBSITE,
} from '../constants/constants';


/**
 * 加密
 * @param {string} pwd 密码
 */
export function md5(
  pwd: string | number,
): string {
  pwd = 'web_diary_project' + pwd;

  return utility.md5(utility.md5(pwd));
}


/**
 * 格式化静态资源路径
 * @param {string} path 路径
 */
export function formatPath(
  path: string,
): string {
  // const website = Object.values(WEBSITE).join(':');
  const cache = [];
  for (const key in WEBSITE) {
    if (WEBSITE.hasOwnProperty(key)) {
      const element = WEBSITE[key];
      cache.push(element);
    }
  }
  const joinedCache: string = cache.join(':');

  return path && joinedCache + path
    .slice(path.indexOf('\\'))
    .replace(/\\/g, '/')
}


/**
 * 取随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function getRandom(
  min: number,
  max: number,
): number {
  return ~~(Math.random()*(max-min)+min);
}


/**
 * 判断是否数组
 * @param {*} obj 任意数
 */
export function isArray(
  obj: any,
): boolean {
  return ({}).toString.call(null, obj) === '[object Array]';
}
