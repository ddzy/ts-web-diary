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
  let isExistChatSingle = await ChatSingle.findOne(
    { chat_id: uniqueChatID },
  );
  if (!isExistChatSingle) {
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
  const isExistChatMemory = await ChatMemory.findOneAndUpdate(
    { chat_id: uniqueChatID },
    { '$set': { chat_type: 'single', update_time: Date.now() } },
    { new: true, },
  );
  if (!isExistChatMemory) {
    // ? 查找接收方名称, 头像信息
    // TODO 目前为了方便, 聊天室的用户信息暂时和应用的登录用户相同, 日后可能会分开.
    const foundSingleMember = await ChatSingleMember
      .findById(isExistChatSingleMember[1], 'user_id')
      .populate([
        {
          path: 'user_id',
          select: ['useravatar', 'username'],
        },
      ]);

    const createdChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      chat_name: foundSingleMember.user_id.username,
      chat_avatar: foundSingleMember.user_id.useravatar,
      last_message_content: '',
      last_message_member_name: '',
      last_message_content_type: 'plain',
      unread_message_total: 0,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    await User.findByIdAndUpdate(fromId, {
      '$addToSet': {
        chat_memory: createdChatMemory,
      },
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
    await ChatMemory.findOneAndUpdate(
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