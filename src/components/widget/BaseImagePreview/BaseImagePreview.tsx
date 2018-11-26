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
};
interface IBaseImagePreviewState {
  visible: boolean;
};

/**
 * 图片预览组件
 */
export default class BaseImagePreview extends React.PureComponent<IBaseImagePreviewProps, IBaseImagePreviewState> {

  public static getDerivedStateFromProps = (nextProps: IBaseImagePreviewProps) => {
    return {
      visible: nextProps.visible,
    };
  }

  public previewRef: any

  public readonly state = {
    visible: this.props.visible,
  }

  public handleGetContainerRef = (el: any) => {
    this.previewRef = el;
  }

  public render(): JSX.Element {
    return (
      <ImagePreviewContainer
        ref={this.handleGetContainerRef}
        visible={this.state.visible}
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