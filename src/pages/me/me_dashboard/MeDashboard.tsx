import * as React from 'react';
import {
  Row,
  Col,
  Card,
  Tabs,
} from 'antd';

import {
  MeArticleContainer,
} from './style';
import MeArticleList from './me_dashboard_article/MeArticleList';
import { isArray } from '../../../utils/utils';
import MyCollectionList from './me_dashboard_collection/MeCollectionList';



export interface IMeDashboardProps {
  my_article_list: any[];
  my_collection_list: any[];

  onArticleDelete: (
    e: React.MouseEvent,
    id: string,
  ) => void;

  onArticleEdit: (
    e: React.MouseEvent,
    id: string,
  ) => void;

  onMyArticleTabChange: (
    type: string,
  ) => void;

  onMyCollectionsTabChange: (
    type: string,
  ) => void;

  onSupTabChange: (         // 外层tab切换 (文章 & 收藏)
    type: string,
  ) => void;

  onCollectionItemClick: (        
    e: React.MouseEvent,
    collectionId: string,
  ) => void;

  onCollectionItemDelete: (
    e: React.MouseEvent,
    collectionId: string,
    callback?: () => void,
  ) => void;
};
interface IMeDashboardState { };


/**
 * 个人文章
 */
class MeDashboard extends React.Component<IMeDashboardProps, IMeDashboardState> {

  public readonly state = {}


  /**
   * 初始化文章列表
   */
  public initArticleList = (
    type: string,
  ): any => {
    return isArray(this.props.my_article_list)
      && this.props.my_article_list.length !== 0
      ? this.props.my_article_list.map((item) => {
        return item.type === type
          ? (
            <MeArticleList
              key={item._id}
              id={item._id}
              {...item}
              onArticleDelete={this.props.onArticleDelete}
              onArticleEdit={this.props.onArticleEdit}
            />
          )
          : null;
        })
      : (
          <div
            style={{
              color: '#999',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            <p>
              暂时没有发表的文章...
            </p>
          </div>
        );
  }


  /**
   * 初始化收藏列表
   */
  public initCollectionList = () => {
    return isArray(this.props.my_collection_list)
      && this.props.my_collection_list.length !== 0
      ? this.props.my_collection_list.map((item) => {
          return (
            <Col span={10} key={item._id}>
              <MyCollectionList
                id={item._id}
                name={item.name}
                create_time={item.create_time}

                onCollectionItemClick={this.props.onCollectionItemClick}

                onCollectionItemDelete={this.props.onCollectionItemDelete}
              />
            </Col>
          );
        })
      : (
          <div
            style={{
              lineHeight: '80px',
              textAlign: 'center',
              fontSize: '22px',
              color: '#999',
              fontWeight: 'bold',
            }}
          >
            <p>暂时没有收藏夹...</p>
          </div>
        );
  }


  public render(): JSX.Element {
    return (
      <MeArticleContainer>
        <Row>
          <Col>
            <Card>
              <Tabs
                type="card"
                tabBarGutter={10}
                onChange={this.props.onSupTabChange}
              >
                <Tabs.TabPane
                  tab="文章"
                  key="文章"
                  className="card-parent"
                >
                  {/* 个人文章分类 */}
                  <Tabs
                    type="line"
                    tabBarGutter={5}
                    size="small"
                    tabPosition='left'
                    onChange={this.props.onMyArticleTabChange}
                  >
                    <Tabs.TabPane
                      tab="随笔"
                      key="随笔"
                      className="card-child-one"
                    >
                      {this.initArticleList('随笔')}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab="译文"
                      key="译文"
                      className="card-child-two"
                    >
                      {this.initArticleList('译文')}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab="教程"
                      key="教程"
                      className="card-child-three"
                    >
                      {this.initArticleList('教程')}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab="感悟"
                      key="感悟"
                      className="card-child-four"
                    >
                      {this.initArticleList('感悟')}
                    </Tabs.TabPane>
                  </Tabs>

                </Tabs.TabPane>

                <Tabs.TabPane tab="收藏" key="收藏">
                  <Row>
                    {this.initCollectionList()}
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="开发中" key="开发中">
                  开发中
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </MeArticleContainer>
    );
  }

}


export default MeDashboard as React.ComponentClass<any>;