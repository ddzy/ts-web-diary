import * as React from 'react';
import {
  Icon,
  Row,
  Col,
  Popover,
} from 'antd';

import {
  ExtraWrapper,
  ExtraMain,
  ExtraMainEmoji,
  ExtraMainApplication,
  ExtraMainApplicationContent,
  ExtraMainApplicationContentList,
  ExtraMainApplicationContentItem,
} from './style';
import ChatInterfacesViewSingleActionExtraImage from './image/ChatInterfacesViewSingleActionExtraImage';
import ChatInterfacesViewSingleActionExtraCode from './code/ChatInterfacesViewSingleActionExtraCode';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';


export interface IChatInterfacesViewSingleActionExtraProps {
  onChatMessageSend: (
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: string,
    },
    callback?: () => void,
  ) => void;
};
export interface IChatInterfacesViewSingleActionExtraState {
  // ? 聊天的消息类型
  messageType: string;
  messageComponent: any;
};


const ChatInterfacesViewSingleActionExtra = React.memo((props: IChatInterfacesViewSingleActionExtraProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionExtraState>({
    messageType: '',
    messageComponent: null,
  });


  /**
   * [初始化] - popover标题
   */
  function _initApplicationPopoverTitle() {
    return null;
  }

  /**
   * [初始化] - popover内容
   */
  function _initApplicationPopoverContent() {
    return (
      <ExtraMainApplicationContent>
        <ExtraMainApplicationContentList>
          <ExtraMainApplicationContentItem
            data-message-type="image"
            onClick={handleApplicationItemClick}
          >
            发图片
          </ExtraMainApplicationContentItem>
          <ExtraMainApplicationContentItem
            data-message-type="code"
            onClick={handleApplicationItemClick}
          >
            发代码
          </ExtraMainApplicationContentItem>
        </ExtraMainApplicationContentList>
      </ExtraMainApplicationContent>
    );
  }

  /**
   * 处理展开的popover的每一项点击
   * @description 初始化对应的不同消息类型的上传组件
   * @param e 点击事件的event
   */
  function handleApplicationItemClick(
    e: React.MouseEvent,
  ) {
    const oTargetDOM = e.currentTarget;
    const sTargetDOMType = oTargetDOM.getAttribute('data-message-type') || '';

    switch (sTargetDOMType) {
      case 'image': {
        setState({
          ...state,
          messageComponent: React.createElement(
            ChatInterfacesViewSingleActionExtraImage,
            {
              onResetMessageComponent: handleResetMessageComponent,
            },
          ),
        });
        break;
      };
      case 'code': {
        setState({
          ...state,
          messageComponent: React.createElement(
            ChatInterfacesViewSingleActionExtraCode,
          ),
        });
        break;
      };
      default: {
        setState({
          ...state,
          messageComponent: null,
        });

        break;
      };
    }
  }

  /**
   * [处理] - 重置子组件, 并接收上传之后的图片链接数组
   * @description 首次打开并关闭子组件之后, 第二次无法打开同样的组件
   * @description 故需要父组件动态切换
   * @description
   */
  function handleResetMessageComponent(
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: Array<{ origin: string, final: string }>,
    },
  ) {
    setState({
      ...state,
      messageComponent: null,
    });

    // 图片列表为空, 不作处理
    if (!messageInfo.content.length) {
      return;
    }

    props.onChatMessageSend({
      type: messageInfo.type,
      content: JSON.stringify(messageInfo.content),
    });
  }

  return (
    <ExtraWrapper>
      <ExtraMain>
        <Row>
          <Col span={12}>
            <ExtraMainEmoji>
              <Icon
                type="smile"
                theme="outlined"
                title="发送表情"
              />
            </ExtraMainEmoji>
          </Col>
          <Col span={12}>
            <ExtraMainApplication>
              <Popover
                trigger="click"
                placement="top"
                arrowPointAtCenter={true}
                title={_initApplicationPopoverTitle()}
                content={_initApplicationPopoverContent()}
              >
                <Icon
                  type="appstore"
                  theme="outlined"
                  title="发送更多"
                />
              </Popover>
            </ExtraMainApplication>
          </Col>
        </Row>

        {/* 不同类型消息的上传组件 */}
        {state.messageComponent}
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtra;