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
  handleStatus,
} from './controller/status/create/statusCreate';
import {
  handleSingleChat,
} from './controller/chat/single/create/chatSingleCreate';
import {
  handleGroupChat,
} from './controller/chat/group/create/chatGroupCreate';
import {
  handleNotificationUserFriend,
} from './controller/notification/user/friend/notificationUserFriend';
import {
  handleNotificationUserStarArticle,
} from './controller/notification/user/star/article/notificationUserStarArticle';
import {
  handleNotificationUserStarArticleComment,
} from './controller/notification/user/star/article/comment/notificationUserStarArticleComment';


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
      /^\/api\/login$/,
      /^\/api\/register$/,
      /^\/socket\.io/,
      /^\/api\/auth\/github/,
    ],
  }))
  .use(koaStatic(
    path.join(__dirname, './static'),
    { maxage: 0 },
  ))
  .use(router.routes())
  .use(router.allowedMethods())


// ? 处理状态相关Websocket
const statusIO = io.of('/status');
statusIO.on('connection', (socket) => {
  handleStatus(socket, statusIO);
})

// ? 处理用户加好友通知的相关Websocket
const notificationUserFriendIO = io.of('/notification/user/friend');
notificationUserFriendIO.on('connection', (socket) => {
  handleNotificationUserFriend(socket, notificationUserFriendIO);
});

// ? 处理用户点赞文章的相关Websocket
const notificationUserStarArticleIO = io.of('/notification/user/star/article');
notificationUserStarArticleIO.on('connection', (socket) => {
  handleNotificationUserStarArticle(socket, notificationUserStarArticleIO);
});

// ? 处理用户点赞文章下的评论相关Websocket
const notificationUserStarArticleCommentIO = io.of('/notification/user/star/article/comment');
notificationUserStarArticleCommentIO.on('connection', (socket) => {
  handleNotificationUserStarArticleComment(socket, notificationUserStarArticleCommentIO);
});

// ? 处理单聊的相关Websocket
const singleChatIO = io.of('/chat/single');
singleChatIO.on('connection', (socket) => {
  handleSingleChat(socket, singleChatIO);
});

// ? 处理群聊的相关Websocket
const groupChatIO = io.of('/chat/group');
groupChatIO.on('connection', (socket) => {
  handleGroupChat(socket, groupChatIO);
});


server.listen(8888);
