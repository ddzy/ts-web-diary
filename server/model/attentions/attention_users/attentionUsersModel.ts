import * as mongoose from 'mongoose';

const { Schema } = mongoose;


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

const AttentionUsers: mongoose.Model<any> = mongoose
  .model('AttentionUsers', AttentionUsersSchema, 'AttentionUsers');


export default AttentionUsers;