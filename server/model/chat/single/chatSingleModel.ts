/**
 * @name chatSingleModel
 * @description 单聊表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const ChatSingleSchema: mongoose.Schema = new Schema({
  // ? 唯一标识单聊
  chat_id: {
    type: String,
    required: true,
  },
  // ? 发送方
  from_member_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSingleMember',
    required: true,
  },
  // ? 接收方
  to_member_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSingleMember',
    required: true,
  },
  // ? 消息
  message: [{
    type: Schema.Types.ObjectId,
    ref: 'ChatSingleMessage',
    required: true,
  }],
  // ? 消息总数
  message_total: {
    type: Number,
    default: 0,
    required: true,
  },
  // ? 创建时间
  create_time: {
    type: Number,
    required: true,
  },
  // ? 最后会话时间
  last_message_time: {
    type: Number,
    required: true,
  },
  // ? 更新时间
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const ChatSingle: mongoose.Model<any> = mongoose
  .model('ChatSingle', ChatSingleSchema, 'ChatSingle');


export default ChatSingle;