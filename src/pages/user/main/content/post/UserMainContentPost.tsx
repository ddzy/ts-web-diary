import * as React from 'react';
import {
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  PostContainer,
  PostMain,
} from './style';
import { query } from 'services/request';
import {
  IBaseCommonArticleInfo,
} from 'pages/user/User.types';
import { PAGE_SIZE } from 'constants/constants';
import UserMainContentPostDisplay from './display/UserMainContentPostDisplay';


export interface IUserMainContentPostProps extends RouteComponentProps<{
  id: string,
}> { };
export interface IUserMainContentPostState {
  // ? 文章列表
  articleList: IBaseCommonArticleInfo[];
  // ? 首次加载文章列表时的loading
  isFirstLoading: boolean;
  // ? 分页相关: 加载更多文章时的loading
  isLoadMoreLoading: boolean;
  // ? 分页相关: 是否还有更多文章
  hasMoreArticle: boolean;
};


const UserMainContentPost = React.memo<IUserMainContentPostProps>((
  props: IUserMainContentPostProps,
): JSX.Element => {
  const [state, setState] = React.useState<IUserMainContentPostState>({
    articleList: [],
    hasMoreArticle: true,
    isFirstLoading: false,
    isLoadMoreLoading: false,
  });

  React.useEffect(() => {
    _getArticleListFromServer(1, true);
  }, [props.match.url]);


  /**
   * [获取] - 后台获取当前主人的文章列表
   * @param page 当前页数
   * @param initialLoad 是否首次加载
   */
  function _getArticleListFromServer(
    page: number,
    initialLoad: boolean,
  ) {
    setState({
      ...state,
      isFirstLoading: initialLoad,
      isLoadMoreLoading: initialLoad,
    });

    const ownerId = props.match.params.id;
    const pageSize = PAGE_SIZE;

    query({
      method: 'POST',
      url: '/api/user/info/partial/article/list',
      jsonp: false,
      data: {
        ownerId,
        page,
        pageSize,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const resArticleList = resData.articleList;

        const newArticleList = initialLoad
          ? resArticleList
          : state.articleList.concat(resArticleList);

        setState({
          ...state,
          articleList: newArticleList,
          isFirstLoading: false,
          isLoadMoreLoading: false,
          hasMoreArticle: resArticleList.length !== 0,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 文章列表加载更多
   * @param page 当前页数
   */
  function _handleLoadMoreArticleList(
    page: number,
  ) {
    _getArticleListFromServer(page, false);
  }

  return (
    <PostContainer>
      <PostMain>
        {/* 文章列表区块 */}
        <UserMainContentPostDisplay
          articleList={state.articleList}
          isFirstLoading={state.isFirstLoading}
          isLoadMoreLoading={state.isLoadMoreLoading}
          hasMoreArticle={state.hasMoreArticle}
          onLoadMoreArticle={_handleLoadMoreArticleList}
        />
      </PostMain>
    </PostContainer>
  );

});


export default withRouter(UserMainContentPost);