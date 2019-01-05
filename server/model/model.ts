import * as mongoose from 'mongoose';
import {
  ObjectId,
} from 'bson';

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
 * Replys: 回复
 * Collection: 收藏夹
 * Attention: 关注的
 * AttentionUsers: 关注的用户
 * AttentionTopics: 关注的话题
 * Follower: 被关注
 */
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
  img: {
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
  watch: {
    type: Number,
    default: 0,
  },
  // ** 点赞 **
  star: {
    type: Number,
    default: 0,
  },
  // ** 点过赞的集合 **
  stared: [{
    type: String,
  }],
});

const CommentsSchema: mongoose.Schema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  value: {
    type: String,
  },
  article: {                        // 文章
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  update_time: {
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

const ReplySchema: mongoose.Schema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  value: {
    type: String,
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
    type: String,
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  update_time: {
    type: Number,
    default: new Date().getTime(),
  },
  star: {
    type: Number,
    default: 0,
  },
});

const CollectionsSchema: mongoose.Schema = new Schema({
  name: {                          // 收藏夹名称
    type: String,
    default: '默认',
  },
  articles: [{                     // 收藏的文章
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  create_time: {
    type: String,
    default: new Date().toLocaleString(),
  },
  update_time: {
    type: Number,
    default: new Date().getTime(),
  },
});

const AttentionSchema: mongoose.Schema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'AttentionUsers',
  }],
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'AttentionTopics',
  }],
});

const AttentionUsersSchema: mongoose.Schema = new Schema({
  whom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});

const AttentionTopicsSchema: mongoose.Schema = new Schema({
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});

const FollowersSchema: mongoose.Schema = new Schema({
  whom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});


export const User: mongoose.Model<any> = mongoose
  .model('User', UserSchema, 'User');
export const Posts: mongoose.Model<any> = mongoose
  .model('Post', PostsSchema, 'Post');
export const Comments: mongoose.Model<any> = mongoose
  .model('Comments', CommentsSchema, 'Comments');
export const Replys: mongoose.Model<any> = mongoose
  .model('Replys', ReplySchema, 'Replys');
export const Collections: mongoose.Model<any> = mongoose
  .model('Collections', CollectionsSchema, 'Collections');
export const Attentions: mongoose.Model<any> = mongoose
  .model('Attentions', AttentionSchema, 'Attentions');
export const AttentionUsers: mongoose.Model<any> = mongoose
  .model('AttentionUsers', AttentionUsersSchema, 'AttentionUsers');
export const AttentionTopics: mongoose.Model<any> = mongoose
  .model('AttentionTopics', AttentionTopicsSchema, 'AttentionTopics');
export const Followers: mongoose.Model<any> = mongoose
  .model('Followers', FollowersSchema, 'Followers');


/**
 * 转化为ObjectId
 * @param id id值
 */
export function changeId(
  id: string,
): ObjectId {
  return mongoose.Types.ObjectId(id);
}

/**
 * 判断是否ObjectId
 * @param id id值
 */
export function isObjectId(
  id: string,
): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}