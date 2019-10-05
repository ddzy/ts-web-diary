import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';

import {
  User,
  INotificationUserStarPinProps,
  Pin,
} from '../../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../../constants/constants';


const notificationUserStarPinController = new Router();


/**
 * [socket处理] - 用户点赞沸点的通知相关
 */
export function handleNotificationUserStarPin(
  socket: IO.Socket,
  io: IO.Namespace
) {
  socket.on('sendUserStarPin', async (
    data: {
      notificationType: string,
      userId: string,
      pinId: string,
      authorId: string,
      isStar: boolean,
    },
  ) => {
    // ? 如果取消了赞, 清空沸点作者的该点赞通知
    if (!data.isStar) {
      await User.findByIdAndUpdate(data.authorId, {
        '$pull': {
          notifications: {
            type: data.notificationType,
            from: data.userId,
            pin: data.pinId,
            pin_author: data.authorId,
          },
        },
      });

      return;
    }

    // ? 创建新的通知
    const createdNotification: INotificationUserStarPinProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.userId,
      pin: data.pinId,
      pin_author: data.authorId,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // ? 追加该通知到沸点作者的通知列表
    const updatedAuthorInfo = await User
      .findByIdAndUpdate(
        data.authorId,
        {
          '$addToSet': {
            notifications: createdNotification,
          },
        },
        {
          new: true,
          select: {
            ...FILTER_SENSITIVE,
          },
        },
      )
      .lean();

    // ? 查找点赞的用户信息
    const foundStarUserInfo = await User
      .findById(
        data.userId,
        { ...FILTER_SENSITIVE },
      )
      .lean();

    // ? 查找点赞的沸点信息
    const foundStarArticleInfo = await Pin
      .findById(
        data.pinId,
        { ...FILTER_SENSITIVE },
      )
      .lean();

    // ? 重新组装通知信息
    const composedNotification = {
      ...createdNotification,
      from: foundStarUserInfo,
      pin: foundStarArticleInfo,
      pin_author: updatedAuthorInfo,
    };

    io.emit('receiveUserStarPin', composedNotification);
  });
}

export default notificationUserStarPinController;