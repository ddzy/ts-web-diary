import * as Router from 'koa-router';
import {
  CollectionArticle,
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

export default collectionArticleDeleteController