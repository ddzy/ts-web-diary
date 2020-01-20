import * as Router from 'koa-router';
import * as IO from 'socket.io';
import * as UUID from 'uuid';
import { INotificationUserChatGroupInviteProps, User, ChatGroup } from '../../../../../../model/model';

const notificationUserChatGroupInviteController = new Router();


/**
 * @description 邀请好友加入群聊
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export function handleNotificationUserChatGroupInvite(
  socket: IO.Socket,
  io: IO.Namespace
) {
  socket.on('sendUserChatGroupInvite', async (
    data: {
      from: string,
      to: string,
      group: string,
      type: string,
    },
  ) => {
    // 生成唯一的 id
    const _id = UUID.v1();

    // 创建新的通知
    const createdNotification: INotificationUserChatGroupInviteProps = {
      _id,
      ...data,
      create_time: Date.now(),
      update_time: Date.now(),
    };

    // 更新接收方的通知列表
    const updatedToUserInfo = await User
    .findByIdAndUpdate(
      data.to,
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

    // 查找发送方的用户信息
    const foundFromUserInfo = await User
      .findById(data.from, {
        username: 1,
        useravatar: 1,
        _id: 1,
      })

    // 查找并更新群的信息
    const foundGroupInfo = await ChatGroup.findById(data.group);

    const composedNotification = {
      ...createdNotification,
      group: foundGroupInfo,
      from: foundFromUserInfo,
      to: updatedToUserInfo,
    };

    io.emit('receiveUserChatGroupInvite', composedNotification);
  });
}


export default notificationUserChatGroupInviteController;