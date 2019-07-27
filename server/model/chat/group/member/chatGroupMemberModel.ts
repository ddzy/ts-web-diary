/**
 * @name chatGroupMemberModel
 * @description 群聊成员表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';


const ChatGroupMemberSchema: mongoose.Schema = new mongoose.Schema({
  // ? 所属用户
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // ? 所属群聊
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroup',
    required: true,
  },
  // ? 当前状态
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatStatus',
    required: true,
  },
  // ? 加入时间
  join_time: {
    type: Number,
    required: true,
  },
  // ? 发送消息总数
  create_message_total: {
    type: Number,
    default: 0,
    required: true,
  },
  // ? 最后发言时间
  last_create_message_time: {
    type: Number,
    required: true,
  },
});

const ChatGroupMember: mongoose.Model<any> = mongoose.model('ChatGroupMember', ChatGroupMemberSchema, 'ChatGroupMember');

export default ChatGroupMember;