const koa = require('koa');
const Router = require('koa-router');

const { Posts } = require('../model/model');


const article = new Router();


//// 文章页 获取文章
article.get('/list', async (ctx, next) => {

  const {
    page,
    pageSize,
  } = ctx.request.query;

  const articleList = await Posts
    .find({})
    .populate('author')
    .sort({ create_time: -1 })
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize));

  ctx.body = {
    code: 0,
    message: 'Success!',
    articleList,
    hasMore: articleList.length !== 0,
  };
});


//// 文章页 处理点赞
article.get('/star', async (ctx, next) => {

  const { 
    userid, 
    articleid,  
    star,
  } = ctx.request.query;

  const getArticle = await Posts.findById(
    articleid,
  );

  const result = await Posts
    .findByIdAndUpdate(
      articleid,
      {
        star: star === 'true'
          ? getArticle.star + 1
          : getArticle.star - 1,
      },
      { new: true },
    )
    .populate('author', 'username');

  ctx.body = {
    code: 0,
    message: 'Success!',
    star: result.star,
    author: result.author.username,
  };
}); 


module.exports = article;




/*   if(star === 'true') {
    // 如果已经点过赞
    if(getArticle.isStared.includes(userid)) {
      ctx.body = {
        code: 2,
        message: '已经赞过了!',
        isStared: true,
      };
    }else {
      const result = await Posts
        .findByIdAndUpdate(
          articleid,
          { star: getArticle.star + 1, '$push': {isStared: userid} },
          { new: true, },
        )
        .populate('author', 'username');
      
      ctx.body = {
        code: 0,
        message: '点赞成功!',
        author: result.author,
      };
    }
  }else {
    // 取消点赞
    const result = await Posts
      .findByIdAndUpdate(
        articleid,
        { star: getArticle.star - 1, '$pull': {
          isStared: userid,
        } }
      );
    
    ctx.body = {
      code: 1,
      message: '取消了赞!',
      isStared: false,
    };
  } */