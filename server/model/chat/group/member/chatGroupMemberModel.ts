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
  // ? 权限(群主: 0, 管理员: 1, 成员: 2)
  authority: {
    type: Number,
    required: true,
  },
  // ? 加入时间
  join_time: {
    type: Number,
    required: true,
  },
  create_message: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMessage',
    required: true,
  }],
  // ? 创建消息总数
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
  // ? 创建时间
  create_time: {
    type: Number,
    required: true,
  },
});

const ChatGroupMember: mongoose.Model<any> = mongoose.model('ChatGroupMember', ChatGroupMemberSchema, 'ChatGroupMember');

export default ChatGroupMember;