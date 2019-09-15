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
    userId: string;
    lastNotificationId: string;
    pageSize: string;
  };

  const {
    userId,
    lastNotificationId,
    pageSize,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 查询指定用户信息
    const foundUserInfo = await User.findById(userId);

    if (foundUserInfo) {
      // ? 查询用户的通知列表
      const foundUserNotificationList = await foundUserInfo.notifications.reverse();

      // ? 分页查询
      let filteredNotificationList: any[] = [];

      // * 如果是第一次获取通知列表
      if (!lastNotificationId) {
        filteredNotificationList = await foundUserNotificationList.slice(0, Number(pageSize) + 1);
      } else {
        // * 相反, 如果不是第一次获取
        foundUserNotificationList.forEach((v: any, i: number) => {
          if (v._id === lastNotificationId) {
            filteredNotificationList = foundUserNotificationList.slice(
              i + 1,
              i + Number(pageSize) + 2,
            );
          }
        });
      }

      // ? 解析通知列表条目中的关联表
      const parsedUserNotificationList = await Promise.all(filteredNotificationList.map(async (v: any) => {
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
          notification_list: parsedUserNotificationList,
        },
      };
    } else {
      ctx.body = {
        code: 1,
        message: '未找到用户信息, 请登录后重试!',
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


export default notificationUserController;