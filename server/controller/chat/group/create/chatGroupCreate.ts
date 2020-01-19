import * as IOServer from 'socket.io';
import * as Router from 'koa-router';

import {
  ChatGroup,
  ChatGroupMember,
  User,
} from '../../../../model/model';


const chatGroupCreateController = new Router();


/**
 * @description 处理有关群聊的 websocket
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/16
 * @param socket 客户端连接
 * @param io 服务端端口
 */
export function handleGroupChat(
  socket: IOServer.Socket,
  io: IOServer.Namespace,
): void {
  return;
}


chatGroupCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    groupInfo: {
      name: string;
      avatar: string;
      description: string;
    };
  };

  const {
    userId,
    groupInfo,
  } = ctx.request.body as IRequestParams;

  try {
    // * 创建新的群聊
    const createdChatGroup = await ChatGroup.create({
      admins: [],
      name: groupInfo.name,
      name_update_time: Date.now(),
      description: groupInfo.description,
      description_update_time: Date.now(),
      avatar: groupInfo.avatar,
      avatar_update_time: Date.now(),
      create_time: Date.now(),
      members: [],
      messages: [],
      member_total: 0,
      message_total: 0,
      last_create_message_time: Date.now(),
    });

    // * 创建新的群聊成员
    const createdChatGroupMember = await ChatGroupMember.create({
      user_id: userId,
      group_id: createdChatGroup,
      join_time: Date.now(),
      authority: 0,
      create_message: [],
      create_message_total: 0,
      last_create_message_time: Date.now(),
      create_time: Date.now(),
    });

    // * 再次更新群聊信息, 将当前成员置为群主
    await ChatGroup.findByIdAndUpdate(createdChatGroup._id, {
      '$addToSet': {
        members: createdChatGroupMember,
      },
      '$set': {
        owner: createdChatGroupMember,
      },
      '$inc': {
        member_total: 1,
      },
    });

    // * 更新用户的群聊列表
    await User.findByIdAndUpdate(userId, {
      '$addToSet': {
        chatGroups: createdChatGroup,
      },
    })

    ctx.body = {
      code: 0,
      message: '创建成功!',
      data: {
        groupInfo: createdChatGroup,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: {},
    };
  }
});

export default chatGroupCreateController;