import * as mongoose from 'mongoose';

const { Schema } = mongoose;


/**
 * @description github-OAuth2映射模型
 */
const OAuthGithubSchema = new Schema({
  open_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  github_user_info: {
    type: Schema.Types.Mixed,
  },
  create_time: {
    type: Number,
    default: Date.now(),
  },
  update_time: {
    type: Number,
    default: Date.now(),
  },
});


const OAuthGithub: mongoose.Model<any> = mongoose
  .model('OAuthGithub', OAuthGithubSchema, 'OAuthGithub');


export default OAuthGithub;
