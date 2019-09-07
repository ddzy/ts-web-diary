import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';

const userUpdateController = new Router();


userUpdateController.post('/avatar', async (ctx) => {
  interface IRequestParams {
    userId: string,
    avatarUrl: string,
  };

  const {
    userId,
    avatarUrl,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 更新用户的头像信息
  const updatedUserInfo = await User.findByIdAndUpdate(
    userId,
    {
      useravatar: avatarUrl,
    },
    {
      new: true,
    },
  );

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      userInfo: {
        userid: updatedUserInfo._id,
        useravatar: updatedUserInfo.useravatar,
      },
    },
  };
});

export default userUpdateController;