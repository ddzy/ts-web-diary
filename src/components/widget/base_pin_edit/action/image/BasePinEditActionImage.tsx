import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Button,
  Upload,
  Icon,
  Badge,
  Modal,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

import {
  ImageWrapper,
  ImageMain,
} from './style';
import { IBasePinEditState } from '../../BasePinEdit';
import BasePinEditActionImagePreview from './preview/BasePinEditActionImagePreview';


export interface IBasePinEditActionImageProps {
  // ? 本地的图片列表
  imageList: Pick<IBasePinEditState, 'imageList'>;

  onImageContentChange: (
    info: UploadChangeParam
  ) => void;
};
export interface IBasePinEditActionImageState {
  // ? 是否显示沸点图片上传框
  isShowUploadImageComponent: boolean;
  // ? 是否显示图片预览模态框
  isShowPreviewImageModal: boolean;

  // ? 预览的图片相关信息
  previewImageInfo: {
    url: string,
    name: string,
  };
}


const BasePinEditActionImage = React.memo((props: IBasePinEditActionImageProps) => {
  const [state, setState] = React.useState<IBasePinEditActionImageState>({
    isShowUploadImageComponent: false,
    isShowPreviewImageModal: false,
    previewImageInfo: {
      url: '',
      name: '',
    },
  });

  const $uploadNode = (
    <Upload
      listType="picture-card"
      accept="image/jpg, image/jpeg, image/png, image/gif"
      beforeUpload={() => false}
      fileList={props.imageList.imageList}
      onChange={props.onImageContentChange}
      onPreview={handleImageContentPreview}
    >
      {
        props.imageList.imageList.length >= 9 ? null : (<div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>)
      }
    </Upload>
  )


  /**
   * [处理] - 动态切换上传图片的组件的显隐
   * @description 切换时, 已经上传的图片列表不会丢失
   */
  function handleToggleUploadImageContainer() {
    const newisShowUploadImageComponent = !state.isShowUploadImageComponent;

    if (newisShowUploadImageComponent) {
      ReactDOM.unmountComponentAtNode(
        document.querySelector('#pin-main-view-edit-image-container') as HTMLDivElement,
      );
    }

    setState({
      ...state,
      isShowUploadImageComponent: newisShowUploadImageComponent,
    });
  }

  /**
   * [处理] - 隐藏预览图片的模态框
   */
  function handlePreviewModalHide() {
    setState({
      ...state,
      isShowPreviewImageModal: false,
      previewImageInfo: {
        url: '',
        name: '',
      },
    });
  }

  /**
   * [处理] - 上传至本地列表的图片预览
   * @param imageFile 即将预览的图片
   */
  function handleImageContentPreview(
    imageFile: UploadFile,
  ) {
    const oOriginImageFile = imageFile.originFileObj as any;
    // 获取预览的链接, 此为上传至七牛云之后动态添加的属性
    const sPreviewImageUrl = oOriginImageFile.url;
    const sPreviewImageName = oOriginImageFile.name;

    setState({
      ...state,
      isShowPreviewImageModal: true,
      previewImageInfo: {
        url: sPreviewImageUrl,
        name: sPreviewImageName,
      },
    });
  }

  return (
    <ImageWrapper>
      <ImageMain>
        <Badge
          count={props.imageList.imageList.length}
          offset={[-10, 0]}
        >
          <Button
            type="link"
            icon="file-image"
            onClick={handleToggleUploadImageContainer}
          >
            图片
          </Button>
        </Badge>

        {/* 动态挂载至输入框的图片展示区域 */}
        {
          state.isShowUploadImageComponent && ReactDOM.createPortal(
            $uploadNode,
            document.querySelector('#pin-main-view-edit-image-container') || document.body,
          )
        }
      </ImageMain>

      {/* 本地图片预览模态框 */}
      <Modal
        footer={null}
        visible={state.isShowPreviewImageModal}
        onCancel={handlePreviewModalHide}
      >
        <BasePinEditActionImagePreview
          previewImageInfo={state.previewImageInfo}
        />
      </Modal>
    </ImageWrapper>
  );
});

export default BasePinEditActionImage;