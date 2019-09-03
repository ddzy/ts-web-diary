import * as React from 'react';
import RcViewer from '@hanyk/rc-viewer';
import {
  highlightBlock,
} from 'highlight.js';
import Quill from 'quill';
import {
  Skeleton,
} from 'antd';

import {
  LeftContentContainer,
  LeftContent,
  LeftContentMain,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';
import BaseQuillImageBlot from 'components/widget/base_quill_image_blot/BaseQuillImageBlot';

// ? 注册自定义的react-quill图片上传
Quill.register(BaseQuillImageBlot, true);


export interface IDetailsMainRichProps {
  // ? 全局loading状态
  globalLoading: boolean;
  // ? 文章有关信息
  articleInfo: ICommonBaseArticleInfo,
};


const DetailsMainRich = React.memo((props: IDetailsMainRichProps) => {
  /**
   * [初始化] - 编辑器的内容
   */
  function _initArticleContent(): string {
    const {
      content,
    } = props.articleInfo;
    const parsedArticleContent = content
      ? JSON.parse(content)
      : { ops: [] };

    // delta-to-html暂时使用这种方式替代 **
    const tempCont = document
      .createElement("div");
    (new Quill(tempCont))
      .setContents(parsedArticleContent);

    // 去除所有的空段落
    const tempContParagraph = tempCont
      .querySelectorAll('p') as NodeListOf<HTMLParagraphElement>;
    tempContParagraph.forEach((element) => {
      if (!element.textContent) {
        const parent = element.parentElement;

        if (parent) {
          parent.removeChild(element);
        }
      }
    });

    // 代码高亮
    const tempContPres = tempCont
      .querySelectorAll('pre') as NodeListOf<HTMLPreElement>;
    tempContPres.forEach((element) => {
      const elementTagname = element.localName as string;
      elementTagname === 'pre'
        && highlightBlock(element);
    });

    return tempCont
      .getElementsByClassName("ql-editor")[0].innerHTML;
  }

  return (
    <LeftContentContainer>
      <LeftContentMain>
        <Skeleton
          active={true}
          paragraph={{
            rows: 12,
          }}
          loading={props.globalLoading}
        >
          {/* 内容区 */}
          <RcViewer
            options={{
              url: 'data-src',
              button: false,
            }}
          >
            <LeftContent
              id="article-detail-content"
              dangerouslySetInnerHTML={{
                __html: _initArticleContent(),
              }}
            />
          </RcViewer>
        </Skeleton>
      </LeftContentMain>
    </LeftContentContainer>
  );
});

export default DetailsMainRich;