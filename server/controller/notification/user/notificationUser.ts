import * as Router from 'koa-router';
import * as IO from 'socket.io';

import {
  User,
  NotificationUserFriendRequest,
  NotificationUserFriendAgree,
  NotificationUserFriendRefuse,
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
    },
  ) => {
    // ? 创建新的通知
    const createdNotificationUserFriendRequest = await NotificationUserFriendRequest.create({
      agree_state: 0,
      from: data.from,
      to: data.to,
      description: data.description,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 更新接收方的通知列表
    await User.findByIdAndUpdate(
      data.to,
      {
        '$push': {
          'notification.user.friend.request': createdNotificationUserFriendRequest,
        },
      },
    );

    // ? 查询刚刚创建的通知信息
    const foundNotificationInfo = await NotificationUserFriendRequest
      .findById(createdNotificationUserFriendRequest._id)
      .populate([
        {
          path: 'from',
          select: ['_id', 'username', 'useravatar'],
        },
        {
          path: 'to',
          select: ['_id', 'username', 'useravatar'],
        },
      ])
      .lean();

    // ? 向接收方发起好友请求的通知
    io.emit('receiveMakeFriendRequest', foundNotificationInfo);
  });

  // ? 同意加好友
  socket.on('sendMakeFriendAgree', async (
    data: {
      notificationId: string,
      from: string,
      to: string,
    },
  ) => {
    // ? 创建新的通知
    const createdReceiverNotification = await NotificationUserFriendAgree.create({
      from: data.from,
      to: data.to,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 查找并更新接收方的用户信息
    await User.findByIdAndUpdate(
      data.to,
      {
        '$push': {
          'notification.user.friend.agree': createdReceiverNotification,
        },
      },
      {
        new: true,
      },
    );

    // ? 更新该好友请求通知的状态为1(同意)
    await NotificationUserFriendRequest.findByIdAndUpdate(
      data.notificationId,
      {
        '$set': {
          agree_state: 1,
        },
      },
    );

    // ? 查询刚刚创建的通知信息
    const foundNotificationInfo = await NotificationUserFriendAgree
      .findById(createdReceiverNotification._id)
      .populate([
        {
          path: 'from',
          select: ['_id', 'username', 'useravatar'],
        },
        {
          path: 'to',
          select: ['_id', 'username', 'useravatar'],
        },
      ])
      .lean();

    io.emit('receiveMakeFriendAgree', foundNotificationInfo);
  });

  // ? 拒绝加好友
  socket.on('sendMakeFriendRefuse', async (
    data: {
      notificationId: string,
      from: string,
      to: string,
      description: string,
    },
  ) => {
    // ? 创建新的拒绝通知
    const createdNotification = await NotificationUserFriendRefuse.create({
      from: data.from,
      to: data.to,
      description: data.description,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 更新接收方的用户信息
    await User.findByIdAndUpdate(
      data.to,
      {
        '$push': {
          'notification.user.friend.refuse': createdNotification,
        },
      },
      {
        new: true,
      },
    );

    // ? 更新该好友请求通知的状态为-1(拒绝)
    await NotificationUserFriendRequest.findByIdAndUpdate(
      data.notificationId,
      {
        '$set': {
          agree_state: -1,
        },
      },
    );

    // ? 查询刚刚创建的通知信息
    const foundNotificationInfo = await NotificationUserFriendRefuse
      .findById(createdNotification._id)
      .populate([
        {
          path: 'from',
          select: ['_id', 'username', 'useravatar'],
        },
        {
          path: 'to',
          select: ['_id', 'username', 'useravatar'],
        },
      ])
      .lean();

    io.emit('receiveMakeFriendRefuse', foundNotificationInfo);
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
  const foundUserInfo = await User
    .findById(userId)
    .populate([
      {
        path: 'notification.user.friend.request',
        populate: [
          {
            path: 'from',
            select: ['_id', 'username', 'useravatar'],
          },
          {
            path: 'to',
            select: ['_id', 'username', 'useravatar'],
          },
        ],
        options: {
          sort: {
            create_time: -1,
          },
        },
      },
      {
        path: 'notification.user.friend.agree',
        populate: [
          {
            path: 'from',
            select: ['_id', 'username', 'useravatar'],
          },
          {
            path: 'to',
            select: ['_id', 'username', 'useravatar'],
          },
        ],
        options: {
          sort: {
            create_time: -1,
          },
        },
      },
      {
        path: 'notification.user.friend.refuse',
        populate: [
          {
            path: 'from',
            select: ['_id', 'username', 'useravatar'],
          },
          {
            path: 'to',
            select: ['_id', 'username', 'useravatar'],
          },
        ],
        options: {
          sort: {
            create_time: -1,
          },
        },
      },
    ])
    .lean();

  // ? 获取用户的通知信息
  const foundUserNotificationInfo = await foundUserInfo.notification;

  // ? 预处理当前用户的通知
  const ProcessedUserFriendRequestNotificationList = foundUserNotificationInfo.user.friend.request
    ? foundUserNotificationInfo.user.friend.request
    : [];
  const ProcessedUserFriendAgreeNotificationList = foundUserNotificationInfo.user.friend.agree
    ? foundUserNotificationInfo.user.friend.agree
    : [];
  const ProcessedUserFriendRefuseNotificationList = foundUserNotificationInfo.user.friend.refuse
    ? foundUserNotificationInfo.user.friend.refuse
    : [];

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      user_friend_request_notification_list: ProcessedUserFriendRequestNotificationList,
      user_friend_agree_notification_list: ProcessedUserFriendAgreeNotificationList,
      user_friend_refuse_notification_list: ProcessedUserFriendRefuseNotificationList,
    },
  };
});


export default notificationUserController;