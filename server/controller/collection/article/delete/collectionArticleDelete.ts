import * as Router from 'koa-router';
import {
  CollectionArticle,
  User,
} from '../../../../model/model';


const collectionArticleDeleteController = new Router();


/**
 * @description 删除文章收藏夹下指定的文章
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/14
 */
collectionArticleDeleteController.post('/post', async (ctx) => {
  interface IRequestParams {
    collectionId: string; // 收藏夹 id
    articleId: string; // 收藏夹下的文章 id
  };

  const {
    collectionId,
    articleId,
  } = ctx.request.body as IRequestParams;

  try {
    // * 更新收藏夹信息
    await CollectionArticle.findByIdAndUpdate(collectionId, {
      '$pull': {
        articles: articleId,
      },
    })

    ctx.body = {
      code: 0,
      message: '删除成功!',
      data: {
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

collectionArticleDeleteController.post('/self', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
    collectionId: string;
  };

  const {
    ownerId,
    collectionId,
  } = ctx.request.body as IRequestParams;

  try {
    // 移除该收藏夹
    await CollectionArticle.findByIdAndRemove(collectionId);

    // 更新用户的收藏夹列表 & 通知列表 & 足迹列表
    // 避免残留的无效的收藏夹导致报错
    // 足迹要由前端处理
    await User.findByIdAndUpdate(ownerId, {
      '$pull': {
        'collections.article': collectionId,
        notifications: {
          collection: collectionId,
        },
        tracks: {
          collection: collectionId
        },
      },
    });

    ctx.body = {
      code: 0,
      message: '删除成功!',
      data: {},
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

export default collectionArticleDeleteController