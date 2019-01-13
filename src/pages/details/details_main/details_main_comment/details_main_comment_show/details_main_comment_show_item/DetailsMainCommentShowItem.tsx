import * as React from 'react';

import {
  ShowLoadMoreBox,
  ShowLoadMoreText,
  ItemContainer,
  CommentContainer,
  ReplyContainer,
  ReplyList,
  ReplyListItem,
} from './style';
import {
  BaseCommentItem,
} from 'components/widget/base_comment_item/BaseCommentItem';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  ISendReplyParams,
  IStaticArticleInfoCommentsOptions,
} from 'pages/details/Details.service';


export interface IDetailsMainCommentShowItemProps {
  currentMainUserAvatar: string;
  singleCommentInfo: IStaticArticleInfoCommentsOptions;
  replyHasMore: boolean;

  onSend: (
    inputEl: HTMLElement,
    v: ISendReplyParams,
  ) => void;
  onLoadMoreReply: (
    v: {
      lastReplyId: string,
      commentId: string,
    },
    callback?: () => void,
  ) => void;
};
interface IDetailsMainCommentShowItemState {
  loadMoreText: string;
};


const DetailsMainCommentsShowItem = React.memo<IDetailsMainCommentShowItemProps>((
  props: IDetailsMainCommentShowItemProps,
): JSX.Element => {

  const { replys } = props.singleCommentInfo;
  const { length } = replys;

  const [state, setState] = React.useState<IDetailsMainCommentShowItemState>({
    loadMoreText: '加载更多',
  });

  /**
   * 初始化回复列表
   */
  function initReplyList(): JSX.Element[] {
    if (Array.isArray(replys) && length !== 0) {
      return replys.map((reply, index) => {
        return (
          <CSSTransition
            key={index}
            classNames="fadeTranslateZ"
            timeout={2000}
          >
            <ReplyListItem>
              <BaseCommentItem
                baseInputContainerStyle={{
                  backgroundColor: '#fff',
                }}
                currentMainUserAvatar={props.currentMainUserAvatar}
                isReply={true}
                commentInfo={reply}
                {...props}
                onSend={handleSendReply}
              />
            </ReplyListItem>
          </CSSTransition>
        );
      });
    }
    return [];
  }

  /**
   * 处理提交回复
   */
  function handleSendReply(
    el: HTMLElement,
    v: ISendReplyParams,
  ): void {
    props.onSend(el, {
      ...v,
      commentId: props.singleCommentInfo._id,
    });
  }

  /**
   * 处理回复加载更多
   */
  function handleLoadMoreReplys(): void {
    const lastReplyId = replys[length - 1]._id;
    const { _id } = props.singleCommentInfo;

    setState({ loadMoreText: '加载中' });

    props.onLoadMoreReply({
      lastReplyId,
      commentId: _id,
    }, () => {
        setState({
          loadMoreText: '加载更多',
        });
    });
  }

  return (
    <ItemContainer>
      {/* 单个评论项 评论展示 */}
      <CommentContainer>
        <BaseCommentItem
          baseInputStyle={{
            backgroundColor: '#fff',
          }}
          isReply={false}
          commentInfo={props.singleCommentInfo}
          {...props}
          onSend={handleSendReply}
          currentMainUserAvatar={props.currentMainUserAvatar}
        />
      </CommentContainer>

      {/* 单个评论项 回复展示 */}
      <ReplyContainer>
        <ReplyList>
          <TransitionGroup>
            {initReplyList()}
          </TransitionGroup>
          {
            props.singleCommentInfo.replys.length !== 0
            && props.replyHasMore
            && (
              <ShowLoadMoreBox>
                <ShowLoadMoreText
                  onClick={handleLoadMoreReplys}
                >
                  {state.loadMoreText}
                </ShowLoadMoreText>
              </ShowLoadMoreBox>
            )
          }
        </ReplyList>
      </ReplyContainer>
    </ItemContainer>
  );
});


export default DetailsMainCommentsShowItem;