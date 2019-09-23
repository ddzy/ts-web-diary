import * as Router from 'koa-router';

import {
  Comments,
  Replys,
  User,
} from '../../../../model/model';
import redis from '../../../../redis/redis';
import {
  generateStarArticleKey,
} from '../../../../redis/keys/redisKeys';


const userInfoArticleController = new Router();


/**
 * 文章详情页的评论头像hover, 获取用户信息
 */
userInfoArticleController.post('/comment', async (ctx) => {
  interface IRequestParams {
    userId: string;
    _id: string;
    isReply: boolean;
  };

  const {
    userId,
    _id,
    isReply,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 查询评论或回复的详细信息
  let foundCommentOrReplyInfo: any = {};
  if (!isReply) {
    // ? 查询评论信息
    foundCommentOrReplyInfo = await Comments
      .findById(_id)
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'friends', 'articles', 'followers'],
        },
      ])
      .lean();
  } else {
    foundCommentOrReplyInfo = await Replys
      .findById(_id)
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'friends', 'articles', 'followers'],
        },
      ])
      .lean();
  }

  // ? 查询评论或回复的作者信息
  const foundCommentOrReplyAuthorInfo = await foundCommentOrReplyInfo.from;
  // ? 查询当前登录用户的信息
  const foundCurrentUserInfo = await User
    .findById(userId)
    .lean();

  // ? 统计评论人的文章数
  const computedAuthorArticleTotal = await foundCommentOrReplyAuthorInfo.articles.length;

  // ? 统计评论人的文章获赞总数
  const computedArticleStarCountArr = await Promise
    .all(foundCommentOrReplyAuthorInfo.articles.map(async (article: any) => {
    const articleId = article._id;
    const redisStarArticleKey = generateStarArticleKey(articleId);

    const starCount = await redis.zcard(redisStarArticleKey);

    return starCount;
    }));
  const computedArticleStarTotal = await computedArticleStarCountArr.reduce((total: number, current: number) => {
    total += current;

    return total;
  }, 0);

  // ? 统计评论人的被关注数
  const computedAuthorFollowerTotal = await foundCommentOrReplyAuthorInfo
    .followers
    .length;

  // ? 计算当前用户是否已经关注了评论人
  const computeIsAttention = await foundCommentOrReplyAuthorInfo.followers
    .indexOf(userId) !== -1;

  // ? 计算评论人与当前用户是否互为好友
  // * 单方的好友目前排除在外
  const computeUserIsAuthorFriend = await foundCommentOrReplyAuthorInfo
    .friends
    .some((id: any) => {
      return id.equals(userId);
    })
  const computeAuthorIsUserFriend = await foundCurrentUserInfo
    .friends
    .some((id: any) => {
      return id.equals(foundCommentOrReplyAuthorInfo._id);
    });

  // ? 计算评论人是否当前用户
  const computeIsAuthorEqualUser = await userId === String(foundCommentOrReplyAuthorInfo._id);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      userProfileInfo: {
        author_id: foundCommentOrReplyAuthorInfo._id,
        author_name: foundCommentOrReplyAuthorInfo.username,
        author_avatar: foundCommentOrReplyAuthorInfo.useravatar,
        author_article_total: computedAuthorArticleTotal,
        author_article_star_total: computedArticleStarTotal,
        author_follower_total: computedAuthorFollowerTotal,
        user_id: userId,
        user_name: foundCurrentUserInfo.username,
        user_avatar: foundCurrentUserInfo.avatar,
        user_is_attention: computeIsAttention,
        user_is_friend: (computeUserIsAuthorFriend && computeAuthorIsUserFriend) ? true : false,
        user_is_current_author: computeIsAuthorEqualUser,
      },
    },
  };
});

export default userInfoArticleController;