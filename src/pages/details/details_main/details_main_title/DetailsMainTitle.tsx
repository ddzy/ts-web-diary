import * as React from 'react';
import {
  Divider,
  Tag,
  Skeleton,
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
import {
  ARTICLE_TYPE_PICKER,
  MERGED_ARTICLE_TAG,
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
} from 'src/constants/constants';
import { formatTime } from 'src/utils/utils';


export interface IDetailsMainTitleProps {
  visible: boolean;

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
      <Skeleton
        loading={props.visible}
        active={true}
      >
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
              {/* {props.type} */}
              {
                ARTICLE_TYPE_PICKER[ARTICLE_TYPE_WITH_ENGLISH_PICKER.indexOf(props.type)]
              }
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
      </Skeleton>
    </LeftTitleContainer>
  );
}

export default DetailsMainTitle;