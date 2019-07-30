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
  ChatSingle,
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

/**
 * [单聊] - 获取指定单聊信息
 * @todo 日后会将single和group路由切分
 */
chatInfoController.get('/single', async (ctx) => {
  interface IQueryParams {
    userId: string;
    chatId: string;
    chatType: string;
  };

  const {
    chatId,
  } = ctx.request.query as IQueryParams;

  // ? 查询指定单聊信息
  const foundChatSingleInfo = await ChatSingle
    .findOne(
      { chat_id: chatId },
      'from_member_id to_member_id message',
    )
    .populate([
      {
        path: 'from_member_id',
        select: ['chat_id', 'user_id'],
        populate: {
          path: 'user_id',
          select: ['username'],
        },
      },
      {
        path: 'to_member_id',
        select: ['chat_id', 'user_id'],
        populate: {
          path: 'user_id',
          select: ['username'],
        },
      },
      {
        path: 'message',
        populate: [
          {
            path: 'from_member_id',
            select: ['user_id'],
            populate: {
              path: 'user_id',
              select: ['username', 'useravatar'],
            },
          },
          {
            path: 'to_member_id',
            select: ['user_id'],
            populate: {
              path: 'user_id',
              select: ['username', 'useravatar'],
            },
          },
        ],
      },
    ]);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      singleChatInfo: foundChatSingleInfo,
    },
  };
});

export default chatInfoController;