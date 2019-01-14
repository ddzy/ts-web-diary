import * as Router from 'koa-router';

import {
  Comments,
  changeId,
  Posts,
} from '../../../../model/model';
import {
  formatPath,
} from '../../../../utils/utils';

const commentController: Router = new Router();


/**
 * 发表文章评论
 */
commentController.post('/', async (ctx) => {

  const {
    from,
    articleId,
    value,
  }: any = ctx.request.body;

  // ** 存储评论
  const result = await Comments
    .create({
      article: articleId,
      value,
      from,
      create_time: new Date().getTime(),
    });

  // ** 同步到Posts
  await Posts
    .findByIdAndUpdate(
      changeId(articleId),
      { '$push': { comments: result } },
      { new: true },
    )
    .populate({
      path: 'comments',
      populate: {
        path: 'replys',
      },
    })

  const commentInfo = await Comments
    .findById(result._id, { '__v': 0 })
    .populate([{
      path: 'from',
      select: ['_id', 'useravatar', 'username'],
    }])
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      commentInfo: {
        ...commentInfo,
        from: {
          ...commentInfo.from,
          useravatar: formatPath(
            commentInfo.from.useravatar,
          ),
        },
      },
    },
  };

});


export default commentController;