import * as Router from 'koa-router';


const actionFriendController = new Router();


/**
 * [处理] - 添加好友
 */
actionFriendController.post('/create', async (ctx) => {
  interface IRequestParams {
    userId: string;
    authorId: string;
  };

  const {
    userId,
    authorId,
  } = ctx.request.body as IRequestParams;

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      friendInfo: {
        userId,
        authorId,
      },
    },
  };
});

export default actionFriendController;