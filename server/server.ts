import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaJwt from 'koa-jwt';
import * as koaStatic from 'koa-static';
import * as koaCors from 'koa-cors';
import * as path from 'path';
import * as IO from 'socket.io';
import * as Http from 'http';

import {
  SECRET_FOR_TOKEN,
} from './constants/constants';
import router from './router';
import {
  handleChat,
} from './controller/chat/create/chatCreate';
import {
  handleStatus,
} from './controller/status/create/statusCreate';
import {
  handleStarArticle,
} from './controller/action/star/article/actionStarArticle';


const app: Koa = new Koa();
const server: Http.Server = Http.createServer(app.callback());
const io: IO.Server = IO(server);


app
  .use(koaCors({
    // maxAge: 60 * 60 * 24,
    maxAge: 60 * 60 * 24 * 4,
  }))
  .use(bodyParser())
  .use(async (ctx, next) => {
    return next().catch((err) => {
      if(err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: -1,
          isAuth: false,
          message: '没有权限访问!'
        };
      }else {
        throw err;
      }
    });
  })
  .use(koaJwt({ secret: SECRET_FOR_TOKEN }).unless({
    path: [
      /^\/api\/login/,
      /^\/api\/register/,
      /^\/api\/article/,
      /^\/api\/details/,
      /^\/images/,
      /^\/api\/details\/mimicat\.ico/,
      /^\/api\/edit\/mimicat\.ico/,
      /^\/api\/collection\/mimicat\.ico/,
    ],
  }))
  .use(koaStatic(
    path.join(__dirname, './static'),
    { maxage: 0 },
  ))
  .use(router.routes())
  .use(router.allowedMethods())


// ? 处理聊天相关Websocket
const chatIO = io.of('/chat');
chatIO.on('connection', (socket) => {
  handleChat(socket, chatIO);
});

// ? 处理状态相关Websocket
const statusIO = io.of('/status');
statusIO.on('connection', (socket) => {
  handleStatus(socket, statusIO);
})

// ? 处理文章点赞相关Websocket
const starArticleIO = io.of('/star/article');
starArticleIO.on('connection', (socket) => {
  handleStarArticle(socket, starArticleIO);
});

server.listen(8888);
