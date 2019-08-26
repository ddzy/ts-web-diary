import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import {
  Icon,
  List,
  Skeleton,
  Empty,
  Avatar,
  notification,
} from 'antd';

import {
  FrontendWrapper,
  FrontendMain,
} from './style';
import { formatTime } from 'utils/utils';
import {
  ICommonBaseArticleInfo,
} from 'pages/home/Home.types';
import { PAGE_SIZE } from 'constants/constants';
import { query } from 'services/request';


export interface IHomeMainViewPostsFrontendProps extends RouteComponentProps {

};
export interface IHomeMainViewPostsFrontendState {
  // ? 首次加载文章时的loading状态
  isFirstLoading: boolean;

  // ? 分页加载时的loading状态
  isLoadMoreLoading: boolean;
  // ? 是否还有更多文章
  hasMoreArticle: boolean;
  // ? 文章列表
  articleList: ICommonBaseArticleInfo[];
};


const HomeMainViewPostsFrontend = React.memo((props: IHomeMainViewPostsFrontendProps) => {
  const [state, setState] = React.useState<IHomeMainViewPostsFrontendState>({
    isFirstLoading: false,
    isLoadMoreLoading: false,
    hasMoreArticle: true,
    articleList: [],
  });

  /**
   * [初始化] - 文章列表项的图标
   * @param options 配置项
   */
  function _initIcon(options: {
    type: string,
    text: string,
    key: string,
  }) {
    return (
      <span key={options.key}>
        <Icon
          type={options.type}
          style={{
            marginRight: 8,
          }}
        />
        {options.text}
      </span>
    );
  }

  /**
   * [获取] - 文章列表(分页)
   * @param page 当前页数
   * @param isFirst 是否首次加载
   */
  function _getArticleList(
    page: number,
  ) {
    setState({
      ...state,
      isFirstLoading: page === 1,
      isLoadMoreLoading: true,
    });

    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '鉴权信息已丢失, 请重新登录!',
      });

      props.history.push('/login');

      return;
    }

    const type = 'frontend';

    query({
      url: '/api/article/info/list',
      jsonp: false,
      method: 'GET',
      data: {
        type,
        userId,
        page,
        pageSize: PAGE_SIZE,
      },
    }).then((res) => {
      const { articleList } = res.data;

      setState({
        ...state,
        isFirstLoading: false,
        isLoadMoreLoading: false,
        hasMoreArticle: articleList.length !== 0,
        articleList: state.articleList.concat(articleList),
      });
    });
  }

  function handleLoadMoreArticleList(page: number) {
    _getArticleList(page);
  }

  return (
    <FrontendWrapper>
      <FrontendMain>
        <InfiniteScroll
          hasMore={state.hasMoreArticle && !state.isLoadMoreLoading}
          // pageStart={1}
          initialLoad={true}
          loadMore={handleLoadMoreArticleList}
        >
          <Skeleton
            className="am-view-posts-loadlist"
            active={true}
            avatar={true}
            paragraph={{
              rows: 4,
            }}
            loading={state.isFirstLoading}
          >
            {
              state.articleList.length === 0
                ? <Empty description="此分类下暂时没有文章..." />
                : (
                  <List
                    itemLayout="vertical"
                    size="default"
                    dataSource={state.articleList}
                    footer={
                      <div>
                        <p style={{
                          textAlign: 'center',
                        }}>
                          <b>
                            {
                              state.hasMoreArticle
                                ? '滚动以加载更多文章↓↓↓'
                                : '没有更多文章了...'
                            }
                          </b>
                        </p>
                      </div>
                    }
                    renderItem={(item) => (
                      <List.Item
                        key={item.title}
                        actions={[
                          _initIcon({
                            type: 'eye-o',
                            text: '156',
                            key: 'list-vertical-eye-o',
                          }),
                          _initIcon({
                            type: 'like-o',
                            text: '108',
                            key: 'list-vertical-like-o',
                          }),
                          _initIcon({
                            type: 'info-circle',
                            text: item.author.username,
                            key: 'list-vertical-info-circle',
                          }),
                          _initIcon({
                            type: 'clock-circle-o',
                            text: String(formatTime(item.create_time)),
                            key: 'list-vertical-clock-circle-o',
                          }),
                        ]}
                        extra={
                          item.cover_img
                            ? (
                              <img
                                width={272}
                                height={168}
                                alt="cover_img"
                                src={item.cover_img}
                              />
                            )
                            : (
                              <div
                                style={{
                                  width: 272,
                                  height: 168,
                                  border: '1px solid #f6f6f6',
                                }}
                              />
                            )
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              icon="user"
                              size="large"
                              src={item.author.useravatar}
                            />
                          }
                          title={
                            <p
                              style={{
                                fontSize: '18px',
                              }}
                            >
                              <Link to={`/details/${item._id}`}>{item.title}</Link>
                            </p>
                          }
                        />
                        {item.description}
                        <Link to={`/details/${item._id}`}>...阅读原文</Link>
                      </List.Item>
                    )}
                  >
                    <Skeleton
                      className="am-view-posts-loadlist"
                      active={true}
                      avatar={true}
                      paragraph={{
                        rows: 5,
                      }}
                      loading={state.isLoadMoreLoading}
                    />
                  </List>
                )
            }
          </Skeleton>
        </InfiniteScroll>
      </FrontendMain>
    </FrontendWrapper>
  );
});

export default withRouter(HomeMainViewPostsFrontend);