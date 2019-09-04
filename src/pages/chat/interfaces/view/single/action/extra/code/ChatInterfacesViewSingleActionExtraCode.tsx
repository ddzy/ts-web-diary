import * as React from 'react';
import {
  Modal,
} from 'antd';

import {
  CodeWrapper,
  CodeMain,
} from './style';
import ChatInterfacesViewSingleActionExtraCodeContent from './content/ChatInterfacesViewSingleActionExtraCodeContent';
import ChatInterfacesViewSingleActionExtraCodeTitle from './title/ChatInterfacesViewSingleActionExtraCodeTitle';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';


export interface IChatInterfacesViewSingleActionExtraCodeProps {
  // ? 发送代码信息并重置父级组件状态
  onResetMessageComponent: (
    isSendState: boolean,
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: string,
    },
  ) => void;
};
export interface IChatInterfacesViewSingleActionExtraCodeState {
  // ? 是否显示代码编辑器模态框
  isShowCodeModal: boolean;
  // ? 提交按钮的loading状态
  isSendBtnLoading: boolean;
  // ? 标识当前点击的是取消还是发送按钮
  // * 修复点击取消按钮后, 仍然会提交结果的bug
  isSendBtn: boolean;
  // ? 输入的代码值相关信息
  codeInfo: {
    language: string,
    code: string,
  },
};


const ChatInterfacesViewSingleActionExtraCode = React.memo((props: IChatInterfacesViewSingleActionExtraCodeProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionExtraCodeState>({
    isShowCodeModal: true,
    isSendBtnLoading: false,
    isSendBtn: false,
    codeInfo: {
      language: 'javascript',
      code: '',
    },
  });

  /**
   * [初始化] - 代码编辑器模态框的标题
   */
  function _initCodeModalTitle() {
    return (
      <ChatInterfacesViewSingleActionExtraCodeTitle
        codeInfo={state.codeInfo}
        onCodeLanguageChange={handleCodeLanguageChange}
      />
    );
  }

  /**
   * [初始化] - 代码编辑器模态框的内容
   */
  function _initCodeModalContent() {
    return (
      <ChatInterfacesViewSingleActionExtraCodeContent
        codeInfo={state.codeInfo}
        onEditorChange={handleCodeEditorChange}
      />
    );
  }

  /**
   * [处理] - 代码编辑模态框完全关闭
   * @description 重置父级组件, 发送代码
   */
  function handleCodeModalAfterClose() {
    const { codeInfo } = state;

    // BUG 通过自定义isSendBtn变量, 来解决点击取消按钮仍然会发送结果的bug
    props.onResetMessageComponent(state.isSendBtn, {
      type: 'code',
      content: JSON.stringify(codeInfo),
    });
  }

  /**
   * [处理] - 隐藏代码编辑器的模态框
   */
  function handleCodeModalCancel() {
    setState({
      ...state,
      isShowCodeModal: false,
      isSendBtn: false,
    });
  }

  /**
   * [处理] - 发送代码
   */
  function handleSend() {
    setState({
      ...state,
      isShowCodeModal: false,
      isSendBtnLoading: true,
      isSendBtn: true,
    });
  }

  /**
   * [处理] - 代码编辑器的值更新
   */
  function handleCodeEditorChange(
    code: string,
  ) {
    setState({
      ...state,
      codeInfo: {
        ...state.codeInfo,
        code,
      },
    });
  }

  /**
   * [处理] - 代码编辑器的语言类型更新
   */
  function handleCodeLanguageChange(
    language: string,
  ) {
    setState({
      ...state,
      codeInfo: {
        ...state.codeInfo,
        language,
      },
    });
  }

  return (
    <CodeWrapper>
      <CodeMain>
        <Modal
          centered={true}
          closable={false}
          maskClosable={false}
          title={_initCodeModalTitle()}
          okText="发送"
          cancelText="取消"
          visible={state.isShowCodeModal}
          okButtonProps={{
            loading: state.isSendBtnLoading,
          }}
          cancelButtonProps={{
            disabled: state.isSendBtnLoading,
          }}
          onCancel={handleCodeModalCancel}
          onOk={handleSend}
          afterClose={handleCodeModalAfterClose}
        >
          {_initCodeModalContent()}
        </Modal>
      </CodeMain>
    </CodeWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtraCode;