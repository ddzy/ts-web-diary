import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import {
  Modal,
  Select,
} from 'antd';

import {
  CodeWrapper,
  CodeMain,
} from './style';


export interface IBaseChatMessageInfoCodeProps {
  // ? 是否显示代码预览模态框
  isShowCodePreviewModal: boolean;
  // ? 代码基本信息
  codeInfo: {
    language: string,
    code: string,
  };

  onCloseCodePreviewModal: () => void;
};
export interface IBaseChatMessageInfoCodeState {
};


const BaseChatMessageInfoCode = React.memo((props: IBaseChatMessageInfoCodeProps) => {
  /**
   * [初始化] - 代码预览模态框的标题
   */
  function _initCodePreviewLanguageList() {
    const {
      language,
    } = props.codeInfo;

    return (
      <Select
        disabled
        style={{
          width: 120,
        }}
        defaultValue={language}
      >
        <Select.Option value={language}>{language}</Select.Option>
      </Select>
    );
  }

  return (
    <Modal
      centered={true}
      closable={false}
      title={_initCodePreviewLanguageList()}
      footer={null}
      visible={props.isShowCodePreviewModal}
      onCancel={props.onCloseCodePreviewModal}
    >
      <CodeWrapper>
        <CodeMain>
          <MonacoEditor
            theme="vs"
            width="450"
            height="600"
            options={{
              selectOnLineNumbers: true,
              codeLens: true,
              overviewRulerBorder: false,
              readOnly: true,
            }}
            value={props.codeInfo.code}
            language={props.codeInfo.language}
          />
        </CodeMain>
      </CodeWrapper>
    </Modal>
  );
});

export default BaseChatMessageInfoCode;