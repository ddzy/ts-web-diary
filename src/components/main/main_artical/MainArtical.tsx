import * as React from 'react';
import { Tabs, List, Icon, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import { 
  ContentArtical,
} from './style';
import { formatTime } from '../../../utils/utils';
import BaseLoading from 'src/components/widget/BaseLoading/BaseLoading';


export interface IMainArticalProps {
  showTab: boolean;
  articleList?: any[];
  hasMore?: boolean;

  onChangeStar: (
    e: React.MouseEvent,
  ) => void;
  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: () => void,
  ) => void;      // 加载更多
};
interface IMainArticalState {
  currentPage: number;      // 当前页数
  loading: boolean;
};


class MainArtical extends React.Component<IMainArticalProps, IMainArticalState> {

  public readonly state = {
    currentPage: 1,
    loading: false,
  }


  //// 初始化列表数据
  public initListData = () => {
    const articleList = this.props.articleList || [];
    
    return articleList.length
      ? articleList
          .filter((item) => {
            return item && item;
          })
          .map((item) => {
            return {
              id: item._id || item.uniquekey,
              url: item.url,
              title: item.title,
              author_name: item.author_name || item.author.username,
              pic_url: item.thumbnail_pic_s || item.img || '',
              create_time: item.date || formatTime(item.create_time),
              star: item.star || 0,
              watch: item.watch || 0,
            };
          })

      : [];
  }


  //// 初始化信息栏
  public initIconText = (
    data: { type: string, text: string, id?: string, tip: string }
  ) => {

    return (
        <span
          style={{ color: '#999' }}
          data-type={data.type}
          data-id={data.id}
          onClick={this.handleChangeStar}
        >
          <Icon
            type={data.type}
            style={{ marginRight: 8 }}
          />
          <span>{data.text}</span>
        </span>
    );
  }


  //// 处理点赞
  public handleChangeStar: React.MouseEventHandler = (e: React.MouseEvent): void => {
    this.props.onChangeStar(e);
  }



  //// 加载更多
  public handleLoadMore = () => {
    this.setState((prevState) => {
      return {
        loading: true,
        currentPage: prevState.currentPage + 1,
      };
    }, () => {
      this.props.onLoadMore(
        this.state.currentPage,
        5,
        () => {
          !this.props.hasMore
            && message.info('没有更多文章了!');
          this.setState({
            loading: false,
          });
        }
      );
    });  
  }


  public render(): JSX.Element {

    const loadMoreButton = (
          !this.state.loading
            && (
            <Button
              block
              style={{ marginBottom: '15px' }}
              htmlType="button"
              type="primary"
              onClick={this.handleLoadMore}
            >加载更多</Button>
            )
        );

    return (
      <ContentArtical>
        {
          this.props.showTab
            ? (
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="最新文章" key="1">
                    <List
                      itemLayout="vertical"
                      size="default"
                      bordered={false}
                      split={true}
                      grid={{ gutter: 16 }}
                      dataSource={this.initListData()}
                      loadMore={loadMoreButton}
                      renderItem={(item: any) => (
                        <List.Item
                          key={item.id}
                          style={{
                            marginTop: '25px',
                            padding: '0 20px'
                          }}
                          actions={[
                            this.initIconText({
                              type: 'eye-o',
                              text: `${item.watch}`,
                              tip: '浏览量',
                            }),
                            this.initIconText({
                              type: 'like-o',
                              text: `${item.star}`,
                              id: `${item.id}`,
                              tip: '点赞',
                            }),
                            this.initIconText({
                              type: 'user',
                              text: `${item.author_name}`,
                              tip: '作者',
                            }),
                            this.initIconText({
                              type: 'clock-circle-o',
                              text: `${item.create_time}`,
                              tip: '发布于',
                            })
                          ]}
                          extra={
                            item.pic_url && (
                              <img
                                src={item.pic_url}
                                alt="extra_logo"
                                style={{
                                  width: '120px',
                                  height: '120px',
                                }}
                              />
                            )
                          }
                        >
                          <List.Item.Meta
                            title={
                              <Link
                                to={`/details/${item.id}`}
                                style={{
                                  fontSize: '20px',
                                  fontWeight: 'bold'
                                }}
                              >{item.title}</Link>
                            }
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="开发中" key="2">功能开发中</Tabs.TabPane>
                  <Tabs.TabPane tab="开发中" key="3">功能开发中</Tabs.TabPane>
                </Tabs>
              )
            : (
              <List
                itemLayout="vertical"
                size="large"
                bordered={true}
                grid={{ gutter: 16 }}
                dataSource={this.initListData()}
                renderItem={(item: any) => (
                  <List.Item
                    key={item.title}
                    style={{ marginTop: '25px', padding: '0 20px' }}
                    actions={[
                      this.initIconText({ 
                        type: 'eye-o', 
                        text: '150', 
                        tip: '浏览量',
                      }), 
                      this.initIconText({ 
                        type: 'like-o', 
                        text: '156', 
                        tip: '点赞',
                      }),
                      this.initIconText({ 
                        type: 'clock-circle-o', 
                        text: item.create_time, 
                        tip: '发布于',
                      }),
                      this.initIconText({ 
                        type: 'info-circle', 
                        text: item.author_name, 
                        tip: '作者',
                      })
                    ]}
                    extra={
                      <div style={{ width: '120px', height: '120px' }}>
                        <img width={120} height={120} 
                        alt="extra_logo" src={item.pic_url} />
                      </div>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <a
                          href={item.url}
                          style={{ 
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }}
                        >{item.title}</a>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            )
        }
        <BaseLoading visible={this.state.loading}/>
      </ContentArtical>
    );
  }

}


export default MainArtical;
