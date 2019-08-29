import * as Router from 'koa-router';

import {
  Comments,
  Replys,
} from '../../../../model/model';

const replyArticleInfoController: Router = new Router();


/**
 * [处理] - 文章评论下的回复加载更多
 */
replyArticleInfoController.get('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    commentId: string;
    lastReplyId: string;
    replyPageSize: string;
  };

  const {
    commentId,
    lastReplyId,
    replyPageSize,
  } = ctx.request.query as IRequestParams;

  // ? 查询最后一个回复信息
  // * 根据最后一个回复的create_time, 来进行分页查找
  const foundLastReplyInfo = await Replys.findById(lastReplyId);

  // ? 查询指定评论信息
  const foundCommentInfo = await Comments
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
        match: {
          create_time: {
            '$lt': foundLastReplyInfo.create_time,
          },
        },
        options: {
          limit: Number(replyPageSize),
          sort: {
            create_time: -1,
          },
        },
      },
    ])
    .lean();

  // ? 处理回复列表
  // * 格式化相关字段
  const processedReplyList = await foundCommentInfo.replys.map((replys: any) => {
    return {
      ...replys,
      content_image: JSON.parse(replys.content_image),
    };
  });


  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      replyList: processedReplyList,
    },
  };
});

// replyArticleInfoController.get('/more', async (ctx) => {
//   const {
//     commentId,
//     lastReplyId,
//     replyPageSize,
//   } = await ctx.request.query;

//   const replyInfo = await Comments
//     .findById(
//       commentId,
//       'replys',
//     )
//     .populate([
//       {
//         path: 'replys',
//         populate: [
//           {
//             path: 'from',
//             select: ['username', 'useravatar'],
//           },
//           {
//             path: 'to',
//             select: ['username', 'useravatar'],
//           },
//         ],
//         options: {
//           sort: { create_time: '-1' },
//         },
//       },
//     ])
//     .lean();

//   // ** 初始化回复信息 **
//   const { replys } = await replyInfo;
//   const beginIndex = await replys.findIndex((v: any) => {
//     return v._id.equals(lastReplyId);
//   });
//   const processedReplys = await beginIndex === -1
//     ? []
//     : replys.slice(
//       beginIndex + 1,
//       beginIndex + 2 + Number(replyPageSize),
//     );

//   // ** 格式化图片路径 **
//   const finalReplys = await processedReplys
//     && processedReplys.length !== 0
//     ? processedReplys.map((item: any) => {
//       return {
//         ...item,
//         from: {
//           ...item.from,
//           useravatar: formatPath(
//             item.from.useravatar,
//           )
//         },
//       };
//     })
//     : [];

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       replysInfo: {
//         replys: finalReplys,
//         hasMore: processedReplys.length !== 0,
//       },
//     },
//   };
// });


export default replyArticleInfoController;