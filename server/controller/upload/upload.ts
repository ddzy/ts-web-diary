import * as Router from 'koa-router';
import * as qiniu from 'qiniu';

import {
  QINIU_KEY,
} from '../../constants/constants';

const uploadController: Router = new Router();


/**
 * [七牛云] - 获取七牛云SDK
 */
uploadController.get('/qiniu/info', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  }: IRequestParams = await ctx.request.query;

  const mac = await new qiniu.auth.digest.Mac(
    QINIU_KEY.AccessKey,
    QINIU_KEY.SecretKey,
  );
  const putPolicy = await new qiniu.rs.PutPolicy({
    scope: QINIU_KEY.Bucket,
  });
  const uploadToken = await putPolicy.uploadToken(mac);
  const domain = await QINIU_KEY.Domain;

  if (uploadToken) {
    ctx.body = {
      code: 0,
      message: 'Success',
      data: {
        qiniuInfo: {
          uploadToken,
          userId,
          domain,
        },
      },
    };
  } else {
    ctx.body = {
      code: 1,
      message: '暂时无法获取token, 稍后再试',
    };
  }
});


export default uploadController;