import * as Router from 'koa-router';

import {
  Replys,
  Comments,
} from '../../../model/model';
import {
  formatPath,
} from '../../../utils/utils';

const actionAvatar: Router = new Router();


/**
 * 处理头像框hover
 */
actionAvatar.post('/userinfo', async (ctx) => {
  const {
    isReply,
    commentId,
    userId,
  }: any = await ctx.request.body;

  if (isReply) {
    const replyUserInfo = await Replys
      .findById(
        commentId,
        'from',
      )
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'articles', 'followers'],
        }
      ])
      .lean();
    const {
      from,
    } = await replyUserInfo;

    ctx.body = {
      code: 0,
      message: 'Success!',
      info: {
        userInfo: {
          _id: from._id,
          username: from.username,
          useravatar: from.useravatar
            ? formatPath(from.useravatar)
            : '',
          articlesCount: from.articles
            ? from.articles.length
            : 0,
          followersCount: from.followers
            ? from.followers.length
            : 0,
          isFollowed: from.followers
            ? from.followers.some((item: any) => {
              return item.equals(userId);
            })
            : true,
        },
      },
    };
  }
  else {
    const commentUserInfo = await Comments
      .findById(
        commentId,
        'from',
      )
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'articles', 'followers'],
        }
      ])
      .lean();
    const {
      from,
    } = await commentUserInfo;

    ctx.body = {
      code: 0,
      message: 'Success!',
      info: {
        userInfo: {
          _id: from._id,
          username: from.username,
          useravatar: from.useravatar
            ? formatPath(from.useravatar)
            : '',
          articlesCount: from.articles
            ? from.articles.length
            : 0,
          followersCount: from.followers
            ? from.followers.length
            : 0,
          isFollowed: from.followers.some((item: any) => {
            return item.equals(userId);
          }),
        },
      },
    };
  }

});



export default actionAvatar;