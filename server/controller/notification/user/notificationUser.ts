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
  // ? 加好友通知
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
}

export default notificationUserController;