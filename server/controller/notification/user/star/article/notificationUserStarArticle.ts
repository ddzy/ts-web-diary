import * as Router from 'koa-router';
import * as IO from 'socket.io';


const notificationUserStarArticleController = new Router();


/**
 * [socket处理] - 用户点赞文章相关
 */
export function handleNotificationUserStarArticle(
  socket: IO.Socket,
  io: IO.Namespace
) {
  return;
}

export default notificationUserStarArticleController;