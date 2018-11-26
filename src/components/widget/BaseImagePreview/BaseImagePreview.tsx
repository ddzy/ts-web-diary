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
interface IBaseImagePreviewState {
  visible: boolean;
};

/**
 * 图片预览组件
 */
export default class BaseImagePreview extends React.PureComponent<IBaseImagePreviewProps, IBaseImagePreviewState> {

  public render(): JSX.Element {
    return (
      <ImagePreviewContainer
        visible={this.props.visible}
        onClick={this.props.onImagePreviewContainerClick}
      >
        <ImagePreviewMain>
          <PreviewMainContent>
            <PreviewLink>
              <PreviewImage
                srcSet={this.props.currentUrl}
              />
            </PreviewLink>
          </PreviewMainContent>
        </ImagePreviewMain>
      </ImagePreviewContainer>
    );
  }
}