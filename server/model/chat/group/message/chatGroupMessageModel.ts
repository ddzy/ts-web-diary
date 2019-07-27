/**
 * @name chatGroupMessageModel
 * @description 群聊消息表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';


const ChatGroupMessageSchema: mongoose.Schema = new mongoose.Schema({
  // ? 所属群聊成员
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMember',
    required: true,
  },
  // ? 所属群聊
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroup',
    required: true,
  },
  // ? 消息创建时间
  create_time: {
    type: Number,
    required: true,
  },
  // ? 消息更新时间
  update_time: {
    type: Number,
    required: true,
  },
});

const ChatGroupMessage: mongoose.Model<any> = mongoose.model('ChatGroupMessage', ChatGroupMessageSchema, 'ChatGroupMessage');

export default ChatGroupMessage;