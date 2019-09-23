import * as Router from 'koa-router';

import {
  Pin,
  PinComment,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const pinCommentInfoController = new Router();


pinCommentInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    pinId: string;
    lastCommentId: string;
    commentPageSize: number;
    replyPageSize: number;
  };

  const {
    pinId,
    lastCommentId,
    commentPageSize,
    replyPageSize,
  } = ctx.request.body as IRequestParams;

  try {
    let foundCommentList: any[] = [];

    // ? 根据是否分页, 来获取评论列表
    if (!lastCommentId) {
      const foundPinInfo = await Pin
      .findById(pinId, '_id comments')
      .populate([
        {
          path: 'comments',
          select: {
            ...FILTER_SENSITIVE,
          },
          populate: [
            {
              path: 'from',
              select: ['_id', 'username', 'useravatar'],
            },
            {
              path: 'replys',
              populate: [
                {
                  path: 'from',
                  select: ['_id', 'username', 'useravatar'],
                },
                {
                  path: 'to',
                  select: ['_id', 'username', 'useravatar'],
                },
              ],
              options: {
                sort: {
                  create_time: -1,
                },
                limit: Number(replyPageSize),
              },
            },
          ],
          options: {
            limit: Number(commentPageSize),
            sort: {
              create_time: -1,
            },
          },
        },
      ])
        .lean();

      foundCommentList = await foundPinInfo.comments;
    } else {
      // ? 查询最后一个评论信息
      // * 根据最后一个评论的create_time, 来进行分页查找
      const foundLastCommentInfo = await PinComment.findById(lastCommentId);

      // ? 查询指定沸点下的评论信息
      const foundPinInfo = await Pin
        .findById(pinId, '_id comments')
        .populate([
          {
            path: 'comments',
            select: {
              ...FILTER_SENSITIVE,
            },
            populate: [
              {
                path: 'from',
                select: ['_id', 'username', 'useravatar'],
              },
              {
                path: 'replys',
                populate: [
                  {
                    path: 'from',
                    select: ['_id', 'username', 'useravatar'],
                  },
                  {
                    path: 'to',
                    select: ['_id', 'username', 'useravatar'],
                  },
                ],
                options: {
                  sort: {
                    create_time: -1,
                  },
                  limit: Number(replyPageSize),
                },
              },
            ],
            match: {
              create_time: {
                '$lt': foundLastCommentInfo.create_time,
              },
            },
            options: {
              limit: Number(commentPageSize),
              sort: {
                create_time: -1,
              },
            },
          },
        ])
        .lean();

      foundCommentList = await foundPinInfo.comments;
    }

    // ? 格式化相关字段
    // ? 处理评论列表
    // * 格式化相关字段
    const processedCommentList = await foundCommentList.map((comment: any) => {
      return {
        ...comment,
        content_image: JSON.parse(comment.content_image),
        replys: comment.replys.map((reply: any) => {
          return {
            ...reply,
            content_image: JSON.parse(reply.content_image),
          };
        }),
      };
    });

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        commentList: processedCommentList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出现异常, 请稍后重试!',
      data: {},
    };
  }
});

export default pinCommentInfoController;