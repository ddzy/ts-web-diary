import * as Router from 'koa-router';

import {
  User, Topic, Posts,
} from '../../../../../model/model';
import {
  TRACK_TYPE,
  FILTER_SENSITIVE,
} from '../../../../../constants/constants';


const userInfoPartialTrackController = new Router();


/**
 * [处理] - 获取用户的足迹列表
 * @todo 分页获取
 */
userInfoPartialTrackController.get('/list', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
  };

  const {
    ownerId,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 查询用户信息
    const foundUserInfo = await User.findById(ownerId, '_id username tracks')

    // ? 预处理用户的足迹列表
    const foundUserTrackList = await foundUserInfo.tracks;
    const processedUserTrackList = await Promise.all(foundUserTrackList.map(async (v: any) => {
      const currentTrackType = v.type;

      switch (currentTrackType) {
        case TRACK_TYPE.attention.people: {
          const foundCurrentUserInfo = await User.findById(v.user, '_id username');

          return {
            ...v,
            user: foundCurrentUserInfo,
          };
        };
        case TRACK_TYPE.attention.topic: {
          const foundCurrentTopicInfo = await Topic.findById(v.topic, {
            ...FILTER_SENSITIVE,
          });

          return {
            ...v,
            topic: foundCurrentTopicInfo,
          };
        };
        case TRACK_TYPE.star.article.self: {
          const foundCurrentArticleInfo = await Posts.findById(v.article, {
            ...FILTER_SENSITIVE,
          });

          return {
            ...v,
            article: foundCurrentArticleInfo,
          };
        };
        default: {
          return v;
        };
      }
    }));

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        trackInfo: {
          trackList: processedUserTrackList,
        },
        ownerInfo: {
          _id: foundUserInfo._id,
          username: foundUserInfo.username,
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

export default userInfoPartialTrackController;