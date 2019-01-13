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
});

const User: mongoose.Model<any> = mongoose
  .model('User', UserSchema, 'User');


export default User;
