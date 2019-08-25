import * as Router from 'koa-router';

import {
  getFullRandom,
  filterTabAndEnterCharacter,
} from '../../../utils/utils';
import {
  Posts,
  User,
} from '../../../model/model';

const articleCreateController: Router = new Router();


/**
 * [创建] - 新的文章
 */
articleCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string,
    title: string,
    content: {
      ops: any[],
    },
    cover_img: string,
    mode: string,
    type: string,
    tag: string[],
  };

  const {
    userId,
    title,
    content,
    cover_img,
    mode,
    type,
    tag,
  } = ctx.request.body as IRequestParams;

  // ? 提取文章描述 - description
  const contentDelta = content.ops;
  const minDescriptionLength = 90;
  const maxDescriptionLength = 120;
  const countDescriptionLength = getFullRandom(minDescriptionLength, maxDescriptionLength);
  let description: string = '';

  for (const v of contentDelta) {
    if (description.length >= countDescriptionLength) {
      break;
    }

    if (typeof v.insert === 'string') {
      if (v.insert.length >= minDescriptionLength) {
        description = v.insert.slice(0, countDescriptionLength);

        break;
      }
      else {
        description += v.insert;

        continue;
      }
    } else {
      continue;
    }
  }

  // ? 存储文章
  const savedArticle = await Posts.create({
    author: userId,
    comments: [],
    create_time: Date.now(),
    update_time: Date.now(),
    cover_img,
    mode,
    type,
    title,
    description: filterTabAndEnterCharacter(description, ''),
    content: JSON.stringify(content),
    tag: '' + tag,
    watched_user: [],
    collected_user: [],
  });

  // ? 同步更新User
  await User.findByIdAndUpdate(userId, {
    '$push': {
      articles: savedArticle,
    },
  });

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {},
  };
});


export default articleCreateController;