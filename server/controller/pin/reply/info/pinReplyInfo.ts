import * as Router from 'koa-router';

import {
  PinReply,
  PinComment,
} from '../../../../model/model';


const pinReplyInfoController = new Router();


/**
 * 获取沸点回复列表
 */
pinReplyInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    pinId: string;
    commentId: string;
    lastReplyId: string;
    replyPageSize: number;
  };

  const {
    commentId,
    lastReplyId,
    replyPageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询最后一个回复信息
    // * 根据最后一个回复的create_time, 来进行分页查找
    const foundLastReplyInfo = await PinReply.findById(lastReplyId);

    // ? 查询指定评论信息
    const foundCommentInfo = await PinComment
      .findById(
        commentId,
        'replys',
      )
      .populate([
        {
          path: 'replys',
          populate: [
            {
              path: 'from',
              select: ['username', 'useravatar'],
            },
            {
              path: 'to',
              select: ['username', 'useravatar'],
            },
          ],
          match: {
            create_time: {
              '$lt': foundLastReplyInfo.create_time,
            },
          },
          options: {
            limit: Number(replyPageSize),
            sort: {
              create_time: -1,
            },
          },
        },
      ])
      .lean();

    // ? 处理回复列表
    // * 格式化相关字段
    const processedReplyList = await foundCommentInfo.replys.map((replys: any) => {
      return {
        ...replys,
        content_image: JSON.parse(replys.content_image),
      };
    });

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        replyList: processedReplyList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端异常, 请稍后重试!',
      data: {},
    };
  }
});

export default pinReplyInfoController;