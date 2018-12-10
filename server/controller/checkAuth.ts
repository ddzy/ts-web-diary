import * as Router from 'koa-router';

import {
  User,
} from '../model/model';
import {
  FILTER_SENSITIVE,
} from '../constants/constants';
import {
  formatPath,
} from '../utils/utils';

const checkAuthController: Router = new Router();


/**
 * 前端路由切换
 * 权限认证
 */
checkAuthController.post('/', async (ctx, next) => {
  const {
    userid,
  }: any = await ctx.request.body;

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


export default checkAuthController;