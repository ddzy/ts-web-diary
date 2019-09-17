import * as Router from 'koa-router';

import {
  convertURLParameterToObject,
} from '../../../utils/utils';
import redis from '../../../redis/redis';
import {
  IOREDIS_USER_ONLINE, IOREDIS_USER_ON_WHICH_CHAT,
} from '../../../redis/keys/redisKeys';


const statusUpdateController = new Router();


/**
 * [更新] - 浏览器页面关闭时, 重置用户的状态
 * @todo 用户在线状态 -> 离线
 * @todo 用户处于哪个聊天页面状态 -> ''
 */
statusUpdateController.post('/leave', async (ctx) => {
  interface IRequestParams {
    userId: string;
    chatId: string;
  };

  // TODO 提取URL中的参数
  const sURL = ctx.request.url;
  const oExtractedURL = convertURLParameterToObject(sURL) as IRequestParams;
  const sUserId = oExtractedURL.userId;
  const sChatId = oExtractedURL.chatId === 'null' ? '' : oExtractedURL.chatId;

  // TODO 重置用户的在线状态
  // redis处理在线用户有序集合中移除当前用户
  await redis.zrem(IOREDIS_USER_ONLINE, sUserId);

  // TODO 重置用户所处的聊天会话状态
  await redis.hset(IOREDIS_USER_ON_WHICH_CHAT, sUserId, sChatId);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {},
  };
});


export default statusUpdateController;