import * as Router from 'koa-router';
import * as UUID from 'uuid';

import {
  getFullRandom,
  filterTabAndEnterCharacter,
} from '../../../utils/utils';
import {
  Posts,
  User,
  ITrackCreateArticleProps,
} from '../../../model/model';

const articleCreateController: Router = new Router();


/**
 * [创建] - 新的文章
 */
articleCreateController.post('/', async (ctx) => {
  interface IRequestParams {
    userId: string;
    trackType: string;
    title: string;
    content: {
      ops: any[],
    };
    cover_img: string;
    mode: string;
    type: string;
    tag: string[];
  };

  const {
    userId,
    trackType,
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

  // ? 创建新的文章
  const createdArticle = await Posts.create({
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

  // ? 创建新的个人足迹
  const createdTrack: ITrackCreateArticleProps = {
    _id: UUID.v1(),
    type: trackType,
    article: String(createdArticle._id),
    create_time: Date.now(),
    update_time: Date.now(),
  };

  // ? 更新当前用户的相关信息
  await User.findByIdAndUpdate(userId, {
    '$push': {
      articles: createdArticle,
      tracks: createdTrack,
    },
  });

  ctx.body = {
    code: 0,
    message: 'Success!',
    data: {},
  };
});


export default articleCreateController;