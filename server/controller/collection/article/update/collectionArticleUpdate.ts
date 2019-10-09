import * as Router from 'koa-router';
import * as UUID from 'uuid';

import {
  User,
  CollectionArticle,
  ITrackCollectionArticleProps,
  Posts,
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
    trackType: string;
    isCollect: boolean;
  };

  const {
    userId,
    collectionId,
    articleId,
    trackType,
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

    // ? 查询文章信息
    const foundArticleInfo = await Posts.findById(articleId);

    // ? 如果收藏夹已经收藏过该文章
    if (!isCollect) {
      // ? 从收藏夹移除该文章
      await CollectionArticle.findByIdAndUpdate(collectionId, {
        '$pull': {
          articles: articleId,
        },
      });

      // ? 更新用户的足迹信息
      await User.findByIdAndUpdate(userId, {
        '$pull': {
          tracks: {
            type: trackType,
            article: articleId,
            article_author: String(foundArticleInfo.author),
            collection: collectionId,
          },
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

      // ? 创建新的足迹
      const createdTrack: ITrackCollectionArticleProps = {
        _id: UUID.v1(),
        type: trackType,
        article: articleId,
        article_author: String(foundArticleInfo.author),
        collection: collectionId,
        create_time: Date.now(),
        update_time: Date.now(),
      };

      // ? 更新用户的足迹信息
      await User.findByIdAndUpdate(userId, {
        '$addToSet': {
          tracks: createdTrack,
        },
      });
    }

    return ctx.body = {
      code: 0,
      message: isCollect ? '成功收藏该文章!' : '取消收藏该文章!',
      data: {
        articleInfo: foundArticleInfo,
      },
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