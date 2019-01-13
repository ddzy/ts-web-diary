import * as mongoose from 'mongoose';

const { Schema } = mongoose;


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

const Collections: mongoose.Model<any> = mongoose
  .model('Collections', CollectionsSchema, 'Collections');


export default Collections;