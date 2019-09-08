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
      ref: 'AttentionUsers',
    }],
    topics: [{
      type: Schema.Types.ObjectId,
      ref: 'AttentionTopics',
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

  // ? 应用通知(用户 + 管理员)
  notification: {
    user: {
      friend: {
        agree: [{
          type: Schema.Types.ObjectId,
          ref: 'notificationUserFriendAgree',
          default: [],
        }],
        refuse: [{
          type: Schema.Types.ObjectId,
          ref: 'notificationUserFriendRefuse',
          default: [],
        }],
        request: [{
          type: Schema.Types.ObjectId,
          ref: 'notificationUserFriendRequest',
          default: [],
        }],
      },
    },
    admin: {

    },
  },

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
});

const User: mongoose.Model<any> = mongoose
  .model('User', UserSchema, 'User');


export default User;
