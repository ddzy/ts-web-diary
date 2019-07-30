/**
 * @name chatModel
 * @description 聊天室总表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';


const ChatSchema: mongoose.Schema = new mongoose.Schema({
  // ? 群聊总数, 方便日后做统计
  group_total: {
    type: Number,
    required: true,
  },
  // ? 单聊总数, 方便日后做统计
  single_total: {
    type: Number,
    required: true,
  },
});

const Chat: mongoose.Model<any> = mongoose.model('Chat', ChatSchema, 'Chat');

export default Chat;