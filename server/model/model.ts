import * as mongoose from 'mongoose';
import {
  ObjectId,
} from 'bson';

import User from './user/userModel';
import Posts from './posts/postsModel';
import Comments from './comments/commentsModel';
import Replys from './replys/replysModel';
import Collections from './collections/collectionsModel';
import Followers from './followers/followersModel';
import Attentions from './attentions/attentionsModel';
import AttentionUsers from './attentions/attention_users/attentionUsersModel';
import AttentionTopics from './attentions/attention_topics/attentionTopicsModel';


mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost:27017/web-diary-log',
  { useNewUrlParser: true },
);


/**
 * 转化为ObjectId
 * @param id id值
 */
function changeId(
  id: string,
): ObjectId {
  return mongoose.Types.ObjectId(id);
}


export {
  changeId,
  User,
  Posts,
  Comments,
  Replys,
  Collections,
  Attentions,
  Followers,
  AttentionUsers,
  AttentionTopics,
};