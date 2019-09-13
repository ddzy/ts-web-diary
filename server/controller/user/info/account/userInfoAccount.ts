import * as Router from 'koa-router';

import {
  User,
  OAuthGithub,
} from '../../../../model/model';


const userInfoAccountController = new Router();


/**
 * [个人账户关联相关的controller]
 */

/**
 * 获取个人关联账号的详细信息
 */
userInfoAccountController.get('/detail', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

  // ? 查询用户的绑定信息
  const foundUserInfo = await User
    .findById(userId)
    .lean();
  const foundUserBindingInfo = await foundUserInfo.bind_third_party;

  // ? 查询用户绑定的Github信息
  const foundGithubOpenId = await foundUserBindingInfo.github;
  const foundBindingGithub = await OAuthGithub
    .findOne({ open_id: foundGithubOpenId })
    .lean();
  let foundBindingGithubId = '';
  let foundBindingGithubUserInfo = null;

  if (foundBindingGithub) {
    foundBindingGithubId = await foundBindingGithub._id;
    foundBindingGithubUserInfo = await foundBindingGithub.github_user_info;
  }

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      accountInfo: {
        user_id: userId,
        github: {
          bind_github_id: foundBindingGithubId,
          is_bind_github: !!foundGithubOpenId,
          bind_github_user_info: foundBindingGithubUserInfo,
        },
      },
    },
  };
});

export default userInfoAccountController;