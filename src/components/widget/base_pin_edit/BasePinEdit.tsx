import * as React from 'react';
import {
  Row,
  Col,
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


export interface IBasePinEditProps { };
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
    topic: string[],
  };

  // ? 本地图片列表
  imageList: UploadFile[];
}


const BasePinEdit = React.memo((props: IBasePinEditProps) => {
  const [state, setState] = React.useState<IBasePinEditState>({
    pinInfo: {
      plainContent: '',
      imageContent: [],
      linkContent: {
        title: '',
        domain: '',
        coverImgUrl: '',
      },
      topic: [],
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
    console.log(data);

    // TODO 上传至七牛云
    setState({
      ...state,
      imageList: data.fileList,
    });
  }

  /**
   * [处理] - 发送沸点
   */
  function handleSend() {
    // TODO 非空逻辑处理

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
              imageList={state}
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

export default BasePinEdit;