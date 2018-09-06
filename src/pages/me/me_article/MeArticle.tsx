import * as React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { connect } from 'react-redux';

import {
  MeArticleContainer,
} from '../style';
import MeArticleList from './MeArticleList';



export interface IMeArticleProps {
  my_article_list: any[];

  onArticleDelete: (
    e: React.MouseEvent,
    id: string,
  ) => void;

  onArticleEdit: (
    e: React.MouseEvent,
    id: string,
  ) => void;
};
interface IMeArticleState {};


/**
 * 个人文章
 */
class MeArticle extends React.Component<IMeArticleProps, IMeArticleState> {

  public readonly state = {}

  public initArticleList = (): JSX.Element[] | [] => {
    return this.props.my_article_list
      ? this.props.my_article_list.map((item) => {
          return (
            <MeArticleList
              key={item._id}
              id={item._id} 
              {...item}
              onArticleDelete={this.props.onArticleDelete}
              onArticleEdit={this.props.onArticleEdit}
            />
          );
        })
      : [];
  }


  public render(): JSX.Element {
    return (
      <MeArticleContainer>
        <Row>
          <Col>
            <Card>
              <Tabs type="card" tabBarGutter={10}>
                <Tabs.TabPane 
                  tab="文章" 
                  key="文章"
                  className="card-parent"
                >
                  {/* {this.initArticleList()} */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="收藏" key="收藏">
                  收藏
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




export default connect(

)(MeArticle) as React.ComponentClass<any>;