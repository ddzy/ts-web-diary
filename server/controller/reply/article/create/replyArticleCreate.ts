import * as Router from 'koa-router';

import {
  Replys,
  Comments,
} from '../../../../model/model';


const replyArticleCreateController: Router = new Router();


/**
 * [处理] - 发表文章回复
 */
replyArticleCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    from: string;
    to: string;
    commentId: string;
    articleId: string;
    plainContent: string;
    imageContent: string[];
  };

  const {
    from,
    to,
    commentId,
    articleId,
    plainContent,
    imageContent,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 存储回复
  const savedReply = await Replys.create({
    article: articleId,
    comment: commentId,
    from,
    to,
    content_plain: plainContent,
    content_image: JSON.stringify(imageContent),
    create_time: Date.now(),
    update_time: Date.now(),
  });

  // ? 同步到Comments
  await Comments.findByIdAndUpdate(
    commentId,
    {
      '$push': {
        replys: savedReply,
      },
    },
  );

  // ? 获取刚刚存储的回复
  const foundReplyInfo = await Replys
    .findById(savedReply._id)
    .populate([
      {
        path: 'from',
        select: ['_id', 'username', 'useravatar'],
      },
      {
        path: 'to',
        select: ['_id', 'username', 'useravatar'],
      }
    ])
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      replyInfo: {
        ...foundReplyInfo,
        content_image: JSON.parse(foundReplyInfo.content_image),
      },
    },
  };
});

export default replyArticleCreateController;