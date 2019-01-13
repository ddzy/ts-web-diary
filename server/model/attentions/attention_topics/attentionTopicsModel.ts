import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const AttentionTopicsSchema: mongoose.Schema = new Schema({
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});

const AttentionTopics: mongoose.Model<any> = mongoose
  .model('AttentionTopics', AttentionTopicsSchema, 'AttentionTopics');


export default AttentionTopics;