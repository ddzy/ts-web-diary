import * as React from 'react';
import {
  Link,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Icon,
  List,
  Skeleton,
} from 'antd';
import * as InfiniteScroll from 'react-infinite-scroller';

import {
  GlobalStyleSet,
  PostsWrapper,
} from './style';
import { formatTime } from 'utils/utils';
import { PAGE_SIZE } from 'constants/constants';
import {
  IStaticArticleListOptions,
  serviceHandleGetArticleList,
} from 'pages/home/Home.service';


export interface IHomeMainViewPostsProps extends RouteComponentProps<any> {
  articleList: IStaticArticleListOptions[];
  globalLoading: boolean;
};
interface IHomeMainViewPostsState {
  hasMore: boolean;
  loadMoreLoading: boolean;
  articleList: IStaticArticleListOptions[];
};


const HomeMainViewPosts = React.memo<IHomeMainViewPostsProps>((
  props: IHomeMainViewPostsProps,
): JSX.Element => {

  const [state, setState] = React.useState<IHomeMainViewPostsState>({
    hasMore: true,
    loadMoreLoading: false,
    articleList: [],
  });

  React.useEffect(() => {
    setState({
      ...state,
      articleList: props.articleList,
    });
  }, [props.articleList]);

  /**
   * 初始化信息栏
   */
  function initIconText(
    data: { type: string, text: string, id?: string, tip: string }
  ): JSX.Element {
    return (
      <span
        data-type={data.type}
        data-id={data.id}
      >
        <Icon
          type={data.type}
          style={{ marginRight: 8 }}
        />
        <span>{data.text}</span>
      </span>
    );
  }

  /**
   * 处理加载更多
   */
  function handleLoadMore(
    page: number,
  ): void {
    const {
      pathname
    } = props.location;
    const type: string = pathname.replace('/home/', '');

    setState({
      ...state,
      loadMoreLoading: true,
    });

    serviceHandleGetArticleList({
      type,
      page,
      pageSize: PAGE_SIZE,
    }, (data) => {
        const {
          articleList,
          hasMore,
        } = data.info;

        setState({
          ...state,
          hasMore,
          articleList: state.articleList.concat(...articleList),
          loadMoreLoading: false,
        });
    });
  }

  return (
    <React.Fragment>
      <PostsWrapper>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={state.hasMore && !state.loadMoreLoading}
          pageStart={1}
          initialLoad={false}
        >
          <Skeleton
            className="am-view-posts-loadlist"
            loading={props.globalLoading}
            active={true}
          >
            <List
              itemLayout="vertical"
              size="large"
              grid={{ gutter: 16 }}
              dataSource={state.articleList}
              renderItem={(item: IStaticArticleListOptions) => (
                <List.Item
                  key={item.title}
                  style={{
                    marginTop: '1.5625rem',
                    padding: '0 3rem',
                    borderBottom: '1px solid #f7f7f7',
                    cursor: 'pointer',
                  }}
                  actions={[
                    initIconText({
                      type: 'eye-o',
                      text: '150',
                      tip: '浏览量',
                    }),
                    initIconText({
                      type: 'like-o',
                      text: '156',
                      tip: '点赞',
                    }),
                    initIconText({
                      type: 'clock-circle-o',
                      text: String(formatTime(item.create_time)),
                      tip: '发布于',
                    }),
                    initIconText({
                      type: 'info-circle',
                      text: item.author.username,
                      tip: '作者',
                    })
                  ]}
                  extra={
                    <div style={{
                      width: '7.5rem',
                      height: '7.5rem',
                    }}>
                      <img width={120} height={120}
                        alt="extra_logo" src={item.img} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    title={
                      <Link
                        to={`/details/${item._id}`}
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold'
                        }}
                      >{item.title}</Link>
                    }
                    description={
                      <React.Fragment>
                        {item.description}
                        <Link
                          to={`/details/${item._id}`}
                        >...阅读全文⬇</Link>
                      </React.Fragment>
                    }
                  />
                </List.Item>
              )}
            >
              <Skeleton
                className="am-view-posts-loadlist"
                loading={state.loadMoreLoading}
                active={true}
              >
                <div />
              </Skeleton>
            </List>
          </Skeleton>
        </InfiniteScroll>
      </PostsWrapper>

      {/* Global Style Set */}
      <GlobalStyleSet />
    </React.Fragment>
  );

});


export default withRouter(HomeMainViewPosts);