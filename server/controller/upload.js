const Router = require('koa-router');
const qiniu = require('qiniu');

const upload = new Router();
const {
  QINIU_KEY,
} = require('../constants/constants');


upload.get('/get_qiniu_token', async (ctx) => {
  const { userid } = await ctx.request.query;

  const mac = await new qiniu.auth.digest.Mac(
    QINIU_KEY.AccessKey,
    QINIU_KEY.SecretKey,
  );
  const putPolicy = await new qiniu.rs.PutPolicy({
    scope: 'duan',
  });
  const uploadToken = await putPolicy.uploadToken(mac);
  
  if (uploadToken) {
    ctx.body = {
      code: 0,
      message: 'Success',
      data: {
        uploadToken,
        userid,
      },
    };
  } else {
    ctx.body = {
      code: 1,
      message: '暂时无法获取token, 稍后再试',
    };
  }
});


module.exports = upload;