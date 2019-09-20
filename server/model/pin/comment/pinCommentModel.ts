import * as mongoose from 'mongoose';

const { Schema } = mongoose;


/**
 * 沸点评论表
 */
const PinCommentSchema = new Schema({
  // 所属沸点
  pin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
  },
  // 评论人
  from_user_id: {
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
  // 回复
  replys: [{
    type: Schema.Types.ObjectId,
    ref: 'PinReply',
    default: [],
  }],
  create_time: {
    type: Number,
    default: Date.now(),
  },
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const PinComment: mongoose.Model<any> = mongoose
  .model('PinComment', PinCommentSchema, 'PinComment');

export default PinComment;