import * as Router from 'koa-router';
import * as IO from 'socket.io';

import redis from '../../../redis/redis';
import {
  IOREDIS_USER_ONLINE,
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
    // redis移除当前用户
    await redis.zrem(IOREDIS_USER_ONLINE, userInfo.userId);
    // redis查找当前在线用户总数
    const foundUserOnLineTotal = await redis.zcard(IOREDIS_USER_ONLINE);

    io.emit('receiveUserOnLineTotal', {
      online_total: foundUserOnLineTotal,
    });
  })
}

export default statusCreateController;