import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';


const authAppController = new Router();


/**
 * [处理] - 权限认证
 */
authAppController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询用户信息
    const foundUserInfo = await User.findById(
      userId,
      '_id username useravatar usergender',
    );

    if (foundUserInfo) {
      ctx.body = {
        code: 0,
        message: '用户鉴权通过',
        data: {
          isAuth: true,
          userInfo: foundUserInfo,
        },
      };
    } else {
      ctx.body = {
        code: 1,
        message: '用户不存在!',
        data: {
          isAuth: false,
        },
      };
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: {
        isAuth: false,
      },
    };
  }
});


export default authAppController;