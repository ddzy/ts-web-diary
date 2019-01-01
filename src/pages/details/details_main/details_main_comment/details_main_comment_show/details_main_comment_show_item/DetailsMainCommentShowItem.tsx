import * as React from 'react';

import {
  ItemContainer,
  CommentContainer,
  ReplyContainer,
  ReplyList,
  ReplyListItem,
} from './style';
import {
  BaseCommentItem,
} from 'src/components/widget/base_comment_item/BaseCommentItem';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';


export interface IDetailsMainCommentShowItemProps {
  currentMainUserAvatar: string;
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  },
  value: string
  create_time: number;
  replys: any[];

  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};


const DetailsMainCommentsShowItem = React.memo<IDetailsMainCommentShowItemProps>((
  props: IDetailsMainCommentShowItemProps,
): JSX.Element => {
  const content = props;

  /**
   * 处理完善回复信息 +++ commentId
   */
  function handleSendReply(
    el: HTMLElement,
    v: any,
  ): void {
    props.onSend(el, {
      ...v,
      commentId: props._id,
    });
  }

  /**
   * 初始化回复列表
   */
  function initReplyList(): JSX.Element[] {
    const { replys } = props;

    if (Array.isArray(replys) && replys.length !== 0) {
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
                content={reply}
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

  return (
    <ItemContainer>
      {/* 单个评论项 评论展示 */}
      <CommentContainer>
        <BaseCommentItem
          baseInputStyle={{
            backgroundColor: '#fff',
          }}
          isReply={false}
          content={content}
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
        </ReplyList>
      </ReplyContainer>
    </ItemContainer>
  );
});


export default DetailsMainCommentsShowItem;