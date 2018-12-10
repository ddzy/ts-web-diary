import * as Router from 'koa-router';
import {
  Posts,
} from '../model/model';

const articleController: Router = new Router();


/**
 * 文章页 获取文章 */
articleController.get('/list', async (ctx, next) => {

  const {
    page,
    pageSize,
  } = ctx.request.query;

  const articleList = await Posts
    .find({})
    .populate('author')
    .sort({ create_time: -1 })
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize));

  ctx.body = {
    code: 0,
    message: 'Success!',
    articleList,
    hasMore: articleList.length !== 0,
  };
});


/**
 * 文章页 处理点赞
 */
articleController.get('/star', async (ctx, next) => {

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


export default articleController;