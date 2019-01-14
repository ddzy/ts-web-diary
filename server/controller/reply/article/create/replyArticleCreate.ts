import * as Router from 'koa-router';

import {
  Replys,
  changeId,
  Comments,
} from '../../../../model/model';
import {
  formatPath,
} from '../../../../utils/utils';

const replyArticleCreateController: Router = new Router();


/**
 * 发表文章回复
 */
replyArticleCreateController.post('/', async (ctx) => {
  const {
    commentId,
    value,
    from,
    to,
    articleId,
  }: any = await ctx.request.body;

  // ** 存储回复信息
  const result = await Replys
    .create({
      comment: changeId(commentId),
      article: changeId(articleId),
      from: changeId(from),
      to: changeId(to),
      replyValue: value,
      value,
      create_time: new Date().getTime(),
    });

  // ** 同步到Comments
  await Comments
    .findByIdAndUpdate(
      changeId(commentId),
      { '$push': { replys: result, } },
      { new: true },
    )
    .populate({
      path: 'replys',
    });

  // ** 获取&&返回回复信息
  const replyInfo = await Replys
    .findById(
      changeId(result._id),
      { '__v': 0 },
    )
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
    info: {
      replyInfo: {
        ...replyInfo,
        from: {
          ...replyInfo.from,
          useravatar: formatPath(
            replyInfo.from.useravatar,
          ),
        },
        to: {
          ...replyInfo.to,
          useravatar: formatPath(
            replyInfo.to.useravatar,
          ),
        },
      },
    },
  };
})


export default replyArticleCreateController;