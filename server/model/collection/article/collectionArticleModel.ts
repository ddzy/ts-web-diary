import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const CollectionArticleSchema: mongoose.Schema = new Schema({
  // ? 作者
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // ? 名称
  name: {
    type: String,
    required: true,
  },
  // ? 描述
  description: {
    type: String,
    default: '',
  },
  // ? 封面图片
  cover_img: {
    type: String,
    default: '',
  },
  // ? 文章列表
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
    default: [],
  }],
  // ? 关注该收藏夹的人
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  // ? 浏览器过该收藏夹的人
  watchers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  // ? 创建时间
  create_time: {
    type: Number,
    default: Date.now(),
  },
  // ? 更新时间
  update_time: {
    type: Number,
    default: Date.now(),
  },
});

const CollectionArticle: mongoose.Model<any> = mongoose
  .model('CollectionArticle', CollectionArticleSchema, 'CollectionArticle');


export default CollectionArticle;