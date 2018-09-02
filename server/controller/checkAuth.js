const Router = require('koa-router');

const models = require('../model/model');
const { md5 } = require('../utils/utils');
const { 
  FILTER_SENSITIVE 
} = require('../constants/constants');
const { formatPath } = require('../utils/utils');


const checkAuth = new Router();
const User = models.User;


/**
 * 前端路由切换
 * 权限认证
 */
checkAuth.post('/', async (ctx, next) => {
  const { userid } = ctx.request.body;

  // 查询
  const result = await User.findById(userid, { ...FILTER_SENSITIVE });


  result 
    ? ctx.body = {
        code: 0,
        isAuth: true,
        userid: result._id,
        username: result.username,
        usergender: result.usergender,
        useravatar: formatPath(result.useravatar),
      }
    : ctx.body = {
        code: 1,
        message: '用户不存在!',
        isAuth: false,
      };
});


module.exports = checkAuth;