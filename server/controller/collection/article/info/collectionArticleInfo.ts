import * as Router from 'koa-router';
import { ObjectID } from 'bson';

import {
  User,
  CollectionArticle,
} from '../../../../model/model';
import { FILTER_SENSITIVE } from '../../../../constants/constants';


const collectionArticleInfoController = new Router();


/**
 * @description 分页获取收藏夹列表
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/14
 */
collectionArticleInfoController.post('/list', async (ctx) => {
  interface IRequestParams {
    userId: string;
    articleId: string;
    page: number;
    pageSize: number;
  };

  const {
    userId,
    articleId,
    page,
    pageSize,
  } = ctx.request.body as IRequestParams;

  try {
    // ? 查询用户信息
    const foundUserInfo = await User
      .findById(userId, 'collections.article')
      .populate([{
        path: 'collections.article',
        select: {
          ...FILTER_SENSITIVE
        },
        options: {
          limit: pageSize,
          skip: (page - 1) * pageSize,
          lean: true,
        },
      }])
      .lean();

    // ? 获取文章收藏夹列表
    const foundCollectionList = await foundUserInfo.collections.article;

    // ? 预处理收藏夹列表, 查看每个收藏夹对于该文章的收藏状态
    const processedCollectionList = await Promise.all(foundCollectionList.map(async (collection: any) => {
      const articleList = collection.articles;
      const isCollect = articleList.some((v: ObjectID) => {
        return v.equals(articleId);
      });

      return {
        ...collection,
        is_collect: isCollect,
      };
    }));

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        collectionList: processedCollectionList,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -1,
      message: '后端出错, 请稍后重试!',
      data: error,
    };
  }
});


/**
 * @description 获取单个收藏夹详情
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/13
 */
collectionArticleInfoController.get('/single', async (ctx) => {
  interface IRequestParams {
    // 收藏夹 id
    collectionId: string;
  };

  const { collectionId } = ctx.request.query as IRequestParams;

  try {
    // TODO: 获取收藏夹详情
    const foundCollectionInfo = await CollectionArticle
      .findById(collectionId, {
      ...FILTER_SENSITIVE,
      })
      .populate([
        {
          path: 'author',
          select: {
            ...FILTER_SENSITIVE
          },
        },
        {
          path: 'followers',
          select: {
            ...FILTER_SENSITIVE
          },
        },
        {
          path: 'watchers',
          select: {
            ...FILTER_SENSITIVE
          },
        },
        {
          path: 'articles',
          select: {
            ...FILTER_SENSITIVE
          },
          options: {
            sort: {
              create_time: -1,
            },
          },
          populate: [
            {
              path: 'author',
              select: {
                ...FILTER_SENSITIVE
              },
            },
          ],
        },
      ])

    ctx.body = {
      code: 0,
      message: 'Success!',
      data: {
        collectionInfo: foundCollectionInfo,
      },
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: -1,
      message: '后端发生错误, 请稍后重试!',
      data: {},
    };
  }
});

export default collectionArticleInfoController