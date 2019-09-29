import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
  RouteComponentProps,
  NavLink,
} from 'react-router-dom';
import {
  Icon,
  List,
  Skeleton,
  Empty,
  Avatar,
  notification,
  message,
} from 'antd';

import {
  PostsWrapper,
  PostsMain,
} from './style';
import { formatTime } from 'utils/utils';
import {
  ICommonBaseArticleInfo,
} from 'pages/home/Home.types';
import {
  PAGE_SIZE,
  NOTIFICATION_TYPE,
} from 'constants/constants';
import { query } from 'services/request';
import { notificationUserStarArticleIOClient } from 'services/websocket';


export interface IHomeMainViewPostsProps extends RouteComponentProps<{
  type: string,
}> {
};
export interface IHomeMainViewPostsState {
  // ? 用户点赞文章的通知相关Websocket
  notificationUserStarArticleIOClient: SocketIOClient.Socket;

  // ? 首次加载文章时的loading状态
  isFirstLoading: boolean;

  // ? 分页加载时的loading状态
  isLoadMoreLoading: boolean;
  // ? 是否还有更多文章
  hasMoreArticle: boolean;
  // ? 文章列表
  articleList: Array<Required<ICommonBaseArticleInfo & {
    // * 赞过文章的用户列表
    stared_user: string[],
  }>>;

  // ? 储存每个文章的点赞状态
  starHashMap: Map<string, boolean>;
};


const HomeMainViewPosts = React.memo<IHomeMainViewPostsProps>((
  props: IHomeMainViewPostsProps,
): JSX.Element => {

  const [state, setState] = React.useState<IHomeMainViewPostsState>({
    notificationUserStarArticleIOClient,
    isFirstLoading: false,
    isLoadMoreLoading: false,
    hasMoreArticle: true,
    starHashMap: new Map(),
    articleList: [],
  });

  React.useEffect(() => {
    _getArticleListFromServer(1, true);
  }, [props.location.pathname]);


  /**
   * [初始化] - 文章列表项的图标
   * @param options 配置项
   */
  function _initIcon(options: {
    type: string,
    text: string,
    key: string,
    articleId: string,
  }) {
    const isStar = state.starHashMap.get(options.articleId);

    return (
      <span key={options.key}>
        <Icon
          type={options.type}
          style={{
            marginRight: 8,
          }}
          theme={
            options.type === 'like-o'
              ? isStar
                ? 'filled'
                : 'outlined'
              : 'outlined'
          }
          onClick={() => {
            handleIconClick(options.type, options.articleId);
          }}
        />
        {options.text}
      </span>
    );
  }

  /**
   * [后台] - 获取不同分类下的文章列表
   * @param page 当前页数
   * @param initialLoad 标识是首屏加载 or 加载更多
   */
  function _getArticleListFromServer(
    page: number,
    initialLoad: boolean,
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

    const articleType = props.match.params.type;

    query({
      url: '/api/article/info/list',
      jsonp: false,
      method: 'GET',
      data: {
        type: articleType,
        userId,
        page,
        pageSize: PAGE_SIZE,
      },
    }).then((res) => {
      const { articleList } = res.data;
      const newStarHashMap = new Map<string, boolean>();

      // 初始化文章hash表的点赞状态
      const newArticleList = initialLoad
        ? articleList
        : state.articleList.concat(articleList);

      newArticleList.forEach((v: Required<ICommonBaseArticleInfo & {
        stared_user: string[],
      }>) => {
        const isStar = v.stared_user.indexOf(userId) !== -1;

        newStarHashMap.set(v._id, isStar);
      });

      setState({
        ...state,
        isFirstLoading: false,
        isLoadMoreLoading: false,
        hasMoreArticle: articleList.length !== 0,
        articleList: newArticleList,
        starHashMap: newStarHashMap,
      });
    });
  }

  /**
   * [处理] - 文章列表分页获取
   * @param page 当前页数
   */
  function handleLoadMoreArticleList(
    page: number,
  ) {
    _getArticleListFromServer(page, false);
  }

  /**
   * [处理] - 图标点击
   * @param type 图标类型
   * @param articleId 文章唯一id
   */
  function handleIconClick(
    type: string,
    articleId: string,
  ) {
    if (type === 'like-o') {
      handleStarArticle(articleId);
    }
  }

  /**
   * [处理] - 文章点赞
   * @param articleId 文章唯一id
   */
  function handleStarArticle(
    articleId: string,
  ) {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '鉴权信息已丢失, 请重新登录!',
      });

      props.history.push('/login');

      return;
    }

    // 更新文章的对应用户的点赞状态
    const oldIsStar = state.starHashMap.get(articleId);
    state.starHashMap.set(articleId, !oldIsStar);
    const newIsStar = state.starHashMap.get(articleId);

    // 更新文章的点赞用户列表
    const newArticleList = state.articleList.map((v) => {
      if (v._id === articleId) {
        let newStaredUserList: string[] = [];

        if (newIsStar) {
          newStaredUserList = [...v.stared_user, userId];
        } else {
          newStaredUserList = v.stared_user.filter((vv) => vv !== userId);
        }

        return {
          ...v,
          stared_user: newStaredUserList,
        };
      }

      return v;
    });

    setState({
      ...state,
      starHashMap: state.starHashMap,
      articleList: newArticleList,
    });

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/action/star/article',
      data: {
        userId,
        articleId,
        isStar: newIsStar,
      },
    }).then((res) => {
      // 点赞文章之后的处理逻辑
      const { code } = res;
      const { starInfo } = res.data;

      if (code === 0) {
        const notificationType = NOTIFICATION_TYPE.user.star.article.self;
        const article = state.articleList.find((v) => v._id === starInfo.articleId);
        const authorId = article ? article.author._id : '';
        const authorName = article ? article.author.username : '';
        const isCurrentUserArticle = userId === authorId;

        if (starInfo.isStar) {
          const content = (
            <span>
              你赞了
                <b
                style={{
                  color: '#1da57a',
                }}
              >
                {
                  isCurrentUserArticle ? '自己' : authorName
                }
              </b>
              的文章!
          </span>
          );

          // 点赞文章之后, 实时通知文章作者
          state.notificationUserStarArticleIOClient.emit('sendUserStarArticle', {
            notificationType,
            userId,
            authorId,
            articleId,
          });

          message.info(content);
        } else {
          message.info('你取消了赞!');
        }
      }
    });
  }

  return (
    <PostsWrapper>
      <PostsMain>
        <InfiniteScroll
          hasMore={state.hasMoreArticle && !state.isLoadMoreLoading}
          pageStart={2}
          initialLoad={false}
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
                            key: 'list-vertical-eye-o',
                            type: 'eye-o',
                            text: '' + item.watched_user.length,
                            articleId: item._id,
                          }),
                          _initIcon({
                            key: 'list-vertical-like-o',
                            type: 'like-o',
                            text: '' + item.stared_user.length,
                            articleId: item._id,
                          }),
                          _initIcon({
                            type: 'info-circle',
                            text: item.author.username,
                            key: 'list-vertical-info-circle',
                            articleId: item._id,
                          }),
                          _initIcon({
                            type: 'clock-circle-o',
                            text: String(formatTime(item.create_time)),
                            key: 'list-vertical-clock-circle-o',
                            articleId: item._id,
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
                              <NavLink
                                to={`/details/${item._id}`}
                                activeStyle={{
                                  color: '#1DA57A',
                                }}
                              >{item.title}</NavLink>
                            </p>
                          }
                        />
                        {item.description}
                        <NavLink to={`/details/${item._id}`}>...阅读原文</NavLink>
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
      </PostsMain>
    </PostsWrapper>
  );
});


export default withRouter(HomeMainViewPosts);