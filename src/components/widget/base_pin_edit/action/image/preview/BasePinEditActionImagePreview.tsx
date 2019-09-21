import * as React from 'react';

import {
  PreviewWrapper,
  PreviewMain,
  PreviewMainImageBox,
  PreviewMainLink,
  PreviewMainImage,
} from './style';


export interface IBasePinEditActionImagePreviewProps {
  // ? 预览的图片信息
  previewImageInfo: {
    name: string,
    url: string,
  };
};
export interface IBasePinEditActionImagePreviewState { }


const BasePinEditActionImagePreview = React.memo((props: IBasePinEditActionImagePreviewProps) => {
  return (
    <PreviewWrapper>
      <PreviewMain>
        {/* 图片区 */}
        <PreviewMainImageBox>
          <PreviewMainLink
            title="点击查看大图"
            target="_blank"
            href={props.previewImageInfo.url}
          >
            <PreviewMainImage
              src={props.previewImageInfo.url}
              alt={props.previewImageInfo.name}
            />
          </PreviewMainLink>
        </PreviewMainImageBox>
      </PreviewMain>
    </PreviewWrapper>
  );
});

export default BasePinEditActionImagePreview;