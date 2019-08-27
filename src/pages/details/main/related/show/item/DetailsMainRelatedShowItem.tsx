import * as React from 'react';
import {
  Link,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Row,
  Col,
  Tag,
  Card,
  Divider,
} from 'antd';

import {
  ItemContentBox,
  ItemExtraBox,
  ExtraImageShow,
  ContentTag,
  ContentTip,
  ContentTipUserNameText,
  ContentTipTimeText,
  ContentTipTypeText,
  ContentTitle,
} from './style';
import {
  MERGED_ARTICLE_TAG,
  ARTICLE_TYPE_EN_TO_CN,
} from 'constants/constants';
import { formatTime } from 'utils/utils';
import { ICommonBaseArticleInfo } from 'pages/details/Details.types';


export interface IDetailsMainRelatedShowItemProps extends ICommonBaseArticleInfo, RouteComponentProps {

};


const DetailsMainRelatedShowItem = React.memo<IDetailsMainRelatedShowItemProps>((
  props: IDetailsMainRelatedShowItemProps,
): JSX.Element => {
  /**
   * [初始化] - 文章标签
   */
  function _initArticleTag(
    tag: string,
  ): JSX.Element[] {
    return tag
      .split(',')
      .map((item) => {
        return (
          <Tag
            key={item}
            color={MERGED_ARTICLE_TAG[item]}
          >
            {item}
          </Tag>
        );
      });
  }

  return (
    <Row>
      <Card hoverable={true} bordered={false}>
        <Col span={18}>
          <ItemContentBox>
            <ContentTip>
              <ContentTipUserNameText>
                {props.author.username}
              </ContentTipUserNameText>
              <Divider type="vertical" />
              <ContentTipTimeText>
                {formatTime(props.create_time)}
              </ContentTipTimeText>
              <Divider type="vertical" />
              <ContentTipTypeText>
                {ARTICLE_TYPE_EN_TO_CN[props.type]}
              </ContentTipTypeText>
            </ContentTip>
            <ContentTitle>
              <Link
                to={`/details/${props._id}`}
                style={{
                  fontSize: '1rem',
                  color: 'initial'
                }}
              >
                {props.title}
              </Link>
            </ContentTitle>
            <ContentTag>
              {_initArticleTag(props.tag)}
            </ContentTag>
          </ItemContentBox>
        </Col>
        <Col span={6}>
          <ItemExtraBox>
            <ExtraImageShow
              extraBgImg={props.cover_img}
            />
          </ItemExtraBox>
        </Col>
      </Card>
    </Row>
  );
});


export default withRouter(DetailsMainRelatedShowItem);