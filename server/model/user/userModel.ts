import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const UserSchema: mongoose.Schema = new Schema({
  username: {
    type: String,
    require: true,
  },
  userpwd: {
    type: String,
    require: true,
  },
  usergender: {
    type: String,
    require: true,
  },
  useravatar: {
    type: String,
    require: false,
    default: '',
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collections',
  }],
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  update_time: {
    type: Number,
    default: new Date().getTime(),
  },
  // ? 发布的文章
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  // ? 我关注的
  attention: {
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    }],
    topics: [{
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      default: [],
    }],
  },
  // ? 关注我的
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Followers',
  }],

  // ? 我的好友
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  // ? 聊天列表
  chat_memory: [{
    type: Schema.Types.ObjectId,
    ref: 'ChatMemory',
  }],

  // ? 通知
  notifications: [{
    type: Schema.Types.Mixed,
    default: [],
  }],

  // ? 我的动态
  activities: [{
    type: Schema.Types.Mixed,
    default: [],
  }],

  // ? 沸点
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    default: [],
  }],

  // ? 个人中心封面图片
  profile_cover_img: {
    type: String,
    default: '',
  },

  // ? 居住地
  address: {
    type: String,
    default: '',
  },

  // ? 个人站点
  website: {
    type: String,
    default: '',
  },

  // ? 个人简介
  introduction: {
    type: String,
    default: '',
  },

  // ? 所处行业
  job: {
    type: String,
    default: '',
  },

  // ? 学历
  education: {
    type: String,
    default: '',
  },

  bind_third_party: {
    github: {
      type: Number,
    },
  }
});

const User: mongoose.Model<any> = mongoose
  .model('User', UserSchema, 'User');


export default User;
