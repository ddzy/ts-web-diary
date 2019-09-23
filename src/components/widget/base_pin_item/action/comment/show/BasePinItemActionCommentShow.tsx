import * as React from 'react';

import {
  ShowWrapper,
  ShowMain,
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

  onSendReply: (
    inputEl: HTMLElement,
    data: any,
  ) => void;
};
export interface IBasePinItemActionCommentShowState { }


const BasePinItemActionCommentShow = React.memo((props: IBasePinItemActionCommentShowProps) => {
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
            <BasePinItemActionCommentShowItem
              key={v._id}
              commentInfo={v}
              currentMainUserAvatar={props.currentMainUserAvatar}
              onSendReply={props.onSendReply}
            />
          );
        })
      );
  }

  return (
    <ShowWrapper>
      <ShowMain>
        {_initCommentList()}
      </ShowMain>
    </ShowWrapper>
  );
});

export default BasePinItemActionCommentShow;