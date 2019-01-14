import * as Router from 'koa-router';

const actionStarReplyController: Router = new Router();


/**
 * 回复点赞
 */
actionStarReplyController.get('/', async (ctx) => {
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


export default actionStarReplyController;