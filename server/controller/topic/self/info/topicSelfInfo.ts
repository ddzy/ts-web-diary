import * as Router from 'koa-router';

import {
  Topic,
} from '../../../../model/model';
import {
  FILTER_SENSITIVE,
} from '../../../../constants/constants';


const topicSelfInfoController = new Router();


/**
 * [获取] - 话题列表
 * @todo 分页获取
 */
topicSelfInfoController.get('/list', async (ctx) => {
  try {
    // ? 查询话题列表
    const foundTopicList = await Topic.find({}, {...FILTER_SENSITIVE});

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        topicList: foundTopicList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: {},
    };
  }
});


export default topicSelfInfoController;