import * as Router from 'koa-router';
import * as IO from 'socket.io';


const notificationUserStarArticleCommentController = new Router();


/**
 * [socket处理] - 用户点赞文章下的评论和回复相关
 */
export function handleNotificationUserStarArticleComment(
  socket: IO.Socket,
  io: IO.Namespace
) {
  return;
}

export default notificationUserStarArticleCommentController;