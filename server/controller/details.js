const koa = require('koa');
const Router = require('koa-router');

const {
  User, 
  Posts, 
  changeId, 
  Comments, 
  Replys,
} = require('../model/model');
const { formatPath } = require('../utils/utils');

const details = new Router();


//// 文章详情页 => 获取信息
details.get('/', async (ctx, next) => {
  
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
    .map((item) => {
      return {
        ...item,
        whom: {
          ...item.whom,
          useravatar: formatPath(
            item.whom.useravatar,
          )
        },
        replys: item.replys.map((reply) => {
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
    });


  ctx.body = {
    code: 0,
    message: 'Success!',
    result: {
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
    },
  };

});


//// 文章详情 => 发表评论
details.post('/comment', async (ctx, next) => {
  
  const {
    userid,
    articleid,
    commentValue,
  } = ctx.request.body;

  // 存储评论
  const result = await Comments
    .create({
      whom: userid,
      article: articleid,
      commentValue,
      create_time: new Date().getTime(),
    });

  // 同步到Posts
  const saveToPosts = await Posts
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
    saveToPosts,
  };

});



//// 文章详情 => 发表回复
details.post('/reply', async (ctx, next) => {
  
  const { 
    commentid, 
    replyValue, 
    articleid,
    userid,
  } = ctx.request.body;

  // 存储回复信息
  const result = await Replys
    .create({
      comment: changeId(commentid),
      article: changeId(articleid),
      whom: changeId(userid),
      replyValue,
      create_time: new Date().getTime(),
    });

  // 同步到Comments
  const saveToComments = await Comments
    .findByIdAndUpdate(
      changeId(commentid),
      { '$push': { replys: result, } },
      { new: true },
    )
    .populate({
      path: 'replys',
    });

  // 获取回复信息
  const replyInfo = await Replys
    .findById(
      changeId(result._id),
      { '__v': 0 },
      { lean: true },
    )
    // .populate({
    //   path: 'comment',
    //   select: ['_id', 'commentValue'],
    // })
    .populate({
      path: 'whom',
      select: ['_id', 'username', 'useravatar'],
    });

    
  ctx.body = {
    code: 0,
    message: 'Success!',
    reply: {
      ...replyInfo,
      whom: {
        ...replyInfo.whom,
        useravatar: formatPath(
          replyInfo.whom.useravatar,
        ),
      },
    },
  };

});


module.exports = details;