import * as React from 'react';
import { Divider } from 'antd';
import {
  highlightBlock,
} from 'highlight.js';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-light.css';

import DetailsMainComment from './comment/DetailsMainComment';
import DetailsMainRich from './rich/DetailsMainRich';
import DetailsMainTitle from './title/DetailsMainTitle';
import DetailsMainRelated from './related/DetailsMainRelated';
import {
  DetailsLeftWrapper,
} from './style';
// import QuillImageBlot from 'components/write/write_edit/QuillImageBlot';
import BaseQuillImageBlot from 'components/widget/base_quill_image_blot/BaseQuillImageBlot';
import {
  ICommonBaseArticleInfo,
} from '../Details.types';

Quill.register(BaseQuillImageBlot, true);


export interface IDetailsMainProps {
  // ? 文章信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 相关文章推荐
    related_article: ICommonBaseArticleInfo[],
    // * 最新文章推荐
    new_article: ICommonBaseArticleInfo[],
    // * 作者创建的文章总数
    created_article_total: number,
    // * 文章的获赞总数
    stared_total: number,

  };

  // ? 当前用户的头像
  useravatar: string;

  // ? 全局loading状态
  globalLoading: boolean;
};


/**
 * 左侧文章信息区域
 */
const DetailsMain = React.memo<IDetailsMainProps>((
  props: IDetailsMainProps,
): JSX.Element => {
  /**
   * [初始化] - 编辑器的内容
   */
  function initArticleContent(): string {
    const { content } = props.articleInfo;
    const parsedArticleContent = content
      ? JSON.parse(content)
      : { ops: [] };

    // ** delta-to-html暂时使用这种方式替代 **
    const tempCont = document
      .createElement("div");
    (new Quill(tempCont))
      .setContents(parsedArticleContent);
    const tempContPres = tempCont
      .querySelectorAll('pre') as NodeListOf<HTMLPreElement>;

    // ** 代码高亮 **
    tempContPres.forEach((element) => {
      const elementTagname = element.localName as string;
      elementTagname === 'pre'
        && highlightBlock(element);
    });

    return tempCont
      .getElementsByClassName("ql-editor")[0].innerHTML;
  }

  return (
    <DetailsLeftWrapper>
      {/* 标题文章信息展示区 */}
      <React.Fragment>
        <DetailsMainTitle
          {...props}
        />
        <Divider />
      </React.Fragment>

      {/* 富文本展示区 */}
      <React.Fragment>
        <DetailsMainRich
          {...props}
          html={initArticleContent()}
        />
        <Divider />
      </React.Fragment>

      {/* 评论区 */}
      <React.Fragment>
        <DetailsMainComment
          useravatar={props.useravatar}
          comments={props.articleInfo.comments}
        />
        <Divider />
      </React.Fragment>

      {/* 相关推荐区 */}
      <React.Fragment>
        <DetailsMainRelated
          {...props}
        />
        <Divider />
      </React.Fragment>
    </DetailsLeftWrapper>
  );
});


export default DetailsMain;