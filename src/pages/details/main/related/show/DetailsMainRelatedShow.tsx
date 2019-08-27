import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ShowWrapper,
  ShowMain,
} from './style';
import {
  ICommonBaseArticleInfo,
} from 'pages/details/Details.types';
import DetailsMainRelatedShowItem from './item/DetailsMainRelatedShowItem';


export interface IDetailsMainRelatedShowProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 文章相关信息
  articleInfo: {
    // * 推荐的文章
    related_article: ICommonBaseArticleInfo[];
  },
};
export interface IDetailsMainRelatedShowState {
};


const DetailsMainRelatedShow = React.memo((
  props: IDetailsMainRelatedShowProps,
): JSX.Element => {
  /**
   * [初始化] - 推荐文章列表
   */
  function _initArticleList(): JSX.Element[] {
    const { related_article } = props.articleInfo;
    const { length } = related_article;

    return length === 0
      ? []
      : related_article.map((v, i) => {
        return (
          <DetailsMainRelatedShowItem
            key={i}
            {...v}
          />
        );
      });
  }

  return (
    <ShowWrapper>
      <ShowMain>
        {_initArticleList()}
      </ShowMain>
    </ShowWrapper>
  );

});


export default withRouter(DetailsMainRelatedShow);