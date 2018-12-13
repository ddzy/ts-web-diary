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
detailsController.get('/', async (ctx, next) => {

  const { articleid, userid } = ctx.request.query;

  const setWatch = await Posts
    .findById(changeId(articleid));

  // 阅读量加一
  const result = await Posts
    .findByIdAndUpdate(
      changeId(articleid),
      { watch: setWatch.watch + 1 },
      { new: true },
    )
    .populate('author', '_id username useravatar');


  // 统计作者文章总数
  const articleCount = (await User
    .findById(changeId(userid))
    .populate('articles'))
    .articles
    .length;



  const watchArr = await Posts
    .find({ author: result.author._id })
    .populate('author', 'username');


  // 统计作者文章总阅读数量
  const watchCount = await watchArr
    .reduce((total, current) => {
      return total + current.watch;
    }, 0);


  // 统计最新文章
  const getArticles = await Posts
    .find({})
    .sort({ create_time: '-1' })
    .limit(5);

  const newArticle = await getArticles
    .map((item) => {
      return {
        title: item.title,
        id: item._id,
      };
    });


  // 获取评论信息
  const updateCommentsList = await Posts
    .findById(
      changeId(articleid),
      { '__v': 0 },
      { lean: true },
    )
    .populate({
      path: 'comments',
      populate: {
        path: 'replys',
        populate: {
          path: 'whom',
          select: ['username', 'useravatar', '_id'],
        },
        options: {
          sort: { create_time: -1 },
        },
      },
      options: {
        sort: { create_time: -1 },
      },
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'whom',
        select: ['_id', 'username', 'useravatar'],
      },
      options: {
        sort: { create_time: -1 }
      },
    })
    .populate({
      path: 'author',
      select: ['_id', 'username', 'useravatar']
    });


  // 格式化图片路径
  const setComments = updateCommentsList.comments
    && updateCommentsList.comments.length
    && updateCommentsList.comments.length !== 0
    ? updateCommentsList.comments.map((item: any) => {
      return {
        ...item,
        whom: {
          ...item.whom,
          useravatar: formatPath(
            item.whom.useravatar,
          )
        },
        replys: item.replys.map((reply: any) => {
          return {
            ...reply,
            whom: {
              ...reply.whom,
              useravatar: formatPath(
                reply.whom.useravatar,
              ),
            },
          };
        }),
      };
    })
    : [];


  // 获取用户收藏夹名称
  const getCollectionsName = await User
    .findById(
      changeId(userid),
      null,
      {
        select: {
          collections: 'collections',
        },
      }
    )
    .populate({
      path: 'collections',
      select: ['_id', 'name'],
    })


  ctx.body = {
    code: 0,
    message: 'Success!',
    result: {
      img: setWatch.img,
      author: updateCommentsList.author.username,
      authorAvatar: formatPath(
        updateCommentsList.author.useravatar
      ),
      watchCount,
      articleCount,
      newArticle,
      articleTitle: updateCommentsList.title,
      mode: updateCommentsList.mode,
      type: updateCommentsList.type,
      tag: updateCommentsList.tag,
      create_time: updateCommentsList.create_time,
      articleContent: updateCommentsList.content,
      comments: setComments,
      isLiked: updateCommentsList.stared
        && updateCommentsList.stared.includes(userid),

      collections: getCollectionsName.collections,
    },
  };

});


/**
 * 文章详情 => 发表评论
 */
detailsController.post('/comment', async (ctx, next) => {

  const {
    userid,
    articleid,
    commentValue,
  }: any = ctx.request.body;

  // 存储评论
  const result = await Comments
    .create({
      whom: userid,
      article: articleid,
      commentValue,
      create_time: new Date().getTime(),
    });

  // 同步到Posts
  await Posts
    .findByIdAndUpdate(
      changeId(articleid),
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
    .populate({
      path: 'article',
      select: ['_id'],
    })
    .populate({
      path: 'whom',
      select: ['_id', 'useravatar', 'username'],
    })

  ctx.body = {
    code: 0,
    message: 'Success!',
    comment: {
      ...commentInfo._doc,
      whom: {
        ...commentInfo._doc.whom._doc,
        useravatar: formatPath(
          commentInfo._doc.whom._doc.useravatar,
        ),
      },
    },
  };

});



/**
 * 文章详情 => 发表回复
 */
// detailsController.post('/reply', async (ctx, next) => {

//   const {
//     commentid,
//     replyValue,
//     articleid,
//     userid,
//   }: any = ctx.request.body;

//   // 存储回复信息
//   const result = await Replys
//     .create({
//       comment: changeId(commentid),
//       article: changeId(articleid),
//       whom: changeId(userid),
//       replyValue,
//       create_time: new Date().getTime(),
//     });

//   // 同步到Comments
//   await Comments
//     .findByIdAndUpdate(
//       changeId(commentid),
//       { '$push': { replys: result, } },
//       { new: true },
//     )
//     .populate({
//       path: 'replys',
//     });

//   // 获取回复信息
//   const replyInfo = await Replys
//     .findById(
//       changeId(result._id),
//       { '__v': 0 },
//       { lean: true },
//     )
//     // .populate({
//     //   path: 'comment',
//     //   select: ['_id', 'commentValue'],
//     // })
//     .populate({
//       path: 'whom',
//       select: ['_id', 'username', 'useravatar'],
//     });


//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     reply: {
//       ...replyInfo,
//       whom: {
//         ...replyInfo.whom,
//         useravatar: formatPath(
//           replyInfo.whom.useravatar,
//         ),
//       },
//     },
//   };

// });


/**
 * !!! 重构 文章详情 -> 发表回复
 */
detailsController.post('/reply', async (ctx) => {
  const {
    commentId,
    value,
    from,
    to,
    articleId,
    userId,
  }: any = await ctx.request.body;

  // 存储回复信息
  const result = await Replys
    .create({
      comment: changeId(commentId),
      article: changeId(articleId),
      whom: changeId(userId),
      from: changeId(from),
      to: changeId(to),
      replyValue: value,
      create_time: new Date().getTime(),
    });

  // 同步到Comments
  await Comments
    .findByIdAndUpdate(
      changeId(commentId),
      { '$push': { replys: result, } },
      { new: true },
    )
    .populate({
      path: 'replys',
    });

  // 获取&&返回回复信息
  const replyInfo = await Replys
    .findById(
      changeId(result._id),
      { '__v': 0 },
      { lean: true },
    )
    .populate({
      path: 'whom',
      select: ['_id', 'username', 'useravatar'],
    })
    .populate({
      path: 'from',
      select: ['_id', 'username', 'useravatar'],
    })
    .populate({
      path: 'to',
      select: ['_id', 'username', 'useravatar'],
    });


  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      replyInfo,
      result,
    },
  };
})



/**
 * 文章详情 => 点赞文章
 */
detailsController.get('/star', async (ctx, next) => {

  const {
    articleid,
    liked,
    userid,
  } = ctx.request.query;

  const getArticle = await Posts
    .findById(changeId(articleid));

  const result = await Posts
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
      { new: true, lean: true },
    );

  ctx.body = {
    code: 0,
    message: 'Success!',
    result,
  };

});



/**
 * 文章详情 => 创建收藏夹
 */
detailsController.get('/collection/create', async (ctx, next) => {

  const { userid, collection } = ctx.request.query;

  // 收藏夹是否存在
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

    // 同步至 User
    await User
      .findByIdAndUpdate(
        changeId(userid),
        {
          '$push': { collections: setToCollections },
        },
        {
          new: true,
          lean: true,
          select: {
            '_id': '_id',
            collections: 'collections',
          },
        },
      )
      .populate({
        path: 'collections',
      })

    ctx.body = {
      code: 0,
      message: 'Success!',
      collection: {
        name: setToCollections.name,
        _id: setToCollections._id,
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
detailsController.post('/collection/save', async (ctx, next) => {
  const {
    // userid,
    articleId,
    collectionId,
  }: any = ctx.request.body;

  const saveToCollection = await Collections
    .findByIdAndUpdate(
      changeId(collectionId),
      {
        '$addToSet': { articles: articleId },
      },
      { lean: true, new: true, },
    )
    .populate({
      path: 'articles',
      options: {
        sort: { create_time: -1 },
      },
    })

  ctx.body = {
    code: 0,
    message: 'Success!',
    collectionName: saveToCollection.name,
  };
});


export default detailsController;