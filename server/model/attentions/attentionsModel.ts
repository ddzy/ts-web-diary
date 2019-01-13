import * as mongoose from 'mongoose';

const { Schema } = mongoose;


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

const Attentions: mongoose.Model<any> = mongoose
  .model('Attentions', AttentionSchema, 'Attentions');


export default Attentions;