/**
 * @name chatCreate
 * @description 创建聊天相关信息
 * @name ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as Router from 'koa-router';

import {
  User,
  ChatMemory,
  ChatSingle,
  ChatSingleMember,
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

  // ? 创建新的聊天历史
  const isExistChatMemory = await ChatMemory.findOneAndUpdate(
    { chat_id: uniqueChatID },
    { '$set': {chat_type: 'single', update_time: Date.now()} },
    { new: true, },
  );
  if (!isExistChatMemory) {
    const createdChatMemory = await ChatMemory.create({
      chat_type: 'single',
      chat_id: uniqueChatID,
      create_time: Date.now(),
      update_time: Date.now(),
    });

    await User.findByIdAndUpdate(fromId, {
      '$addToSet': {
        chat_memory: createdChatMemory,
      },
    });
  }

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

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
    },
  };
});

export default chatCreateController;