import * as React from 'react';
import * as qiniu from 'qiniu-js';
import {
  Modal,
  message,
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  UploadFile,
  UploadChangeParam,
} from 'antd/lib/upload/interface';

import {
  FileWrapper,
  FileMain,
} from './style';
import ChatInterfacesViewSingleActionExtraFileContent from './content/ChatInterfacesViewSingleActionExtraFileContent';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';
import {
  validator,
  // getFileNameSuffix,
} from 'utils/utils';
import { query } from 'services/request';


export interface IChatInterfacesViewSingleActionExtraFileProps extends RouteComponentProps<{ id: string }> {
  // ? 发送文件信息并重置父级组件状态
  onResetMessageComponent: (
    isSendState: boolean,
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: string,
    },
  ) => void;
};
export interface IChatInterfacesViewSingleActionExtraFileState {
  // ? 是否显示上传文件的模态框
  isShowUploadFileModal: boolean;
  // ? 发送按钮的loading状态
  isSendBtnLoading: boolean;
  // ? 待上传的文件列表
  fileList: UploadFile[];
  // ? 文件上转到七牛云之后返回的链接列表
  fileUrlList: Array<{
    name: string,
    url: string,
  }>;
};


const ChatInterfacesViewSingleActionExtraFile = React.memo((props: IChatInterfacesViewSingleActionExtraFileProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionExtraFileState>({
    isShowUploadFileModal: true,
    isSendBtnLoading: false,
    fileList: [],
    fileUrlList: [],
  });


  /**
   * [处理] - 隐藏上传文件模态框
   */
  function handleUploadModalCancel() {
    setState({
      ...state,
      isShowUploadFileModal: false,
    });
  }

  /**
   * [处理] - 上传文件modal完全关闭后
   * @description 发送上传完毕之后的文件信息
   * @description 需要将数组转成字符串
   */
  function handleUploadModalAfterClose() {
    // 文件url列表为空, 不作处理
    if (!state.fileUrlList.length) {
      return props.onResetMessageComponent(false, {
        type: 'file',
        content: '',
      });
    }

    // 发送上传后的文件url列表
    props.onResetMessageComponent(true, {
      type: 'file',
      content: JSON.stringify(state.fileUrlList),
    });
  }


  /**
   * [处理] - 监听上传的文件更新
   */
  function handleUploadChange(data: UploadChangeParam) {
    // 文件类型处理
    const fileList = data.fileList;
    const newFile = data.file;
    const newFileName = newFile.name;

    const isCorrectFileType = validator.isTxtFile(newFileName)
      || validator.isMicrosoftExcelFile(newFileName)
      || validator.isMicrosoftPPTFile(newFileName)
      || validator.isMicrosoftWordFile(newFileName)
      || validator.isPDFFile(newFileName);

    if (!isCorrectFileType) {
      message.error('不受支持的文件类型, 请重新选取!');
    }

    const newFileList = isCorrectFileType
      ? fileList.slice(-1)
      : state.fileList;

    setState({
      ...state,
      fileList: newFileList,
    });
  }

  /**
   * [处理] - 上传文件至七牛云
   */
  function handleSendFileToQiniu() {
    if (!state.fileList.length) {
      return message.info('请至少上传一个文件!');
    }

    setState({
      ...state,
      isSendBtnLoading: true,
    });

    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后再操作!',
      });

      return props.history.push('/login');
    }

    query({
      url: '/api/upload/qiniu/info',
      method: 'GET',
      data: {
        userId,
      },
      jsonp: false,
    }).then((res) => {
      const fileList = state.fileList;
      const chatId = props.match.params.id;

      const date: string = new Date().toLocaleDateString();
      const {
        uploadToken,
        domain,
      } = res.data.qiniuInfo;
      const key: string = `${date}/chat/single/${chatId}/message/file/${userId}/${Date.now()}`;

      const $qiniu: qiniu.Observable = qiniu.upload(
        fileList[0].originFileObj as File,
        key,
        uploadToken,
        {},
        {},
      );

      $qiniu.subscribe({
        next: () => (null),
        error: () => {
          notification.error({
            message: '错误',
            description: '上传至七牛云时出现问题, 请稍后重试!',
          });
        },
        complete: () => {
          // ? 得到文件上传后的链接地址
          const finalOriginFileUrl: string = `https://${domain}/${key}`;

          setState({
            ...state,
            isSendBtnLoading: false,
            isShowUploadFileModal: false,
            fileUrlList: state.fileUrlList.concat({
              name: fileList[0].name,
              url: finalOriginFileUrl,
            }),
          });
        },
      });
    });
  }

  return (
    <FileWrapper>
      <FileMain>
        {/* 文件上传模态框 */}
        <Modal
          centered={true}
          closable={false}
          maskClosable={false}
          title="发送文件"
          okText="发送"
          cancelText="取消"
          visible={state.isShowUploadFileModal}
          okButtonProps={{
            loading: state.isSendBtnLoading,
          }}
          cancelButtonProps={{
            disabled: state.isSendBtnLoading,
          }}
          onCancel={handleUploadModalCancel}
          onOk={handleSendFileToQiniu}
          afterClose={handleUploadModalAfterClose}
        >
          <ChatInterfacesViewSingleActionExtraFileContent
            fileList={state.fileList}
            onUploadChange={handleUploadChange}
          />
        </Modal>
      </FileMain>
    </FileWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleActionExtraFile);