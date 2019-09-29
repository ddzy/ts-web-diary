import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  AttentionWrapper,
  AttentionMain,
} from './style';


export interface IBaseCommentItemTitleAvatarContentActionAttentionProps {
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
};
export interface IBaseCommentItemTitleAvatarContentActionAttentionState {
};


const BaseCommentItemTitleAvatarContentActionAttention = React.memo((props: IBaseCommentItemTitleAvatarContentActionAttentionProps) => {
  return (
    <AttentionWrapper>
      <AttentionMain>
        <Button
          icon={props.userProfileInfo.user_is_attention ? 'user-delete' : 'user-add'}
          type="primary"
          disabled={props.userProfileInfo.user_is_current_author}
          onClick={props.onAttentionSend}
        >
          {props.userProfileInfo.user_is_attention ? '取消关注' : '关注他'}
        </Button>
      </AttentionMain>
    </AttentionWrapper>
  );
});

export default BaseCommentItemTitleAvatarContentActionAttention;