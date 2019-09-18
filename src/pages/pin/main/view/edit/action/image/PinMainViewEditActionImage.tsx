import * as React from 'react';
import {
  Button,
  Upload,
} from 'antd';

import {
  ImageWrapper,
  ImageMain,
} from './style';


export interface IPinMainViewEditActionImageProps { };
export interface IPinMainViewEditActionImageState { }


const PinMainViewEditActionImage = React.memo((props: IPinMainViewEditActionImageProps) => {
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

export default PinMainViewEditActionImage;