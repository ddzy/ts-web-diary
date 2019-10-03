import * as Router from 'koa-router';
import * as UUID from 'uuid';

import {
  User,
  IActivityAttentionPeopleProps,
} from '../../../../model/model';


const actionAttentionPeopleController = new Router();

/**
 * [处理] - 关注用户
 */
actionAttentionPeopleController.post('/', async (ctx) => {
  interface IRequestParams {
    isAttention: boolean;
    fromUserId: string;
    toUserId: string;
    activityType: string;
  };

  const {
    isAttention,
    fromUserId,
    toUserId,
    activityType,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 如果是关注
    if (isAttention) {
      // * 创建新的动态
      const createdActivity: IActivityAttentionPeopleProps = {
        _id: UUID.v1(),
        type: activityType,
        user: toUserId,
        create_time: Date.now(),
        update_time: Date.now(),
      };

      // * 更新关注方的信息
      await User.findByIdAndUpdate(fromUserId, {
        '$addToSet': {
          'attention.users': toUserId,
          activities: createdActivity,
        },
      });

      // * 更新被关注方的信息
      await User.findByIdAndUpdate(toUserId, {
        '$addToSet': {
          followers: fromUserId,
        },
      });
    } else {
      // ? 反之, 如果是取消关注

      // * 更新关注方的信息
      await User.findByIdAndUpdate(fromUserId, {
        '$pull': {
          'attention.users': toUserId,
          activities: {
            type: activityType,
            user: toUserId,
          },
        },
      });

      // * 更新被关注方的信息
      await User.findByIdAndUpdate(toUserId, {
        '$pull': {
          followers: fromUserId,
        },
      });
    }

    ctx.body = {
      code: 0,
      message: isAttention ? '成功关注该用户!' : '取消了关注该用户!',
      data: {
        attentionInfo: {
          isAttention,
          fromUserId,
          toUserId,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
    };
  }
});


export default actionAttentionPeopleController;