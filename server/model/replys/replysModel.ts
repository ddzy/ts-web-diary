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
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  },
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
  update_time: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Replys: mongoose.Model<any> = mongoose
  .model('Replys', ReplySchema, 'Replys');


export default Replys;