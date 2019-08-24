import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const PostsSchema: mongoose.Schema = new Schema({
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
  // ** 封面图片 **
  cover_img: {
    type: String,
  },
  update_time: {
    type: Number,
  },
  // ** 文章模式 **
  mode: {
    type: String,
    require: true,
  },
  // ** 文章类型 **
  type: {
    type: String,
    require: true,
  },
  // ** 文章标题 **
  title: {
    type: String,
    require: true,
  },
  // ** 文章描述 **
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  // ** 文章标签 **
  tag: {
    type: String,
  },
  // ** 浏览量 **
  // watch: {
  //   type: Number,
  //   default: 0,
  // },
  // ** 点赞 **
  // star: {
  //   type: Number,
  //   default: 0,
  // },
  // ** 点过赞的集合 **
  // stared: [{
  //   type: String,
  // }],

  // ! 重构
  // ? 看过文章的用户
  watch_user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }],
  // ? 赞过文章的用户
  star_user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }],
  // ? 踩过文章的用户
  unstar_user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }],
});

const Posts: mongoose.Model<any> = mongoose
  .model('Post', PostsSchema, 'Post');


export default Posts;
