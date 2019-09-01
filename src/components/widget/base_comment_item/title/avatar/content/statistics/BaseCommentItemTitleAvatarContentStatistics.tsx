import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  StatisticsWrapper,
  StatisticsMain,
  StatisticsMainArticleCountBox,
  StatisticsMainArticleCountText,
  StatisticsMainArticleCountTip,
  StatisticsMainFocusedCountBox,
  StatisticsMainFocusedCountText,
  StatisticsMainFocusedCountTip,
  StatisticsMainLikedCountBox,
  StatisticsMainLikedCountText,
  StatisticsMainLikedCountTip,
} from './style';


export interface IBaseCommentItemTitleAvatarContentStatisticsProps {
  // ? 评论人的相关信息
  userProfileInfo: {
    author_id: string,
    author_name: string,
    author_avatar: string,
    author_article_total: number,
    author_article_star_total: number,
    author_follower_total: number,
    user_id: string,
    user_name: string,
    user_avatar: string,
    user_is_attention: boolean,
    user_is_friend: boolean,
    user_is_current_author: boolean,
  };
};


const BaseCommentItemTitleAvatarContentStatistics = React.memo((props: IBaseCommentItemTitleAvatarContentStatisticsProps) => {
  return (
    <StatisticsWrapper>
      <StatisticsMain>
        <Row>
          <Col span={8}>
            <StatisticsMainArticleCountBox>
              <StatisticsMainArticleCountTip>
                文章
                </StatisticsMainArticleCountTip>
              <StatisticsMainArticleCountText>
                {props.userProfileInfo.author_article_total}
              </StatisticsMainArticleCountText>
            </StatisticsMainArticleCountBox>
          </Col>
          <Col span={8}>
            <StatisticsMainLikedCountBox>
              <StatisticsMainLikedCountTip>
                获赞
                </StatisticsMainLikedCountTip>
              <StatisticsMainLikedCountText>
                {props.userProfileInfo.author_article_star_total}
              </StatisticsMainLikedCountText>
            </StatisticsMainLikedCountBox>
          </Col>
          <Col span={8}>
            <StatisticsMainFocusedCountBox>
              <StatisticsMainFocusedCountTip>
                关注者
                </StatisticsMainFocusedCountTip>
              <StatisticsMainFocusedCountText>
                {props.userProfileInfo.author_follower_total}
              </StatisticsMainFocusedCountText>
            </StatisticsMainFocusedCountBox>
          </Col>
        </Row>
      </StatisticsMain>
    </StatisticsWrapper>
  );
});

export default BaseCommentItemTitleAvatarContentStatistics;