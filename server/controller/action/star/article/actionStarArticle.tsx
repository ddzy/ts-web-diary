import * as Router from 'koa-router';

import {
  Posts,
  changeId,
} from '../../../../model/model';

const actionStarArticleController: Router = new Router();


/**
 * 文章点赞
 */
actionStarArticleController.get('/', async (ctx) => {

  const {
    articleid,
    liked,
    userid,
  } = ctx.request.query;

  const getArticle = await Posts
    .findById(changeId(articleid));

  await Posts
    .findByIdAndUpdate(
      changeId(articleid),
      {
        star: liked === 'true'
          ? getArticle.star + 1
          : getArticle.star - 1,
        stared: liked === 'true'
          ? getArticle.stared.concat(userid)
          : getArticle.stared.filter((item: any) => {
            return item !== userid;
          }),
      },
      { new: true },
    )
    .lean();

  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      starInfo: {
        isLiked: liked === 'true',
      },
    },
  };

});


export default actionStarArticleController;