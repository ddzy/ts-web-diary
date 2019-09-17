import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';

import {
  User,
  INotificationUserStarArticleProps,
  Posts,
} from '../../../../../model/model';


const notificationUserStarArticleController = new Router();


/**
 * [socket处理] - 用户点赞文章的通知相关
 */
export function handleNotificationUserStarArticle(
  socket: IO.Socket,
  io: IO.Namespace
) {
  // ? 处理用户点赞文章的通知
  socket.on('sendUserStarArticle', async (
    data: {
      notificationType: string,
      userId: string,
      articleId: string,
      authorId: string,
    },
  ) => {
    // TODO 创建新的通知
    const createdNotification: INotificationUserStarArticleProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.userId,
      article: data.articleId,
      article_author: data.authorId,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // TODO 追加该通知到文章作者的通知列表
    const updatedAuthorInfo = await User
      .findByIdAndUpdate(
        data.authorId,
        {
          '$push': {
            notifications: createdNotification,
          },
        },
        {
          new: true,
          select: '_id username useravatar',
        },
      )
      .lean();

    // TODO 查找点赞的用户信息
    const foundStarUserInfo = await User
      .findById(
        data.userId,
        '_id username useravatar',
      )
      .lean();

    // TODO 查找点赞的文章信息
    const foundStarArticleInfo = await Posts
      .findById(
        data.articleId,
        '_id title',
      )
      .lean();

    // TODO 重新组装通知信息
    const composedNotification = {
      ...createdNotification,
      from: foundStarUserInfo,
      article: foundStarArticleInfo,
      article_author: updatedAuthorInfo,
    };

    io.emit('receiveUserStarArticle', composedNotification);
  });
}

export default notificationUserStarArticleController;