import styled from 'styled-components';

import {
  getWindowWH,
} from '../../../utils/utils';

const { winWidth, winHeight  } = getWindowWH();

export interface IImagePreviewContainerProps {
  visible: boolean;
};
export interface IPreviewImageProps {
  src: string;
};


export const ImagePreviewContainer = styled('div')<IImagePreviewContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: ${winWidth}px;
  height: ${winHeight}px;
  background-color: rgba(0, 0, 0, .6);
  /* transform: scale(${(props: IImagePreviewContainerProps) => props.visible ? 1 : 0}); */
  transform: scale(${(props: IImagePreviewContainerProps) => props.visible ? 1 : 0});
  opacity: ${(props) => props.visible ? 1 : 0};
  transition: opacity .9s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const ImagePreviewMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PreviewMainContent = styled.div``;

export const PreviewLink = styled.a``;

export const PreviewImage = styled<any>('img').attrs({
  src: (props: any) => (props.src ? props.src : undefined),
})`
  cursor: zoom-out;
`;
