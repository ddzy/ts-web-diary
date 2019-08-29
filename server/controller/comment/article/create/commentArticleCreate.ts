import * as Router from 'koa-router';

import {
  Comments,
  Posts,
} from '../../../../model/model';
// import {
//   formatPath,
// } from '../../../../utils/utils';

const commentArticleCreateController: Router = new Router();

/**
 * [处理] - 创建新的文章评论
 */
commentArticleCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    plainContent: string;
    imageContent: string[];
  };

  const {
    userId,
    articleId,
    plainContent,
    imageContent,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 存储评论
  const savedComment = await Comments.create({
    from: userId,
    content_plain: plainContent,
    content_image: JSON.stringify(imageContent),
    article: articleId,
    replys: [],
    create_time: Date.now(),
    update_time: Date.now(),
  });

  // ? 同步更新Posts
  await Posts.findByIdAndUpdate(
    articleId,
    {
      '$push': {
        comments: savedComment,
      },
    },
  )

  // ? 获取刚刚存储的评论
  const foundComment = await Comments
    .findById(savedComment._id)
    .populate([
      {
        path: 'from',
        select: ['username', 'useravatar'],
      },
    ])
    .lean()

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      commentInfo: {
        ...foundComment,
        content_image: JSON.parse(foundComment.content_image),
      },
    },
  };

  // const {
  //   from,
  //   articleId,
  //   value,
  // }: any = ctx.request.body;

  // // ** 存储评论
  // const result = await Comments
  //   .create({
  //     article: articleId,
  //     value,
  //     from,
  //     create_time: new Date().getTime(),
  //   });

  // // ** 同步到Posts
  // await Posts
  //   .findByIdAndUpdate(
  //     changeId(articleId),
  //     { '$push': { comments: result } },
  //     { new: true },
  //   )
  //   .populate({
  //     path: 'comments',
  //     populate: {
  //       path: 'replys',
  //     },
  //   })

  // const commentInfo = await Comments
  //   .findById(result._id, { '__v': 0 })
  //   .populate([{
  //     path: 'from',
  //     select: ['_id', 'useravatar', 'username'],
  //   }])
  //   .lean();

  // ctx.body = {
  //   code: 0,
  //   message: 'Success!',
  //   info: {
  //     commentInfo: {
  //       ...commentInfo,
  //       from: {
  //         ...commentInfo.from,
  //         useravatar: formatPath(
  //           commentInfo.from.useravatar,
  //         ),
  //       },
  //     },
  //   },
  // };

});


export default commentArticleCreateController;