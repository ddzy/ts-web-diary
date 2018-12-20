import * as Router from 'koa-router';
import {
  changeId,
  User,
  Posts,
} from '../model/model';
import {
  getRandom,
} from '../utils/utils';

const writeController: Router = new Router();


// ** Define Interface **
interface IRouteInsertPrdeltaOps {
  userid: string;
  articleid: string;
  editTitle: string;
  editContent: string;
  editContentWithDelta: any;
  extraContent: any;
  article_title_image: string;
};



/**
 * 获取编辑的文章信息
 */
writeController.get('/geteditinfo', async (ctx) => {
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


/**
 * 写文章
 */
writeController.post('/insert', async (ctx) => {
  const body = ctx.request.body as IRouteInsertPrdeltaOps;
  const {
    userid,
    editContentWithDelta,
    extraContent,
    editTitle,
    article_title_image,
  } = body;

  // ** 提取description **
  const deltaOps = editContentWithDelta.ops;
  let descNum = getRandom(50, 70);
  let filteredDesc: string = '';

  for (const v of deltaOps) {
    if (typeof v.insert === 'string') {
      if (v.insert.length >= descNum) {
        filteredDesc = v.insert.slice(0, descNum);
        descNum = v.insert.length - descNum;
        break;
      }
      else {
        filteredDesc += v.insert;
        continue;
      }
    } else {
      continue;
    }
  }

  // ** 存储文章 **
  const saveArticle = await Posts.create({
    // ??? BUG
    author: userid,
    title: editTitle,
    description: filteredDesc,
    content: JSON.stringify(editContentWithDelta),
    mode: extraContent.article_mode.value,
    type: extraContent.article_type.value,
    tag: extraContent.article_tag.value,
    img: article_title_image,
    create_time: new Date().getTime(),
  });

  // ** 同步到User **
  await User
    .findByIdAndUpdate(
      changeId(body.userid),
      { '$push': { articles: saveArticle } },
      { new: true },
    )

  ctx.body = {
    code: 0,
    userid,
    articleid: saveArticle._id,
    message: '发布文章成功!',
  };
});


/**
 * 更新文章
 */
writeController.post('/update', async (ctx) => {

  const body = ctx.request.body as IRouteInsertPrdeltaOps;

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


export default writeController as Router;