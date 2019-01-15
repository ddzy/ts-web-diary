import * as Router from 'koa-router';
import * as qiniu from 'qiniu';

import {
  QINIU_KEY,
} from '../../constants/constants';

const uploadController: Router = new Router();


uploadController.get('/qiniu', async (ctx) => {
  const { userid } = await ctx.request.query;

  const mac = await new qiniu.auth.digest.Mac(
    QINIU_KEY.AccessKey,
    QINIU_KEY.SecretKey,
  );
  const putPolicy = await new qiniu.rs.PutPolicy({
    scope: 'duan',
  });
  const uploadToken = await putPolicy.uploadToken(mac);
  const domain = await QINIU_KEY.Domain;

  if (uploadToken) {
    ctx.body = {
      code: 0,
      message: 'Success',
      data: {
        uploadToken,
        userid,
        domain,
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