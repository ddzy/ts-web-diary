import * as Router from 'koa-router';

import {
  User,
} from '../../../model/model';


const notificationUserController = new Router();


/**
 * [处理] - 获取通知列表(用户 + 管理员)
 * @todo 分页获取
 */
notificationUserController.get('/info/list', async (ctx) => {
  interface IRequestParams {
    userId: string,
  };

  const {
    userId,
  } = ctx.request.query as IRequestParams;

  // ? 查询指定用户信息
  const foundUserInfo = await User.findById(userId);

  // ? 查询用户的通知列表
  const foundUserNotificationList = await foundUserInfo.notifications;

  // ? 解析通知列表条目中的关联表
  const parsedUserNotificationList = await Promise.all(foundUserNotificationList.map(async (v: any) => {
    const foundFromUserInfo = await User.findById(
      v.from,
      '_id username useravatar',
    );
    const foundToUserInfo = await User.findById(
      v.to,
      '_id username useravatar',
    );

    return {
      ...v,
      from: foundFromUserInfo,
      to: foundToUserInfo,
    };
  }));

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      notification_list: parsedUserNotificationList.reverse(),
    },
  };
});


export default notificationUserController;