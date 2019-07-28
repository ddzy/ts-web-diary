/**
 * @name chatSingleMessageModel
 * @description 单聊消息表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const ChatSingleMessageSchema: mongoose.Schema = new Schema({
  // ? 所属单聊
  // chat_id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'ChatSingle',
  // },
  // ? 单聊唯一标识id
  chat_id: {
    type: String,
    required: true,
  },
  // ? 所属单聊成员
  member_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSingleMember',
    required: true,
  },
  // ? 消息内容
  content: {
    type: String,
    default: '',
    required: true,
  },
  // ? 消息创建时间
  create_time: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  // ? 消息更新时间
  update_time: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  // ? 未读消息总数
  // unread_total: {
  //   type: Number,
  //   default: 0,
  // },
});

const ChatSingleMessage: mongoose.Model<any> = mongoose
  .model('ChatSingleMessage', ChatSingleMessageSchema, 'ChatSingleMessage');

export default ChatSingleMessage;