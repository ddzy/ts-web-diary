import * as React from 'react';
import {
  Divider,
  Button,
} from 'antd';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ShowContainer,
  ShowList,
  ShowLoadMoreBox,
  ShowLoadMoreText,
} from './style';
import { isArray } from 'utils/utils';
import DetailsMainCommentsShowItem from './item/DetailsMainCommentShowItem';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseSendReplyParams,
} from 'pages/details/Details.types';


export interface IDetailsMainCommentShowProps {
  // ? 当前登录用户的头像
  useravatar: string;
  // ? 文章评论列表
  comments: ICommonBaseArticleCommentInfo[];

  // ? 评论分页: 是否还有更多评论
  commentHasMore: boolean;

  onSendReply: (
    inputEl: HTMLElement,
    value: Partial<ICommonBaseSendReplyParams>,
  ) => void;
  onLoadMoreComment: (
    value: {
      lastCommentId: string,
    },
    callback?: () => void,
  ) => void;
  onLoadMoreReply: (
    v: {
      lastReplyId: string,
      commentId: string,
    },
    callback?: () => void,
  ) => void;
};
interface IDetailsMainCommentShowState {
  // ? 加载更多回复的按钮
  loadMoreText: string;
};


const DetailsMainCommentShow = React.memo<IDetailsMainCommentShowProps>((
  props: IDetailsMainCommentShowProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsMainCommentShowState>({
    loadMoreText: '加载更多>>',
  });

  /**
   * [初始化] - 评论列表项
   */
  function _initCommentListItem(): JSX.Element[] | [] {
    const comments = props.comments;

    return isArray(comments)
      && comments.length !== 0
      ? comments.map((item, index) => {
        return (
          <CSSTransition
            key={item._id}
            classNames="fadeTranslateZ"
            timeout={1500}
          >
            <React.Fragment>
              <DetailsMainCommentsShowItem
                singleCommentInfo={item}
                currentMainUserAvatar={props.useravatar}
                onSendReply={props.onSendReply}
                onLoadMoreReply={props.onLoadMoreReply}
              />
              {
                index !== comments.length - 1 && <Divider />
              }
            </React.Fragment>
          </CSSTransition>
        );
      })
      : [];
  }

  /**
   * [初始化] - 评论加载更多按钮
   */
  function _initLoadMoreCommentButton(): JSX.Element {
    const commentHasMore = props.commentHasMore;

    const loadMoreCommentButton = commentHasMore
      ? (
        <ShowLoadMoreBox>
          <ShowLoadMoreText>
            <Button
              type={'link'}
              onClick={handleLoadMoreComment}
            >
              {state.loadMoreText}
            </Button>
          </ShowLoadMoreText>
        </ShowLoadMoreBox>
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
    const comments = props.comments;
    const lastCommentId = comments[comments.length - 1]._id;

    setState({
      ...state,
      loadMoreText: '加载中...',
    });

    props.onLoadMoreComment({
      lastCommentId,
    }, () => {
      setState({
        ...state,
        loadMoreText: '加载更多>>'
      });
    });
  }

  return (
    <ShowContainer>
      <ShowList>
        <TransitionGroup>
          {_initCommentListItem()}
        </TransitionGroup>

        {_initLoadMoreCommentButton()}
      </ShowList>
    </ShowContainer>
  );
});


export default DetailsMainCommentShow;