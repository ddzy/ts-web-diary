import * as mongoose from 'mongoose';

const { Schema } = mongoose;


/**
 * [用户] - 同意加好友通知模型
 */
const notificationUserFriendAgreeSchema: mongoose.Schema = new Schema({
  // ? 通知类型
  type: {
    type: String,
    default: '',
  },
  // ? 发送方
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // ? 接收方
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // ? 创建时间
  create_time: {
    type: Number,
    default: Date.now(),
  },
  // ? 更新时间
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const notificationUserFriendAgree: mongoose.Model<any> = mongoose
  .model('notificationUserFriendAgree', notificationUserFriendAgreeSchema, 'notificationUserFriendAgree');


export default notificationUserFriendAgree;