import * as Router from 'koa-router';
import * as UUID from 'uuid';

import redis from '../../../../redis/redis';
import {
  generateStarPinKey,
} from '../../../../redis/keys/redisKeys';
import {
  User,
  ITrackStarPinProps,
} from '../../../../model/model';


const actionStarPinController = new Router();


/**
 * [处理] - 沸点点赞
 */
actionStarPinController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    pinId: string;
    pinAuthorId: string;
    trackType: string;
    isStar: boolean;
  };

  const {
    userId,
    pinId,
    pinAuthorId,
    trackType,
    isStar,
  } = ctx.request.body as IRequestParams;

  const redisKey = generateStarPinKey(pinId);

  try {
    if (isStar) {
      // ? redis更新沸点的点赞状态
      await redis.zadd(redisKey, `${Date.now()}`, userId);

      // ? 创建新的足迹
      const createdTrack: ITrackStarPinProps = {
        _id: UUID.v1(),
        type: trackType,
        pin: pinId,
        pin_author: pinAuthorId,
        create_time: Date.now(),
        update_time: Date.now(),
      };

      await User.findByIdAndUpdate(userId, {
        '$addToSet': {
          tracks: createdTrack,
        },
      });
    } else {
      await redis.zrem(redisKey, userId);

      // ? 删除该足迹信息
      await User.findByIdAndUpdate(userId, {
        '$pull': {
          tracks: {
            type: trackType,
            pin: pinId,
          },
        },
      });
    }

    ctx.body = {
      code: 0,
      message: isStar ? '你赞了这篇沸点!' : '你取消了赞!',
      data: {
        starInfo: {
          userId,
          pinId,
          isStar,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: error,
    };
  }
});

export default actionStarPinController;