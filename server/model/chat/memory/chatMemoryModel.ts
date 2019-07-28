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
  // ? 考虑到后续可能会做拓展, 即由单聊创建群聊
  chat_type: {
    type: String,
    required: true,
  },
  // ? 聊天唯一id
  chat_id: {
    type: String,
    required: true,
  },
  // ? 创建时间
  create_time: {
    type: Number,
    required: true,
  },
  // ? 更新时间
  update_time: {
    type: Number,
    required: true,
  },
});

const ChatMemory: mongoose.Model<any> = mongoose.model('ChatMemory', ChatMemorySchema, 'ChatMemory');

export default ChatMemory;