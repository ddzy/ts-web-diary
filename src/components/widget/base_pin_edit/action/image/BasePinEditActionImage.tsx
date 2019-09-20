import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Button,
  Upload,
  Icon,
  Badge,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import {
  ImageWrapper,
  ImageMain,
} from './style';
import { IBasePinEditState } from '../../BasePinEdit';


export interface IBasePinEditActionImageProps {
  // ? 本地的图片列表
  imageList: Pick<IBasePinEditState, 'imageList'>;

  onImageContentChange: (
    info: UploadChangeParam
  ) => void;
};
export interface IBasePinEditActionImageState {
  // ? 是否显示沸点图片长传框
  isShowUploadImageComponent: boolean;
}


const BasePinEditActionImage = React.memo((props: IBasePinEditActionImageProps) => {
  const [state, setState] = React.useState<IBasePinEditActionImageState>({
    isShowUploadImageComponent: false,
  });

  const $uploadNode = (
    <Upload
      listType="picture-card"
      beforeUpload={() => false}
      fileList={props.imageList.imageList}
      onChange={props.onImageContentChange}
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
    </ImageWrapper>
  );
});

export default BasePinEditActionImage;