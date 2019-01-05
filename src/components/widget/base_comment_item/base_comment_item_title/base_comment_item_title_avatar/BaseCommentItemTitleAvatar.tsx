import * as React from 'react';
import {
  Popover,
  Row,
  Col,
  Button,
  Avatar,
  Spin,
  Divider,
  message,
} from 'antd';

import {
  AvatarWrapper,
  AvatarNameText,
  AvatarNameBox,
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
import {
  ICommentListItemProps,
} from '../../BaseCommentItem';
import {
  serviceHandleGetCommentUserInfo,
  serviceHandleCommentUserFollow,
} from 'src/pages/details/Details.service';


export interface IBaseCommentItemTitleAvatarProps extends ICommentListItemProps { };
interface IBaseCommentItemTitleAvatarState {
  loading: boolean;
  userInfo: {
    _id: string,
    username: string,
    useravatar: string,
    articlesCount: number,
    followersCount: number,
    isFollowed: boolean,
  };
};


const BaseCommentItemTitleAvatar = React.memo<IBaseCommentItemTitleAvatarProps>((
  props: IBaseCommentItemTitleAvatarProps,
): JSX.Element => {

  const currentUser = localStorage.getItem('userid');

  const [state, setState] = React.useState<IBaseCommentItemTitleAvatarState>({
    loading: false,
    userInfo: {
      _id: '',
      username: '',
      useravatar: '',
      articlesCount: 0,
      followersCount: 0,
      isFollowed: false,
    },
  });

  /**
   * 初始化处理头像框 popover title
   */
  function handleInitAvatarPopoverTitle(): JSX.Element {
    return (
      <PopoverTitleContainer>
        <Spin spinning={state.loading}>
          <PopoverTitleMain>
            <TitleMainAvatar>
              <Avatar
                src={state.userInfo.useravatar}
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
              state.userInfo.username
            }</TitleMainName>
          </PopoverTitleMain>
        </Spin>
      </PopoverTitleContainer>
    );
  }

  /**
   * 初始化处理头像框 popover content
   */
  function handleInitAvatarPopoverContent(): JSX.Element {
    return (
      <PopoverContentContainer>
        <Spin spinning={state.loading}>
          <PopoverContentMain>
            <Row>
              <Col span={8}>
                <ContentMainArticleCountBox>
                  <ContentMainArticleCountTip>
                    文章
                </ContentMainArticleCountTip>
                  <ContentMainArticleCountText>
                    {state.userInfo.articlesCount}
                  </ContentMainArticleCountText>
                </ContentMainArticleCountBox>
              </Col>
              <Col span={8}>
                <ContentMainLikedCountBox>
                  <ContentMainLikedCountTip>
                    获赞
                </ContentMainLikedCountTip>
                  <ContentMainLikedCountText>
                    0
                </ContentMainLikedCountText>
                </ContentMainLikedCountBox>
              </Col>
              <Col span={8}>
                <ContentMainFocusedCountBox>
                  <ContentMainFocusedCountTip>
                    关注者
                </ContentMainFocusedCountTip>
                  <ContentMainFocusedCountText>
                    {state.userInfo.followersCount}
                  </ContentMainFocusedCountText>
                </ContentMainFocusedCountBox>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button
                  icon={'user-add'}
                  type="primary"
                  disabled={currentUser === state.userInfo._id || state.userInfo.isFollowed}
                  onClick={handleCommentAvatarFocusClick}
                >关注他</Button>
              </Col>
              <Col span={12}>
                <Button
                  icon={'message'}
                  type="ghost"
                  disabled={currentUser === state.userInfo._id}
                >发私信</Button>
              </Col>
            </Row>
          </PopoverContentMain>
        </Spin>
      </PopoverContentContainer>
    );
  }

  /**
   * 处理评论项头像框hover
   */
  function handleCommentAvatarHover(
    visible: boolean,
  ): void {
    const { isReply } = props;
    const {
      _id,
    } = props.commentInfo;

    if (visible) {
      setState({ ...state, loading: true, });

      serviceHandleGetCommentUserInfo({
        isReply,
        commentId: _id,
      }, (data) => {
        const {
          userInfo,
          } = data.info;

        setState({ userInfo, loading: false });
      });
    }
  }

  /**
   * 处理评论头像框 点击关注
   */
  function handleCommentAvatarFocusClick(): void {
    const { _id } = state.userInfo;

    serviceHandleCommentUserFollow(
      { follower: _id },
      (data) => {
        const {
          isFollowed,
        } = data.info.followInfo;

        setState({
          ...state,
          userInfo: {
            ...state.userInfo,
            isFollowed,
            followersCount: state.userInfo.followersCount + 1,
          },
        });

        // ** tip message **
        message.info(`你关注了: ${
          state.userInfo.username
        }`);
      },
    );
  }

  return (
    <AvatarWrapper>
      <Popover
        mouseEnterDelay={.7}
        title={handleInitAvatarPopoverTitle()}
        content={handleInitAvatarPopoverContent()}
        onVisibleChange={handleCommentAvatarHover}
      >
        <Avatar
          src={props.commentInfo.from.useravatar}
          icon="user"
          size="default"
          shape="circle"
          alt="评论者"
        />
      </Popover>

      <Divider type="vertical" />

      <AvatarNameBox>
        <AvatarNameText>
          {props.commentInfo.from.username}
        </AvatarNameText>
      </AvatarNameBox>
    </AvatarWrapper>
  );
});


export default BaseCommentItemTitleAvatar;