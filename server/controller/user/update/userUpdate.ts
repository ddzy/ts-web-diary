import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';

const userUpdateController = new Router();


/**
 * [更新] - 用户上传头像
 */
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

userUpdateController.post('/profile', async (ctx) => {
  interface IRequestParams {
    userId: string;
    username: string;
    usergender: string;
    address: string;
    job: string;
    introduction: string;
    website: string;
    education: string;
  };

  const {
    userId,
    username,
    usergender,
    address,
    job,
    introduction,
    website,
    education,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 更新用户信息
  const updatedUserInfo = await User
    .findByIdAndUpdate(
      userId,
      {
        '$set': {
          username,
          usergender,
          address,
          job,
          introduction,
          website,
          education,
        },
      },
      {
        new: true,
      },
    )
    .lean();

  if (updatedUserInfo) {
    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        userInfo: {
          _id: updatedUserInfo._id,
          username: updatedUserInfo.username,
          usergender: updatedUserInfo.usergender,
          address: updatedUserInfo.address,
          job: updatedUserInfo.job,
          introduction: updatedUserInfo.introduction,
          website: updatedUserInfo.website,
          education: updatedUserInfo.education,
        },
      },
    };
  } else {
    ctx.body = {
      code: 1,
      message: 'Faild!',
      data: {},
    };
  }
});

export default userUpdateController;