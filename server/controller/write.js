const koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');

const { changeId, isObjectId, User, Posts } = require('../model/model');
const { 
  FILTER_SENSITIVE, 
} = require('../constants/constants');
const { formatPath, getRandom } = require('../utils/utils');

const write = new Router();


//// 获取编辑的文章信息
write.get('/geteditinfo', async (ctx, next) => {
  const { articleid } = ctx.request.query;

  const articleInfo = await Posts
    .findById(
      changeId(articleid),
      { 
        create_time: 0,
        description: 0,
        star: 0,
        watch: 0,
        '__v': 0,
      }
    );

  ctx.body = {
    code: 0,
    message: 'Success!',
    articleInfo,
  };
});


//// 写文章
write.post('/insert', async (ctx, next) => {
  
  const body = ctx.request.body || {};

  const getUser = await User.findById(changeId(body.userid));

  const saveArticle = await Posts.create({
    author: getUser._id,
    title: body.editTitle,
    description: body.editContent.slice(0, getRandom(5, 10)),
    content: body.editContent,
    mode: body.extraContent.article_mode.value,
    type: body.extraContent.article_type.value,
    tag: body.extraContent.article_tag.value,
    img: body.article_title_image,
    create_time: new Date().getTime(),
  });
  
  ctx.body = {
    code: 0,
    userid: getUser._id,
    articleid: saveArticle._id,
    message: '发布文章成功!',
  };
});


//// 更新文章
write.post('/update', async (ctx, next) => {

  const body = ctx.request.body;

  const result = await Posts
    .findByIdAndUpdate(
      changeId(body.articleid),
      {
        title: body.editTitle,
        content: body.editContent,
        mode: body.extraContent.article_mode.value,
        type: body.extraContent.article_type.value,
        tag: body.extraContent.article_tag.value,
        img: body.article_title_image,
        update_time: new Date().getTime(),
      },
      { new: true }
    )
  
  ctx.body = {
    code: 0,
    message: 'Success!',
    articleInfo: result,
  };

});


module.exports = write;