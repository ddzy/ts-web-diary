// import * as Router from 'koa-router';

// import {
//   Collections,
//   changeId,
//   User,
// } from '../../../model/model';

// const collectionCreateController: Router = new Router();


// /**
//  * 创建收藏夹
//  */
// collectionCreateController.get('/', async (ctx) => {

//   const { userid, collection } = ctx.request.query;

//   // ** 收藏夹是否存在
//   const isCollectionNameExist = await Collections
//     .findOne({
//       name: collection,
//       create_time: new Date().toLocaleString(),
//     })

//   if (!isCollectionNameExist) {
//     const setToCollections = await Collections
//       .create({
//         name: collection,
//       })

//     // ** 同步至 User
//     await User
//       .findByIdAndUpdate(
//         changeId(userid),
//         {
//           '$push': { collections: setToCollections },
//         },
//         {
//           new: true,
//           select: {
//             '_id': '_id',
//             collections: 'collections',
//           },
//         },
//       )
//       .populate({
//         path: 'collections',
//       })
//       .lean();

//     ctx.body = {
//       code: 0,
//       message: 'Success!',
//       info: {
//         collectionInfo: {
//           name: setToCollections.name,
//           _id: setToCollections._id,
//         },
//       },
//     };
//   } else {
//     ctx.body = {
//       code: 1,
//       message: '该收藏夹已经存在!',
//     };
//   }
// });


// export default collectionCreateController;