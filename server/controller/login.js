const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const models = require('../model/model');
const { md5 } = require('../utils/utils');
const { 
  SECRET_FOR_TOKEN, 
  FILTER_SENSITIVE 
} = require('../constants/constants');


const login = new Router();
const User = models.User;


login.post('/', async (ctx, next) => {
  let { username, userpwd } = await ctx.request.body;
  userpwd = md5(userpwd); // 加密
  
  // 查询
  const result = await User.findOne({ username }, { ...FILTER_SENSITIVE });

  
  result 
    ? ctx.body = {
        code: 0,
        message: '登录成功!',
        userid: result._id,
        username: result.username,
        token: jwt.sign({
          data: { userid: result._id },
          exp: ~~(Date.now() / 1000) + (60 * 60),
        }, SECRET_FOR_TOKEN),
      }
    : ctx.body = {
        code: 1,
        message: '用户不存在!',
      };
});


module.exports = login;