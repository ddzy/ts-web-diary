/**
 * 格式化时间
 * @param time 时间
 */
export function formatTime(time: string | number): string {
  const after = Number(time) as number;
  const now = new Date().getTime() as number;

  const distance = now - after as number;
  const seconds = distance / 1000 as number;

  if (seconds <= 1) {
    return `1  秒前`;
  } else if (seconds > 1 && seconds < 60) {
    return `${~~seconds}  秒前`;
  } else if (seconds >= 60 && seconds < 3600) {
    return `${~~(seconds / 60)}  分钟前`;
  } else if (seconds >= 3600 && seconds < 3600 * 24) {
    return `${~~(seconds / 3600)}  小时前`;
  } else if (seconds >= 3600 * 24 && seconds < 3600 * 24 * 365) {
    return `${~~(seconds / 3600 / 24)}  天前`;
  } else {
    return `很久了`;
  }
}

/**
 * 获取图片base64码
 * @param img 图片
 * @param callback 处理函数
 */
export function getBase64(
  img: Blob,
  callback: (result: any) => void
) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => {
    callback(reader.result);
  });
}

/**
 * 获取window内宽高
 */
export function getWindowWH() {
  let { innerWidth, innerHeight } = window;

  window.addEventListener('resize', () => {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
  });

  return {
    winWidth: innerWidth,
    winHeight: innerHeight,
  };
}

/**
 * 判断是否数组
 * @param obj 任意参数
 */
export function isArray(obj: any) {
  return obj
    && ({}).toString.call(null, obj) === '[object Array]'
    || Array.isArray(obj);
}

/**
 * 两个数组对应的位置分别为对象的键和值
 * @param arr1 转化为键的数组
 * @param arr2 转化为值的数组
 * @returns 对应键值对象
 * @see arr1.length<=arr2.length
 */
export function mixinObj(
  arr1: any,
  arr2: any,
): object {
  const resultObj = {};

  if (arr1.length === 0 || arr2.length === 0) {
    return [];
  } else if (arr1.length > arr2.length) {
    return [];
  }

  arr1.forEach((v: string | number, i: number) => {
    Reflect.set(resultObj, v, arr2[i]);
  });

  return resultObj;
}

/**
 * 设置光标位置
 * @param ref 目标对象
 * @param callback 回调
 */
export function setRange(
  ref: HTMLElement,
  callback?: () => void
) {
  const sel = window.getSelection();
  const range: Range = document.createRange();

  callback && callback();

  range.setStart(ref, ref.childNodes.length);
  range.setEndAfter(ref);

  sel && sel.removeAllRanges();
  sel && sel.addRange(range);
}

/**
 * base64转blob
 * @param url base64图片
 */
export function convertBase64UrlToBlob(
  url: string,
): Blob {
  const bytes = window.atob(url.split(',')[1]);
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);

  ia.forEach((v: number, i: number) => ia[i] = bytes.charCodeAt(i));

  return new Blob([ia], {
    type: url.split(',')[0].split(':')[1].split(';')[0],
  });
}

/**
 * 自定义模拟鼠标事件
 * @param element DOM元素
 * @param type 鼠标事件类型
 * @param callback 处理器
 */
export function customMouseEvent(
  element: Element,
  type: 'click' | 'dblclick' | 'mouseup' | 'mousedown',
  callback?: (event: MouseEvent) => void,
): void {
  if (element['click'] && typeof element['click'] === 'function') {
    element['click']();
  } else {
    const event = new MouseEvent(type, {
      bubbles: true,
    });

    element.dispatchEvent(event);
  }

  element.addEventListener(type, (e) => {
    callback && callback(e as MouseEvent);
  });
}

/**
 * 格式化聊天消息在聊天历史列表的展示格式
 * @param type 消息类型
 * @param content 消息内容
 */
export function formatChatMemoryContent(
  type: string,
  content: any,
): string {
  const categoryDesign = {
    // 普通文本
    plain() {
      // 截取随机10 - 15个字符
      const len = content.length;
      const minLength = 10;
      const maxLength = 15;

      return len <= 10
        ? content
        : `${content.substring(0, getFullRandom(minLength, maxLength))}...`;
    },
    // 图片
    // 文件
  };

  return categoryDesign[type] ? categoryDesign[type]() : '未知的消息类型';
}

/**
 * 获取指定边界的随机整数
 * @param min 下边界
 * @param max 上边界
 */
export function getFullRandom(
  min: number,
  max: number,
) {
  return ~~(Math.random() * (max - min) + min);
}

/**
 * 获取指定边界的随机任意数
 * @param min 下边界
 * @param max 上边界
 */
export function getAnyRandom(
  min: number,
  max: number,
) {
  return Math.random() * (max - min) + min;
}

/**
 * 将指定时间戳转化为年-月-日格式
 * @param timestamp 时间戳
 * @param separator 分隔符
 * @example
 * // 2019-8-20
 * formatTimeByYYYYMD(Date.now());
 * @example
 * // 2019/8/20
 * formatTimeByYYYYMD(Date.now(), '/')
 */
export function formatTimeByYYYYMMDD(
  timestamp: number,
  separator: string = '-'
): string {
  const processedDate = new Date(timestamp);

  const year = processedDate.getFullYear();
  const month = processedDate.getMonth() + 1;
  const day = processedDate.getDate();

  return `${year}${separator}${month}${separator}${day}`;
}

/**
 * 维吉尼亚算法
 * @method encrypt 加密
 * @method decrypt 解密
 */
export const vigenere = {
  characterToNumberMap: new Map<string, number>([
    ['a', 0],
    ['b', 1],
    ['c', 2],
    ['d', 3],
    ['e', 4],
    ['f', 5],
    ['g', 6],
    ['h', 7],
    ['i', 8],
    ['j', 9],
    ['k', 10],
    ['l', 11],
    ['m', 12],
    ['n', 13],
    ['o', 14],
    ['p', 15],
    ['q', 16],
    ['r', 17],
    ['s', 18],
    ['t', 19],
    ['u', 20],
    ['v', 21],
    ['w', 22],
    ['x', 23],
    ['y', 24],
    ['z', 25],
  ]),

  numberToCharacterMap: new Map<number, string>([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
    [4, 'e'],
    [5, 'f'],
    [6, 'g'],
    [7, 'h'],
    [8, 'i'],
    [9, 'j'],
    [10, 'k'],
    [11, 'l'],
    [12, 'm'],
    [13, 'n'],
    [14, 'o'],
    [15, 'p'],
    [16, 'q'],
    [17, 'r'],
    [18, 's'],
    [19, 't'],
    [20, 'u'],
    [21, 'v'],
    [22, 'w'],
    [23, 'x'],
    [24, 'y'],
    [25, 'z'],
  ]),

  /**
   * 加密
   * @param secret 密钥
   * @param plain 明文
   * @example
   * // kzlbso
   * vigenere.encrypt('fox', 'flower');
   * // irwd
   * vigenere.encrypt('fox', 'ddzy');
   */
  encrypt(
    secret: string,
    plain: string,
  ): string {
    const secretLength = secret.length;
    const plainLength = plain.length;
    let countSecret = 0;
    let countPlain = 0;

    let result = '';

    // 空的密钥或明文
    if (!secretLength || !plainLength) {
      return result;
    }

    do {
      const plainKey = this.characterToNumberMap.get(plain[countPlain]);
      const secretKey = this.characterToNumberMap.get(secret[countPlain % secretLength]);

      if (!plainKey || !secretKey) {
        return result;
      }

      const processedKey = (plainKey + secretKey) % 26;
      const processedValue = this.numberToCharacterMap.get(processedKey);

      result += processedValue

      countSecret = countSecret === secretLength - 1
        ? 0
        : countSecret;
    } while ((countSecret++ < secretLength - 1) && (countPlain++ < plainLength - 1));

    return result;
  },

  /**
   * 解密
   * @param secret 密钥
   * @param plain 密文
   * @example
   * // flower
   * vigenere.decrypt('fox', 'kzlbso');
   * // ddzy
   * vigenere.decrypt('fox', 'irwd');
   */
  // decrypt(
  //   secret: string,
  //   plain: string,
  // ): string {

  // },
};