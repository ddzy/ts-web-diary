import * as Router from 'koa-router';
import * as JsonWebToken from 'jsonwebtoken';

import {
  User,
} from '../../model/model';
import {
  md5,
} from '../../utils/utils';
import {
  SECRET_FOR_TOKEN,
} from '../../constants/constants';

const loginController: Router = new Router();


loginController.post('/', async (ctx) => {
  interface IRequestParams {
    username: string;
    userpwd: string;
  };

  const {
    username,
    userpwd,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 密码加密
  const encryptUserPwd = md5(userpwd);

  // ? 查询用户名是否存在
  const foundIsUserNameExist = await User.findOne({
    username,
  });

  if (!foundIsUserNameExist) {
    ctx.body = {
      code: 1,
      message: '用户名不存在!',
      data: {
        username,
      },
    };

    return;
  }

  // ? 查询密码是否正确
  const computeIsUserPwdTruthy = await foundIsUserNameExist.userpwd === encryptUserPwd;

  if (!computeIsUserPwdTruthy) {
    ctx.body = {
      code: 1,
      message: '密码错误!',
      data: {
        username,
      },
    };

    return;
  }

  // ? 登录成功
  ctx.body = {
    code: 0,
    message: '登录成功!',
    data: {
      userInfo: {
        _id: foundIsUserNameExist._id,
        username: foundIsUserNameExist.username,
        token: JsonWebToken.sign({
          data: {
            userid: foundIsUserNameExist._id,
          },
          exp: ~~(Date.now() / 1000) + (60 * 60),
        }, SECRET_FOR_TOKEN),
      },
    },
  };
});


export default loginController;