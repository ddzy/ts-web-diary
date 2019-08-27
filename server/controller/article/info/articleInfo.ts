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

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      articleList: foundArticleList,
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
            path: 'replys',
            options: {
              sort: { create_time: -1 },
              limit: Number(replyPageSize),
              skip: ((Number(replyPage) - 1) * Number(replyPageSize)),
            },
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


/**
 * 首页 -> 获取文章列表 -> 加载更多
 */
// articleInfoController.get('/list/more', async (ctx) => {
//   const {
//     type,
//     page,
//     pageSize,
//   } = ctx.request.query;

//   const articleList = await Posts
//     .find(
//       { type: { $regex: type } },
//       'author img create_time title description star watch',
//     )
//     .populate([
//       {
//         path: 'author',
//         select: ['username'],
//       }
//     ])
//     .sort({ create_time: -1 })
//     .skip((page - 1) * pageSize)
//     .limit(Number(pageSize));

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       articleList,
//       hasMore: articleList.length !== 0,
//     },
//   };
// });

/**
 * 获取推荐文章 -> 加载更多
 */
// articleInfoController.get('/related/more', async (ctx) => {
//   const {
//     articleId,
//     page,
//     pageSize,
//   } = await ctx.request.query;

//   const getArticle = await Posts
//     .findById(articleId);
//   const getArticleType = await getArticle.type;
//   const getRelatedArticles = await Posts
//     .find(
//       { type: getArticleType, },
//       'author create_time type tag title img',
//     )
//     .populate([
//       {
//         path: 'author',
//         select: ['username'],
//       }
//     ])
//     .sort({
//       create_time: '-1',
//     })
//     .skip((Number(page - 1) * Number(pageSize)))
//     .limit(Number(pageSize))
//     .lean();

//   ctx.body = {
//     code: 0,
//     message: 'Success',
//     info: {
//       relatedArticlesInfo: {
//         articles: getRelatedArticles,
//         hasMore: getRelatedArticles.length !== 0,
//       },
//     },
//   };
// });

/**
 * 获取编辑的文章信息
 */
// articleInfoController.get('/edit', async (ctx) => {
//   const { articleid } = ctx.request.query;

//   const articleInfo = await Posts
//     .findById(
//       changeId(articleid),
//       {
//         create_time: 0,
//         description: 0,
//         star: 0,
//         watch: 0,
//         '__v': 0,
//       }
//     );

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     articleInfo,
//   };
// });

/**
 * 获取单个文章的详细信息
 */
// articleInfoController.get('/all', async (ctx) => {
//   interface IRequestParams {
//     userId: string;
//     articleId: string;
//   };

//   const {
//     userId,
//     articleId,
//   }: IRequestParams = ctx.request.query;

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     data: {
//       articleInfo: {
//         userId,
//         articleId,
//       },
//     },
//   };
// })


export default articleInfoController;