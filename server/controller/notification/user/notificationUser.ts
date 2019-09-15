import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';

import {
  User,
  INotificationUserFriendAgreeModelProps,
  INotificationUserFriendRefuseModelProps,
  INotificationUserFriendRequestModelProps,
} from '../../../model/model';

const notificationUserController = new Router();


/**
 * [socket处理] - 应用用户通知相关
 */
export function handleNotificationUser(
  socket: IO.Socket,
  io: IO.Namespace
) {
  // ? 申请加好友
  socket.on('sendMakeFriendRequest', async (
    data: {
      from: string;
      to: string;
      description: string;
      notificationType: string;
    },
  ) => {
    // TODO 创建新的通知
    const createdNotification: INotificationUserFriendRequestModelProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      agree_state: 0,
      from: data.from,
      to: data.to,
      description: data.description,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // TODO 更新接收方的通知列表
    const updatedReceiverInfo = await User.findByIdAndUpdate(
      data.to,
      {
        '$push': {
          'notifications': createdNotification,
        },
      },
      {
        new: true,
        select: '_id username useravatar',
      },
    );

    // TODO 查询发送方的用户信息
    const foundSenderInfo = await User.findById(
      data.from,
      '_id username useravatar',
    );

    // TODO 向接收方发起好友请求的通知
    io.emit('receiveMakeFriendRequest', {
      ...createdNotification,
      from: foundSenderInfo,
      to: updatedReceiverInfo,
    });
  });

  // ? 同意加好友
  socket.on('sendMakeFriendAgree', async (
    data: {
      notificationId: string,
      from: string,
      to: string,
      notificationType: string;
    },
  ) => {
    // TODO 创建新的通知
    const createdNotification: INotificationUserFriendAgreeModelProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.from,
      to: data.to,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // TODO 更新双方的好友列表
    const updatedSenderInfo = await User.findByIdAndUpdate(data.from, {
      '$addToSet': {
        friends: data.to,
      },
    }, {
      new: true,
    });
    const updatedReceiverInfo = await User.findByIdAndUpdate(data.to, {
      '$addToSet': {
        friends: data.from,
      },
      '$push': {
        notifications: createdNotification,
      },
    }, {
      new: true,
      select: '_id username useravatar',
    });

    // TODO 更新好友申请的接收方(此时的发送方)的状态为1(同意)
    let foundNotificationList = await updatedSenderInfo.notifications;

    foundNotificationList = await foundNotificationList.map((v: any) => {
      if (v._id === data.notificationId) {
        return {
          ...v,
          agree_state: 1,
        };
      }

      return v;
    });

    const foundSenderInfo = await User.findByIdAndUpdate(data.from, {
      '$set': {
        notifications: foundNotificationList,
      },
    }, {
      new: true,
      select: '_id username useravatar',
    });

    io.emit('receiveMakeFriendAgree', {
      ...createdNotification,
      from: foundSenderInfo,
      to: updatedReceiverInfo,
      notificationId: data.notificationId,
    });
  });

  // ? 拒绝加好友
  socket.on('sendMakeFriendRefuse', async (
    data: {
      notificationId: string,
      notificationType: string,
      from: string,
      to: string,
      description: string,
    },
  ) => {
    // TODO 创建新的拒绝通知
    const createdNewNotification: INotificationUserFriendRefuseModelProps = {
      _id: UUID.v1(),
      type: data.notificationType,
      from: data.from,
      to: data.to,
      description: data.description,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // TODO 更新接收方的用户信息
    const updatedReceiverInfo = await User.findByIdAndUpdate(
      data.to,
      {
        '$push': {
          'notifications': createdNewNotification,
        },
      },
      {
        new: true,
        select: '_id username useravatar',
      },
    );

    // TODO 更新好友申请的接收方(此时的发送方)的状态为-1(拒绝)
    const foundSenderInfo = await User.findById(data.from);
    let foundNotificationList = await foundSenderInfo.notifications;

    foundNotificationList = await foundNotificationList.map((v: any) => {
      if (v._id === data.notificationId) {
        return {
          ...v,
          agree_state: -1,
        };
      }

      return v;
    });

    const updatedSenderInfo = await User.findByIdAndUpdate(
      data.from,
      {
        '$set': {
          notifications: foundNotificationList,
        },
      },
      {
        new: true,
        select: '_id username useravatar',
      }
    );

    io.emit('receiveMakeFriendRefuse', {
      ...createdNewNotification,
      from: updatedSenderInfo,
      to: updatedReceiverInfo,
      notificationId: data.notificationId,
    });
  });
}

/**
 * [处理] - 获取通知列表(用户 + 管理员)
 * @todo 分页获取
 */
notificationUserController.get('/info/list', async (ctx) => {
  interface IRequestParams {
    userId: string,
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

  // ? 查询指定用户信息
  const foundUserInfo = await User.findById(userId);

  // ? 查询用户的通知列表
  const foundUserNotificationList = await foundUserInfo.notifications;

  // ? 解析通知列表条目中的关联表
  const parsedUserNotificationList = await Promise.all(foundUserNotificationList.map(async (v: any) => {
    const foundFromUserInfo = await User.findById(
      v.from,
      '_id username useravatar',
    );
    const foundToUserInfo = await User.findById(
      v.to,
      '_id username useravatar',
    );

    return {
      ...v,
      from: foundFromUserInfo,
      to: foundToUserInfo,
    };
  }));

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      notification_list: parsedUserNotificationList.reverse(),
    },
  };
});


export default notificationUserController;