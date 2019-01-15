import * as React from 'react';
import { Divider } from 'antd';
import {
  highlightBlock,
} from 'highlight.js';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-light.css';

import DetailsMainComment from './details_main_comment/DetailsMainComment';
import DetailsMainRich from './details_main_rich/DetailsMainRich';
import DetailsMainTitle from './details_main_title/DetailsMainTitle';
import DetailsMainRelated from './details_main_related/DetailsMainRelated';
import {
  DetailsLeftWrapper,
} from './style';
import {
  IStaticArticleInfoCommentsOptions,
  IStaticArticleInfoRelatedArticlesOptions,
} from '../Details.service';
// import QuillImageBlot from 'components/write/write_edit/QuillImageBlot';
import BaseQuillImageBlot from 'components/widget/base_quill_image_blot/BaseQuillImageBlot';

Quill.register(BaseQuillImageBlot, true);


export interface IDetailsMainProps {
  author: string;
  articleContent: string;
  articleTitle: string;
  create_time: number;
  mode: string;
  tag: string;
  type: string;
  comments: IStaticArticleInfoCommentsOptions[];
  img: string;
  useravatar: string;
  relatedArticles: IStaticArticleInfoRelatedArticlesOptions[];

  globalLoading: boolean;
};


/**
 * 左侧文章信息区域
 */
const DetailsMain = React.memo<IDetailsMainProps>((
  props: IDetailsMainProps,
): JSX.Element => {
  // ** 初始化富文本editor内容 **
  function initArticleContent(): string {
    const { articleContent } = props;
    const parsedArticleContent = articleContent
      ? JSON.parse(articleContent)
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
          comments={props.comments}
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