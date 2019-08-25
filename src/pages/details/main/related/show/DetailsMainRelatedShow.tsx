import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  Skeleton,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ShowWrapper,
  ShowMain,
} from './style';
import {
  serviceHandleGetMoreRelatedArticles,
} from 'pages/details/Details.service';
import {
  PAGE_SIZE,
} from 'constants/constants';
import DetailsMainRelatedShowItem from './item/DetailsMainRelatedShowItem';


export interface IDetailsMainRelatedShowProps extends RouteComponentProps<{
  id: string,
}> {
  articleInfo: {
    related_article: any[];
  },
};
interface IDetailsMainRelatedShowState {
  relatedArticles: any[];
  loading: boolean;
  hasMore: boolean;
};


const DetailsMainRelatedShow = React.memo((
  props: IDetailsMainRelatedShowProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState<IDetailsMainRelatedShowState>({
    relatedArticles: [],
    loading: false,
    hasMore: true,
  });

  React.useEffect(() => {
    setState({
      ...state,
      relatedArticles: props.articleInfo.related_article,
    });
  }, [props.articleInfo.related_article]);

  function handleInitArticleList(): JSX.Element[] {
    const { relatedArticles } = state;
    const { length } = relatedArticles;

    return length === 0
      ? []
      : relatedArticles.map((v, i) => {
        return (
          <DetailsMainRelatedShowItem
            key={i}
            {...v}
          />
        );
      });
  }

  /**
   * 处理加载更多
   */
  function handleLoadMore(page: number) {
    const { id } = props.match.params;

    setState({
      ...state,
      loading: true,
    });

    serviceHandleGetMoreRelatedArticles(
      { articleId: id, pageSize: PAGE_SIZE, page },
      (data) => {
        const {
          articles,
          hasMore,
        } = data.info.relatedArticlesInfo;

        setState({
          ...state,
          loading: false,
          hasMore,
          relatedArticles: state.relatedArticles.concat(...articles),
        });
      },
    );
  }

  return (
    <ShowWrapper>
      <ShowMain>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={state.hasMore && !state.loading}
          pageStart={1}
          initialLoad={false}
        >
          {handleInitArticleList()}
        </InfiniteScroll>
        <Skeleton
          loading={state.loading}
          active={true}
        >
          <div />
        </Skeleton>
      </ShowMain>
    </ShowWrapper>
  );

});


export default withRouter(DetailsMainRelatedShow);