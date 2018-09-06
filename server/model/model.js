const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost:27017/web-diary-log',
  { useNewUrlParser: true },
);
const Schema = mongoose.Schema;



/**
 * User: 用户
 * Posts: 文章
 * Comments: 评论
 * Reply: 回复
 */

const UserSchema = new Schema({
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
  },
});

const PostsSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  img: {      // 封面图片
    type: String,
  },
  update_time: {      // 更新时间
    type: Number,
  },
  // 文章模式
  mode: {
    type: String,
    require: true,
  },
  // 文章类型
  type: {
    type: String,
    require: true,
  },
  // 文章标题
  title: {
    type: String,
    require: true,
  },
  // 文章描述
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  // 文章标签
  tag: {
    type: String,
  },
  // 浏览量
  watch: {
    type: Number,
    default: 0,
  },
  // 点赞
  star: {
    type: Number,
    default: 0,
  },
  // 点过赞的集合
  stared: [{
    type: String,
  }]
});

const CommentsSchema = new Schema({
  whom: {                         // 评论人
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  article: {                        // 文章
    type: Schema.Types.ObjectId,
    ref: 'Post',    
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  commentValue: {
    type: String,
  },
  replys: [{
    type: Schema.Types.ObjectId,
    ref: 'Replys',
  }],
});

const ReplySchema = new Schema({
  whom: {           // 回复人
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  },
  replyValue: {
    type: String,       // 评论回复
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  star: {
    type: Number,
    default: 0,
  },
});


const User = mongoose.model('User', UserSchema, 'User');
const Posts = mongoose.model('Post', PostsSchema, 'Post');
const Comments = mongoose.model('Comments', CommentsSchema, 'Comments');
const Replys = mongoose.model('Replys', ReplySchema, 'Replys');



module.exports = {
  User,
  Posts,
  Comments,
  Replys,

  // 转为objectId
  changeId: (id) => {
    return mongoose.Types.ObjectId(id);
  },

  //
  isObjectId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },
};