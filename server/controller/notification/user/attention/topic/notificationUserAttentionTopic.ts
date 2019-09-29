import * as Router from 'koa-router';
import * as IO from 'socket.io';


const notificationUserAttentionTopicController = new Router();


/**
 * [socket处理] - 关注话题(topic)的通知相关
 */
export function handleNotificationUserAttentionTopic(
  socket: IO.Socket,
  io: IO.Namespace
) {
  return;
}

export default notificationUserAttentionTopicController;