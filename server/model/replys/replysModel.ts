import * as mongoose from 'mongoose';

const { Schema } = mongoose;


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

const Replys: mongoose.Model<any> = mongoose
  .model('Replys', ReplySchema, 'Replys');


export default Replys;