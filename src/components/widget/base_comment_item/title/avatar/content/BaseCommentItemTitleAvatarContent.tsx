import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Spin,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import BaseCommentItemTitleAvatarContentStatistics from './statistics/BaseCommentItemTitleAvatarContentStatistics';
import BaseCommentItemTitleAvatarContentAction from './action/BaseCommentItemTitleAvatarContentAction';


export interface IBaseCommentItemTitleAvatarContentProps extends RouteComponentProps {
  // ? 获取评论人信息时的loading状态
  isLoading: boolean;
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

  onAttentionSend: () => void;
  onMakeFriendSend: (data: {
    description: string,
  }) => void;
  onChatSend: () => void;
};
export interface IBaseCommentItemTitleAvatarContentState {
};


const BaseCommentItemTitleAvatarContent = React.memo((props: IBaseCommentItemTitleAvatarContentProps) => {
  return (
    <Spin spinning={props.isLoading}>
      <ContentWrapper>
        <ContentMain>
          {/* 数值统计区 */}
          <BaseCommentItemTitleAvatarContentStatistics
            userProfileInfo={props.userProfileInfo}
          />

          {/* 附加操作区 */}
          <BaseCommentItemTitleAvatarContentAction
            userProfileInfo={props.userProfileInfo}
            onAttentionSend={props.onAttentionSend}
            onMakeFriendSend={props.onMakeFriendSend}
            onChatSend={props.onChatSend}
          />
        </ContentMain>
      </ContentWrapper>
    </Spin>
  );
});

export default withRouter(BaseCommentItemTitleAvatarContent);