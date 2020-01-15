import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  Divider,
  Empty,
  Skeleton,
} from 'antd';

import {
  DisplayWrapper,
  DisplayMain,
  DisplayMainList,
  DisplayMainItem,
} from './style';
import { IBaseCommonArticleInfo } from 'pages/user/User.types';
import UserMainContentPostDisplayItem from './item/UserMainContentPostDisplayItem';


export interface IUserMainContentPostDisplayProps {
  // ? 文章列表
  articleList: IBaseCommonArticleInfo[];
  // ? 首次加载文章列表时的loading
  isFirstLoading: boolean;
  // ? 分页相关: 加载更多文章时的loading
  isLoadMoreLoading: boolean;
  // ? 分页相关: 是否还有更多文章
  hasMoreArticle: boolean;

  onLoadMoreArticle: (
    page: number,
  ) => void;
};
export interface IUserMainContentPostDisplayState { };


const UserMainContentPostDisplay = React.memo((props: IUserMainContentPostDisplayProps) => {
  /**
   * [初始化] - 主人的文章列表
   */
  function _initArticleList() {
    const { articleList } = props;

    return articleList.length === 0
      ? (
        <Empty description="暂时没有更多文章~" />
      )
      : articleList.map((v) => {
        return (
          <React.Fragment key={v._id}>
            <DisplayMainItem>
              <UserMainContentPostDisplayItem
                articleInfo={v}
              />
            </DisplayMainItem>

            <Divider type="horizontal" />
          </React.Fragment>
        )
      })
  }

  return (
    <DisplayWrapper>
      <DisplayMain>
        <InfiniteScroll
          hasMore={props.hasMoreArticle && !props.isLoadMoreLoading}
          pageStart={2}
          initialLoad={false}
          loadMore={props.onLoadMoreArticle}
        >
          <DisplayMainList>
            <Skeleton
              active={true}
              loading={props.isFirstLoading}
            >
              <Skeleton
                active={true}
                loading={props.isLoadMoreLoading}
              >
                {_initArticleList()}
              </Skeleton>
            </Skeleton>
          </DisplayMainList>
        </InfiniteScroll>
      </DisplayMain>
    </DisplayWrapper>
  );
});


export default UserMainContentPostDisplay;