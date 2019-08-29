import * as React from 'react';
import {
  Button,
} from 'antd';

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
  ICommonBaseArticleCommentInfo,
  ICommonBaseSendReplyParams,
} from 'pages/details/Details.types';


export interface IDetailsMainCommentShowItemProps {
  // ? 当前登录用户的头像
  currentMainUserAvatar: string;
  // ? 单条评论的详细信息
  singleCommentInfo: ICommonBaseArticleCommentInfo;
  // ? 回复分页: 是否还有更多回复
  replyHasMore: boolean;

  onSendReply: (
    inputEl: HTMLElement,
    value: Partial<ICommonBaseSendReplyParams>,
  ) => void;
  onLoadMoreReply: (
    value: {
      lastReplyId: string,
      commentId: string,
    },
    callback?: () => void,
  ) => void;
};
interface IDetailsMainCommentShowItemState {
  // ? 更多回复按钮的内容
  loadMoreText: string;
};


const DetailsMainCommentsShowItem = React.memo<IDetailsMainCommentShowItemProps>((
  props: IDetailsMainCommentShowItemProps,
): JSX.Element => {

  const [state, setState] = React.useState<IDetailsMainCommentShowItemState>({
    loadMoreText: '加载更多',
  });

  /**
   * [初始化] - 回复列表
   */
  function initReplyList(): JSX.Element[] {
    const replys = props.singleCommentInfo.replys;
    const replysLength = replys.length;

    if (Array.isArray(replys) && replysLength !== 0) {
      return replys.map((reply) => {
        return (
          <CSSTransition
            key={reply._id}
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
                commentInfo={reply as any}
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
   * [处理] - 提交回复
   */
  function handleSendReply(
    el: HTMLElement,
    value: Partial<ICommonBaseSendReplyParams>,
  ): void {
    props.onSendReply(el, {
      ...value,
      commentId: props.singleCommentInfo._id,
    });
  }

  /**
   * [处理] - 回复加载更多
   */
  function handleLoadMoreReply(): void {
    const replys = props.singleCommentInfo.replys;
    const lastReplyId = replys[replys.length - 1]._id;
    const commentId = props.singleCommentInfo._id;

    setState({
      ...state,
      loadMoreText: '加载中',
    });

    props.onLoadMoreReply({
      lastReplyId,
      commentId,
    }, () => {
        setState({
          ...state,
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
                <ShowLoadMoreText>
                  <Button
                    type="link"
                    onClick={handleLoadMoreReply}
                  >
                    {state.loadMoreText}
                  </Button>
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