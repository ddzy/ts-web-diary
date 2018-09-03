const koa = require('koa');
const Router = require('koa-router');

const { Posts, changeId, Comments } = require('../model/model');
const { formatPath } = require('../utils/utils');

const details = new Router();


//// 文章详情页 => 获取信息
details.get('/', async (ctx, next) => {
  
  const { articleid } = ctx.request.query;

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
  const articleCount = await Posts
    .find({ author: result.author._id })
    .populate('author')
    .countDocuments();

  const watchArr = await Posts
    .find({ author: result.author._id })
    .populate('author', 'username');
  
  // 统计作者文章阅读数量
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

  // 获取评论数据
  let commentsList = await Comments
    .find({ article: articleid })
    .sort({ create_time: '-1' }) 
    .populate({
      path: 'article',
      select: ['_id'],
    })
    .populate({
      path: 'whom',
      select: ['_id', 'useravatar', 'username'],
    })    

  commentsList = await commentsList.map((item) => {
    return {
      ...item._doc,
      whom: {
        ...item._doc.whom._doc,
        useravatar: formatPath(
          item._doc.whom._doc.useravatar,
        ),
      },
    };
  });


  ctx.body = {
    code: 0,
    message: 'Success!',
    result: {
      author: result.author.username,
      authorAvatar: formatPath(result.author.useravatar),
      watchCount,
      articleCount,
      newArticle,
      articleTitle: result.title,
      mode: result.mode,
      type: result.type,
      tag: result.tag,
      create_time: result.create_time,
      articleContent: result.content,
      comments: commentsList,
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

  const result = await Comments
    .create({
      whom: userid,
      article: articleid,
      commentValue,
      create_time: new Date().getTime(),
    });

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


module.exports = details;