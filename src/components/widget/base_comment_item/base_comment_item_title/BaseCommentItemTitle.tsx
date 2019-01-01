import * as React from 'react';
import {
  Popover,
  Avatar,
  Divider,
  Row,
  Col,
  Button,
} from 'antd';

import {
  TitleContainer,
  PopoverTitleContainer,
  PopoverContentContainer,
  PopoverContentMain,
  PopoverTitleMain,
  TitleMainAvatar,
  TitleMainName,
  ContentMainArticleCountBox,
  ContentMainArticleCountText,
  ContentMainArticleCountTip,
  ContentMainFocusedCountBox,
  ContentMainFocusedCountText,
  ContentMainFocusedCountTip,
  ContentMainLikedCountBox,
  ContentMainLikedCountText,
  ContentMainLikedCountTip,
} from './style';


export interface IBaseCommentItemTitleProps {
  from: {
    _id: string,
    username: string,
    useravatar: string,
  };
};


const BaseCommentItemTitle = React.memo((
  props: IBaseCommentItemTitleProps,
): JSX.Element => {

  /**
   * 初始化处理头像框 popover title
   */
  function handleInitAvatarPopoverTitle(): JSX.Element {
    return (
      <PopoverTitleContainer>
        <PopoverTitleMain>
          <TitleMainAvatar>
            <Avatar
              src={props.from.useravatar}
              icon="user"
              shape="square"
              alt="评论者"
              style={{
                width: '4.375rem',
                height: '4.375rem',
                transform: 'translateY(-1.25rem)',
              }}
            />
          </TitleMainAvatar>
          <TitleMainName>{
            props.from.username
          }</TitleMainName>
        </PopoverTitleMain>
      </PopoverTitleContainer>
    );
  }

  /**
   * 初始化处理头像框 popover content
   */
  function handleInitAvatarPopoverContent(): JSX.Element {
    return (
      <PopoverContentContainer>
        <PopoverContentMain>
          <Row>
            <Col span={8}>
              <ContentMainArticleCountBox>
                <ContentMainArticleCountTip>
                  文章
                </ContentMainArticleCountTip>
                <ContentMainArticleCountText>
                  9
                </ContentMainArticleCountText>
              </ContentMainArticleCountBox>
            </Col>
            <Col span={8}>
              <ContentMainLikedCountBox>
                <ContentMainLikedCountTip>
                  获赞
                </ContentMainLikedCountTip>
                <ContentMainLikedCountText>
                  1002
                </ContentMainLikedCountText>
              </ContentMainLikedCountBox>
            </Col>
            <Col span={8}>
              <ContentMainFocusedCountBox>
                <ContentMainFocusedCountTip>
                  关注者
                </ContentMainFocusedCountTip>
                <ContentMainFocusedCountText>
                  150
                </ContentMainFocusedCountText>
              </ContentMainFocusedCountBox>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Button
                icon={'user-add'}
                type="primary"
              >关注他</Button>
            </Col>
            <Col span={12}>
              <Button
                icon={'message'}
                type="ghost"
              >发私信</Button>
            </Col>
          </Row>
        </PopoverContentMain>
      </PopoverContentContainer>
    );
  }

  return (
    <TitleContainer>
        <Popover
          title={handleInitAvatarPopoverTitle()}
          content={handleInitAvatarPopoverContent()}
        >
          <Avatar
            src={props.from.useravatar}
            icon="user"
            size="default"
            shape="circle"
            alt="评论者"
          />
        </Popover>
        <Divider type="vertical" />
        <span
          style={{
            color: '#999',
          }}
        >{props.from.username}</span>

    </TitleContainer>
  );
});


export default BaseCommentItemTitle;