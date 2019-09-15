import * as mongoose from 'mongoose';

const { Schema } = mongoose;



/**
 * [用户] - 申请加好友通知模型
 */
const notificationUserFriendRequestSchema: mongoose.Schema = new Schema({
  type: {
    type: String,
    default: '',
  },
  // ? 同意申请的状态
  // * 0(等待中) 1(同意) -1(拒绝)
  agree_state: {
    type: Number,
    default: 0,
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

const notificationUserFriendRequest: mongoose.Model<any> = mongoose
  .model('notificationUserFriendRequest', notificationUserFriendRequestSchema, 'notificationUserFriendRequest');


export default notificationUserFriendRequest;
