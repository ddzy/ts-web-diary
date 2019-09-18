import * as React from 'react';
import ContentEditable from 'react-contenteditable';

import {
  GlobalStyle,
  InputWrapper,
  InputMain,
} from './style';


export interface IPinMainViewEditInputProps { };
export interface IPinMainViewEditInputState { }


const PinMainViewEditInput = React.memo((props: IPinMainViewEditInputProps) => {
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

export default PinMainViewEditInput;