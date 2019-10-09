import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';

import {
  INotificationUserCollectionArticleProps,
  User,
  Posts,
  CollectionArticle,
} from '../../../../../model/model';


const notificationUserCollectionArticleController = new Router();


/**
 * [socket处理] 收藏文章的通知相关
 */
export function handleNotificationUserCollectionArticle(
  socket: IO.Socket,
  io: IO.Namespace
) {
  socket.on('sendUserCollectionArticle', async (
    data: {
      notificationType: string,
      userId: string,
      articleId: string,
      authorId: string,
      collectionId: string,
      isCollect: boolean,
    },
  ) => {
    // ? 如果取消收藏了该文章, 清空该收藏通知
    if (!data.isCollect) {
      await User.findByIdAndUpdate(data.authorId, {
        '$pull': {
          notifications: {
            type: data.notificationType,
            from: data.userId,
            article: data.articleId,
            article_author: data.authorId,
            collection: data.collectionId,
          },
        },
      });

      return;
    }

    // ? 创建新的通知
    const createdNotification: INotificationUserCollectionArticleProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.userId,
      article: data.articleId,
      article_author: data.authorId,
      collection: data.collectionId,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // ? 追加该通知到文章作者的通知列表
    const updatedReceiverInfo = await User
      .findByIdAndUpdate(
        data.authorId,
        {
          '$addToSet': {
            notifications: createdNotification,
          },
        },
        {
          new: true,
          select: '_id username useravatar',
        },
      )
      .lean();

    // ? 查询发送方的信息
    const foundSenderInfo = await User.findById(data.userId, '_id username useravatar');

    // ? 查询文章信息
    const foundArticleInfo = await Posts.findById(data.articleId, '_id title');

    // ? 查询收藏夹信息
    const foundCollectionInfo = await CollectionArticle.findById(data.collectionId, '_id name');

    // ? 重新组装通知信息
    const composedNotification = {
      ...createdNotification,
      from: foundSenderInfo,
      article: foundArticleInfo,
      article_author: updatedReceiverInfo,
      collection: foundCollectionInfo,
    };

    io.emit('receiveUserCollectionArticle', {
      ...composedNotification,
    });
  });
}

export default notificationUserCollectionArticleController;