import * as mongoose from 'mongoose';


const ChatGroupMessageSchema: mongoose.Schema = new mongoose.Schema({
  // ? 所属群聊
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroup',
    required: true,
  },
  // ? 发送方
  from_member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroupMember',
    required: true,
  },
  // ? 消息类型
  // ? 目前只计划三种类型: images(0) | files(1) | plain(2)
  content_type: {
    type: Number,
    required: true,
  },
  // ? 消息内容
  content: {
    type: String,
    default: '',
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