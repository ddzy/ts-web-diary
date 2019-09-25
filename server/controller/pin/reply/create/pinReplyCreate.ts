import * as Router from 'koa-router';

import {
  PinReply,
  PinComment,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const pinReplyCreateController = new Router();


/**
 * 创建新的沸点回复
 */
pinReplyCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    pinId: string;
    fromUserId: string;
    toUserId: string;
    commentId: string;
    plainContent: string;
    imageContent: string[];
  };

  const {
    pinId,
    fromUserId,
    toUserId,
    commentId,
    plainContent,
    imageContent,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 创建新的沸点回复
    const createdPinReply = await PinReply.create({
      pin_id: pinId,
      comment_id: commentId,
      from: fromUserId,
      to: toUserId,
      content_plain: plainContent,
      content_image: JSON.stringify(imageContent),
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 追加至评论列表
    await PinComment.findByIdAndUpdate(
      commentId,
      {
        '$push': {
          replys: createdPinReply,
        },
      },
    );

    // ? 查询刚刚创建好的回复信息
    const foundPinReplyInfo = await PinReply
      .findById(createdPinReply._id, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'from',
          select: ['_id', 'username', 'useravatar'],
        },
        {
          path: 'to',
          select: ['_id', 'username', 'useravatar'],
        },
      ])
      .lean();

    // ? 格式化回复的字段内容
    const processedPinReplyInfo = await {
      ...foundPinReplyInfo,
      content_image: JSON.parse(foundPinReplyInfo.content_image),
    };

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        replyInfo: processedPinReplyInfo,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出现错误, 请稍后重试!',
      data: {},
    };
  }
});

export default pinReplyCreateController;