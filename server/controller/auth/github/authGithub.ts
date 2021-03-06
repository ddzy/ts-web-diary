import * as Router from 'koa-router';
import * as JsonWebToken from 'jsonwebtoken';
import Axios from 'axios';

import {
  BIND_THIRD_PARTY_INFO,
} from '../../../constants/constants';
import {
  OAuthGithub,
  User,
} from '../../../model/model';
import {
  DEFAULT_USER_NAME_PREFIX,
  DEFAULT_USER_NAME_CONTENT,
  SECRET_FOR_TOKEN,
} from '../../../constants/constants';
import {
  createDefaultUserName,
} from '../../../utils/utils';


const authGithubController = new Router();


/**
 * [处理] - 使用github登录[未登录状态]
 */
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
    const openId = githubUserInfo.id as number;

    // ? 检查该OAuthGithub表中该openId是否存在
    const isOpenIdExist = await OAuthGithub.findOne({
      open_id: openId,
    });

    // ? 如果不存在, 创建应用账号, 绑定该openid
    if (!isOpenIdExist) {
      // ? 迭代创建一个不重复的随机用户名
      const generatedDefaultUserName = createDefaultUserName(
        DEFAULT_USER_NAME_PREFIX,
        DEFAULT_USER_NAME_CONTENT,
        8,
      );

      // ? 创建新的用户
      const createdNewUser = await User.create({
        username: generatedDefaultUserName,
        userpwd: '',
        usergender: 'male',
        useravatar: '',
        create_time: Date.now(),
        update_time: Date.now(),
        articles: [],
        attention: {
          users: [],
          topics: [],
        },
        followers: [],
        friends: [],
        chat_memory: [],
        notifications: [],
        activities: [],
        tracks: [],
        pins: [],
        collections: {
          article: [],
          pin: [],
        },
        profile_cover_img: '',
        address: '',
        website: '',
        introduction: '',
        job: '',
        education: '',
        bind_third_party: {
          github: openId,
        },
      });

      // ? 创建新的OAuthGithub映射
      await OAuthGithub.create({
        open_id: openId,
        user_id: createdNewUser._id,
        github_user_info: githubUserInfo,
        create_time: Date.now(),
        update_time: Date.now(),
      });

      // ? 创建新的token
      const createdToken = JsonWebToken.sign({
        data: {
          userid: createdNewUser._id,
        },
        exp: ~~(Date.now() / 1000) + (60 * 60),
      }, SECRET_FOR_TOKEN);

      // ? 返回用户信息, 前台可以直接登录
      ctx.body = {
        code: 0,
        message: '成功通过github登录, 已为您创建了新的账号, 并成功绑定!',
        data: {
          userInfo: {
            _id: createdNewUser._id,
            username: createdNewUser.username,
            token: createdToken,
          },
        },
      };
    } else {
      // * 反之, 如果openid已经存在, 表明该账号已经被绑定

      // ? 根据该openid查询用户相关
      const foundUserInfo = await User.findOne({
        'bind_third_party.github': openId,
      });

      // ? 创建新的token
      const createdToken = JsonWebToken.sign({
        data: {
          userid: foundUserInfo._id,
        },
        exp: ~~(Date.now() / 1000) + (60 * 60),
      }, SECRET_FOR_TOKEN);


      ctx.body = {
        code: 0,
        message: '通过github登录成功!',
        data: {
          userInfo: {
            _id: foundUserInfo._id,
            username: foundUserInfo.username,
            token: createdToken,
          },
        },
      };
    }
  } else {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

/**
 * [处理] - 解除github绑定
 */
authGithubController.post('/disaccount', async (ctx) => {
  interface IRequestParams {
    userId: string;
    githubId: string;
  };

  const {
    userId,
    githubId,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 移除该github账号信息
    await OAuthGithub.findOneAndRemove({
      open_id: githubId,
    });

    // ? 重置用户的github绑定
    await User.findByIdAndUpdate(userId, {
      '$set': {
        'bind_third_party.github': 0,
      },
    });

    ctx.body = {
      code: 0,
      message: '成功解除绑定!',
      data: {
        userId,
        githubId,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});

/**
 * [处理] - 绑定github[已登录状态]
 */
authGithubController.post('/account', async (ctx) => {
  interface IRequestParams {
    userId: string;
    githubCode: string;
  };

  const {
    userId,
    githubCode,
  } = ctx.request.body as IRequestParams;

  try {
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
        code: githubCode,
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
      const openId = githubUserInfo.id as number;

      // ? 检查该Github账号是否已经被绑定
      const isOpenIdAlreadyBinding = await User.findOne({
        'bind_third_party.github': openId,
      });

      if (isOpenIdAlreadyBinding) {
        // 该账号已被绑定
        ctx.body = {
          code: 1,
          message: '该 Github 账号已经被绑定!',
          data: {},
        };
      } else {
        // 暂时没有人绑定该账号
        // 创建并绑定至该用户
        // 创建新的OAuthGithub映射
        const createdNewGithubAccountInfo = await OAuthGithub.create({
          open_id: openId,
          user_id: userId,
          github_user_info: githubUserInfo,
          create_time: Date.now(),
          update_time: Date.now(),
        });

        // 将该账号绑定到当前用户
        await User.findByIdAndUpdate(userId, {
          '$set': {
            'bind_third_party.github': openId,
          },
        });

        ctx.body = {
          code: 0,
          message: '绑定成功, 之后可以使用该 Github 账号登录!',
          data: {
            accountInfo: {
              bind_github_id: createdNewGithubAccountInfo.open_id,
              bind_github_user_name: createdNewGithubAccountInfo.github_user_info.login,
            },
          },
        };
      }
    } else {
      ctx.body = {
        code: -1,
        message: '后端发生错误, 请稍后重试!',
        data: {},
      };
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: {},
    };
  }
});

export default authGithubController;