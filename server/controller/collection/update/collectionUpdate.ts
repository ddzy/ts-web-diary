// import * as Router from 'koa-router';

// import {
//   Collections,
//   changeId,
// } from '../../../model/model';

// const collectionControllerController: Router = new Router();


// /**
//  * 添加至收藏夹
//  */
// collectionControllerController.post('/', async (ctx) => {
//   const {
//     articleId,
//     collectionId,
//   }: any = ctx.request.body;

//   const saveToCollection = await Collections
//     .findByIdAndUpdate(
//       changeId(collectionId),
//       {
//         '$addToSet': { articles: articleId },
//       },
//       { new: true, select: 'name', },
//     )
//     .lean();

//   ctx.body = {
//     code: 0,
//     message: 'Success!',
//     info: {
//       collectionInfo: saveToCollection,
//     },
//   };
// });


// export default collectionControllerController;