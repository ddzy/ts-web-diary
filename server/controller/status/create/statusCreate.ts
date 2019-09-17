import * as Router from 'koa-router';
import * as IO from 'socket.io';

import redis from '../../../redis/redis';
import {
  IOREDIS_USER_ONLINE,
  IOREDIS_USER_ON_WHICH_CHAT,
} from '../../../redis/keys/redisKeys';


const statusCreateController = new Router();


/**
 * [处理] - 应用状态相关
 */
export function handleStatus(socket: IO.Socket, io: IO.Namespace) {
  // ? 用户在线状态
  socket.on('sendUserOnLine', async (
    userInfo: {
      userId: string,
    },
  ) => {
    // redis将登录用户添加至SortedSet
    await redis.zadd(IOREDIS_USER_ONLINE, Date.now(), userInfo.userId);
    // redis统计在线用户总数
    const foundUserOnLineTotal = await redis.zcard(IOREDIS_USER_ONLINE);

    io.emit('receiveUserOnLineTotal', {
      online_total: foundUserOnLineTotal,
    });
  });

  // ? 用户离线状态
  socket.on('sendUserOffLine', async (
    userInfo: {
      userId: string,
    },
  ) => {
    // redis处理在线用户有序集合中移除当前用户
    await redis.zrem(IOREDIS_USER_ONLINE, userInfo.userId);
    // redis处理查找当前在线用户总数
    const foundUserOnLineTotal = await redis.zcard(IOREDIS_USER_ONLINE);

    io.emit('receiveUserOnLineTotal', {
      online_total: foundUserOnLineTotal,
    });
  });

  // ? 用户正处于哪个会话状态
  socket.on('sendUserOnWhichChat', async (
    userInfo: {
      userId: string,
      chatId: string,
    },
  ) => {
    // redis设置用户当前处于哪个会话
    redis.hset(IOREDIS_USER_ON_WHICH_CHAT, userInfo.userId, userInfo.chatId);
  });

  // ? 用户关闭浏览器页面时, 重置其在线状态以及所处的会话状态
  socket.on('sendResetUserStatus', async (
    userInfo: {
      userId: string,
      chatId: string,
    },
  ) => {
    // redis处理在线用户有序集合中移除当前用户
    await redis.zrem(IOREDIS_USER_ONLINE, userInfo.userId);
    // redis处理查找当前在线用户总数
    const foundUserOnLineTotal = await redis.zcard(IOREDIS_USER_ONLINE);

    // redis设置用户当前处于哪个会话
    redis.hset(IOREDIS_USER_ON_WHICH_CHAT, userInfo.userId, userInfo.chatId);

    io.emit('receiveUserOnLineTotal', {
      online_total: foundUserOnLineTotal,
    });
  });
}

export default statusCreateController;