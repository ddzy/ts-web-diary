import * as Router from 'koa-router';

import {
  Topic,
  User,
  PinComment,
  PinReply,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const topicPinInfoController = new Router();


/**
 * [获取] - 单个话题下的沸点列表
 */
topicPinInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    topicId: string;
    page: number;
    pageSize: number;
  };

  const {
    userId,
    topicId,
    page,
    pageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询当前应用用户信息
    const foundCurrentUserInfo = await User
      .findById(userId, { ...FILTER_SENSITIVE });

    // ? 查询沸点列表
    const foundPinList = await Topic
      .findById(topicId, '_id pins')
      .populate([
        {
          path: 'pins',
          populate: [
            {
              path: 'author_id',
              select: ['_id', 'username', 'useravatar', 'job', 'website', 'introduction', 'followers', 'friends'],
            },
            {
              path: 'topic_id',
              select: ['_id', 'name'],
            },
          ],
          select: {
            ...FILTER_SENSITIVE,
          },
          options: {
            sort: {
              create_time: -1,
            },
            limit: Number(pageSize),
            skip: (Number(page) - 1) * Number(pageSize),
            lean: true,
          },
        },
      ])

    // // ? 预处理沸点列表
    // const processedPinList = foundPinList.pins.map((v: any) => {
    //   // ? 计算当前用户是否已经关注了评论人
    //   const computeIsAttention = v.author_id.followers
    //     .indexOf(userId) !== -1;

    //   // ? 计算评论人与当前用户是否互为好友
    //   // * 单方的好友目前排除在外
    //   const computeUserIsAuthorFriend = v.author_id
    //     .friends
    //     .some((id: any) => {
    //       return id.equals(userId);
    //     })
    //   const computeAuthorIsUserFriend = foundCurrentUserInfo
    //     .friends
    //     .some((id: any) => {
    //       return id.equals(v.author_id._id);
    //     });

    //   // ? 计算评论人是否当前用户
    //   const computeIsAuthorEqualUser = userId === String(v.author_id._id);

    //   return {
    //     ...v,
    //     content_link: JSON.parse(v.content_link),
    //     content_image: JSON.parse(v.content_image),
    //     user_is_friend: (computeUserIsAuthorFriend && computeAuthorIsUserFriend) ? true : false,
    //     user_is_current_author: computeIsAuthorEqualUser,
    //     user_is_attention: computeIsAttention,
    //   };
    // });

    // ? 预处理沸点列表
    const processedPinList = await Promise.all(foundPinList.pins.map(async (v: any) => {
      // ? 查询当前沸点的评论回复总数
      const foundCurrentPinCommentTotal = await PinComment.find({
        pin_id: v._id,
      }).countDocuments();
      const foundCurrentPinReplyTotal = await PinReply.find({
        pin_id: v._id,
      }).countDocuments();

      // ? 计算当前用户是否已经关注了评论人
      const computeIsAttention = v.author_id.followers
        .indexOf(userId) !== -1;

      // ? 计算评论人与当前用户是否互为好友
      // * 单方的好友目前排除在外
      const computeUserIsAuthorFriend = v.author_id
        .friends
        .some((id: any) => {
          return id.equals(userId);
        })
      const computeAuthorIsUserFriend = foundCurrentUserInfo
        .friends
        .some((id: any) => {
          return id.equals(v.author_id._id);
        });

      // ? 计算评论人是否当前用户
      const computeIsAuthorEqualUser = userId === String(v.author_id._id);

      return {
        ...v,
        content_link: JSON.parse(v.content_link),
        content_image: JSON.parse(v.content_image),
        user_is_friend: (computeUserIsAuthorFriend && computeAuthorIsUserFriend) ? true : false,
        user_is_current_author: computeIsAuthorEqualUser,
        user_is_attention: computeIsAttention,
        comment_total: foundCurrentPinCommentTotal + foundCurrentPinReplyTotal
      };
    }));

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        pinList: processedPinList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端错误, 请稍后重试!',
      data: {},
    };
  }
});

export default topicPinInfoController;