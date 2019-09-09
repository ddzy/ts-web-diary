import * as Router from 'koa-router';
import Axios from 'axios';

import {
  BIND_THIRD_PARTY_INFO,
} from '../../../constants/constants';

const authGithubController = new Router();


authGithubController.post('/', async (ctx) => {
  interface IRequestParams {
    code: string;
  };

  const {
    code,
  } = ctx.request.body as IRequestParams;
  const {
    client_id,
    client_secret,
    access_token_uri,
    user_info_uri,
  } = BIND_THIRD_PARTY_INFO.github;

  // ? 获取github的access_token
  const fetchedGithubAccessToken = await Axios({
    url: access_token_uri,
    method: 'POST',
    data: {
      client_id,
      client_secret,
      code,
    },
    headers: {
      Accept: 'application/json',
    },
  });
  const accessToken = await fetchedGithubAccessToken.data.access_token;

  // ? 使用access_token获取github用户信息
  let fetchedGithubUser: any = null;

  try {
    fetchedGithubUser = await Axios.get(`
      ${user_info_uri}?access_token=${accessToken}
    `);
  } catch (e) {
    fetchedGithubUser = null;
  }

  if (fetchedGithubUser) {
    const githubUserInfo = fetchedGithubUser.data;

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        githubUserInfo,
      },
    };
  } else {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

export default authGithubController;