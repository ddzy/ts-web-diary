import * as React from 'react';

import {
  ImagePreviewContainer,
  ImagePreviewMain,
  PreviewMainContent,
  PreviewLink,
  PreviewImage,
} from './style';


export interface IBaseImagePreviewProps {
  currentUrl: string,
  visible: boolean;
  onImagePreviewContainerClick: (
    e: React.MouseEvent,
  ) => void;
};


/**
 * 图片预览组件
 */
const BaseImagePreview: React.SFC<IBaseImagePreviewProps> = (
  props: IBaseImagePreviewProps,
): JSX.Element => {
  return (
    <ImagePreviewContainer
      visible={props.visible}
      onClick={props.onImagePreviewContainerClick}
    >
      <ImagePreviewMain>
        <PreviewMainContent>
          <PreviewLink>
            <PreviewImage
              srcSet={props.currentUrl}
            />
          </PreviewLink>
        </PreviewMainContent>
      </ImagePreviewMain>
    </ImagePreviewContainer>
  );
}


export default BaseImagePreview;