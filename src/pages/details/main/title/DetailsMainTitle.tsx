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
} from 'constants/constants';
import { formatTime } from 'utils/utils';
import { ICommonBaseArticleInfo } from 'pages/details/Details.types';


export interface IDetailsMainTitleProps {
  // ? 全局loading状态
  globalLoading: boolean;

  // ? 文章信息
  articleInfo: ICommonBaseArticleInfo,
};


const DetailsMainTitle: React.SFC<IDetailsMainTitleProps> = (
  props
): JSX.Element => {

  const initArticleTag = (): JSX.Element[] => {
    return props.articleInfo.tag
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
        loading={props.globalLoading}
        active={true}
      >
        {/* 标题 */}
        <LeftTitleBox>
          <LeftTitle>
            {props.articleInfo.title}
          </LeftTitle>
        </LeftTitleBox>

        {/* 信息栏 */}
        <LeftInfoBox>
          <LeftInfoList>
            <LeftInfoListItem>
              {props.articleInfo.mode}
            </LeftInfoListItem>
            <Divider type="vertical" />
            <LeftInfoListItem>
              {props.articleInfo.author.username}
            </LeftInfoListItem>
            <Divider type="vertical" />
            <LeftInfoListItem>
              {/* {props.type} */}
              {
                ARTICLE_TYPE_PICKER[ARTICLE_TYPE_WITH_ENGLISH_PICKER.indexOf(props.articleInfo.type)]
              }
            </LeftInfoListItem>
            <Divider type="vertical" />
            <LeftInfoListItem>
              {initArticleTag()}
            </LeftInfoListItem>
            <Divider type="vertical" />
            <LeftInfoListItem>
              {formatTime(props.articleInfo.create_time)}
            </LeftInfoListItem>
          </LeftInfoList>
        </LeftInfoBox>
        <LeftImgBox>
          <LeftImgInner
            imgUrl={props.articleInfo.cover_img}
          />
        </LeftImgBox>
      </Skeleton>
    </LeftTitleContainer>
  );
}

export default DetailsMainTitle;