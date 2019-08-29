import * as Router from 'koa-router';

import redis from '../../../redis/redis';
import {
  Posts,
} from '../../../model/model';
import {
  generateStarArticleKey,
} from '../../../redis/keys/redisKeys';


const articleInfoController: Router = new Router();


/**
 * [获取] - 文章列表(分页)
 */
articleInfoController.get('/list', async (ctx) => {
  interface IRequestParams {
    userId: string,
    page: string,
    pageSize: string,
    type: string,
  };

  const {
    page,
    pageSize,
    type,
  }: IRequestParams = ctx.request.query;

  // ? 查找文章列表
  const foundArticleList = await Posts
    .find({
      type,
    })
    .populate([
      {
        path: 'author',
        select: ['username', 'useravatar'],
      },
    ])
    .sort({
      create_time: -1,
    })
    .limit(Number(pageSize))
    .skip((Number(page) - 1) * Number(pageSize));

  // ? redis查询文章的获赞用户列表
  const processedArticleList = await Promise.all(foundArticleList.map(async (v) => {
    const redisStarArticleKey = generateStarArticleKey(v._id);
    const foundStaredUserList = await redis.zrange(redisStarArticleKey, 0, -1);

    return {
      ...v._doc,
      stared_user: foundStaredUserList,
    };
  }));

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      articleList: processedArticleList,
    },
  };
});

/**
 * [获取] - 单个文章详细信息
 */
articleInfoController.get('/single/detail', async (ctx) => {
  interface IRequestParams {
    userId: string,
    articleId: string,
    newArticlePage: string,
    newArticlePageSize: string,
    relatedArticlePage: string,
    relatedArticlePageSize: string,
    commentPage: string,
    commentPageSize: string,
    replyPage: string,
    replyPageSize: string,
  };

  const {
    userId,
    articleId,
    newArticlePage,
    newArticlePageSize,
    relatedArticlePage,
    relatedArticlePageSize,
    commentPage,
    commentPageSize,
    replyPage,
    replyPageSize,
  }: IRequestParams = ctx.request.query;

  // ? 更新文章的阅读数
  const foundAndUpdatedArticleInfo = await Posts
    .findByIdAndUpdate(
      articleId,
      {
        '$addToSet': {
          watched_user: userId,
        },
      },
      {
        new: true,
      },
    )
    .populate([
      {
        path: 'author',
        select: ['username', 'useravatar', 'articles'],
      },
      {
        path: 'comments',
        options: {
          sort: { create_time: -1 },
          limit: Number(commentPageSize),
          skip: ((Number(commentPage) - 1) * Number(commentPageSize)),
        },
        populate: [
          {
            path: 'from',
            select: ['username', 'useravatar'],
          },
          {
            path: 'replys',
            options: {
              sort: { create_time: -1 },
              limit: Number(replyPageSize),
              skip: ((Number(replyPage) - 1) * Number(replyPageSize)),
            },
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
          },
        ],
      },
    ])
    .lean(true);

  // ? 获取相关文章推荐(首屏)
  const foundRelatedArticle = await Posts
    .find(
      {
        type: foundAndUpdatedArticleInfo.type,
        _id: {
          '$ne': foundAndUpdatedArticleInfo._id,
        },
      },
    )
    .populate([
      {
        path: 'author',
        select: ['username', 'useravatar', 'articles'],
      },
    ])
    .sort({
      create_time: -1,
    })
    .limit(Number(relatedArticlePageSize))
    .skip((Number(relatedArticlePage) - 1) * Number(relatedArticlePageSize));

  // ? 获取最新文章
  const foundLatestArticle = await Posts
    .find(
      {},
    )
    .populate([
      {
        path: 'author',
        select: ['username', 'useravatar', 'articles'],
      },
    ])
    .sort({
      create_time: -1,
    })
    .limit(Number(newArticlePageSize))
    .skip((Number(newArticlePage) - 1) * Number(newArticlePageSize));


  // ? 获取文章作者创建的文章总数
  const foundAuthorCreatedArticleTotal = await foundAndUpdatedArticleInfo.author.articles.length;

  // ? redis获取文章的点赞成员列表
  const redisStarArticleKey = generateStarArticleKey(articleId);
  const foundRedisStarArticleList = await redis.zrange(redisStarArticleKey, 0, -1);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      articleInfo: {
        ...foundAndUpdatedArticleInfo,
        stared_user: foundRedisStarArticleList,
        stared_total: foundRedisStarArticleList.length,
        new_article: foundLatestArticle,
        related_article: foundRelatedArticle,
        created_article_total: foundAuthorCreatedArticleTotal,
      },
    },
  };
});

export default articleInfoController;