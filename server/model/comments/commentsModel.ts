import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const CommentsSchema: mongoose.Schema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  content_type: {
    type: String,
    required: true,
  },
  article: {
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
  replys: [{
    type: Schema.Types.ObjectId,
    ref: 'Replys',
  }],
});

const Comments: mongoose.Model<any> = mongoose
  .model('Comments', CommentsSchema, 'Comments');


export default Comments;