import * as Router from 'koa-router';

import {
  CollectionArticle,
  User,
} from '../../../../model/model';


const collectionArticleCreateController = new Router();


/**
 * [处理] 创建收藏夹
 */
collectionArticleCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    collectionName: string;
  };

  const {
    userId,
    collectionName,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询是否有同名的收藏夹
    const foundIsCollectionHasExist = await CollectionArticle.findOne({
      name: collectionName,
    });

    if (foundIsCollectionHasExist) {
      ctx.body = {
        code: 1,
        message: '已存在同名的收藏夹!',
        data: {},
      };
    } else {
      // ? 创建新的收藏夹
      const createdCollection = await CollectionArticle.create({
        name: collectionName,
        author: userId,
        description: '',
        cover_img: '',
        articles: [],
        followers: [],
        watchers: [],
        create_time: Date.now(),
        update_time: Date.now(),
      });

      // ? 更新用户的收藏夹列表
      await User.findByIdAndUpdate(userId, {
        '$push': {
          'collections.article': createdCollection,
        },
      });

      ctx.body = {
        code: 0,
        message: '创建成功!',
        data: {
          collectionInfo: createdCollection,
        },
      };
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: error,
    };
  }
});

export default collectionArticleCreateController;