import * as Router from 'koa-router';

import {
  Posts,
  Comments,
} from '../../../../model/model';

const commentArticleInfoController: Router = new Router();


/**
 * [处理] - 评论分页
 */
commentArticleInfoController.get('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    lastCommentId: string;
    commentPageSize: string;
    replyPageSize: string;
  };

  const {
    articleId,
    lastCommentId,
    commentPageSize,
    replyPageSize,
  } = ctx.request.query as IRequestParams;

  // ? 查询最后一个评论信息
  // * 根据最后一个评论的create_time, 来进行分页查找
  const foundLastCommentInfo = await Comments.findById(lastCommentId);

  // ? 查询指定文章信息
  const foundArticleInfo = await Posts
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
              sort: {
                create_time: -1,
              },
              limit: Number(replyPageSize),
            },
          },
          {
            path: 'from',
            select: ['username', 'useravatar'],
          },
        ],
        match: {
          create_time: {
            '$lt': foundLastCommentInfo.create_time,
          },
        },
        options: {
          limit: Number(commentPageSize),
          sort: {
            create_time: -1,
          },
        },
      }
    ])
    .lean();

  // ? 处理评论列表
  // * 格式化相关字段
  const processedCommentList = await foundArticleInfo.comments.map((comment: any) => {
    return {
      ...comment,
      content_image: JSON.parse(comment.content_image),
      replys: comment.replys.map((reply: any) => {
        return {
          ...reply,
          content_image: JSON.parse(reply.content_image),
        };
      }),
    };
  });

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      commentList: processedCommentList,
    },
  };
});

// commentArticleInfoController.get('/more', async (ctx) => {
//   const {
//     articleId,
//     lastCommentId,
//     commentPageSize,
//     replyPageSize,
//   }: any = await ctx.query;

// const articleInfo = await Posts
//   .findById(
//     articleId,
//     'comments',
//   )
//   .populate([
//     {
//       path: 'comments',
//       populate: [
//         {
//           path: 'replys',
//           populate: [
//             {
//               path: 'from',
//               select: ['username', 'useravatar'],
//             },
//             {
//               path: 'to',
//               select: ['username', 'useravatar'],
//             },
//           ],
//           options: {
//             sort: { create_time: '-1' },
//             limit: replyPageSize,
//           },
//         },
//         {
//           path: 'from',
//           select: ['username', 'useravatar'],
//         },
//       ],
//       options: {
//         sort: { create_time: '-1' },
//       },
//     }
//   ])
//   .lean();

//   // ** 初始化评论信息 **
//   const {
//     comments,
//   } = await articleInfo;
//   const beginIndex = await comments.findIndex((v: any) => {
//     return v._id.equals(lastCommentId);
//   });
//   const processedComments = await beginIndex === -1
//     ? []
//     : comments.slice(
//       beginIndex + 1,
//       beginIndex + 2 + Number(commentPageSize),
//     );

//   // ** 格式化图片路径 **
//   const finalComments = await processedComments
//     && processedComments.length !== 0
//     ? processedComments.map((item: any) => {
//       return {
//         ...item,
//         from: {
//           ...item.from,
//           useravatar: formatPath(
//             item.from.useravatar,
//           )
//         },
//         replys: item.replys.map((reply: any) => {
//           return {
//             ...reply,
//             from: {
//               ...reply.from,
//               useravatar: formatPath(
//                 reply.from.useravatar,
//               ),
//             },
//           };
//         }),
//       };
//     })
//     : [];

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       commentsInfo: {
//         comments: finalComments,
//         hasMore: processedComments.length !== 0,
//       },
//     },
//   };
// });


export default commentArticleInfoController;