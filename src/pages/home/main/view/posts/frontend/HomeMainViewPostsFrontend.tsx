import * as React from 'react';
// import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
} from 'react-router-dom';
import {
  Icon,
  List,
  Skeleton,
  Empty,
  Avatar,
} from 'antd';

import {
  FrontendWrapper,
  FrontendMain,
} from './style';
import { formatTime } from 'utils/utils';


export interface IHomeMainViewPostsFrontendProps { };
export interface IHomeMainViewPostsFrontendState {
  // ? 加载文章时的loading状态
  isLoading: boolean;

  // ? 文章列表
  // TODO 提取所有的公共接口到types.ts
  articleList: any[]
};


const HomeMainViewPostsFrontend = React.memo(() => {
  const [state] = React.useState<IHomeMainViewPostsFrontendState>({
    isLoading: false,
    articleList: [1],
  });

  function initListData() {
    const listData = [];

    for (let i = 0; i < 23; i++) {
      listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

    return listData;
  }

  function initIcon(options: {
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
              ? <Empty description="没有数据..." />
              : (
                <List
                  itemLayout="vertical"
                  size="default"
                  dataSource={initListData()}
                  footer={
                    <div>
                      <b>ant design</b> footer part
                    </div>
                  }
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      actions={[
                        initIcon({
                          type: 'eye-o',
                          text: '156',
                          key: 'list-vertical-eye-o',
                        }),
                        initIcon({
                          type: 'like-o',
                          text: '108',
                          key: 'list-vertical-like-o',
                        }),
                        initIcon({
                          type: 'info-circle',
                          text: 'duan',
                          key: 'list-vertical-info-circle',
                        }),
                        initIcon({
                          type: 'clock-circle-o',
                          text: String(formatTime(Date.now())),
                          key: 'list-vertical-clock-circle-o',
                        }),
                      ]}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={
                          <p
                            style={{
                              fontSize: '18px',
                            }}
                          >
                            <a href={item.href}>{item.title}</a>
                          </p>
                        }
                        // description={item.description}
                      />
                      {item.content}
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