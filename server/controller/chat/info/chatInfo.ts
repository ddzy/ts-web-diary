/**
 * @name chatInfo
 * @description 获取聊天相关信息
 * @name ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as Router from 'koa-router';
import {
  User,
} from '../../../model/model';

const chatInfoController = new Router();


/**
 * 获取好友列表
 */
chatInfoController.get('/friend/list', async (ctx) => {
  const {
    userId,
  } = ctx.request.query;

  const foundUserList = await User
    .findById(userId, 'friend')
    .populate([
      {
        path: 'friend',
        select: ['username', 'useravatar'],
      },
    ])

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      friendList: foundUserList.friend,
    },
  };
})

/**
 * 获取聊天历史列表
 */
chatInfoController.get('/memory/list', async (ctx) => {
  const {
    userId
  } = ctx.request.query;

  // ? 查找聊天历史列表
  const foundUserInfo = await User
    .findById(userId, 'chat_memory')
    .populate([
      {
        path: 'chat_memory',
        options: {
          sort: {
            update_time: -1,
          },
        },
      },
    ]);
  const filteredChatMemoryList = await foundUserInfo.chat_memory;

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      chatMemoryList: filteredChatMemoryList,
    },
  };
})

export default chatInfoController;