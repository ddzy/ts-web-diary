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
} from 'src/components/widget/base_comment_item/BaseCommentItem';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  ISendReplyParams,
  IStaticArticleInfoCommentsOptions,
} from '../../../../Details.service';


export interface IDetailsMainCommentShowItemProps {
  currentMainUserAvatar: string;
  singleCommentInfo: IStaticArticleInfoCommentsOptions;

  onSend: (
    inputEl: HTMLElement,
    v: ISendReplyParams,
  ) => void;
};


const DetailsMainCommentsShowItem = React.memo<IDetailsMainCommentShowItemProps>((
  props: IDetailsMainCommentShowItemProps,
): JSX.Element => {
  /**
   * 处理完善回复信息 +++ commentId
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
   * 初始化回复列表
   */
  function initReplyList(): JSX.Element[] {
    const { replys } = props.singleCommentInfo;

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
            && (
              <ShowLoadMoreBox>
                <ShowLoadMoreText>
                  加载更多>>
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