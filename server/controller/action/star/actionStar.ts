import * as Router from 'koa-router';

import {
  Posts,
} from '../../../model/model';

const actionStarController: Router = new Router();


/**
 * 首页 -> 点赞
 */
actionStarController.get('/article', async (ctx) => {

  const {
    // userid,
    articleid,
    star,
  } = ctx.request.query;

  const getArticle = await Posts.findById(
    articleid,
  );

  const result = await Posts
    .findByIdAndUpdate(
      articleid,
      {
        star: star === 'true'
          ? getArticle.star + 1
          : getArticle.star - 1,
      },
      { new: true },
    )
    .populate('author', 'username');

  ctx.body = {
    code: 0,
    message: 'Success!',
    star: result.star,
    author: result.author.username,
  };
});



export default actionStarController;