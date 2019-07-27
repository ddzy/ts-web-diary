import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const UserSchema: mongoose.Schema = new Schema({
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
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
  // ** 关注 **
  attentions: {
    type: Schema.Types.ObjectId,
    ref: 'Attentions',
  },
  // ** 被关注 **
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Followers',
  }],

  // ? 我的好友
  friend: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],

  // ? 聊天列表
  chat_memory: [{
    type: Schema.Types.ObjectId,
    ref: 'ChatMemory',
    required: true,
  }],
});

const User: mongoose.Model<any> = mongoose
  .model('User', UserSchema, 'User');


export default User;
