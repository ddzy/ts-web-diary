import * as Router from 'koa-router';

import {
  Topic,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const topicPinInfoController = new Router();


/**
 * [获取] - 单个话题下的沸点列表
 */
topicPinInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    topicId: string;
    page: number;
    pageSize: number;
  };

  const {
    topicId,
    page,
    pageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询沸点列表
    const foundPinList = await Topic
      .findById(topicId, '_id pins')
      .populate([
        {
          path: 'pins',
          populate: [
            {
              path: 'author_id',
              select: ['_id', 'username', 'useravatar'],
            },
          ],
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
        },
      ])
      .lean();

    // ? 预处理沸点列表
    const processedPinList = await foundPinList.pins.map((v: any) => {
      return {
        ...v,
        content_link: JSON.parse(v.content_link),
        content_image: JSON.parse(v.content_image),
      };
    });


    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        pinList: processedPinList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端错误, 请稍后重试!',
      data: {},
    };
  }
});

export default topicPinInfoController;