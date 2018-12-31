import * as React from 'react';

import {
  TitleInputBox,
  TitleTipBox,
  TitleTipText,
  TitleWrapper,
} from './style';
import BaseCommentInput from 'src/components/widget/BaseCommentInput/BaseCommentInput';


export interface IDetailsMainCommentTitleProps {
  useravatar: string;
  onSendComment: (
    inputEl: HTMLElement,
    v: string,
  ) => void;
};


const DetailsMainCommentTitle = React.memo<IDetailsMainCommentTitleProps>((
  props: IDetailsMainCommentTitleProps,
): JSX.Element => {
  return (
    <TitleWrapper id="comment-wrapper">
      {/* 提示文字 */}
      <TitleTipBox>
        <TitleTipText>
          评论
        </TitleTipText>
      </TitleTipBox>

      {/* 重构输入框 */}
      <TitleInputBox>
        <BaseCommentInput
          useravatar={props.useravatar}
          onSend={props.onSendComment}
        />
      </TitleInputBox>
    </TitleWrapper>
  );
});


export default DetailsMainCommentTitle;