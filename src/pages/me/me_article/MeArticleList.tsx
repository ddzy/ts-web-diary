import * as React from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Divider, 
  Icon, 
  Tag, 
  Popconfirm,
} from 'antd';
import { Link } from 'react-router-dom';

import {
  MeArticleListWrapper,
  MeArticleWatchBox,
  MeArticleWatchCount,
  MeArticleWatchTip,
  MeArticleContentBox,
  ContentTip,
  ContentTitle,
  ContentTag,
  MeArticleControlBox,
  MeArticleControl
} from '../style';
import { MERGED_ARTICLE_TAG } from '../../../constants/constants';
import { formatTime } from '../../../utils/utils';


export interface IMeArticleListProps {
  id: string;
  create_time: string;
  update_time: string;
  type: string;
  title: string;
  tag: string;
  star: number;
  watch: number;

  onArticleDelete: (
    e: React.MouseEvent,
    id: string,
  ) => void;
  onArticleEdit: (
    e: React.MouseEvent,
    id: string,
  ) => void;
};
interface IMeArticleListState {};


/**
 * 个人列表 - item
 */
class MeArticleList extends React.Component<IMeArticleListProps, IMeArticleListState> {

  public readonly state = {}


  //// 初始化文章标签
  public initArticleTag = (): JSX.Element[] => {
    return this.props.tag
      .split(',')
      .map((item) => {
        return (
          <Tag 
            key={item}
            style={{ marginLeft: '3px !important' }} 
            color={MERGED_ARTICLE_TAG[item]}
          >{item}</Tag>
        );
      });
  }


  public render(): JSX.Element {
    return (
      <MeArticleListWrapper className="card-hover">
        <Row>
          <Card hoverable={true}>

            {/* 浏览量 */}
            <Col span={2} style={{ borderRight: '1px solid #ccc' }}>
              <MeArticleWatchBox>
                <MeArticleWatchCount>
                  {this.props.watch}
                </MeArticleWatchCount>
                <MeArticleWatchTip>
                  阅读量
                </MeArticleWatchTip>
              </MeArticleWatchBox>
            </Col>
  
            {/* 文章信息 */}
            <Col span={18} style={{ paddingLeft: '8px' }}>
              <MeArticleContentBox>
                <ContentTip>                 
                  <Icon type="tag-o" style={{ marginLeft: '5px' }} />
                  {this.props.type}
                  <Divider type="vertical" />
                  {this.props.star}
                  <Icon type="like-o" style={{ marginLeft: '5px' }} />
                  <Divider type="vertical" />
                  发布于:&nbsp;&nbsp;
                  {formatTime(this.props.create_time)}
                  <Divider type="vertical" />
                  最近更新:&nbsp;&nbsp;
                  {formatTime(this.props.update_time)}

                </ContentTip>
                <ContentTitle>
                  <Link 
                    to={`/details/${this.props.id}`} 
                    style={{ 
                      fontWeight: 'bold',
                      fontSize: '20px', 
                      color: 'initial'
                    }}
                  >
                    {this.props.title}
                  </Link>
                </ContentTitle>
                <ContentTag>
                  {this.initArticleTag()}
                </ContentTag>
              </MeArticleContentBox>
            </Col>
  
            {/* 文章管理 */}
            <Col span={4} style={{ height: '100%' }}>
              <MeArticleControlBox>
                <MeArticleControl>
                  <Popconfirm
                    title="要跳到编辑页面, 继续吗?"
                    cancelText="算了"
                    okText="确定"
                    onConfirm={
                      (e: React.MouseEvent) => this.props.onArticleEdit(
                        e,
                        this.props.id,
                      )
                    }
                  >
                    <Button 
                      htmlType="button"
                      type="ghost"
                      size="small"
                    >编辑</Button>
                  </Popconfirm>
                  <Popconfirm 
                    title="确定要删除文章吗?"
                    cancelText="算了"
                    okText="确定"
                    onConfirm={
                      (e: React.MouseEvent) => this.props.onArticleDelete(
                        e,
                        this.props.id,
                      )
                    }
                  >
                    <Button
                      htmlType="button"
                      type="danger"
                      size="small"
                    >删除</Button>
                  </Popconfirm>
                </MeArticleControl>
              </MeArticleControlBox>
            </Col>
          </Card>
        </Row>
      </MeArticleListWrapper>
    );
  }

}


export default MeArticleList;



