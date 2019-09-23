import * as React from 'react';
import {
  Button,
} from 'antd';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ShowWrapper,
  ShowMain,
  ShowMainLoadMoreBox,
  ShowMainLoadMoreText,
} from './style';
import {
  ICommonBasePinCommentInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';
import BasePinItemActionCommentShowItem from './item/BasePinItemActionCommentShowItem';


export interface IBasePinItemActionCommentShowProps {
  // ? 当前登录用户的头像
  currentMainUserAvatar: string;

  // ? 沸点评论列表
  commentList: ICommonBasePinCommentInfo[];
  // ? 是否还有更多评论
  hasMoreComment: boolean;

  onSendReply: (
    inputEl: HTMLElement,
    data: any,
  ) => void;
  onLoadMoreComment: (
    lastCommentId: string,
    callback?: () => void,
  ) => void;
  onLoadMoreReply: (
    commentId: string,
    lastReplyId: string,
    callback?: () => void,
  ) => void;
};
export interface IBasePinItemActionCommentShowState {
  // ? 加载更多评论的按钮文字
  loadMoreText: string;
}


const BasePinItemActionCommentShow = React.memo((props: IBasePinItemActionCommentShowProps) => {
  const [state, setState] = React.useState<IBasePinItemActionCommentShowState>({
    loadMoreText: '加载更多>>',
  });


  /**
   * [初始化] - 评论列表
   */
  function _initCommentList() {
    const commentList = props.commentList;

    return commentList.length === 0
      ? <React.Fragment />
      : (
        commentList.map((v) => {
          return (
            <CSSTransition
              key={v._id}
              classNames="fadeTranslateZ"
              timeout={1500}
            >
              <BasePinItemActionCommentShowItem
                commentInfo={v}
                currentMainUserAvatar={props.currentMainUserAvatar}
                onSendReply={props.onSendReply}
                onLoadMoreReply={props.onLoadMoreReply}
              />
            </CSSTransition>
          );
        })
      );
  }

  /**
   * [初始化] - 评论加载更多按钮
   */
  function _initLoadMoreCommentButton(): JSX.Element {
    const commentHasMore = props.hasMoreComment;

    const loadMoreCommentButton = commentHasMore
      ? (
        <ShowMainLoadMoreBox>
          <ShowMainLoadMoreText>
            <Button
              type="link"
              onClick={handleLoadMoreComment}
            >
              {state.loadMoreText}
            </Button>
          </ShowMainLoadMoreText>
        </ShowMainLoadMoreBox>
      )
      : (
        <React.Fragment />
      );

    return loadMoreCommentButton;
  }

  /**
   * [处理] - 评论加载更多
   */
  function handleLoadMoreComment(): void {
    const comments = props.commentList;
    const lastCommentId = comments[comments.length - 1]._id;

    setState({
      ...state,
      loadMoreText: '加载中...',
    });

    props.onLoadMoreComment(lastCommentId, () => {
      setState({
        ...state,
        loadMoreText: '加载更多>>'
      });
    });
  }

  return (
    <ShowWrapper>
      <ShowMain>
        <TransitionGroup>
          {_initCommentList()}
        </TransitionGroup>

        {_initLoadMoreCommentButton()}
      </ShowMain>
    </ShowWrapper>
  );
});

export default BasePinItemActionCommentShow;