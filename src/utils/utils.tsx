

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