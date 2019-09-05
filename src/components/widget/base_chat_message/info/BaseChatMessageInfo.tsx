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
  InfoMainContentInnerTextFileBox,
  InfoMainContentInnerTextFileContent,
  InfoMainContentInnerTextFileContentTitle,
  InfoMainContentInnerTextFileContentMain,
  InfoMainContentInnerTextFileContentMainPreviewLink,
  InfoMainContentInnerTextFileContentMainDownloadLink,
} from './style';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';
import {
  getFileType,
  validator,
} from 'utils/utils';
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
                      theme="twoTone"
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
      // 文件
      file() {
        const parsedContent: Array<{
          name: string,
          url: string,
        }> = JSON.parse(content);

        return parsedContent.map((file, index) => {
          return (
            <InfoMainContentInnerTextFileBox key={index}>
              <InfoMainContentInnerTextFileContent
                isSend={props.isSend}
              >
                {/* 文件消息头部 */}
                <InfoMainContentInnerTextFileContentTitle>
                  <Row>
                    <Col span={12}>
                      <Icon
                        type={`file-${getFileType(file.name)}`}
                        theme="twoTone"
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      {getFileType(file.name)}文件
                    </Col>
                  </Row>
                </InfoMainContentInnerTextFileContentTitle>

                {/* 文件消息尾部 */}
                <InfoMainContentInnerTextFileContentMain>
                  <Row>
                    <Col span={12}>
                      <InfoMainContentInnerTextFileContentMainPreviewLink
                        isSend={props.isSend}
                        target="_blank"
                        href={handleGenerateFilePreviewLink(file.name, file.url)}
                      >预览</InfoMainContentInnerTextFileContentMainPreviewLink>
                    </Col>
                    <Col span={12}>
                      <InfoMainContentInnerTextFileContentMainDownloadLink
                        isSend={props.isSend}
                        target="_blank"
                        download={true}
                        href={file.url}
                      >下载</InfoMainContentInnerTextFileContentMainDownloadLink>
                    </Col>
                  </Row>
                </InfoMainContentInnerTextFileContentMain>
              </InfoMainContentInnerTextFileContent>
            </InfoMainContentInnerTextFileBox>
          );
        });
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

  /**
   * [处理] - 根据不同的文件类型生成在线预览路径
   * @param path 文件地址
   */
  function handleGenerateFilePreviewLink(
    name: string,
    path: string
  ): string {
    // 微软全家桶
    if (
      validator.isMicrosoftWordFile(name)
      || validator.isMicrosoftExcelFile(name)
      || validator.isMicrosoftPPTFile(name)
    ) {
      // BUG1 微软在线预览的接口, 需要对URL进行编码
      // BUG2 传输的文件不能为空, 否则打不开
      // @see: https://www.microsoft.com/en-us/microsoft-365/blog/2013/04/10/office-web-viewer-view-office-documents-in-a-browser/?eu=true
      path = encodeURI(path);

      return `https://view.officeapps.live.com/op/view.aspx?src=${path}`;
    }

    // 其它文件
    return path;
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

      {/* 代码消息组件 */}
      <BaseChatMessageInfoCode
        isShowCodePreviewModal={state.isShowCodePreviewModal}
        codeInfo={state.codeInfo}
        onCloseCodePreviewModal={handleCloseCodePreviewModal}
      />
    </InfoWrapper>
  );
});

export default BaseChatMessageInfo;