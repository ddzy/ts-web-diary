import * as React from 'react';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ItemWrapper,
  ItemMain,
  ItemMainCommentBox,
  ItemMainReplyBox,
  ItemMainReplyList,
  ItemMainReplyItem,
} from './style';
import { BaseCommentItem } from 'components/widget/base_comment_item/BaseCommentItem';
import {
  ICommonBasePinCommentInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemActionCommentItemProps {
  currentMainUserAvatar: string;

  commentInfo: ICommonBasePinCommentInfo;

  onSendReply: (
    inputEl: HTMLElement,
    data: any,
  ) => void;
};
export interface IBasePinItemActionCommentItemState { };


const BasePinItemActionCommentItem = React.memo((props: IBasePinItemActionCommentItemProps) => {
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
                baseInputContainerStyle={{
                  backgroundColor: '#fff',
                }}
                currentMainUserAvatar={props.currentMainUserAvatar}
                isReply={true}
                commentInfo={reply}
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

  return (
    <ItemWrapper>
      <ItemMain>
        {/* 单个评论项 评论展示 */}
        <ItemMainCommentBox>
          <BaseCommentItem
            baseInputStyle={{
              backgroundColor: '#fff',
            }}
            isReply={false}
            commentInfo={props.commentInfo}
            {...props}
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
          </ItemMainReplyList>
        </ItemMainReplyBox>
      </ItemMain>
    </ItemWrapper>
  );
});


export default BasePinItemActionCommentItem;