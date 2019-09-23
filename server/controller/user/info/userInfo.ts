import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';
import { FILTER_SENSITIVE } from '../../../constants/constants';


const userInfoController: Router = new Router();



/**
 * [获取] - 用户的详细信息
 */
userInfoController.get('/detail', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

  // ? 查询用户信息
  const foundUserInfo = await User
    .findById(userId, { ...FILTER_SENSITIVE })
    .lean();

  if (foundUserInfo) {
    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        userInfo: {
          ...foundUserInfo,
        },
      },
    };
  } else {
    ctx.body = {
      code: -1,
      message: 'Faild!',
      data: {},
    };
  }
});


export default userInfoController;