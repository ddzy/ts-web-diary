import * as Router from 'koa-router';
import * as multer from 'koa-multer';

import {
  changeId,
  User,
  Posts,
  Collections,
} from '../model/model';
import {
  FILTER_SENSITIVE,
} from '../constants/constants';
import {
  formatPath,
} from '../utils/utils';


const meController: Router = new Router();
// 自定义本地储存
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/images/user');
  },
  filename: (req, file, cb) => {
    const fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});


/**
 * 个人中心 => 上传头像
 */
meController.post(
  '/upload/avatar',
  multer({ storage }).single('user_avatar'),
  async (ctx) => {

    // const { userid } = ctx.req.body || '';
    // const { path } = ctx.req.file;
    const req = ctx.req as any;
    const { userid } = req.body || '';
    const { path } = req.file || null;

    const result = await User.findByIdAndUpdate(
      changeId(userid),
      { useravatar: path },
      { new: true, select: FILTER_SENSITIVE },
    );

    ctx.body = {
      code: 0,
      useravatar: formatPath(result.useravatar),
    };
  }
);


/**
 * 个人中心 => 获取我的文章分类列表
 */
meController.get('/myarticle', async (ctx) => {

  const {
    userid,
    type,
  } = ctx.request.query;


  await Posts
    .find({ author: userid })
    .populate('author')
    .sort({ create_time: -1 });

  const myArticleList = await User
    .findById(
      changeId(userid),
      null,
      { lean: true },
    )
    .populate({
      path: 'articles',
      options: {
        lean: true,
        sort: {
          create_time: -1,
        },
      },
    });

  ctx.body = {
    code: 0,
    message: 'Success!',
    myArticleList: myArticleList.articles.filter((item: any) => {
      return item
        && item.type === type;
    }),
  };
});


/**
 * 个人中心 => 删除我的文章
 */
meController.get('/delete', async (ctx) => {

  const { articleid, userid } = ctx.request.query;

  // 删除指定文章
  const waitDelete = await Posts
    .findByIdAndRemove(changeId(articleid))
    .populate('author', 'username');

  // 返回列表
  const result = await Posts
    .find({ author: changeId(userid) });

  ctx.body = {
    code: 0,
    message: 'Success!',
    title: waitDelete.title,
    myArticleList: result,
  };

});


/**
 * 个人中心 => 获取我的收藏列表
 */
meController.get('/collection/getinfo', async (ctx) => {

  const { userid } = ctx.request.query;

  const getMyCollections = await User
    .findById(
      changeId(userid),
      null,
      {
        select: {
          'collections': 'collections',
        },
      },
    )
    .populate({
      path: 'collections',
    });

  ctx.body = {
    code: 0,
    message: 'Success!',
    my_collection_list: getMyCollections.collections,
  };

});


/**
 * 个人中心 => 删除我的收藏夹
 */
meController.get('/collection/delete', async (ctx) => {

  const { userid, collectionId } = await ctx.request.query;

  await User
    .findByIdAndUpdate(
      changeId(userid),
      {
        '$pull': { collections: collectionId },
      },
      { lean: true, new: true },
    )

  await Collections
    .findByIdAndRemove(
      changeId(collectionId),
      { lean: true, new: true },
    )

  ctx.body = {
    code: 0,
    message: 'Success!',
    collectionId,
  };

});


export default meController;