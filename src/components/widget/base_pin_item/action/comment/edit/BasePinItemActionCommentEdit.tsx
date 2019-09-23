import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import BaseCommentInput from 'components/widget/base_comment_input/BaseCommentInput';


export interface IBasePinItemActionCommentEditProps {
  // ? 当前登录的用户头像
  currentMainUserAvatar: string;

  onSend: (
    el: HTMLElement,
    plainContent: string,
    imageContent: string[],
  ) => void;
};
export interface IBasePinItemActionCommentEditState { }


const BasePinItemActionCommentEdit = React.memo((props: IBasePinItemActionCommentEditProps) => {
  /**
   * [处理] - 发送沸点评论
   * @param el 输入框DOM元素
   * @param plainContent 文本内容
   * @param imageContent 图片列表
   */
  function handleSend(
    el: HTMLElement,
    plainContent: string,
    imageContent: string[],
  ) {
    props.onSend(el, plainContent, imageContent);
  }

  return (
    <EditWrapper>
      <EditMain>
        <BaseCommentInput
          useravatar={props.currentMainUserAvatar}
          onSend={handleSend}
        />
      </EditMain>
    </EditWrapper>
  );
});

export default BasePinItemActionCommentEdit;