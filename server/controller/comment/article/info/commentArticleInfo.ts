import * as Router from 'koa-router';

import { Posts } from '../../../../model/model';
import { formatPath } from '../../../../utils/utils';

const commentArticleInfoController: Router = new Router();


/**
 * 评论加载更多
 */
commentArticleInfoController.get('/more', async (ctx) => {
  const {
    articleId,
    lastCommentId,
    commentPageSize,
    replyPageSize,
  }: any = await ctx.query;

  const articleInfo = await Posts
    .findById(
      articleId,
      'comments',
    )
    .populate([
      {
        path: 'comments',
        populate: [
          {
            path: 'replys',
            populate: [
              {
                path: 'from',
                select: ['username', 'useravatar'],
              },
              {
                path: 'to',
                select: ['username', 'useravatar'],
              },
            ],
            options: {
              sort: { create_time: '-1' },
              limit: replyPageSize,
            },
          },
          {
            path: 'from',
            select: ['username', 'useravatar'],
          },
        ],
        options: {
          sort: { create_time: '-1' },
        },
      }
    ])
    .lean();

  // ** 初始化评论信息 **
  const {
    comments,
  } = await articleInfo;
  const beginIndex = await comments.findIndex((v: any) => {
    return v._id.equals(lastCommentId);
  });
  const processedComments = await beginIndex === -1
    ? []
    : comments.slice(
      beginIndex + 1,
      beginIndex + 2 + Number(commentPageSize),
    );

  // ** 格式化图片路径 **
  const finalComments = await processedComments
    && processedComments.length !== 0
    ? processedComments.map((item: any) => {
      return {
        ...item,
        from: {
          ...item.from,
          useravatar: formatPath(
            item.from.useravatar,
          )
        },
        replys: item.replys.map((reply: any) => {
          return {
            ...reply,
            from: {
              ...reply.from,
              useravatar: formatPath(
                reply.from.useravatar,
              ),
            },
          };
        }),
      };
    })
    : [];

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      commentsInfo: {
        comments: finalComments,
        hasMore: processedComments.length !== 0,
      },
    },
  };
});


export default commentArticleInfoController;