import * as Router from 'koa-router';

import redis from '../../../redis/redis';
import {
  IOREDIS_USER_ONLINE,
} from '../../../redis/keys/redisKeys';


const statusInfoController = new Router();


/**
 * 获取站点的所有状态信息
 */
statusInfoController.get('/all', async (ctx) => {
  // redis查找站点在线人数
  const foundUserOnLineTotal = await redis.zcard(IOREDIS_USER_ONLINE);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      user_online_total: foundUserOnLineTotal,
    },
  };
});

export default statusInfoController;