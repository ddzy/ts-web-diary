import * as React from 'react';

import {
  TextsWrapper,
  TextsMain,
} from './style';


export interface IChatCollectionsTextsProps { };

const ChatCollectionsTexts = React.memo((props: IChatCollectionsTextsProps) => {
  return (
    <TextsWrapper>
      <TextsMain>
        收藏的普通文本内容
      </TextsMain>
    </TextsWrapper>
  );
});

export default ChatCollectionsTexts;