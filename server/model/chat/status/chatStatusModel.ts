/**
 * @name ChatStatusModel
 * @description 聊天用户状态表
 * @author ddzy
 * @since 2019-7-27
 * @license MIT
 */

import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const ChatStatusSchema: mongoose.Schema = new Schema({
  // ? 当前登录的用户信息
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // ? 是否在线
  is_online: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ChatStatus: mongoose.Model<any> = mongoose
  .model('ChatStatus', ChatStatusSchema, 'ChatStatus');


export default ChatStatus;