import * as React from 'react';
import {
  Spin,
  Avatar,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
  TitleMainAvatar,
  TitleMainName,
} from './style';


export interface IBaseCommentItemTitleAvatarTitleProps {
  // ? 评论人的基本信息
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

  // ? 获取信息时的loading
  isLoading: boolean;
};


const BaseCommentItemTitleAvatarTitle = React.memo((props: IBaseCommentItemTitleAvatarTitleProps) => {
  return (
    <Spin spinning={props.isLoading}>
      <TitleWrapper>
        <TitleMain>
          {/* 头像区 */}
          <TitleMainAvatar>
            <Avatar
              icon="user"
              shape="square"
              alt="评论者"
              size="large"
              style={{
                width: '4.375rem',
                height: '4.375rem',
                lineHeight: '4.375rem',
                transform: 'translateY(-1.25rem)',
              }}
              src={props.userProfileInfo.author_avatar}
            />
          </TitleMainAvatar>

          {/* 用户名区域 */}
          <TitleMainName>{props.userProfileInfo.author_name}</TitleMainName>
        </TitleMain>
      </TitleWrapper>
    </Spin>
  );
});

export default BaseCommentItemTitleAvatarTitle;