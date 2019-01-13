import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const CommentsSchema: mongoose.Schema = new Schema({
  from: {
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
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  update_time: {
    type: Number,
    default: new Date().getTime(),
  },
  // commentValue: {
  //   type: String,
  // },
  replys: [{
    type: Schema.Types.ObjectId,
    ref: 'Replys',
  }],
});

const Comments: mongoose.Model<any> = mongoose
  .model('Comments', CommentsSchema, 'Comments');


export default Comments;