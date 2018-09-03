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
 */

const UserSchema = new Schema({
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
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    }
  ]
});

const PostsSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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
  // 是否已经赞过
/*   isStared: {
    type: Array,
  }, */
});

const CommentsSchema = new Schema({
  whom: {                         // 评论人
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  article: {                        // 文章
    type: Schema.Types.ObjectId,
    ref: 'Posts',    
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});


const User = mongoose.model('User', UserSchema, 'User');
const Posts = mongoose.model('Post', PostsSchema, 'Post');
const Comments = mongoose.model('Comments', CommentsSchema, 'Comments');



module.exports = {
  User,
  Posts,

  // 转为objectId
  changeId: (id) => {
    return mongoose.Types.ObjectId(id);
  },

  //
  isObjectId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },
};