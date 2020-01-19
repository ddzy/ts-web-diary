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

/**
 * 提取URL中的GET请求参数
 * @param url 需要解析的url
 */
export function convertURLParameterToObject(
  url: string,
): Record<string, any> {
  const matchURLReg: RegExp = /(?:(?<=[^\/])(\?.+))/;
  const matchParameterReg: RegExp = /[\?\&]{1}(?:(\w+)=(\w+))/g;
  const final: Record<string, any> = {};

  const matchedCompleteURL = url.match(matchURLReg);

  if (matchedCompleteURL) {
    const matchedPairs = matchedCompleteURL[1].match(matchParameterReg);
    if (matchedPairs) {
      matchedPairs.forEach((v) => {
        const [key, value] = v.split('=');

        final[key.substr(1)] = value;
      });
    }
  }

  return final;
}

/**
 * @description 格式化时间戳
 * @author ddzy<alioeduan@foxmail.com>
 * @since 2020/1/10
 * @param formatter 预期的时间戳格式
 * @param timestamp 时间戳
 * @param options 可配置项
 * @param [options.dateConnector] 日期连接符(默认为'-')
 * @param [options.timeConnector] 时间连接符(默认为':')
 * @param [options.gap] 日期和时间之间的分隔符(默认为' ')
 * @returns 返回格式化后的时间戳
 */
interface ICategoryDesignParams {
  [key: string]: (timestamp: number) => number | string;
}

export default function dateFormat(
  formatter: string,
  timestamp: number | string,
  options: {
    dateConnector?: string;
    timeConnector?: string;
    gap?: string;
  }
) {
  const defaultOptions = {
    dateConnector: "-",
    timeConnector: ":",
    gap: " ",
    ...options
  };

  const parsedTimestamp =
    typeof timestamp === "number" ? timestamp : Number.parseInt(timestamp, 10);

  const RegExp_Date_Str = /(\w+)-(\w+)/g;
  const RegExp_Time_Str = /(\w+):(\w+)/g;
  const splitedDateAndTimeArr = formatter.split(" ").filter(Boolean);

  let result = '';

  // 如果是日期 + 时间
  if (splitedDateAndTimeArr.length === 2) {
    const pendingDateResult = _parseDate(
      splitedDateAndTimeArr[0],
      parsedTimestamp,
      defaultOptions.dateConnector
    );
    const pendingTimeResult = _parseTime(
      splitedDateAndTimeArr[1],
      parsedTimestamp,
      defaultOptions.timeConnector
    );

    result = `${pendingDateResult}${defaultOptions.gap}${pendingTimeResult}`;
  } else if (splitedDateAndTimeArr.length === 1) {
    const tempStr = splitedDateAndTimeArr[0];
    let pendingResult = '';

    // 如果是日期
    if (RegExp_Date_Str.test(tempStr)) {
      pendingResult = _parseDate(tempStr, parsedTimestamp, defaultOptions.dateConnector);
    }
    // 如果是时间
    else if (RegExp_Time_Str.test(tempStr)) {
      pendingResult = _parseTime(
        tempStr,
        parsedTimestamp,
        defaultOptions.timeConnector
      );
    }

    result = pendingResult;
  }

  return result;
}

const categoryDesign: ICategoryDesignParams = {
  yyyy(timestamp: number) {
    return getYear(timestamp);
  },
  MM(timestamp: number) {
    return getMonth(timestamp);
  },
  dd(timestamp: number) {
    return getDay(timestamp);
  },
  HH(timestamp: number) {
    return get24Hour(timestamp);
  },
  hh(timestamp: number) {
    return get12Hour(timestamp);
  },
  mm(timestamp: number) {
    return getMinute(timestamp);
  },
  ss(timestamp: number) {
    return getSeconds(timestamp);
  }
};

function _parseDate(
  formatter: string,
  timestamp: number,
  connector: string
): string {
  const formatterList = formatter.split("-");
  const parsedFormatterList = formatterList.map(v => {
    if (categoryDesign.hasOwnProperty(v)) {
      return categoryDesign[v](timestamp);
    } else {
      return "";
    }
  });

  return parsedFormatterList.join(connector);
}

function _parseTime(
  formatter: string,
  timestamp: number,
  connector: string
): string {
  const formatterList = formatter.split(":");
  const parsedFormatterList = formatterList.map(v => {
    if (categoryDesign.hasOwnProperty(v)) {
      return categoryDesign[v](timestamp);
    } else {
      return "";
    }
  });

  return parsedFormatterList.join(connector);
}

function getYear(timestamp: number) {
  return new Date(timestamp).getFullYear();
}

function getMonth(timestamp: number) {
  const pendingMonth = new Date(timestamp).getMonth();

  return pendingMonth >= 12 ? 1 : pendingMonth + 1;
}

function getDay(timestamp: number) {
  const pendingDay = new Date(timestamp).getDate();

  return pendingDay;
}

function get24Hour(timestamp: number) {
  const pending24Hour = new Date(timestamp).getHours();

  return pending24Hour;
}

function get12Hour(timestamp: number) {
  const computed24Hour = get24Hour(timestamp);
  const pending24Hour = computed24Hour === 0 ? 24 : computed24Hour;
  const pending12Hour = pending24Hour - 12;

  return pending12Hour;
}

function getMinute(timestamp: number, isFill = true) {
  const computedMinute = new Date(timestamp).getMinutes();
  let pendingMinute = "";

  if (isFill) {
    pendingMinute =
      computedMinute < 10 ? `0${computedMinute}` : `${computedMinute}`;
  } else {
    pendingMinute = `${computedMinute}`;
  }

  return pendingMinute;
}

function getSeconds(timestamp: number, isFill = true) {
  const computedSeconds = new Date(timestamp).getSeconds();
  let pendingSeconds = "";

  if (isFill) {
    pendingSeconds =
      computedSeconds < 10 ? `0${computedSeconds}` : `${computedSeconds}`;
  } else {
    pendingSeconds = `${computedSeconds}`;
  }

  return pendingSeconds;
}
