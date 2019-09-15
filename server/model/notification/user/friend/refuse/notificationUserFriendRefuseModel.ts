import * as mongoose from 'mongoose';

const { Schema } = mongoose;



/**
 * [用户] - 拒绝加好友通知模型
 */
const notificationUserFriendRefuseSchema: mongoose.Schema = new Schema({
  // ? 通知的类型
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
  // ? 备注信息
  description: {
    type: String,
    default: '',
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

const notificationUserFriendRefuse: mongoose.Model<any> = mongoose
  .model('notificationUserFriendRefuse', notificationUserFriendRefuseSchema, 'notificationUserFriendRefuse');


export default notificationUserFriendRefuse;
