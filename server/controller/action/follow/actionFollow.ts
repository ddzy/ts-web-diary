import * as Router from 'koa-router';

import {
  Followers,
  User,
  changeId,
} from '../../../model/model';

const actionFollowController: Router = new Router();


/**
 * 处理关注用户
 */
actionFollowController.post('/user', async (ctx) => {
  const {
    actioner,
    follower,
  }: any = await ctx.request.body;

  await Followers
    .create({
      whom: actioner,
    });
  await User
    .findByIdAndUpdate(
      follower,
      { '$addToSet': { followers: changeId(actioner) } },
      { new: true },
    )

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      followInfo: {
        isFollowed: true,
      },
    },
  };
});


export default actionFollowController;