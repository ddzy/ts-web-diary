import * as Router from 'koa-router';

import {
  Pin,
  PinComment,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const pinCommentCreateController = new Router();

pinCommentCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    fromUserId: string;
    pinId: string;
    plainContent: string;
    imageContent: string[];
  };

  const {
    fromUserId,
    pinId,
    plainContent,
    imageContent,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 创建新的沸点评论
    const createdPinComment = await PinComment.create({
      pin_id: pinId,
      from: fromUserId,
      content_plain: plainContent,
      content_image: JSON.stringify(imageContent),
      replys: [],
      create_time: Date.now(),
      update_time: Date.now(),
    });

    // ? 追加至沸点评论列表
    await Pin.findByIdAndUpdate(
      pinId,
      {
        '$push': {
          comments: createdPinComment,
        },
      },
    );

    // ? 查询刚刚创建的评论信息
    const foundCommentInfo = await PinComment
      .findById(createdPinComment._id, { ...FILTER_SENSITIVE })
      .populate([
        {
          path: 'from',
          select: ['_id', 'username', 'useravatar'],
        },
      ])
      .lean();

    // ? 格式化评论的字段
    const processedCommentInfo = await {
      ...foundCommentInfo,
      content_image: JSON.parse(foundCommentInfo.content_image),
    };

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        commentInfo: processedCommentInfo,
      },
    };
  } catch (error) {
    console.log(error);

    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: {},
    };
  }
});

export default pinCommentCreateController;