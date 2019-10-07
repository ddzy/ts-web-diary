// import * as Router from 'koa-router';

// import {
//   Collections,
//   changeId,
//   User,
// } from '../../../model/model';

// const collectionDeleteController: Router = new Router();


// /**
//  * 删除单个收藏夹里面的单个文章
//  */
// collectionDeleteController.get('/article', async (ctx) => {

//   const {
//     articleId,
//     collectionId,
//   } = await ctx.request.query;

//   await Collections
//     .findByIdAndUpdate(
//       changeId(collectionId),
//       {
//         '$pull': { articles: articleId },
//       },
//       { new: true },
//     )
//     .lean();

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       collectionInfo: {
//         collectionId,
//         articleId,
//       },
//     },
//   };

// });

// /**
//  * 删除单个收藏夹
//  */
// collectionDeleteController.get('/single', async (ctx) => {

//   const { userid, collectionId } = await ctx.request.query;

//   await User
//     .findByIdAndUpdate(
//       changeId(userid),
//       {
//         '$pull': { collections: collectionId },
//       },
//       { new: true },
//     )
//     .lean();

//   await Collections
//     .findByIdAndRemove(
//       changeId(collectionId),
//     );

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     collectionId,
//   };

// });


// export default collectionDeleteController;