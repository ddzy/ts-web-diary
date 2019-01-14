import * as Router from 'koa-router';

import {
  Posts,
} from '../../../model/model';
import {
  formatPath,
} from '../../../utils/utils';

const pageDetailsController: Router = new Router();


/**
 * 获取文章详情 首屏信息
 */
pageDetailsController.get('/info', async (ctx) => {
  const {
    articleId,
    userId,
    commentPageSize,
    replyPageSize,
  } = ctx.request.query;

  const oldArticleInfo = await Posts
    .findById(articleId);
  const newArticleInfo = await Posts
    .findByIdAndUpdate(
      articleId,
      { watch: oldArticleInfo.watch + 1 },
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
              sort: { create_time: '-1' },
              limit: replyPageSize,
            },
          },
          {
            path: 'from',
            select: ['username', 'useravatar'],
          },
        ],
        options: {
          sort: { create_time: '-1' },
          limit: commentPageSize,
          skip: 0,
        },
      }
    ])
    .lean(true);

  // ** 格式化图片路径 **
  const formatedCommentsAvatarPathArr = newArticleInfo.comments
    && newArticleInfo.comments.length
    && newArticleInfo.comments.length !== 0
    ? newArticleInfo.comments.map((item: any) => {
      return {
        ...item,
        from: {
          ...item.from,
          useravatar: formatPath(
            item.from.useravatar,
          )
        },
        replys: item.replys.map((reply: any) => {
          return {
            ...reply,
            from: {
              ...reply.from,
              useravatar: formatPath(
                reply.from.useravatar,
              ),
            },
          };
        }),
      };
    })
    : [];

  // ** 获取最新文章 **
  const getNewArticles = await Posts
    .find({}, null, {
      select: ['title'],
    })
    .sort({
      create_time: '-1',
    })
    .limit(5);

  // ** 获取相关推荐文章 **
  const getRelatedArticles = await Posts
    .find(
      { type: newArticleInfo.type, },
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
    .limit(5)
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      articleInfo: {
        author: newArticleInfo.author.username,
        authorAvatar: formatPath(newArticleInfo.author.useravatar),
        img: newArticleInfo.img || '',
        watchCount: newArticleInfo.watch,
        articleCount: newArticleInfo.author.articles.length,
        mode: newArticleInfo.mode,
        type: newArticleInfo.type,
        tag: newArticleInfo.tag,
        create_time: newArticleInfo.create_time,
        articleContent: newArticleInfo.content,
        articleTitle: newArticleInfo.title,
        isLiked: newArticleInfo.stared && newArticleInfo.stared.includes(userId),
        comments: formatedCommentsAvatarPathArr,
        newArticle: getNewArticles,
        relatedArticles: getRelatedArticles,
      },
    },
  };

});


export default pageDetailsController;


