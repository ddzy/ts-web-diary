import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import BaseCommentItemTitleAvatarContentActionAttention from './attention/BaseCommentItemTitleAvatarContentActionAttention';
import BaseCommentItemTitleAvatarContentActionFriend from './friend/BaseCommentItemTitleAvatarContentActionFriend';


export interface IBaseCommentItemTitleAvatarContentActionProps {
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
export interface IBaseCommentItemTitleAvatarContentActionState {
};


const BaseCommentItemTitleAvatarContentAction = React.memo((props: IBaseCommentItemTitleAvatarContentActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          {/* 关注按钮区 */}
          <Col span={12}>
            <BaseCommentItemTitleAvatarContentActionAttention
              userProfileInfo={props.userProfileInfo}
              onAttentionSend={props.onAttentionSend}
            />
          </Col>

          {/* 加好友 | 发起聊天按钮区 */}
          <Col span={12}>
            <BaseCommentItemTitleAvatarContentActionFriend
              userProfileInfo={props.userProfileInfo}
              onMakeFriendSend={props.onMakeFriendSend}
              onChatSend={props.onChatSend}
            />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BaseCommentItemTitleAvatarContentAction;