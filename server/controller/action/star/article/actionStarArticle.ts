import * as Router from 'koa-router';
import * as UUID from 'uuid';

import redis from '../../../../redis/redis';
import {
  generateStarArticleKey,
} from '../../../../redis/keys/redisKeys';
import {
  User,
  ITrackStarArticleProps,
} from '../../../../model/model';


const actionStarArticleController: Router = new Router();


/**
 * [处理] - 文章点赞
 */
actionStarArticleController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    trackType: string;
    isStar: boolean;
  };

  const {
    userId,
    articleId,
    trackType,
    isStar,
  } = ctx.request.body as unknown as IRequestParams;

  const redisKey = generateStarArticleKey(articleId);

  if (isStar) {
    // ? redis更新文章的点赞状态
    await redis.zadd(redisKey, Date.now(), userId);

    // ? 更新用户的足迹信息
    const createdTrack: ITrackStarArticleProps = {
      _id: UUID.v1(),
      type: trackType,
      article: articleId,
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

    // ? 删除点赞该文章的动态
    await User.findByIdAndUpdate(userId, {
      '$pull': {
        tracks: {
          type: trackType,
          article: articleId,
        },
      },
    });
  }

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      starInfo: {
        userId,
        articleId,
        isStar,
      },
    },
  };
});


export default actionStarArticleController;