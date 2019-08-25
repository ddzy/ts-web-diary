import * as React from 'react';
// import * as InfiniteScroll from 'react-infinite-scroller';
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
  // ? 加载文章时的loading状态
  isLoading: boolean;

  // ? 文章列表
  articleList: ICommonBaseArticleInfo[],
};


const HomeMainViewPostsFrontend = React.memo((props: IHomeMainViewPostsFrontendProps) => {
  const [state, setState] = React.useState<IHomeMainViewPostsFrontendState>({
    isLoading: false,
    articleList: [],
  });

  React.useEffect(() => {
    _getArticleList();
  }, []);

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
   */
  function _getArticleList() {
    setState({
      ...state,
      isLoading: true,
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
        pageSize: PAGE_SIZE,
        page: 1,
      },
    }).then((res) => {
      const { articleList } = res.data;

      setState({
        ...state,
        isLoading: false,
        articleList,
      });
    });
  }

  return (
    <FrontendWrapper>
      <FrontendMain>
        <Skeleton
          className="am-view-posts-loadlist"
          active={true}
          loading={state.isLoading}
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
                        <b>滚动以加载更多文章↓↓↓</b>
                      </p>
                    </div>
                  }
                  renderItem={item => (
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
                          text: 'duan',
                          key: 'list-vertical-info-circle',
                        }),
                        _initIcon({
                          type: 'clock-circle-o',
                          text: String(formatTime(item.create_time)),
                          key: 'list-vertical-clock-circle-o',
                        }),
                      ]}
                      extra={
                        <img
                          width={272}
                          height={168}
                          alt="cover_img"
                          src={item.cover_img ? item.cover_img : '默认图片'}
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.author.useravatar} />}
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
                    loading={state.isLoading}
                    active={true}
                  >
                    <div />
                  </Skeleton>
                </List>
              )
          }
        </Skeleton>
      </FrontendMain>
    </FrontendWrapper>
  );
});

export default withRouter(HomeMainViewPostsFrontend);