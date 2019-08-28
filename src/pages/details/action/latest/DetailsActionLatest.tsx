import * as React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Skeleton,
} from 'antd';

import {
  LatestWrapper,
  LatestMain,
  LatestMainArticleBox,
  LatestMainArticleTip,
  LatestMainArticleList,
  LatestMainArticleListItem,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';


export interface IDetailsActionLatestProps {
  // ? 全局loading
  globalLoading: boolean;

  // ? 文章相关信息
  articleInfo: ICommonBaseArticleInfo & {
    // * 最新文章
    new_article: ICommonBaseArticleInfo[],
    // * 当前文章作者发表的文章总数
    created_article_total: number,
  },
};

const DetailsActionLatest = React.memo((props: IDetailsActionLatestProps) => {
  /**
   * [初始化] - 最新文章列表
   */
  function _initLatestArticle() {
    const newArticle = props.articleInfo.new_article;

    return newArticle.length === 0
      ? []
      : newArticle.map((item: any) => {
        return (
          <LatestMainArticleListItem
            key={item._id}
          >
            <Link to={`/details/${item._id}`}>{item.title}</Link>
          </LatestMainArticleListItem>
        );
      });
  }

  return (
    <LatestWrapper>
      <LatestMain>
        <Skeleton
          active={true}
          loading={props.globalLoading}
          paragraph={{
            rows: 6,
          }}
        >
          <LatestMainArticleBox>
            <LatestMainArticleTip>
              最新文章
            </LatestMainArticleTip>
            <LatestMainArticleList>
              {_initLatestArticle()}
            </LatestMainArticleList>
          </LatestMainArticleBox>
        </Skeleton>
      </LatestMain>
    </LatestWrapper>
  );
});

export default DetailsActionLatest;