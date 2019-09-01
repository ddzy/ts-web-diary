import * as Router from 'koa-router';

import {
  User, ChatSingleMember,
} from '../../../../model/model';
import redis from '../../../../redis/redis';
import {
  IOREDIS_SINGLE_MEMBER_UNREAD_MESSAGE_TOTAL,
} from '../../../../redis/keys/redisKeys';


const chatCommonInfoController = new Router();


/**
 * [公共] - 获取聊天历史列表
 */
chatCommonInfoController.get('/memory/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

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


export default chatCommonInfoController;