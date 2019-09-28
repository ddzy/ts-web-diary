import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const TopicSchema = new Schema({
  // 主题图片
  cover_img: {
    type: String,
    default: '',
  },
  // 话题名称
  name: {
    type: String,
    default: '',
  },
  // 话题描述
  description: {
    type: String,
    default: '',
  },
  // 沸点列表
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    default: [],
  }],
  // 关注该话题的用户列表
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  // 在该话题下发表过沸点的用户
  actors: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  // 话题创建时间
  create_time: {
    type: Number,
    default: Date.now(),
  },
  // 话题更新时间
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const Topic: mongoose.Model<any> = mongoose
  .model('Topic', TopicSchema, 'Topic');

export default Topic;