/**
 * @name chatGroupModel
 * @description 群聊表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';


const ChatGroupSchema: mongoose.Schema = new mongoose.Schema({
  // ? 群主
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMember',
    required: false,
  },
  // ? 管理员
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMember',
    required: false,
  }],
  // ? 群聊名称
  name: {
    type: String,
    required: true,
  },
  // ? 群聊名称最近更新时间
  name_update_time: {
    type: Number,
    required: true,
  },
  // ? 群聊描述
  description: {
    type: String,
    required: true,
  },
  // ? 群聊描述最新更新时间
  description_update_time: {
    type: Number,
    required: true,
  },
  // ? 群聊头像
  avatar: {
    type: String,
    required: true,
  },
  // ? 群聊头像最近更新时间
  avatar_update_time: {
    type: Number,
    required: true,
  },
  // ? 群聊创建时间
  create_time: {
    type: Number,
    required: true,
  },
  // ? 群聊成员列表
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMember',
    required: true,
  }],
  // ? 群聊消息内容
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMessage',
    required: true,
  }],
  // ? 群聊总人数
  member_total: {
    type: Number,
    default: 0,
    required: true,
  },
  // ? 群聊消息总数
  message_total: {
    type: Number,
    default: 0,
    required: true,
  },
  // ? 群聊最后的会话时间
  last_create_message_time: {
    type: Number,
    required: true,
  },
});

const ChatGroup: mongoose.Model<any> = mongoose.model('ChatGroup', ChatGroupSchema, 'ChatGroup');

export default ChatGroup;