import * as Router from 'koa-router';
import * as IO from 'socket.io';

import {
  User,
} from '../../../model/model';

const notificationUserController = new Router();


/**
 * [处理] - 应用用户通知相关
 */
export function handleNotificationUser(
  socket: IO.Socket,
  io: IO.Namespace
) {
  // ? 请求加好友
  socket.on('sendMakeFriendRequest', async (
    data: {
      from: string;
      to: string;
      description: string;
    },
  ) => {
    // ? 查找发送方的用户信息
    const foundSenderUserInfo = await User.findById(data.from);

    // ? 向接收方发起好友请求的通知
    io.emit('receiveMakeFriendRequest', {
      from_user_id: data.from,
      from_user_name: foundSenderUserInfo.username,
      to_user_id: data.to,
      description: data.description,
    });
  });

  // ? 同意加好友
  socket.on('sendMakeFriendAgree', async (
    data: {
      from: string,
      to: string,
    },
  ) => {
    // ? 查找接收方的用户信息
    const foundReceiverUserInfo = await User.findById(data.to);

    io.emit('receiveMakeFriendAgree', {
      from_user_id: data.from,
      to_user_id: data.to,
      to_user_name: foundReceiverUserInfo.username,
    });
  });

  // ? 拒绝加好友
  socket.on('sendMakeFriendRefuse', async (
    data: {
      from: string,
      to: string,
      description: string,
    },
  ) => {
    // ? 查找接收方的用户信息
    const foundReceiverUserInfo = await User.findById(data.to);

    io.emit('receiveMakeFriendRefuse', {
      from_user_id: data.from,
      to_user_id: data.to,
      to_user_name: foundReceiverUserInfo.username,
      description: data.description,
    });
  });
}

export default notificationUserController;