const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const models = require('../model/model');
const { md5 } = require('../utils/utils');
const { 
  SECRET_FOR_TOKEN, 
  FILTER_SENSITIVE 
} = require('../constants/constants');


const register = new Router();
const User = models.User;


register.post('/', async (ctx, next) => {
  const { username, userpwd, usergender } = await ctx.request.body;
  
  // 查询
  const result = await User.findOne({ username }, { ...FILTER_SENSITIVE });

  try {
    if(result) {
      ctx.body = { code: 1, message: '用户名已经存在!' };
    }else {
      const saveUser = await User.create({
        username,
        usergender,
        userpwd: md5(userpwd),
      });
      ctx.body = {
        code: 0,
        message: '注册成功!',
      };
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { code: 1, msg: '后端出了点小问题,稍后再试吧!' };
  }
});


module.exports = register;