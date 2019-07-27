/**
 * @name chatMemoryModel
 * @description 聊天信息缓存表(聊天列表), 用于前台索引
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';


const ChatMemorySchema: mongoose.Schema = new mongoose.Schema({
  // ? 聊天类型: single | group | ...
  chat_type: {
    type: String,
    required: true,
  },
  // ? 聊天唯一id
  chat_id: {
    type: String,
    required: true,
  },
});

const ChatMemory: mongoose.Model<any> = mongoose.model('ChatMemory', ChatMemorySchema, 'ChatMemory');

export default ChatMemory;