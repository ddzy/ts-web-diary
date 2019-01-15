import * as Router from 'koa-router';

import {
  Posts,
  changeId,
} from '../../../model/model';

const articleInfoController: Router = new Router();


/**
 * 首页 -> 获取文章列表 -> 加载更多
 */
articleInfoController.get('/list/more', async (ctx) => {
  const {
    type,
    page,
    pageSize,
  } = ctx.request.query;

  const articleList = await Posts
    .find(
      { type: { $regex: type } },
      'author img create_time title description star watch',
    )
    .populate([
      {
        path: 'author',
        select: ['username'],
      }
    ])
    .sort({ create_time: -1 })
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize));

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      articleList,
      hasMore: articleList.length !== 0,
    },
  };
});

/**
 * 获取推荐文章 -> 加载更多
 */
articleInfoController.get('/related/more', async (ctx) => {
  const {
    articleId,
    page,
    pageSize,
  } = await ctx.request.query;

  const getArticle = await Posts
    .findById(articleId);
  const getArticleType = await getArticle.type;
  const getRelatedArticles = await Posts
    .find(
      { type: getArticleType, },
      'author create_time type tag title img',
    )
    .populate([
      {
        path: 'author',
        select: ['username'],
      }
    ])
    .sort({
      create_time: '-1',
    })
    .skip((Number(page - 1) * Number(pageSize)))
    .limit(Number(pageSize))
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success',
    info: {
      relatedArticlesInfo: {
        articles: getRelatedArticles,
        hasMore: getRelatedArticles.length !== 0,
      },
    },
  };
});

/**
 * 获取编辑的文章信息
 */
articleInfoController.get('/edit', async (ctx) => {
  const { articleid } = ctx.request.query;

  const articleInfo = await Posts
    .findById(
      changeId(articleid),
      {
        create_time: 0,
        description: 0,
        star: 0,
        watch: 0,
        '__v': 0,
      }
    );

  ctx.body = {
    code: 0,
    message: 'Success!',
    articleInfo,
  };
});


export default articleInfoController;