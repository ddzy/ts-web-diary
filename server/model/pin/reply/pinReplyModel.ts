import * as mongoose from 'mongoose';

const { Schema } = mongoose;


/**
 * 沸点回复表
 */
const PinReplySchema = new Schema({
  // 所属评论
  comment_id: {
    type: Schema.Types.ObjectId,
    ref: 'PinComment',
  },
  // 回复人
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // 被回复人
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // 普通文本内容
  content_plain: {
    type: String,
    default: '',
  },
  // 图片内容
  content_image: {
    type: String,
    default: '',
  },
  create_time: {
    type: Number,
    default: Date.now(),
  },
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const PinReply: mongoose.Model<any> = mongoose
  .model('PinReply', PinReplySchema, 'PinReply');

export default PinReply;