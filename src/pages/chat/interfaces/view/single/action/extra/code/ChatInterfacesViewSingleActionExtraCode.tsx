import * as React from 'react';

import {
  CodeWrapper,
  CodeMain,
} from './style';


export interface IChatInterfacesViewSingleActionExtraCodeProps { };


const ChatInterfacesViewSingleActionExtraCode = React.memo((props: IChatInterfacesViewSingleActionExtraCodeProps) => {
  return (
    <CodeWrapper>
      <CodeMain>
        上传代码组件
      </CodeMain>
    </CodeWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtraCode;