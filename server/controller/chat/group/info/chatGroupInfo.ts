import * as Router from 'koa-router';

import { User } from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const chatGroupInfoController = new Router();


chatGroupInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.body as IRequestParams;

  // * 查询用户信息
  const foundUserInfo = await User
    .findById(userId, {
      ...FILTER_SENSITIVE,
    })
    .populate([
      {
        path: 'created_chat_group',
        select: {
          ...FILTER_SENSITIVE,
        },
      },
      {
        path: 'joined_chat_group',
        select: {
          ...FILTER_SENSITIVE,
        },
      },
    ])

  const createdChatGroupList = await foundUserInfo
    ? foundUserInfo.created_chat_group
    : [];
  const joinedChatGroupList = await foundUserInfo
    ? foundUserInfo.joined_chat_group
    : [];

  try {
    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        createdChatGroupList,
        joinedChatGroupList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: 'Error!',
      data: {},
    };
  }
})

export default chatGroupInfoController;