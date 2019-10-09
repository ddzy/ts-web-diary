import * as Router from 'koa-router';

import {
  User,
  Posts,
  Pin,
  CollectionArticle,
} from '../../../model/model';
import {
  NOTIFICATION_TYPE,
  FILTER_SENSITIVE,
} from '../../../constants/constants';


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
        filteredNotificationList = await foundUserNotificationList.slice(0, Number(pageSize));
      } else {
        // * 相反, 如果不是第一次获取
        foundUserNotificationList.forEach((v: any, i: number) => {
          if (v._id === lastNotificationId) {
            filteredNotificationList = foundUserNotificationList.slice(
              i + 1,
              i + Number(pageSize) + 1,
            );
          }
        });
      }

      // ? 解析通知列表条目中的关联表
      // * 不同类型通知的字段各不相同, 后续可能会做处理
      const parsedUserNotificationList = await Promise.all(filteredNotificationList.map(async (v: any) => {
        const currentType = v.type;

        switch (currentType) {
          case NOTIFICATION_TYPE.user.friend.request: {
            // ? 查找发送方的信息
            const foundSenderUserInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });

            // ? 查找接收方的信息
            const foundReceiverUserInfo = await User.findById(v.to, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderUserInfo,
              to: foundReceiverUserInfo,
            };
          };
          case NOTIFICATION_TYPE.user.friend.agree: {
            // ? 查找发送方的信息
            const foundSenderUserInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });

            // ? 查找接收方的信息
            const foundReceiverUserInfo = await User.findById(v.to, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderUserInfo,
              to: foundReceiverUserInfo,
            };
          };
          case NOTIFICATION_TYPE.user.friend.refuse: {
            // ? 查找发送方的信息
            const foundSenderUserInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });

            // ? 查找接收方的信息
            const foundReceiverUserInfo = await User.findById(v.to, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderUserInfo,
              to: foundReceiverUserInfo,
            };
          };
          case NOTIFICATION_TYPE.user.attention.people: {
            // ? 查找发送方的信息
            const foundSenderUserInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });

            // ? 查找接收方的信息
            const foundReceiverUserInfo = await User.findById(v.to, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderUserInfo,
              to: foundReceiverUserInfo,
            };
          };
          case NOTIFICATION_TYPE.user.star.article.self: {
            // ? 查找发送方的信息
            const foundSenderInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });

            // ? 查询文章信息
            const foundArticleInfo = await Posts.findById(v.article, {
              ...FILTER_SENSITIVE,
            });

            // ? 查询文章作者信息
            const foundArticleAuthorInfo = await User.findById(v.article_author, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderInfo,
              article: foundArticleInfo,
              article_author: foundArticleAuthorInfo,
            };
          };
          case NOTIFICATION_TYPE.user.star.pin.self: {
            // ? 查找发送方的信息
            const foundSenderInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });
            // ? 查找沸点的信息
            const foundPinInfo = await Pin.findById(v.pin, {
              ...FILTER_SENSITIVE,
            });
            // ? 查询沸点的作者信息
            const foundPinAuthorInfo = await User.findById(v.pin_author, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderInfo,
              pin: foundPinInfo,
              pin_author: foundPinAuthorInfo,
            };
          };
          case NOTIFICATION_TYPE.user.collection.article: {
            // ? 查询发送方信息
            const foundSenderInfo = await User.findById(v.from, {
              ...FILTER_SENSITIVE,
            });
            // ? 查询文章信息
            const foundArticleInfo = await Posts.findById(v.article, {
              ...FILTER_SENSITIVE,
            });
            // ? 查询文章作者信息
            const foundArticleAuthorInfo = await User.findById(v.article_author, {
              ...FILTER_SENSITIVE,
            });
            // ? 查询收藏夹信息
            const foundCollectionInfo = await CollectionArticle.findById(v.collection, {
              ...FILTER_SENSITIVE,
            });

            return {
              ...v,
              from: foundSenderInfo,
              article: foundArticleInfo,
              article_author: foundArticleAuthorInfo,
              collection: foundCollectionInfo,
            };
          };
        }
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