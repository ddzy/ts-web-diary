import * as Router from 'koa-router';

import { Comments } from '../../../../model/model';
import { formatPath } from '../../../../utils/utils';

const replyArticleInfoController: Router = new Router();


/**
 * 文章详情 -> 评论区 -> 回复加载更多
 */
replyArticleInfoController.get('/more', async (ctx) => {
  const {
    commentId,
    lastReplyId,
    replyPageSize,
  } = await ctx.request.query;

  const replyInfo = await Comments
    .findById(
      commentId,
      'replys',
    )
    .populate([
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
        },
      },
    ])
    .lean();

  // ** 初始化回复信息 **
  const { replys } = await replyInfo;
  const beginIndex = await replys.findIndex((v: any) => {
    return v._id.equals(lastReplyId);
  });
  const processedReplys = await beginIndex === -1
    ? []
    : replys.slice(
      beginIndex + 1,
      beginIndex + 2 + Number(replyPageSize),
    );

  // ** 格式化图片路径 **
  const finalReplys = await processedReplys
    && processedReplys.length !== 0
    ? processedReplys.map((item: any) => {
      return {
        ...item,
        from: {
          ...item.from,
          useravatar: formatPath(
            item.from.useravatar,
          )
        },
      };
    })
    : [];

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      replysInfo: {
        replys: finalReplys,
        hasMore: processedReplys.length !== 0,
      },
    },
  };
});


export default replyArticleInfoController;