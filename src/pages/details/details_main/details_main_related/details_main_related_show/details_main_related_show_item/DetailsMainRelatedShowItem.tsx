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
  ContentTag,
  ContentTip,
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
              <span>{props.author.username}</span>
              <Divider type="vertical" />
              {formatTime(props.create_time)}
              <Divider type="vertical" />
              {ARTICLE_TYPE_EN_TO_CN[props.type]}
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
            <img
              src={props.img}
              width="80"
              height="80"
              alt="文章说明图片"
            />
          </ItemExtraBox>
        </Col>
      </Card>
    </Row>
  );

});


export default DetailsMainRelatedShowItem;