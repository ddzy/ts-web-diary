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
  ChatSingleMember,
} from '../../../model/model';
import redis from '../../../redis/redis';
import {
  IOREDIS_SINGLE_MEMBER_UNREAD_MESSAGE_TOTAL,
} from '../../../redis/keys/redisKeys';

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
  // 遍历单聊历史列表, 更新列表的未读消息总数
  const updatedChatMemoryListByUnreadMessageTotal = await Promise.all(
    filteredChatMemoryList.map(async (memoryInfo: any) => {
      // 查找单聊用户
      const foundChatSingleMember = await ChatSingleMember
        .findOne({
          chat_id: memoryInfo.chat_id,
          user_id: userId,
        });

      // redis根据单聊用户查找未读消息数
      let finalUnreadMessageTotal = 0;
      if (foundChatSingleMember) {
        const foundUnreadMessageTotal = await redis.hget(IOREDIS_SINGLE_MEMBER_UNREAD_MESSAGE_TOTAL, foundChatSingleMember._id);

        finalUnreadMessageTotal = Number(foundUnreadMessageTotal);
      }

      return {
        ...memoryInfo._doc,
        unread_message_total: finalUnreadMessageTotal,
      };
    })
  );

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      chat_memory_list: updatedChatMemoryListByUnreadMessageTotal,
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
    pageSize: number;
    page: number;
  };

  const {
    chatId,
    pageSize,
    page,
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
        options: {
          sort: {
            create_time: -1,
          },
          limit: Number(pageSize),
          skip: (Number(page) - 1) * Number(pageSize),
        },
      },
    ])

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      singleChatInfo: {
        ...foundChatSingleInfo._doc,
        message: foundChatSingleInfo.message.reverse(),
      },
    },
  };
});

/**
 * [单聊] - 获取指定单聊的详细信息
 * @todo 拆分single & group
 */
chatInfoController.get('/single/detail', async (ctx) => {
  interface IRequestParams {
    userId: string;
    chatId: string;
  };

  const {
    chatId,
  }: IRequestParams = ctx.request.query;

  // ? 查询指定单聊的详细信息
  const foundChatSingleInfo = await ChatSingle
    .findOne(
      { chat_id: chatId },
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
    ]);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      chat_single_detail: {
        chat_id: foundChatSingleInfo.chat_id,
        create_by_user: foundChatSingleInfo.from_member_id.user_id.username,
        message_total: foundChatSingleInfo.message_total,
        create_time: foundChatSingleInfo.create_time,
        last_message_time: foundChatSingleInfo.last_message_time,
        update_time: foundChatSingleInfo.update_time,
      },
    },
  };
});

/**
 * [单聊] - 分页获取指定单聊的消息列表
 * @todo 拆分single & group
 */
chatInfoController.get('/single/message/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    chatId: string;
    page: number;
    pageSize: number;
  };

  const {
    chatId,
    page,
    pageSize,
  }: IRequestParams = ctx.request.query;

  const foundChatSingleInfo = await ChatSingle
    .findOne({
      chat_id: chatId,
    })
    .select('message')
    .populate([
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
        options: {
          sort: {
            create_time: -1,
          },
          limit: Number(pageSize),
          skip: (Number(page) - 1) * Number(pageSize),
        },
      },
    ]);
  const foundChatSingleMessage = await foundChatSingleInfo.message;

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      single_chat_message: foundChatSingleMessage.reverse(),
    },
  };
});


export default chatInfoController;