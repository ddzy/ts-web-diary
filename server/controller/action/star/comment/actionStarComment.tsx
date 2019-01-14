import * as Router from 'koa-router';

const actionStarCommentController: Router = new Router();


/**
 * 评论点赞
 */
actionStarCommentController.get('/', async (ctx) => {
  ctx.body = {
    code: 0,
    message: 'Success!',
    info: {
      starInfo: {
        isLiked: true,
      },
    },
  };
});


export default actionStarCommentController;