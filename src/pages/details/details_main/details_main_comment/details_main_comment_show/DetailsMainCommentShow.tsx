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
import { isArray } from 'src/utils/utils';
import DetailsMainCommentsShowItem from './details_main_comment_show_item/DetailsMainCommentShowItem';
import {
  ISendReplyParams,
  IStaticArticleInfoCommentsOptions,
} from '../../../Details.service';


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
  ) => void;
  commentHasMore: boolean;
};


const DetailsMainCommentShow = React.memo<IDetailsMainCommentShowProps>((
  props: IDetailsMainCommentShowProps,
): JSX.Element => {

  const { comments } = props;
  const { length } = comments;

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
                singleCommentInfo={item}
                currentMainUserAvatar={props.useravatar}
                onSend={props.onSendReply}
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

    props.onLoadMoreComment({
      lastCommentId,
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
                加载更多>>
              </ShowLoadMoreText>
            </ShowLoadMoreBox>
          )
        }
      </ShowList>
    </ShowContainer>
  );
});


export default DetailsMainCommentShow;