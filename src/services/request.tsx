import axios from 'axios';
import jsonp from 'jsonp';
import NProgress from 'nprogress';


axios.interceptors.request.use((config) => {
  // nprogress START
  NProgress.start();

  // Add token
  localStorage.getItem('token')
    &&  Reflect.set(
          config.headers,
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`,
        );

  return config;
}, (err) => {
  // nprogress END
  NProgress.done();

  return Promise.reject(err);
});


axios.interceptors.response.use((config) => {
  // nprogress END
  NProgress.done();

  return config;
}, (err) => {
  // nprogress END
  NProgress.done();

  return Promise.reject(err.response);
});


export interface IQueryProps {
  url: string;
  method: string;
  data?: any;
  token?: string | '',
  jsonp: boolean;
};


/**
 * axios请求
 * @param options object 配置参数
 * @returns Promise
 */
export function query(options: IQueryProps): Promise<any> {
  return new Promise((resolve, reject) => {

    if(options.jsonp) {
      jsonp(options.url, { param: 'callback' }, (err, data) => {
        data.status === 200
          ? resolve(data)
          : reject(err);
      })
    }else {
      axios({
        method: options.method,
        url: options.url,
        data: options.method === 'POST' && options.data,
        params: options.method === 'GET' && options.data,
      })
        .then((res) => {
          if(res.status === 200 || res.status === 304) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}


