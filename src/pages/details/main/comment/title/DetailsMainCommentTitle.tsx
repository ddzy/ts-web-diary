import * as React from 'react';

import {
  TitleInputBox,
  TitleTipBox,
  TitleTipText,
  TitleWrapper,
} from './style';
import BaseCommentInput from 'components/widget/base_comment_input/BaseCommentInput';


export interface IDetailsMainCommentTitleProps {
  // ? 当前登录的用户头像
  useravatar: string;

  // ? 提交评论
  onSendComment: (
    inputEl: HTMLElement,
    value: {
      plainContent: string,
      imageContent: string[],
    },
  ) => void;
};


const DetailsMainCommentTitle = React.memo<IDetailsMainCommentTitleProps>((
  props: IDetailsMainCommentTitleProps,
): JSX.Element => {
  /**
   * [处理] - 发送评论
   * @param inputEl 输入框元素
   * @param plainContent 评论的普通文本内容
   * @para imageContent 评论的图片列表
   */
  function handleSendComment(
    inputEl: HTMLElement,
    plainContent: string,
    imageContent: string[],
  ) {
    props.onSendComment(inputEl, {
      plainContent,
      imageContent,
    });
  }

  return (
    <TitleWrapper id="comment-wrapper">
      {/* 提示文字 */}
      <TitleTipBox>
        <TitleTipText>
          评论
        </TitleTipText>
      </TitleTipBox>

      {/* 输入框 */}
      <TitleInputBox>
        <BaseCommentInput
          useravatar={props.useravatar}
          onSend={handleSendComment}
        />
      </TitleInputBox>
    </TitleWrapper>
  );
});


export default DetailsMainCommentTitle;