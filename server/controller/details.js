const koa = require('koa');
const Router = require('koa-router');

const { Posts, changeId } = require('../model/model');
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
    },
    
  };

});


//// 所有文章阅读数加一
details.get('/setallwatch', async (ctx, next) => {
  
  ctx.body = {
    code: 0,
    message: 'Success!',
  };

});


module.exports = details;