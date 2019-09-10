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
 * 取随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function getFullRandom(
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

/**
 * 过滤字符串中的换行和回车符号(不包括空格)
 * @param text 需要处理的文本
 * @param replacement 替换符
 */
export function filterTabAndEnterCharacter(
  text: string,
  replacement: string,
): string {
  const reg = /[\r\n]/g;

  return text.replace(reg, replacement);
}

/**
 * 生成默认的随机用户名
 * @param prefix 前缀数组
 * @param content 内容数组
 * @param contentLen 内容的长度
 */
export function createDefaultUserName(
  prefix: string[],
  content: string[],
  contentLen = 8,
) {
  const randomUserNamePrefix = prefix[
    getFullRandom(0, prefix.length)
  ];
  let randomUserNameContent = '';

  for (let i = 0; i < contentLen; i++) {
    const v = content[
      getFullRandom(0, content.length)
    ];

    randomUserNameContent += v;
  }

  return randomUserNamePrefix + randomUserNameContent;
}