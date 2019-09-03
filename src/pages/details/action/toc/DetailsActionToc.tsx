import * as React from 'react';
import * as Tocbot from 'tocbot';
import {
  Skeleton,
} from 'antd';

import {
  TocWrapper,
  TocMain,
  TocMainTitle,
  TocMainTitleInner,
  TocMainContent,
  TocMainContentInner,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';


export interface IDetailsActionTocProps {
  // ? Details页全局loading
  globalLoading: boolean;

  // ? 文章详情的基本信息
  articleInfo: ICommonBaseArticleInfo;
};


const DetailsActionToc = React.memo((props: IDetailsActionTocProps) => {
  React.useEffect(() => {
    _initArticleTOC();
  }, [props.articleInfo]);

  /**
   * [初始化] - 文章目录列表
   */
  function _initArticleTOC() {
    let oArticleDOM = document.querySelector('#article-detail-content');

    if (oArticleDOM) {
      oArticleDOM = oArticleDOM as HTMLDivElement;

      Tocbot.init({
        tocSelector: '#article-detail-action-toc',
        contentSelector: '#article-detail-content',
        headingSelector: 'h1, h2, h3, h4',
        hasInnerContainers: false,
      });
    }
  }

  return (
    <TocWrapper>
      <TocMain>
        {/* 标题区 */}
        <TocMainTitle>
          <TocMainTitleInner>
            文章目录
          </TocMainTitleInner>
        </TocMainTitle>

        {/* 目录内容区 */}
        <Skeleton
          loading={props.globalLoading}
          active={true}
          paragraph={{
            rows: 5,
          }}
        >
          <TocMainContent>
            <TocMainContentInner id="article-detail-action-toc" />
          </TocMainContent>
        </Skeleton>
      </TocMain>
    </TocWrapper>
  );
});

export default DetailsActionToc;