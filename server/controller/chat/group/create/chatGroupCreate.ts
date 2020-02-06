import * as IOServer from 'socket.io';
import * as Router from 'koa-router';

import {
  ChatGroup,
  ChatGroupMember,
  User,
  ChatMemory,
  ChatGroupMessage,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


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
  socket.on('sendChatGroupMessage', async (
    messageInfo: {
      fromUserId: string,
      chatId: string,
      chatType: string,
      contentType: number,
      content: string,
    },
  ) => {
    // ? room 失效
    // io.to(messageInfo.chatId).emit('receiveChatGroupMessage', {
    //   ...messageInfo,
    // });

    // 查询用户信息
    const foundUserInfo = await User.findById(
      messageInfo.fromUserId,
      {
        ...FILTER_SENSITIVE,
      },
    )

    // 查询群聊成员消息
    const foundChatGroupMember = await ChatGroupMember
      .findOne(
        {
          user_id: messageInfo.fromUserId,
          group_id: messageInfo.chatId,
        },
        {
          ...FILTER_SENSITIVE,
        },
    )
      .populate([
        {
          path: 'user_id',
          select: {
            ...FILTER_SENSITIVE,
          },
      },
    ])

    // 创建群聊消息
    const createdChatGroupMessage = await ChatGroupMessage.create({
      group_id: messageInfo.chatId,
      from_member_id: foundChatGroupMember._id || '',
      content_type: messageInfo.contentType,
      content: messageInfo.content,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // 更新该群聊成员相关信息
    await ChatGroupMember.findByIdAndUpdate(
      foundChatGroupMember._id,
      {
        '$addToSet': {
          create_message: createdChatGroupMessage,
        },
        '$inc': {
          create_message_total: 1,
        },
        '$set': {
          last_create_message_time: createdChatGroupMessage.create_time,
        },
      },
      {
        new: true,
      },
    )

    // 更新群聊表
    await ChatGroup.findByIdAndUpdate(
      messageInfo.chatId,
      {
        '$addToSet': {
          messages: createdChatGroupMessage,
        },
        '$inc': {
          message_total: 1,
        },
        '$set': {
          last_create_message_time: createdChatGroupMessage.create_time,
        },
      },
      {
        new: true,
      },
    )

    // 更新群聊历史表
    await ChatMemory.findOneAndUpdate(
      {
        chat_type: messageInfo.chatType,
        chat_id: messageInfo.chatId,
      },
      {
        last_message_member_name: foundUserInfo.username,
        last_message_content_type: createdChatGroupMessage.content_type,
        last_message_content: createdChatGroupMessage.content,
        unread_message_total: 0,
        update_time: Date.now(),
      },
      {
        new: true,
      },
    )

    io.emit('receiveChatGroupMessage', {
      ...createdChatGroupMessage._doc,
      from_member_id: foundChatGroupMember,
    });
  });

  socket.on('sendChatGroupInvite', async (
    inviteInfo: {
      from: string,
      to: string,
      group: string,
      type: string,
    },
  ) => {
    // TODO: 邀请用户加入群聊
    // 将当前客户端放入对应的群聊房间
    // 每个房间以唯一的群聊 id 标识
    socket.join(inviteInfo.group);

    // 创建新的群聊用户
    const createdGroupMember = await ChatGroupMember.create({
      user_id: inviteInfo.to,
      group_id: inviteInfo.group,
      authority: 2,
      join_time: Date.now(),
      create_message: [],
      create_message_total: 0,
      last_create_message_time: Date.now(),
      create_time: Date.now(),
    });

    // 将该用户加入群聊
    await ChatGroup.findByIdAndUpdate(
      inviteInfo.group,
      {
        '$addToSet': {
          members: createdGroupMember,
        },
        '$inc': {
          member_total: 1,
        },
      },
      {
        new: true,
      },
    );

    // 加入群聊成功, 广播告知所有群聊用户
    io.to(inviteInfo.group).emit('receiveChatGroupInviteSuccess', {});
  });
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

    // * 创建新的聊天历史
    // ? 每一个群聊对应一个唯一的聊天历史
    let isExistChatMemory = await ChatMemory.findOne({
      chat_id: createdChatGroup._id,
    });

    if (!isExistChatMemory) {
      isExistChatMemory = await ChatMemory.create({
        chat_type: 'group',
        chat_id: createdChatGroup._id,
        is_from_member: true,
        from_member_id: createdChatGroupMember._id,
        to_member_id: createdChatGroupMember._id,
        chat_name: createdChatGroup.name,
        chat_avatar: createdChatGroup.avatar,
        last_message_content: '',
        last_message_member_name: '',
        last_message_content_type: 'plain',
        unread_message_total: 0,
        create_time: Date.now(),
        update_time: Date.now(),
      });
    }

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
    }, {
        new: true,
      });

    // * 更新用户的群聊列表
    await User.findByIdAndUpdate(userId, {
      '$addToSet': {
        created_chat_group: createdChatGroup,
        chat_memory: isExistChatMemory,
      },
    }, {
        new: true,
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