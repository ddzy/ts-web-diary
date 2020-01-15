import * as Router from 'koa-router';

import {
  User,
} from '../../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../../constants/constants';


const userInfoPartialAttentionController = new Router();


/**
 * @description 根据类型, 获取关注的用户列表
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/14
 */
userInfoPartialAttentionController.get('/list_by_type', async (ctx) => {
  interface IRequestParams {
    ownerId: string;
    attentionType: string;
  };

  const {
    ownerId,
    attentionType,
  } = ctx.request.query as IRequestParams;

  try {
    // ? 用户的关注列表
    let foundUserAttentionList: any[] = [];

    // ? 查询用户信息
    const foundUserInfo = await User
      .findById(ownerId, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'attention.users',
          select: {
            ...FILTER_SENSITIVE,
          },
        },
        {
          path: 'attention.topics',
          select: {
            ...FILTER_SENSITIVE,
          },
        },
      ]);

    if (foundUserInfo) {
      foundUserAttentionList = await foundUserInfo.attention[`${attentionType}s`];
    }

    // ? 给每项添加 is_attention 字段, 标识是否关注, 便于前端做处理
    const processedUserAttentionList = foundUserAttentionList.map((v) => {
      return {
        ...v._doc,
        is_attention: true,
      };
    });

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        attentionList: processedUserAttentionList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: error,
    };
  }
});

export default userInfoPartialAttentionController;