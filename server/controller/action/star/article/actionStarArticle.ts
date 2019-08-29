import * as Router from 'koa-router';

import redis from '../../../../redis/redis';
import {
  generateStarArticleKey,
} from '../../../../redis/keys/redisKeys';


const actionStarArticleController: Router = new Router();


/**
 * [处理] - 文章点赞
 */
actionStarArticleController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    isStar: boolean;
  };

  const {
    userId,
    articleId,
    isStar,
  } = ctx.request.body as unknown as IRequestParams;

  // redis处理文章点赞
  const redisKey = generateStarArticleKey(articleId);

  isStar
    ? await redis.zadd(redisKey, Date.now(), userId)
    : await redis.zrem(redisKey, userId);

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {
      starInfo: {
        userId,
        articleId,
        isStar,
      },
    },
  };
});

// /**
//  * [socket处理] - 文章点赞
//  */
// export function handleStarArticle(
//   socket: IO.Socket,
//   io: IO.Namespace,
// ) {
//   socket.on('sendStarArticle', async (
//     starInfo: {
//       userId: string,
//       articleId: string,
//       isStar: string,
//     },
//   ) => {
//     // redis处理文章点赞
//     const redisKey = generateStarArticleKey(starInfo.articleId);

//     starInfo.isStar
//       ? await redis.zadd(redisKey, Date.now(), starInfo.userId)
//       : await redis.zrem(redisKey, starInfo.userId);

//     io.emit('receiveStarArticle', {
//       code: 0,
//       message: 'Success!',
//       data: {
//         starInfo,
//       },
//     });
//   });
// }



// actionStarArticleController.get('/', async (ctx) => {

//   const {
//     articleid,
//     liked,
//     userid,
//   } = ctx.request.query;

//   const getArticle = await Posts
//     .findById(changeId(articleid));

//   await Posts
//     .findByIdAndUpdate(
//       changeId(articleid),
//       {
//         star: liked === 'true'
//           ? getArticle.star + 1
//           : getArticle.star - 1,
//         stared: liked === 'true'
//           ? getArticle.stared.concat(userid)
//           : getArticle.stared.filter((item: any) => {
//             return item !== userid;
//           }),
//       },
//       { new: true },
//     )
//     .lean();

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       starInfo: {
//         isLiked: liked === 'true',
//       },
//     },
//   };

// });


export default actionStarArticleController;