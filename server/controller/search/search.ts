import * as Router from 'koa-router';

import {
  Posts,
} from '../../model/model';

const searchController: Router = new Router();


/**
 * 文章页 处理搜索文章
 */
searchController.get('/search/input/list', async (ctx) => {
  const {
    keyword,
  } = await ctx.request.query;

  // ** 查找文章 **
  const result = await Posts
    .find({
      title: { $regex: keyword },
    })
    .sort({ create_time: -1 })
    .limit(6)
    .select(['_id', 'title'])

  ctx.body = {
    code: 0,
    mesage: 'Success!',
    data: result,
  };
});

export default searchController;