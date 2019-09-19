import * as React from 'react';
import {
  Button,
  Upload,
} from 'antd';

import {
  ImageWrapper,
  ImageMain,
} from './style';


export interface IBasePinEditActionImageProps { };
export interface IBasePinEditActionImageState { }


const BasePinEditActionImage = React.memo((props: IBasePinEditActionImageProps) => {
  return (
    <ImageWrapper>
      <ImageMain>
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
        >
          <Button
            type="link"
            icon="file-image"
          >图片</Button>
        </Upload>
      </ImageMain>
    </ImageWrapper>
  );
});

export default BasePinEditActionImage;