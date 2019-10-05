import * as Router from 'koa-router';

import {
  User, Topic, Posts, Pin,
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
userInfoPartialTrackController.post('/list', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
    pageSize: number;
    lastTrackId: string;
  };

  const {
    ownerId,
    pageSize,
    lastTrackId,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询用户信息
    const foundUserInfo = await User.findById(ownerId, '_id username tracks')

    // ? 查询用户的足迹列表
    const foundUserTrackList = await foundUserInfo.tracks.reverse();

    // ? 分页过滤足迹列表
    // ? 分页查询
    let filteredUserTrackList: any[] = [];

    // * 如果是第一次获取足迹列表
    if (!lastTrackId) {
      filteredUserTrackList = await foundUserTrackList.slice(0, Number(pageSize));
    } else {
      // * 相反, 如果不是第一次获取
      foundUserTrackList.forEach((v: any, i: number) => {
        if (v._id === lastTrackId) {
          filteredUserTrackList = foundUserTrackList.slice(
            i + 1,
            i + Number(pageSize) + 1,
          );
        }
      });
    }

    // ? 格式化用户的足迹列表
    const processedUserTrackList = await Promise.all(filteredUserTrackList.map(async (v: any) => {
      const currentTrackType = v.type;

      switch (currentTrackType) {
        case TRACK_TYPE.attention.people: {
          const foundCurrentUserInfo = await User.findById(v.user, { ...FILTER_SENSITIVE });

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
        case TRACK_TYPE.star.pin.self: {
          // ? 查询沸点信息
          const foundCurrentPinInfo = await Pin.findById(v.pin, {
            ...FILTER_SENSITIVE,
          });
          // ? 查询沸点的作者信息
          const foundCurrentPinAuthorInfo = await User.findById(v.pin_author, {
            ...FILTER_SENSITIVE,
          });

          return {
            ...v,
            pin: foundCurrentPinInfo,
            pin_author: foundCurrentPinAuthorInfo,
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