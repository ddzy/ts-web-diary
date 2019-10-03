import * as Router from 'koa-router';
import * as UUID from 'uuid';

import {
  Topic,
  User,
  IActivityAttentionTopicProps,
} from '../../../../model/model';


const actionAttentionTopicController = new Router();


/**
 * [处理] - 关注 or 取消关注话题
 */
actionAttentionTopicController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    topicId: string;
    activityType: string;
    isAttention: boolean;
  };

  const {
    userId,
    topicId,
    activityType,
    isAttention,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 如果是关注
    if (isAttention) {
      // * 创建新的动态
      const createdActivity: IActivityAttentionTopicProps = {
        _id: UUID.v1(),
        type: activityType,
        topic: topicId,
        create_time: Date.now(),
        update_time: Date.now(),
      };

      // * 更新用户的相关信息
      await User.findByIdAndUpdate(userId, {
        '$addToSet': {
          'attention.topics': topicId,
          activities: createdActivity,
        },
      });

      // * 更新话题的关注者列表
      await Topic.findByIdAndUpdate(topicId, {
        '$addToSet': {
          'followers': userId,
        },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        '$pull': {
          'attention.topics': topicId,
          activities: {
            type: activityType,
            topic: topicId,
          },
        },
      });

      await Topic.findByIdAndUpdate(topicId, {
        '$pull': {
          'followers': userId,
        },
      });
    }

    ctx.body = {
      code: 0,
      message: isAttention ? '已成功关注该话题!' : '已取消关注该话题!',
      data: {
        attentionInfo: {
          isAttention,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: 0,
      message: '后端发生错误, 请稍后重试!',
      data: error,
    };
  }
});

export default actionAttentionTopicController;