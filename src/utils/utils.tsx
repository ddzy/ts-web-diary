

/**
 * 格式化时间
 * @param time 时间 
 */
export function formatTime(time: string | number): string {
  const after = Number(time) as number;
  const now = new Date().getTime() as number;

  const distance = now - after as number;
  const seconds = distance / 1000 as number;
  
  if(seconds <= 1) {
    return `1  秒前`;
  }else if(seconds > 1 && seconds < 60) {
    return `${~~seconds}  秒前`;
  }else if(seconds >= 60 && seconds < 3600) {
    return `${~~(seconds / 60)}  分钟前`;
  }else if(seconds >= 3600 && seconds < 3600 * 24) {
    return `${~~(seconds / 3600)}  小时前`;
  }else if(seconds >= 3600 * 24 && seconds < 3600 * 24 * 365) {
    return `${~~(seconds / 3600 / 24)}  天前`;
  }else {
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
  return {
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
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
  const sel: Selection = window.getSelection();
  const range: Range = document.createRange();

  callback && callback();

  range.setStart(ref, ref.childNodes.length);
  range.setEndAfter(ref);

  sel.removeAllRanges();
  sel.addRange(range);
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
