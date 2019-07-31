/**
 * @name chatCreate
 * @description 创建聊天相关信息
 * @name ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as Router from 'koa-router';
import * as IO from 'socket.io';

import {
  User,
  ChatMemory,
  ChatSingle,
  ChatSingleMember,
  ChatSingleMessage,
} from '../../../model/model';

const chatCreateController = new Router();

/**
 * 处理 - 创建新的单聊
 */
chatCreateController.post('/single', async (ctx) => {
  const {
    fromId,
    toId,
  } = ctx.request.body as {
    fromId: string,
    toId: string,
  };

  // ? 创建唯一聊天标识ID
  const uniqueChatID = [fromId, toId].sort().join('_');

  // ? 创建新的单聊成员
  // * 单聊成员按照单聊划分
  // * 每个单聊有两个不同的成员, 但是user是相同的
  // * 考虑到以后的拓展
  let isExistChatSingleMember = await ChatSingleMember.find({
    chat_id: uniqueChatID,
  });
  if (!isExistChatSingleMember.length) {
    isExistChatSingleMember = await ChatSingleMember.create([
      {
        chat_id: uniqueChatID,
        user_id: fromId,
        create_message: [],
        create_message_total: 0,
        last_create_message_time: Date.now(),
        create_time: Date.now(),
      },
      {
        chat_id: uniqueChatID,
        user_id: toId,
        create_message: [],
        create_message_total: 0,
        last_create_message_time: Date.now(),
        create_time: Date.now(),
      },
    ]);
  }

  // ? 创建新的单聊
  // * 唯一的聊天历史对应一个单聊
  // * chat_id唯一标识一个单聊
  let isExistChatSingle = await ChatSingle.findOne(
    { chat_id: uniqueChatID },
  );
  if (!isExistChatSingle) {
    // 创建单聊信息
    isExistChatSingle = await ChatSingle.create({
      chat_id: uniqueChatID,
      from_member_id: isExistChatSingleMember[0],
      to_member_id: isExistChatSingleMember[1],
      message: [],
      message_total: 0,
      last_message_time: Date.now(),
      create_time: Date.now(),
    });
  }

  // ? 创建新的聊天历史
  // * 聊天历史有两个, 分别对应发送方和接收方
  // * 但是两者有共同的聊天标识(chat_id)
  const isExistChatMemory = await ChatMemory.find(
    { chat_id: uniqueChatID },
  );
  if (!isExistChatMemory.length) {
    // ? 分别查找接收方、发送方名称, 头像信息
    // ? 同时更新发送方、接收方的chat_memory信息
    // TODO 目前为了方便, 聊天室的用户信息暂时和应用的登录用户相同, 日后可能会分开.
    const foundToSingleMember = await ChatSingleMember
      .findById(isExistChatSingleMember[1], 'user_id')
      .populate([
        {
          path: 'user_id',
          select: ['useravatar', 'username'],
        },
      ]);
    const foundFromSingleMember = await ChatSingleMember
      .findById(isExistChatSingleMember[0], 'user_id')
      .populate([
        {
          path: 'user_id',
          select: ['useravatar', 'username'],
        },
      ]);

    const createdToChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      chat_name: foundToSingleMember.user_id.username,
      chat_avatar: foundToSingleMember.user_id.useravatar,
      last_message_content: '',
      last_message_member_name: '',
      last_message_content_type: 'plain',
      unread_message_total: 0,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    const createdFromChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      chat_name: foundFromSingleMember.user_id.username,
      chat_avatar: foundFromSingleMember.user_id.useravatar,
      last_message_content: '',
      last_message_member_name: '',
      last_message_content_type: 'plain',
      unread_message_total: 0,
      create_time: createdToChatMemory.create_time,
      update_time: createdToChatMemory.update_time,
    });

    // 更新发送方, 聊天历史列表
    const u1 = await User.findByIdAndUpdate(fromId, {
      '$addToSet': {
        chat_memory: createdToChatMemory,
      },
    }, { new: true });

    // 更新接收方, 聊天历史列表
    const u2 = await User.findByIdAndUpdate(toId, {
      '$addToSet': {
        chat_memory: createdFromChatMemory,
      },
    }, { new: true });

    console.log({
      u1,
      u2,
    });
  }

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
    },
  };
});

/**
 * 处理 - 创建新的单聊消息
 */
export function handleChat(socket: IO.Socket) {
  interface ISingleChatMessageProps {
    chatId: string;
    chatType: string;
    fromUserId: string;
    toUserId: string;
    fromMemberId: string;
    toMemberId: string;
    contentType: 'plain' | 'image' | 'file';
    content: string;
  };

  socket.on('sendChatSingleMessage', async (messageInfo: ISingleChatMessageProps) => {
    // 更新单聊消息表
    const updatedChatSingleMessage = await ChatSingleMessage.create({
      chat_id: messageInfo.chatId,
      from_member_id: messageInfo.fromMemberId,
      to_member_id: messageInfo.toMemberId,
      content_type: messageInfo.contentType,
      content: messageInfo.content,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // 更新单聊成员表
    const updatedChatSingleMember = await ChatSingleMember
      .findByIdAndUpdate(
        messageInfo.fromMemberId,
        {
          '$push': { create_message: updatedChatSingleMessage._id },
          '$inc': {
            create_message_total: 1,
          },
          '$set': {
            last_create_message_time: updatedChatSingleMessage.create_time,
          },
        },
        { new: true },
      )
      .populate([
        {
          path: 'user_id',
        }
      ]);

    // 更新单聊表
    await ChatSingle.findOneAndUpdate(
      { chat_id: messageInfo.chatId },
      {
        '$push': { message: updatedChatSingleMessage._id },
        '$inc': { message_total: 1 },
        '$set': {
          last_message: updatedChatSingleMessage._id,
          last_message_time: updatedChatSingleMessage.create_time,
          update_time: Date.now(),
        },
      },
      { new: true },
    );

    // 查找单聊接收方
    const foundChatToMember = await ChatSingleMember
      .findById(messageInfo.toMemberId)
      .populate([
        {
          path: 'user_id',
        },
      ]);

    // 更新单聊历史表
    await ChatMemory.update(
      { chat_id: messageInfo.chatId },
      {
        '$set': {
          chat_name: foundChatToMember.user_id.username,
          chat_avatar: foundChatToMember.user_id.useravatar,
          last_message_member_name: updatedChatSingleMember.user_id.username,
          last_message_content_type: updatedChatSingleMessage.content_type,
          last_message_content: updatedChatSingleMessage.content,
          unread_message_total: 0,
          update_time: Date.now(),
        },
      },
      {
        multi: true,
      },
    );

    // 查找聊天消息信息
    const foundChatSingleMessage = await ChatSingleMessage
      .findById(updatedChatSingleMessage._id)
      .populate([
        {
          path: 'from_member_id',
          select: ['user_id'],
          populate: {
            path: 'user_id',
            select: ['username', 'useravatar'],
          },
        },
        {
          path: 'to_member_id',
          select: ['user_id'],
          populate: {
            path: 'user_id',
            select: ['username', 'useravatar'],
          },
        },
      ]);

    socket.emit('receiveChatSingleMessage', foundChatSingleMessage);
  });
};

export default chatCreateController;