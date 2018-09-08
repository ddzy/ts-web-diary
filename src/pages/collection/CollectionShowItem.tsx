import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Row,
  Col,
  Card,
  Icon,
  Divider,
} from 'antd';

import {
  ItemContentBox,
  ContentTip,
  ContentTitle,
  ContentTag,
  ItemExtraBox,
} from './style';
import { formatTime } from '../../utils/utils';



export interface ICollectionShowItemProps {};



const CollectionShowItem: React.SFC<
  ICollectionShowItemProps
> = (
  props: ICollectionShowItemProps,
): JSX.Element => {
  
  return (
    <Row>
          <Card hoverable={true}>
            {/* 文章信息 */}
            <Col span={18} style={{ paddingLeft: '8px' }}>
              <ItemContentBox>
                <ContentTip>                 
                  <Icon type="tag-o" style={{ marginLeft: '5px' }} />
                    趣事
                  <Divider type="vertical" />
                    999
                  <Icon type="like-o" style={{ marginLeft: '5px' }} />
                  <Divider type="vertical" />
                  <span>作者</span>
                  <Divider type="vertical" />
                  发布于:&nbsp;&nbsp;
                  {formatTime(new Date().getTime())}

                </ContentTip>
                <ContentTitle>
                  <Link 
                    // to={`/details/${this.props.id}`} 
                    to={`/details/333`}
                    style={{ 
                      fontWeight: 'bold',
                      fontSize: '20px', 
                      color: 'initial'
                    }}
                  >
                    文章标题
                  </Link>
                </ContentTitle>
                <ContentTag>
                  {/* {this.initArticleTag()} */}
                  文章标签列表
                </ContentTag>
              </ItemContentBox>
            </Col>        
            <Col span={6}>
              <ItemExtraBox>
                <img src="" width="80" height="80" alt="文章说明" />
              </ItemExtraBox>
            </Col>
          </Card>
        </Row>
  );

}


export default CollectionShowItem;