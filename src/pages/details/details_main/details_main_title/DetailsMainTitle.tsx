import * as React from 'react';
import {
  Divider,
  Tag,
} from 'antd';

import {
  LeftTitleContainer,
  LeftInfoBox,
  LeftTitle,
  LeftTitleBox,
  LeftInfoList,
  LeftInfoListItem,
  LeftImgBox,
  LeftImgInner,
} from './style';
import { MERGED_ARTICLE_TAG } from 'src/constants/constants';
import { formatTime } from 'src/utils/utils';


export interface IDetailsMainTitleProps {
  articleTitle: string;
  mode: string;
  author: string;
  type: string;
  tag: string;
  create_time: number;
  img: string;
};


const DetailsMainTitle: React.SFC<IDetailsMainTitleProps> = (
  props
): JSX.Element => {

  const initArticleTag = (): JSX.Element[] => {
    return props.tag
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

  return (
    <LeftTitleContainer>
      {/* 标题 */}
      <LeftTitleBox>
        <LeftTitle>
          {props.articleTitle}
        </LeftTitle>
      </LeftTitleBox>

      {/* 信息栏 */}
      <LeftInfoBox>
        <LeftInfoList>
          <LeftInfoListItem>
            {props.mode}
          </LeftInfoListItem>
          <Divider type="vertical" />
          <LeftInfoListItem>
            {props.author}
          </LeftInfoListItem>
          <Divider type="vertical" />
          <LeftInfoListItem>
            {props.type}
          </LeftInfoListItem>
          <Divider type="vertical" />
          <LeftInfoListItem>
            {initArticleTag()}
          </LeftInfoListItem>
          <Divider type="vertical" />
          <LeftInfoListItem>
            {formatTime(props.create_time)}
          </LeftInfoListItem>
        </LeftInfoList>
      </LeftInfoBox>
      <LeftImgBox>
        <LeftImgInner
          imgUrl={props.img}
        />
      </LeftImgBox>
    </LeftTitleContainer>
  );
}

export default DetailsMainTitle;