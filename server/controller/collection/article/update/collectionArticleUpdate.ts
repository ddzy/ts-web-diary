import * as Router from 'koa-router';

import {
  CollectionArticle,
} from '../../../../model/model';


const collectionArticleUpdateController = new Router();


/**
 * [处理] 添加文章至收藏夹或者将文章从收藏夹移除
 */
collectionArticleUpdateController.post('/insert_or_remove', async (ctx) => {
  interface IRequestParams {
    userId: string;
    collectionId: string;
    articleId: string;
    isCollect: boolean;
  };

  const {
    collectionId,
    articleId,
    isCollect,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询收藏夹是否存在
    const foundCollectionInfo = await CollectionArticle.findById(collectionId);

    if (!foundCollectionInfo) {
      return ctx.body = {
        code: 1,
        message: '收藏夹不存在!',
        data: {},
      };
    }

    // ? 如果收藏夹已经收藏过该文章
    if (!isCollect) {
      // ? 从收藏夹移除该文章
      await CollectionArticle.findByIdAndUpdate(collectionId, {
        '$pull': {
          articles: articleId,
        },
      });
    } else {
      // ? 反之, 添加至该收藏夹
      await CollectionArticle.findByIdAndUpdate(
        collectionId,
        {
          '$addToSet': {
            articles: articleId,
          },
        },
        {
          new: true,
        },
      );
    }

    return ctx.body = {
      code: 0,
      message: isCollect ? '成功收藏该文章!' : '取消收藏该文章!',
      data: {},
    };
  } catch (error) {
    return ctx.body = {
      code: 0,
      message: '后端出错, 请稍后重试!',
      data: error,
    };
  }
});

export default collectionArticleUpdateController;