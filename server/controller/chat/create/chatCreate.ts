/**
 * @name chatCreate
 * @description 创建聊天相关信息
 * @name ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as Router from 'koa-router';
import * as IO from 'socket.io';

import redis from '../../../redis/redis';
import {
  IOREDIS_USER_ON_WHICH_CHAT,
  IOREDIS_SINGLE_MEMBER_UNREAD_MESSAGE_TOTAL,
} from '../../../redis/keys/redisKeys';
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

    const createdFromChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      is_from_member: true,
      from_member_id: foundFromSingleMember._id,
      to_member_id: foundToSingleMember._id,
      chat_name: foundToSingleMember.user_id.username,
      chat_avatar: foundToSingleMember.user_id.useravatar,
      last_message_content: '',
      last_message_member_name: '',
      last_message_content_type: 'plain',
      unread_message_total: 0,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    const createdToChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      is_from_member: false,
      from_member_id: foundFromSingleMember._id,
      to_member_id: foundToSingleMember._id,
      chat_name: foundFromSingleMember.user_id.username,
      chat_avatar: foundFromSingleMember.user_id.useravatar,
      last_message_content: '',
      last_message_member_name: '',
      last_message_content_type: 'plain',
      unread_message_total: 0,
      create_time: createdFromChatMemory.update_time,
      update_time: createdFromChatMemory.update_time,
    });

    // 更新发送方, 聊天历史列表
    await User.findByIdAndUpdate(fromId, {
      '$addToSet': {
        chat_memory: createdFromChatMemory,
      },
    }, { new: true });

    // 更新接收方, 聊天历史列表
    await User.findByIdAndUpdate(toId, {
      '$addToSet': {
        chat_memory: createdToChatMemory,
      },
    }, { new: true });
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
export function handleChat(socket: IO.Socket, io: IO.Namespace) {
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

    // 更新发送方单聊历史表
    await ChatMemory.updateOne(
      {
        chat_id: messageInfo.chatId,
        is_from_member: true,
      },
      {
        '$set': {
          last_message_member_name: updatedChatSingleMember.user_id.username,
          last_message_content_type: updatedChatSingleMessage.content_type,
          last_message_content: updatedChatSingleMessage.content,
          unread_message_total: 0,
          update_time: Date.now(),
        },
      },
    );

    // 更新接收方单聊历史表
    await ChatMemory.updateOne(
      {
        chat_id: messageInfo.chatId,
        is_from_member: false,
      },
      {
        '$set': {
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

    // 查找接收方当前处于哪个会话
    const foundToMemberInWhichChat = await redis.hget(IOREDIS_USER_ON_WHICH_CHAT, foundChatSingleMessage.to_member_id.user_id._id);
    let saveToMemberUnreadMessageTotal = 0;

    if (foundToMemberInWhichChat !== messageInfo.chatId) {
      // 如果接收方不位于当前会话界面
      // redis更新接收方的未读消息总数
      // 由于单聊的两个成员都是唯一的
      // 所以直接使用Hash存储
      saveToMemberUnreadMessageTotal = await redis.hincrby(IOREDIS_SINGLE_MEMBER_UNREAD_MESSAGE_TOTAL, foundChatSingleMessage.to_member_id._id, 1);
    }

    // 同步更新单个聊天消息
    io.emit('receiveChatSingleMessage', foundChatSingleMessage);
    // 同步更新聊天历史列表
    io.emit('updateChatMemoryItem', {
      chat_id: foundChatSingleMessage.chat_id,
      last_message_member_name: foundChatSingleMessage.from_member_id.user_id.username,
      last_message_content_type: foundChatSingleMessage.content_type,
      last_message_content: foundChatSingleMessage.content,

      to_member_id: foundChatSingleMessage.to_member_id._id,
      to_user_id: foundChatSingleMessage.to_member_id.user_id._id,
      unread_message_total: saveToMemberUnreadMessageTotal,
    });
  });
};

export default chatCreateController;