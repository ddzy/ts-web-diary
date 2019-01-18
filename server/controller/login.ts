import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import {
  User,
} from '../model/model';
import {
  md5,
} from '../utils/utils';
import {
  SECRET_FOR_TOKEN,
  FILTER_SENSITIVE,
} from '../constants/constants';

const loginController: Router = new Router();


loginController.post('/', async (ctx) => {
  const { username }: any = await ctx.request.body;
  let { userpwd }: any = await ctx.request.body;

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
          // exp: ~~(Date.now() / 1000) + (60 * 60),
        }, SECRET_FOR_TOKEN, {
          expiresIn: '10h',
        }),
      }
    : ctx.body = {
        code: 1,
        message: '用户不存在!',
      };
});


export default loginController;