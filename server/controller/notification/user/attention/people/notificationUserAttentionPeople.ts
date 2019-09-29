import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';

import {
  INotificationUserAttentionPeopleProps,
} from '../../../../../model/notification/user/attention/people/notificationUserAttentionPeople.types';
import {
  User,
} from '../../../../../model/model';


const notificationUserAttentionPeopleController = new Router();


/**
 * [socket处理] - 关注用户的通知相关
 */
export function handleNotificationUserAttentionPeople(
  socket: IO.Socket,
  io: IO.Namespace
) {
  socket.on('sendUserAttentionPeople', async (
    data: {
      notificationType: string,
      fromUserId: string,
      toUserId: string,
    },
  ) => {
    // ? 创建新的通知
    const createdNotification: INotificationUserAttentionPeopleProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.fromUserId,
      to: data.toUserId,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // ? 追加该通知到被关注用户的通知列表
    const updatedToUserInfo = await User
      .findByIdAndUpdate(
        data.toUserId,
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

    // ? 查找关注的用户信息
    const foundFromUserInfo = await User
      .findById(
        data.fromUserId,
        '_id username useravatar',
      )
      .lean();

    // ? 重新组装通知信息
    const composedNotification = {
      ...createdNotification,
      from: foundFromUserInfo,
      to: updatedToUserInfo,
    };

    io.emit('receiveUserAttentionPeople', composedNotification);
  });
}

export default notificationUserAttentionPeopleController;