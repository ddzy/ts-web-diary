import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  InfoWrapper,
  InfoMain,
  InfoMainUser,
  InfoMainUserInner,
  InfoMainUserName,
  InfoMainUserTime,
  InfoMainContent,
  InfoMainContentInner,
  InfoMainContentInnerText,
  InfoMainContentInnerTextImgBox,
  InfoMainContentInnerTextImgContent,
  InfoMainContentInnerTextCodeBox,
  InfoMainContentInnerTextCodeContent,
  InfoMainContentInnerTextCodeContentTitle,
  InfoMainContentInnerTextCodeContentMain,
} from './style';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';
import BaseChatMessageInfoCode from './code/BaseChatMessageInfoCode';


export interface IBaseChatMessageInfoProps {
  // ? 辨别是发送方还是接收方
  isSend: boolean;
  // ? 消息具体内容
  chatMessageInfo: {
    id: string,
    avatar: string,
    name: string,
    time: string,
    content: string,
    content_type: IBaseCommonChatMessgaeType,
  };
};
export interface IBaseChatMessageInfoState {
  // ? 是否显示代码预览模态框
  isShowCodePreviewModal: boolean;
  // ? 代码相关信息
  codeInfo: {
    language: string,
    code: string,
  };
};


const BaseChatMessageInfo = React.memo((props: IBaseChatMessageInfoProps) => {
  const [state, setState] = React.useState<IBaseChatMessageInfoState>({
    codeInfo: {
      language: '',
      code: '',
    },
    isShowCodePreviewModal: false,
  });

  /**
   * [初始化] - 消息内容
   * @description 根据单聊消息的类型, 作不同处理
   */
  function _initMessageContent(): React.ReactNode {
    const {
      content,
      content_type,
    } = props.chatMessageInfo;

    const categoryDesign = {
      // 普通文本
      plain() {
        return content;
      },
      // 图片
      image() {
        const parsedContent: Array<{
          origin: string,
          final: string,
        }> = JSON.parse(content);

        return parsedContent.map((url, index) => {
          return (
            <InfoMainContentInnerTextImgBox key={index}>
              <InfoMainContentInnerTextImgContent
                src={url.origin}
                data-src={url.final}
              />
            </InfoMainContentInnerTextImgBox>
          );
        });
      },
      // 代码
      code() {
        const parsedContent: {
          language: string,
          code: string,
        } = JSON.parse(content);

        return (
          <InfoMainContentInnerTextCodeBox>
            <InfoMainContentInnerTextCodeContent
              title="代码文件"
              isSend={props.isSend}
              onClick={() => handleCodePreview(parsedContent)}
            >
              {/* 上半部分 - 代码信息 */}
              <InfoMainContentInnerTextCodeContentTitle>
                <Row>
                  <Col span={12}>
                    <Icon
                      type="code"
                      style={{
                        fontSize: 20,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    {parsedContent.language}
                  </Col>
                </Row>
              </InfoMainContentInnerTextCodeContentTitle>

              {/* 下半部分 - 查看代码 */}
              <InfoMainContentInnerTextCodeContentMain>
                查看代码
              </InfoMainContentInnerTextCodeContentMain>
            </InfoMainContentInnerTextCodeContent>
          </InfoMainContentInnerTextCodeBox>
        );
      },
    };

    return categoryDesign[content_type]();
  }

  /**
   * [处理] - 显示代码预览模态框
   */
  function handleCodePreview(
    codeInfo: {
      language: string,
      code: string,
    },
  ) {
    setState({
      ...state,
      codeInfo,
      isShowCodePreviewModal: true,
    });
  }

  /**
   * [处理] - 隐藏代码预览模态框
   */
  function handleCloseCodePreviewModal() {
    setState({
      ...state,
      codeInfo: {
        language: '',
        code: '',
      },
      isShowCodePreviewModal: false,
    });
  }

  return (
    <InfoWrapper>
      <InfoMain>
        <InfoMainUser>
          <InfoMainUserInner isSend={props.isSend}>
            <InfoMainUserName>{props.chatMessageInfo.name}</InfoMainUserName>
            <InfoMainUserTime isSend={props.isSend}>
              {props.chatMessageInfo.time}
            </InfoMainUserTime>
          </InfoMainUserInner>
        </InfoMainUser>
        <InfoMainContent isSend={props.isSend}>
          <InfoMainContentInner>
            <InfoMainContentInnerText isSend={props.isSend}>
              {_initMessageContent()}
            </InfoMainContentInnerText>
          </InfoMainContentInner>
        </InfoMainContent>
      </InfoMain>

      {/* 代码预览组件 */}
      <BaseChatMessageInfoCode
        isShowCodePreviewModal={state.isShowCodePreviewModal}
        codeInfo={state.codeInfo}
        onCloseCodePreviewModal={handleCloseCodePreviewModal}
      />
    </InfoWrapper>
  );
});

export default BaseChatMessageInfo;