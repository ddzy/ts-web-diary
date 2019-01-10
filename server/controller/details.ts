import * as Router from 'koa-router';

import {
  User,
  Posts,
  changeId,
  Comments,
  Replys,
  Collections,
  Followers,
} from '../model/model';
import {
  formatPath,
} from '../utils/utils';

const detailsController: Router = new Router();


/**
 * 文章详情 => 获取信息
 */
detailsController.get('/', async (ctx) => {
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


/**
 * 文章详情 => 发表评论
 */
detailsController.post('/comment/create', async (ctx) => {

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



/**
 * 文章详情 => 发表回复
 */
detailsController.post('/reply/create', async (ctx) => {
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



/**
 * 文章详情 => 点赞文章
 */
detailsController.get('/star', async (ctx) => {

  const {
    articleid,
    liked,
    userid,
  } = ctx.request.query;

  const getArticle = await Posts
    .findById(changeId(articleid));

  await Posts
    .findByIdAndUpdate(
      changeId(articleid),
      {
        star: liked === 'true'
          ? getArticle.star + 1
          : getArticle.star - 1,
        stared: liked === 'true'
          ? getArticle.stared.concat(userid)
          : getArticle.stared.filter((item: any) => {
            return item !== userid;
          }),
      },
      { new: true },
    )
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      starInfo: {
        isLiked: liked === 'true',
      },
    },
  };

});



/**
 * 文章详情 => 创建收藏夹
 */
detailsController.get('/collection/create', async (ctx) => {

  const { userid, collection } = ctx.request.query;

  // ** 收藏夹是否存在
  const isCollectionNameExist = await Collections
    .findOne({
      name: collection,
      create_time: new Date().toLocaleString(),
    })

  if (!isCollectionNameExist) {
    const setToCollections = await Collections
      .create({
        name: collection,
      })

    // ** 同步至 User
    await User
      .findByIdAndUpdate(
        changeId(userid),
        {
          '$push': { collections: setToCollections },
        },
        {
          new: true,
          select: {
            '_id': '_id',
            collections: 'collections',
          },
        },
      )
      .populate({
        path: 'collections',
      })
      .lean();

    ctx.body = {
      code: 0,
      message: 'Success!',
      info: {
        collectionInfo: {
          name: setToCollections.name,
          _id: setToCollections._id,
        },
      },
    };
  } else {
    ctx.body = {
      code: 1,
      message: '该收藏夹已经存在!',
    };
  }
});



/**
 * 文章详情 => 确认添加至收藏夹
 */
detailsController.post('/collection/save', async (ctx) => {
  const {
    articleId,
    collectionId,
  }: any = ctx.request.body;

  const saveToCollection = await Collections
    .findByIdAndUpdate(
      changeId(collectionId),
      {
        '$addToSet': { articles: articleId },
      },
      { new: true, select: 'name', },
    )
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      collectionInfo: saveToCollection,
    },
  };
});


/**
 * 文章详情 -> 控制栏 -> 获取收藏夹信息
 */
detailsController.get('/collection/info', async (
  ctx,
) => {
  const {
    userId,
  } = await ctx.request.query;

  const collectionList = await User
    .findById(
      userId,
      'collections',
    )
    .populate([{
      path: 'collections',
      select: ['name'],
    }])
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      collectionInfo: collectionList.collections,
    },
  };
});


/**
 * 文章详情 -> 评论区 -> 获取评论人信息
 */
detailsController.post('/comment/user/info', async (ctx) => {
  const {
    isReply,
    commentId,
    userId,
  }: any = await ctx.request.body;

  if (isReply) {
    const replyUserInfo = await Replys
      .findById(
        commentId,
        'from',
      )
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'articles', 'followers'],
        }
      ])
      .lean();
    const {
      from,
    } = await replyUserInfo;

    ctx.body = {
      code: 0,
      message: 'Success!',
      info: {
        userInfo: {
          _id: from._id,
          username: from.username,
          useravatar: from.useravatar
            ? formatPath(from.useravatar)
            : '',
          articlesCount: from.articles
            ? from.articles.length
            : 0,
          followersCount: from.followers
            ? from.followers.length
            : 0,
          isFollowed: from.followers
            ? from.followers.some((item: any) => {
              return item.equals(userId);
            })
            : true,
        },
      },
    };
  }
  else {
    const commentUserInfo = await Comments
      .findById(
        commentId,
        'from',
      )
      .populate([
        {
          path: 'from',
          select: ['username', 'useravatar', 'articles', 'followers'],
        }
      ])
      .lean();
    const {
      from,
    } = await commentUserInfo;

    ctx.body = {
      code: 0,
      message: 'Success!',
      info: {
        userInfo: {
          _id: from._id,
          username: from.username,
          useravatar: from.useravatar
            ? formatPath(from.useravatar)
            : '',
          articlesCount: from.articles
            ? from.articles.length
            : 0,
          followersCount: from.followers
            ? from.followers.length
            : 0,
          isFollowed: from.followers.some((item: any) => {
            return item.equals(userId);
          }),
        },
      },
    };
  }

});


/**
 * 文章详情 -> 评论区 -> 处理关注
 */
detailsController.post('/comment/user/follow', async (ctx) => {
  const {
    actioner,
    follower,
  }: any = await ctx.request.body;

  await Followers
    .create({
      whom: actioner,
    });
  await User
    .findByIdAndUpdate(
      follower,
      { '$addToSet': { followers: changeId(actioner) } },
      { new: true },
    )

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      followInfo: {
        isFollowed: true,
      },
    },
  };
});


/**
 * 文章详情 -> 评论区 -> 评论加载更多
 */
detailsController.get('/comment/info', async (ctx) => {
  const {
    articleId,
    lastCommentId,
    commentPageSize,
    replyPageSize,
  }: any = await ctx.query;

  const articleInfo = await Posts
    .findById(
      articleId,
      'comments',
    )
    .populate([
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
        },
      }
    ])
    .lean();

  // ** 初始化评论信息 **
  const {
    comments,
  } = await articleInfo;
  const beginIndex = await comments.findIndex((v: any) => {
    return v._id.equals(lastCommentId);
  });
  const processedComments = await beginIndex === -1
    ? []
    : comments.slice(
      beginIndex + 1,
      beginIndex + 2 + Number(commentPageSize),
    );

  // ** 格式化图片路径 **
  const finalComments = await processedComments
    && processedComments.length !== 0
    ? processedComments.map((item: any) => {
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

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      commentsInfo: {
        comments: finalComments,
        hasMore: processedComments.length !== 0,
      },
    },
  };
});


detailsController.get('/reply/info', async (ctx) => {
  const {
    commentId,
    lastReplyId,
    replyPageSize,
  } = await ctx.request.query;

  const replyInfo = await Comments
    .findById(
      commentId,
      'replys',
    )
    .populate([
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
        },
      },
    ])
    .lean();

  // ** 初始化回复信息 **
  const { replys } = await replyInfo;
  const beginIndex = await replys.findIndex((v: any) => {
    return v._id.equals(lastReplyId);
  });
  const processedReplys = await beginIndex === -1
    ? []
    : replys.slice(
      beginIndex + 1,
      beginIndex + 2 + Number(replyPageSize),
    );

  // ** 格式化图片路径 **
  const finalReplys = await processedReplys
    && processedReplys.length !== 0
    ? processedReplys.map((item: any) => {
      return {
        ...item,
        from: {
          ...item.from,
          useravatar: formatPath(
            item.from.useravatar,
          )
        },
      };
    })
    : [];

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      replysInfo: {
        replys: finalReplys,
        hasMore: processedReplys.length !== 0,
      },
    },
  };
});


export default detailsController;