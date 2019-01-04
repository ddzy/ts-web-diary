import * as Router from 'koa-router';

import {
  User,
  Posts,
  changeId,
  Comments,
  Replys,
  Collections,
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
    articleid,
    userid,
  } = ctx.request.query;

  const oldArticleInfo = await Posts
    .findById(articleid);
  const newArticleInfo = await Posts
    .findByIdAndUpdate(
      articleid,
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
        isLiked: newArticleInfo.stared && newArticleInfo.stared.includes(userid),
        comments: formatedCommentsAvatarPathArr,
        newArticle: getNewArticles,
      },
    },
  };

});


/**
 * 文章详情 => 发表评论
 */
detailsController.post('/comment', async (ctx) => {

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
detailsController.post('/reply', async (ctx) => {
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


export default detailsController;