import * as React from 'react';
import ContentEditable from 'react-contenteditable';

import {
  GlobalStyle,
  InputWrapper,
  InputMain,
} from './style';


export interface IBasePinEditInputProps { };
export interface IBasePinEditInputState { }


const BasePinEditInput = React.memo((props: IBasePinEditInputProps) => {
  return (
    <InputWrapper>
      <InputMain>
        <ContentEditable
          className="pin-main-view-edit-contenteditable-input"
          data-placeholder="发沸点时选择一个话题, 可以大大增加被推荐的概率~"
          html={''}
        />
      </InputMain>

      <GlobalStyle />
    </InputWrapper>
  );
});

export default BasePinEditInput;