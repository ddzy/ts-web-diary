import * as IOServer from 'socket.io';
import * as Router from 'koa-router';


const chatGroupController = new Router();


/**
 * [群聊] - 处理有关群聊的websocket
 * @param socket 客户端连接
 * @param io 服务端端口
 */
export function handleGroupChat(
  socket: IOServer.Socket,
  io: IOServer.Namespace,
): void {
  return;
}


export default chatGroupController;