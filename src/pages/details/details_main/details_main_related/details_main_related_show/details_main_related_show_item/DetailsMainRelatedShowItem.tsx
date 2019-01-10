import * as React from 'react';
import {
  Link,
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
  IStaticArticleInfoRelatedArticlesOptions,
} from '../../../../Details.service';
import {
  MERGED_ARTICLE_TAG,
  ARTICLE_TYPE_EN_TO_CN,
} from 'src/constants/constants';
import { formatTime } from 'src/utils/utils';


export interface IDetailsMainRelatedShowItemProps extends IStaticArticleInfoRelatedArticlesOptions {
};


const DetailsMainRelatedShowItem = React.memo<IDetailsMainRelatedShowItemProps>((
  props: IDetailsMainRelatedShowItemProps,
): JSX.Element => {

  /**
   * 初始化列表 标签数据
   */
  function handleInitItemTag(
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
              {handleInitItemTag(props.tag)}
            </ContentTag>
          </ItemContentBox>
        </Col>
        <Col span={6}>
          <ItemExtraBox>
            <ExtraImageShow
              extraBgImg={props.img}
            />
          </ItemExtraBox>
        </Col>
      </Card>
    </Row>
  );

});


export default DetailsMainRelatedShowItem;