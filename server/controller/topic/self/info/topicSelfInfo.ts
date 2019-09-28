import * as Router from 'koa-router';

import {
  Topic,
  User,
} from '../../../../model/model';
import {
  FILTER_SENSITIVE,
} from '../../../../constants/constants';


const topicSelfInfoController = new Router();


/**
 * [获取] - 话题列表
 * @todo 分页获取
 */
topicSelfInfoController.get('/list', async (ctx) => {
  try {
    // ? 查询话题列表
    const foundTopicList = await Topic.find({}, {...FILTER_SENSITIVE});

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        topicList: foundTopicList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

/**
 * [获取] - 所有话题 & 我关注的话题
 */
topicSelfInfoController.get('/list/attention_and_all', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 获取用户关注的话题列表
    const foundUserAttentionInfo = await User
      .findById(userId, 'attention.topics')
      .populate([
        {
          path: 'attention.topics',
          options: {
            lean: true,
            select: {
              ...FILTER_SENSITIVE,
            },
          },
        },
      ])
      .lean();
    const foundUserAttentionTopicList = await foundUserAttentionInfo.attention.topics;

    // ? 获取所有的话题列表
    const foundAllTopicList = await Topic
      .find({}, {}, {
        lean: true,
        select: {
          ...FILTER_SENSITIVE,
        },
      })
      .lean();

    // ? 存储当前用户对于每个话题的关注状态
    const attentionTopicStateHash: Record<string, boolean> = {};

    // ? 预处理所有的话题列表, 添加`用户是否已经关注该话题`条目
    const processedAllTopicList = await foundAllTopicList.map((v: any) => {
      const topicId = v._id;
      const followerList = v.followers;
      const isAttention = followerList.indexOf(userId) !== -1;

      attentionTopicStateHash[topicId] = isAttention;

      return {
        ...v,
        is_attention: isAttention,
      };
    });

    // ? 预处理当前用户关注的话题列表, 同理添加条目
    const processedAttentionTopicList = await foundUserAttentionTopicList.map((v: any) => {
      const topicId = v._id;
      const isAttention = attentionTopicStateHash[topicId];

      return {
        ...v,
        is_attention: isAttention,
      };
    });

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        topicInfo: {
          attentionTopicList: processedAttentionTopicList,
          allTopicList: processedAllTopicList,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});


/**
 * [获取] - 单个话题的详细信息
 */
topicSelfInfoController.get('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    topicId: string;
  };

  const {
    userId,
    topicId,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 查询话题信息
    const foundTopicInfo = await Topic
      .findById(topicId, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'followers',
          options: {
            select: {
              ...FILTER_SENSITIVE,
            },
          },
        },
        {
          path: 'actors',
          options: {
            select: {
              ...FILTER_SENSITIVE,
            },
          },
        },
      ])
      .lean();

    // ? 获取话题的关注者列表
    const foundTopicFollowers = await foundTopicInfo.followers;

    // ? 计算该用户是否关注了该话题
    const computeIsUserAttentionTopic = await foundTopicFollowers.some((v: any) => {
      const oUserId = v._id;

      return oUserId.equals(userId);
    });

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        topicInfo: {
          ...foundTopicInfo,
          is_attention: computeIsUserAttentionTopic,
        },
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后再试吧~',
      data: {
        errorInfo: error,
      },
    };
  }
});


export default topicSelfInfoController;