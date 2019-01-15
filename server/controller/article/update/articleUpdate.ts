import * as Router from 'koa-router';
import {
  Posts,
  changeId,
} from '../../../model/model';

const articleupdateController: Router = new Router();

// ** Define Interface **
interface IRouteInsertPrdeltaOps {
  userid: string;
  articleid: string;
  editTitle: string;
  editContent: string;
  editContentWithDelta: any;
  extraContent: any;
  article_title_image: string;
};


/**
 * 更新文章
 */
articleupdateController.post('/', async (ctx) => {

  const body = ctx.request.body as IRouteInsertPrdeltaOps;

  const result = await Posts
    .findByIdAndUpdate(
      changeId(body.articleid),
      {
        title: body.editTitle,
        content: body.editContent,
        mode: body.extraContent.article_mode.value,
        type: body.extraContent.article_type.value,
        tag: body.extraContent.article_tag.value,
        img: body.article_title_image,
        update_time: new Date().getTime(),
      },
      { new: true }
    )

  ctx.body = {
    code: 0,
    message: 'Success!',
    articleInfo: result,
  };

});


export default articleupdateController;