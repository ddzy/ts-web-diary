import * as Router from 'koa-router';

import { User, ChatGroup } from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const chatGroupInfoController = new Router();


/**
 * @description 获取群聊列表
 * @summary 我创建的群聊、我加入的群聊
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
chatGroupInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
  };

  const {
    userId,
  } = ctx.request.body as IRequestParams;

  // * 查询用户信息
  const foundUserInfo = await User
    .findById(userId, {
      ...FILTER_SENSITIVE,
    })
    .populate([
      {
        path: 'created_chat_group',
        select: {
          ...FILTER_SENSITIVE,
        },
      },
      {
        path: 'joined_chat_group',
        select: {
          ...FILTER_SENSITIVE,
        },
      },
    ])

  const createdChatGroupList = await foundUserInfo
    ? foundUserInfo.created_chat_group
    : [];
  const joinedChatGroupList = await foundUserInfo
    ? foundUserInfo.joined_chat_group
    : [];

  try {
    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        createdChatGroupList,
        joinedChatGroupList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: 'Error!',
      data: {},
    };
  }
})

/**
 * @description 获取指定群聊信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
chatGroupInfoController.get('/', async (ctx) => {
  interface IQueryParams {
    userId: string;
    chatId: string;
    chatType: string;
    pageSize: number;
    page: number;
  };

  const {
    chatId,
    pageSize,
    page,
  } = ctx.request.query as IQueryParams;

  // ? 查询指定群聊信息
  const foundChatGroupInfo = await ChatGroup
    .findById(
      chatId,
      {
        ...FILTER_SENSITIVE,
      },
    )
    .populate([
      {
        path: 'messages',
        select: {
          ...FILTER_SENSITIVE,
        },
        options: {
          sort: {
            create_time: -1,
          },
          limit: Number(pageSize),
          skip: (Number(page) - 1) * Number(pageSize),
        },
        populate: [
          {
            path: 'from_member_id',
            select: {
              ...FILTER_SENSITIVE,
            },
            populate: [
              {
                path: 'user_id',
                select: {
                  ...FILTER_SENSITIVE,
                },
              },
            ],
          },
        ],
      },
      {
        path: 'members',
        populate: [
          {
            path: 'user_id',
            select: {
              ...FILTER_SENSITIVE,
            },
          },
        ],
        select: {
          ...FILTER_SENSITIVE,
        },
        options: {
          sort: {
            join_time: -1,
          },
        },
      },
    ])

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      groupChatInfo: {
        ...foundChatGroupInfo._doc,
        messages: foundChatGroupInfo.messages.reverse(),
      },
    },
  };
});

export default chatGroupInfoController;