import * as React from 'react';
import {
  Divider,
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
  ISendReplyParams,
  IStaticArticleInfoCommentsOptions,
} from 'pages/details/Details.service';


export interface IDetailsMainCommentShowProps {
  comments: IStaticArticleInfoCommentsOptions[];
  useravatar: string;
  onSendReply: (
    inputEl: HTMLElement,
    v: ISendReplyParams,
  ) => void;
  onLoadMoreComment: (
    v: {
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
  commentHasMore: boolean;
  replyHasMore: boolean;
};
interface IDetailsMainCommentShowState {
  loadMoreText: string;
};


const DetailsMainCommentShow = React.memo<IDetailsMainCommentShowProps>((
  props: IDetailsMainCommentShowProps,
): JSX.Element => {

  const { comments } = props;
  const { length } = comments;

  const [state, setState] = React.useState<IDetailsMainCommentShowState>({
    loadMoreText: '加载更多>>',
  });

  /**
   * 初始化评论列表
   */
  function initCommentListItem(): JSX.Element[] | [] {
    return isArray(comments)
      && length !== 0
      ? comments.map((item, index) => {
        return (
          <CSSTransition
            key={item._id}
            classNames="fadeTranslateZ"
            timeout={1500}
          >
            <React.Fragment>
              <DetailsMainCommentsShowItem
                {...item}
                replyHasMore={props.replyHasMore}
                singleCommentInfo={item}
                currentMainUserAvatar={props.useravatar}
                onSend={props.onSendReply}
                onLoadMoreReply={props.onLoadMoreReply}
              />
              {
                index !== length - 1 && <Divider />
              }
            </React.Fragment>
          </CSSTransition>
        );
      })
      : [];
  }

  /**
   * 处理评论加载更多
   */
  function handleLoadMoreComments(): void {
    const lastCommentId = comments[length - 1]._id;

    setState({ loadMoreText: '加载中...' });

    props.onLoadMoreComment({
      lastCommentId,
    }, () => {
      setState({ loadMoreText: '加载更多>>' });
    });
  }

  return (
    <ShowContainer>
      <ShowList>
        <TransitionGroup>
          {initCommentListItem()}
        </TransitionGroup>
        {
          props.commentHasMore && (
            <ShowLoadMoreBox>
              <ShowLoadMoreText
                onClick={handleLoadMoreComments}
              >
                {state.loadMoreText}
              </ShowLoadMoreText>
            </ShowLoadMoreBox>
          )
        }
      </ShowList>
    </ShowContainer>
  );
});


export default DetailsMainCommentShow;