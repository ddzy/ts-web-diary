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
  ImageMainPreviewBox,
  ImageMainPreviewContent,
} from './style';
import ChatInterfacesViewSingleActionExtraImageContent from './content/ChatInterfacesViewSingleActionExtraImageContent';
import { query } from 'services/request';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';
import { getBase64 } from 'utils/utils';


export interface IChatInterfacesViewSingleActionExtraImageProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 重置父组件的状态, 顺便将图片url数组传给父级
  // * 首次打开并关闭子组件之后, 第二次无法打开同样的组件
  // * 故需要父组件动态切换
  onResetMessageComponent: (
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: Array<{ origin: string, final: string }>,
    },
  ) => void;
};
export interface IChatInterfacesViewSingleActionExtraImageState {
  // ? 是否显示上传图片的模态框
  isShowModal: boolean;
  // ? 提交按钮的loading状态
  isSendBtnLoading: boolean;
  // ? 是否显示预览图片的悬浮框
  isShowPreviewModal: boolean;
  // ? 待预览的上传图片的url
  previewImageUrl: string;
  // ? 待发送的图片列表
  // * 由于七牛的原因, 暂时只支持单图上传
  imageList: UploadFile[];
  // ? 上传图片获得的链接
  imageUrlList: Array<{ origin: string, final: string }>;
};


const ChatInterfacesViewSingleActionExtraImage = React.memo((props: IChatInterfacesViewSingleActionExtraImageProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionExtraImageState>({
    isShowModal: true,
    isSendBtnLoading: false,
    isShowPreviewModal: false,
    previewImageUrl: '',
    imageList: [],
    imageUrlList: [],
  });

  /**
   * [处理] - 监听上传的图片更新
   */
  function handleUploadChange(data: UploadChangeParam) {
    const fileList = data.fileList;

    // 图片过滤
    const isCorrentImage = fileList.every((file) => {
      const originFile = file.originFileObj as File;
      const isJpgOrPng = originFile.type === 'image/jpeg'
        || originFile.type === 'image/png'
        || originFile.type === 'image/jpg';

      if (!isJpgOrPng) {
        message.error('目前只支持上传`JPG`、`JPEG`、`PNG`格式的图片!');

        return false;
      }

      const isLt1M = originFile.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        message.error('目前支支持上传小于`1MB`的图片!');

        return false;
      }

      return true;
    });

    isCorrentImage && setState({
      ...state,
      imageList: data.fileList,
    });
  }

  /**
   * [处理] - 本地图片预览
   * @param file 上传的文件对象(antd)
   */
  function handleUploadPreview(file: UploadFile) {
    getBase64(file.originFileObj as File, (result) => {
      setState({
        ...state,
        previewImageUrl: result,
        isShowPreviewModal: true,
      });
    });
  }

  /**
   * [处理] - 隐藏上传图片模态框
   */
  function handleUploadModalCancel() {
    setState({
      ...state,
      isShowModal: false,
    });
  }

  /**
   * [处理] - 隐藏预览图片模态框
   */
  function handlePreviewModalCancel() {
    setState({
      ...state,
      isShowPreviewModal: false,
      previewImageUrl: '',
    });
  }

  /**
   * [处理] - 上传图片modal完全关闭后
   * @description 发送上传完毕之后的图片列表
   * @description 需要将数组转成字符串
   */
  function handleUploadModalAfterClose() {
    // 发送上传后的图片url列表
    props.onResetMessageComponent({
      type: 'image',
      content: state.imageUrlList,
    });
  }

  /**
   * [处理] - 发送图片至七牛云图床
   */
  function handleSendToQiniu() {
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
        imageList[0].originFileObj as File,
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
          // 处理后的图片
          const finalProcessedImgUrl: string = `https://${processedImgUrl}`;
          // 处理前的原图
          const finalOriginImgUrl: string = `https://${domain}/${key}`;

          setState({
            ...state,
            isSendBtnLoading: false,
            isShowModal: false,
            imageUrlList: state.imageUrlList.concat({
              origin: finalOriginImgUrl,
              final: finalProcessedImgUrl,
            }),
          });
        },
      });
    });
  }

  return (
    <ImageWrapper>
      <ImageMain>

        {/* 图片上传模态框 */}
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
          onCancel={handleUploadModalCancel}
          onOk={handleSendToQiniu}
          afterClose={handleUploadModalAfterClose}
        >
          <ChatInterfacesViewSingleActionExtraImageContent
            imageList={state.imageList}
            onUploadChange={handleUploadChange}
            onUploadPreview={handleUploadPreview}
          />
        </Modal>

        {/* 图片预览模态框 */}
        <Modal
          closable={false}
          mask={false}
          footer={false}
          visible={state.isShowPreviewModal}
          onCancel={handlePreviewModalCancel}
        >
          <ImageMainPreviewBox>
            <ImageMainPreviewContent
              src={state.previewImageUrl}
            />
          </ImageMainPreviewBox>
        </Modal>
      </ImageMain>
    </ImageWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleActionExtraImage);