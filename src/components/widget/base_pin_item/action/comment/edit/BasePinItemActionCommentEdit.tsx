import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import BaseCommentInput from 'components/widget/base_comment_input/BaseCommentInput';


export interface IBasePinItemActionCommentEditProps { };
export interface IBasePinItemActionCommentEditState { }


const BasePinItemActionCommentEdit = React.memo((props: IBasePinItemActionCommentEditProps) => {
  function handleSend(...args: any[]) {
    console.log(...args);
  }

  return (
    <EditWrapper>
      <EditMain>
        <BaseCommentInput
          useravatar={''}
          onSend={handleSend}
        />
      </EditMain>
    </EditWrapper>
  );
});

export default BasePinItemActionCommentEdit;