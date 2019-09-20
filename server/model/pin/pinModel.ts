import * as mongoose from 'mongoose';

const { Schema } = mongoose;


/**
 * 沸点表
 */
const PinSchema = new Schema({
  // 发布者
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // 所属话题
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  },
  // 文本内容
  content_plain: {
    type: String,
    default: '',
  },
  // 图片内容
  content_image: {
    type: String,
    default: '',
  },
  // 链接内容
  content_link: {
    type: String,
    default: '',
  },
  // 评论
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'PinComment',
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

const Pin: mongoose.Model<any> = mongoose
  .model('Pin', PinSchema, 'Pin');

export default Pin;