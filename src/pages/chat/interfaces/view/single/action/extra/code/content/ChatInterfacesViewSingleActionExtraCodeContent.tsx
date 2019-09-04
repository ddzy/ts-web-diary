import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface IChatInterfacesViewSingleActionExtraCodeContentProps {
  // ? 代码相关信息
  codeInfo: {
    code: string,
    language: string,
  };

  onEditorChange: (
    value: string,
  ) => void;
};
export interface IChatInterfacesViewSingleActionExtraCodeContentState {
};


const ChatInterfacesViewSingleActionExtraCodeContent = React.memo((props: IChatInterfacesViewSingleActionExtraCodeContentProps) => {
  /**
   * [处理] - 编辑器自动获取焦点
   * @param editor 编辑器实例
   */
  function handleEditorDidMount(
    editor: any,
  ) {
    editor.focus();
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <MonacoEditor
          theme="vs"
          width="500"
          height="600"
          options={{
            selectOnLineNumbers: true,
            codeLens: true,
          }}
          defaultValue={props.codeInfo.code}
          value={props.codeInfo.code}
          language={props.codeInfo.language}
          onChange={props.onEditorChange}
          editorDidMount={handleEditorDidMount}
        />
      </ContentMain>
    </ContentWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtraCodeContent;