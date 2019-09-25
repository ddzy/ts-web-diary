import * as React from 'react';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  Button,
} from 'antd';

import {
  ItemWrapper,
  ItemMain,
  ItemMainCommentBox,
  ItemMainReplyBox,
  ItemMainReplyList,
  ItemMainReplyItem,
  ItemMainLoadMoreBox,
  ItemMainLoadMoreText,
} from './style';
import { BaseCommentItem } from 'components/widget/base_comment_item/BaseCommentItem';
import {
  ICommonBasePinCommentInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemActionCommentItemProps {
  currentMainUserAvatar: string;

  commentInfo: ICommonBasePinCommentInfo | any;

  onSendReply: (
    inputEl: HTMLElement,
    data: any,
  ) => void;
  onLoadMoreReply: (
    commentId: string,
    lastReplyId: string,
    callback?: () => void,
  ) => void;
};
export interface IBasePinItemActionCommentItemState {
  // ? 加载更多回复按钮的内容
  loadMoreText: string;
};


const BasePinItemActionCommentItem = React.memo((props: IBasePinItemActionCommentItemProps) => {
  const [state, setState] = React.useState<IBasePinItemActionCommentItemState>({
    loadMoreText: '加载更多',
  });


  /**
   * [初始化] - 回复列表
   */
  function _initReplyList(): JSX.Element[] {
    const replys = props.commentInfo.replys;
    const replysLength = replys.length;

    if (Array.isArray(replys) && replysLength !== 0) {
      return replys.map((reply) => {
        return (
          <CSSTransition
            key={reply._id}
            classNames="fadeTranslateZ"
            timeout={2000}
          >
            <ItemMainReplyItem>
              <BaseCommentItem
                isAllowAvatarHover={false}
                baseInputContainerStyle={{
                  backgroundColor: '#fff',
                }}
                currentMainUserAvatar={props.currentMainUserAvatar}
                isReply={true}
                commentInfo={{
                  _id: reply._id,
                  fromUserInfo: {
                    _id: reply.from._id,
                    username: reply.from.username,
                    useravatar: reply.from.useravatar,
                  },
                  toUserInfo: {
                    _id: reply.to._id,
                    username: reply.to.username,
                    useravatar: reply.to.useravatar,
                  },
                  createTime: reply.create_time,
                  plainContent: reply.content_plain,
                  imageContent: reply.content_image,
                }}
                onSend={handleSendReply}
              />
            </ItemMainReplyItem>
          </CSSTransition>
        );
      });
    }
    return [];
  }

  /**
   * [初始化] - 回复的加载更多按钮
   */
  function _initReplyLoadMoreButton(): JSX.Element {
    const replys = props.commentInfo.replys;

    const loadMoreButton = replys.length !== 0
      ? (
        <ItemMainLoadMoreBox>
          <ItemMainLoadMoreText>
            <Button
              type="link"
              onClick={handleLoadMoreReply}
            >
              {state.loadMoreText}
            </Button>
          </ItemMainLoadMoreText>
        </ItemMainLoadMoreBox>
      )
      : <React.Fragment />;

    return loadMoreButton;
  }

  /**
   * [处理] - 提交回复
   */
  function handleSendReply(
    el: HTMLElement,
    value: any,
  ): void {
    props.onSendReply(el, {
      ...value,
      commentId: props.commentInfo._id,
    });
  }

  /**
   * [处理] - 回复加载更多
   */
  function handleLoadMoreReply() {
    const replys = props.commentInfo.replys;
    const lastReplyId = replys[replys.length - 1]._id;
    const commentId = props.commentInfo._id;

    setState({
      ...state,
      loadMoreText: '加载中',
    });

    props.onLoadMoreReply(commentId, lastReplyId, () => {
      setState({
        ...state,
        loadMoreText: '加载更多',
      });
    });
  }

  return (
    <ItemWrapper>
      <ItemMain>
        {/* 单个评论项 评论展示 */}
        <ItemMainCommentBox>
          <BaseCommentItem
            isAllowAvatarHover={false}
            baseInputStyle={{
              backgroundColor: '#fff',
            }}
            isReply={false}
            commentInfo={{
              _id: props.commentInfo._id,
              fromUserInfo: {
                _id: props.commentInfo.from._id,
                username: props.commentInfo.from.username,
                useravatar: props.commentInfo.from.useravatar,
              },
              plainContent: props.commentInfo.content_plain,
              imageContent: props.commentInfo.content_image,
              createTime: props.commentInfo.create_time,
            }}
            onSend={handleSendReply}
            currentMainUserAvatar={props.currentMainUserAvatar}
          />
        </ItemMainCommentBox>

        {/* 单个评论项 回复展示 */}
        <ItemMainReplyBox>
          <ItemMainReplyList>
            <TransitionGroup>
              {_initReplyList()}
            </TransitionGroup>

            {/* 加载更多按钮 */}
            {_initReplyLoadMoreButton()}
          </ItemMainReplyList>
        </ItemMainReplyBox>
      </ItemMain>
    </ItemWrapper>
  );
});


export default BasePinItemActionCommentItem;