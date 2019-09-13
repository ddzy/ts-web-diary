import * as Router from 'koa-router';

import {
  md5,
} from '../../utils/utils';
import {
  User,
} from '../../model/model';


const registerController: Router = new Router();


/**
 * [处理] - 新用户注册
 */
registerController.post('/', async (ctx, ) => {
  interface IRequestParams {
    username: string;
    userpwd: string;
    usergender: string;
  };

  const {
    username,
    userpwd,
    usergender,
  } = ctx.request.body as unknown as IRequestParams;

  // ? 查询用户名是否重复
  const result = await User
    .findOne({ username });

  if (result) {
    ctx.body = {
      code: 1,
      message: '用户名重复!',
      data: {
        username,
      },
    };

    return;
  }

  // ? 创建新的用户
  await User.create({
    username,
    usergender,
    userpwd: md5(userpwd),
    useravatar: '',
    collections: [],
    articles: [],
    attention: {
      users: [],
      topics: [],
    },
    followers: [],
    friends: [],
    chat_memory: [],
    notification: {
      user: {
        friend: {
          request: [],
          agree: [],
          refuse: [],
        },
      },
      admin: {},
    },
    bind_third_party: {
      github: 0,
    },
  });

  ctx.body = {
    code: 0,
    message: '注册成功!',
    data: {
      username,
      userpwd,
    },
  };
});


export default registerController;