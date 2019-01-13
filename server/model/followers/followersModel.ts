import * as mongoose from 'mongoose';

const { Schema } = mongoose;


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

const Followers: mongoose.Model<any> = mongoose
  .model('Followers', FollowersSchema, 'Followers');


export default Followers;