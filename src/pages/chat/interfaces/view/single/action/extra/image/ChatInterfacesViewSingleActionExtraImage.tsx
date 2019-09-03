import * as React from 'react';
import * as qiniu from 'qiniu-js';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Modal,
  notification,
  message,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

import {
  ImageWrapper,
  ImageMain,
} from './style';
import ChatInterfacesViewSingleActionExtraImageContent from './content/ChatInterfacesViewSingleActionExtraImageContent';
import { query } from 'services/request';


export interface IChatInterfacesViewSingleActionExtraImageProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 重置父组件的状态
  // * 首次打开并关闭子组件之后, 第二次无法打开同样的组件
  // * 故需要父组件动态切换
  onResetMessageComponent: () => void;
};
export interface IChatInterfacesViewSingleActionExtraImageState {
  // ? 是否显示上传图片的模态框
  isShowModal: boolean;
  // ? 待发送的图片列表
  // * 由于七牛的原因, 暂时只支持单图上传
  imageList: UploadFile[];
  // ? 提交按钮的loading状态
  isSendBtnLoading: boolean;
};


const ChatInterfacesViewSingleActionExtraImage = React.memo((props: IChatInterfacesViewSingleActionExtraImageProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionExtraImageState>({
    isShowModal: true,
    isSendBtnLoading: false,
    imageList: [],
  });

  /**
   * [处理] - 监听上传的图片更新
   */
  function handleUploadChange(data: UploadChangeParam) {
    setState({
      ...state,
      imageList: data.fileList,
    });
  }

  /**
   * [处理] - 取消发送
   */
  function handleCancel() {
    setState({
      ...state,
      isShowModal: false,
    });
  }

  /**
   * [处理] - 发送图片
   */
  function handleSend() {
    if (!state.imageList.length) {
      return message.info('请至少上传一张图片!');
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
    }).then(async (res) => {
      const imageList = state.imageList;
      const chatId = props.match.params.id;

      const date: string = new Date().toLocaleDateString();
      const {
        uploadToken,
        domain,
      } = res.data.qiniuInfo;
      const key: string = `${date}/chat/single/${chatId}/message/image/${userId}/${Date.now()}`;

      const $qiniu: qiniu.Observable = qiniu.upload(
        imageList[0] as any,
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
          const processedImgUrl: string = qiniu.pipeline([
            {
              fop: 'imageView2',
              mode: 3,
              w: 600,
              h: 600,
              q: 100,
              format: 'png'
            }
          ], key, domain);
          const finalProcessedImgUrl: string = `https://${processedImgUrl}`;
          const finalOriginImgUrl: string = `https://${domain}/${key}`;

          console.log(finalProcessedImgUrl, finalOriginImgUrl);

          setState({
            ...state,
            isSendBtnLoading: false,
          });
        },
      });
    });
  }

  return (
    <ImageWrapper>
      <ImageMain>
        <Modal
          centered={true}
          closable={false}
          maskClosable={false}
          title="暂时只支持上传单张图片"
          okText="发送"
          cancelText="取消"
          visible={state.isShowModal}
          okButtonProps={{
            loading: state.isSendBtnLoading,
          }}
          cancelButtonProps={{
            disabled: state.isSendBtnLoading,
          }}
          onCancel={handleCancel}
          onOk={handleSend}
          afterClose={props.onResetMessageComponent}
        >
          <ChatInterfacesViewSingleActionExtraImageContent
            imageList={state.imageList}
            onUploadChange={handleUploadChange}
          />
        </Modal>
      </ImageMain>
    </ImageWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleActionExtraImage);