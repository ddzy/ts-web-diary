import * as React from 'react';
import * as Qiniu from 'qiniu-js';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Row,
  Col,
  notification,
  message,
} from 'antd';
import {
  UploadFile,
  UploadChangeParam,
} from 'antd/lib/upload/interface';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEditInput from './input/BasePinEditInput';
import BasePinEditAction from './action/BasePinEditAction';
import BasePinEditSend from './send/BasePinEditSend';
import { query } from 'services/request';
import {
  IBaseCommonTopicInfo,
} from './BasePinEdit.types';


export interface IBasePinEditProps extends RouteComponentProps { };
export interface IBasePinEditState {
  // ? 沸点信息
  pinInfo: {
    // * 普通文本内容
    plainContent: string,
    // * 图片内容
    imageContent: Array<{
      originUrl: string,
      processedUrl: string,
    }>,
    // * 链接内容
    linkContent: {
      title: string,
      domain: string,
      coverImgUrl: string,
    },
    // * 所属话题
    topic: Pick<IBaseCommonTopicInfo, '_id' | 'name'>,
  };

  // ? 本地图片列表
  imageList: UploadFile[];
}


const BasePinEdit = ((props: IBasePinEditProps) => {
  const [state, setState] = React.useState<IBasePinEditState>({
    pinInfo: {
      plainContent: '',
      imageContent: [],
      linkContent: {
        title: '',
        domain: '',
        coverImgUrl: '',
      },
      topic: {
        _id: '',
        name: '',
      },
    },
    imageList: [],
  });


  /**
   * [处理] - 普通文本内容更新
   * @param e 输入框的DOM
   */
  function handlePlainContentChange(
    e: React.ChangeEvent,
  ) {
    const oTarget = e.target as HTMLDivElement;
    const sContent = oTarget['value'] as string;

    setState({
      ...state,
      pinInfo: {
        ...state.pinInfo,
        plainContent: sContent,
      },
    });
  }

  /**
   * [处理] - 图片内容更新
   * @description 上传至七牛云, 设置本地的图片url列表
   * @param isInputUpload 判断是否输入框的上传图片
   * @param data 上传的图片信息
   */
  function handleImageContentChange(
    data: UploadChangeParam,
  ) {
    // 用户凭证检测
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    // TODO `onRemove`和`图片更新`都会触发`onChange`
    // TODO 所以使用 data.file.hasOwnProperty(originFileObj)来区分两者, 做不同处理

    if (data.file['originFileObj']) {
      // 如果是删除图片
      const removedFile = data.file;

      const nFileIndex = state.imageList.indexOf(removedFile);
      const newImageList = state.imageList.slice();
      const newImageContentList = state.pinInfo.imageContent.slice();

      newImageList.splice(nFileIndex, 1);
      newImageContentList.splice(nFileIndex, 1);

      setState({
        ...state,
        imageList: newImageList,
        pinInfo: {
          ...state.pinInfo,
          imageContent: newImageContentList,
        },
      });
    } else {
      // 反之, 如果是上传图片
      // 上传至七牛云
      query({
        url: '/api/upload/qiniu/info',
        method: 'GET',
        data: {
          userId,
        },
        jsonp: false,
      }).then((res) => {
        const pinImg = data.file as any;

        const date: string = new Date().toLocaleDateString();
        const {
          uploadToken,
          domain,
        } = res.data.qiniuInfo;
        const key: string = `${date}/user/${userId}/pin/images/${Date.now()}`;

        const $qiniu: Qiniu.Observable = Qiniu.upload(
          pinImg,
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
            // 处理前的原图
            const finalOriginImgUrl: string = `https://${domain}/${key}`;

            setState({
              ...state,
              imageList: data.fileList,
              pinInfo: {
                ...state.pinInfo,
                imageContent: state.pinInfo.imageContent.concat({
                  originUrl: finalOriginImgUrl,
                  processedUrl: finalOriginImgUrl,
                }),
              },
            });
          },
        });
      })
    }
  }

  /**
   * [处理] - 所选话题的更新
   * @param topicId 话题的id
   */
  function handleTopicChange(
    topicInfo: IBaseCommonTopicInfo,
  ) {
    setState({
      ...state,
      pinInfo: {
        ...state.pinInfo,
        topic: {
          _id: topicInfo._id,
          name: topicInfo.name,
        },
      },
    });
  }

  /**
   * [处理] - 发送沸点
   */
  function handleSend() {
    // TODO 提交沸点前的逻辑处理
    // 用户凭证检测
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    // ? 文本内容不能为空
    const { pinInfo } = state;

    if (!pinInfo.plainContent) {
      return message.info('不能发送空的沸点!');
    }

    // ? 话题不能为空
    if (!pinInfo.topic) {
      return message.info('至少选择一个话题!');
    }

    console.log(state.pinInfo);
  }

  return (
    <EditWrapper>
      <EditMain>
        <Row>
          <Col>
            {/* 沸点文字输入区 */}
            <BasePinEditInput
              pinInfo={state}
              onPlainContentChange={handlePlainContentChange}
            />
          </Col>
        </Row>
        <Row style={{
          marginTop: 8,
        }}>
          <Col span={20}>
            {/* 沸点附加信息区 */}
            <BasePinEditAction
              imageList={state}
              onImageContentChange={handleImageContentChange}
              onTopicContentChange={handleTopicChange}
            />
          </Col>
          <Col span={4}>
            {/* 沸点发送区 */}
            <BasePinEditSend
              onSend={handleSend}
            />
          </Col>
        </Row>
      </EditMain>
    </EditWrapper>
  );
});

export default withRouter(BasePinEdit);