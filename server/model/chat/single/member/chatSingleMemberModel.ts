/**
 * @name chatSingleMemberModel
 * @description 单聊成员表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const ChatSingleMemberSchema: mongoose.Schema = new Schema({
  // ? 所属单聊
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSingle',
    required: true,
  },
  // ? 所属用户
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // ? 创建消息总数
  create_message_total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ChatSingleMember: mongoose.Model<any> = mongoose
  .model('ChatSingleMember', ChatSingleMemberSchema, 'ChatSingleMember');

export default ChatSingleMember;