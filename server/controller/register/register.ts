import * as Router from 'koa-router';

import {
  md5,
} from '../../utils/utils';
import {
  User,
} from '../../model/model';
import {
  FILTER_SENSITIVE,
} from '../../constants/constants';

const registerController: Router = new Router();


registerController.post('/', async (ctx, next) => {
  const {
    username,
    userpwd,
    usergender,
  }: any = await ctx.request.body;

  // 查询
  const result = await User
    .findOne({ username }, { ...FILTER_SENSITIVE });

  try {
    if(result) {
      ctx.body = { code: 1, message: '用户名已经存在!' };
    }else {
      await User.create({
        username,
        usergender,
        useravatar: '',
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


export default registerController;