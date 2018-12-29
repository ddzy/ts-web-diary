import * as React from 'react';
import {
  Skeleton,
} from 'antd';

import {
  LeftContentContainer,
  LeftContent,
} from './style';
import BaseImagePreview from 'src/components/widget/BaseImagePreview/BaseImagePreview';


export interface IDetailsMainRichProps {
  visible: boolean;
  html: string;
};


const DetailsMainRich = ((props: IDetailsMainRichProps) => {

  const [articleImgPreviewInfo, setState] = React.useState({
    previewBoxVisible: false,
    previewImgUrl: '',
  });

  React.useEffect(handleArticleImagePreview);

  // ** 处理富文本图片预览 **
  function handleArticleImagePreview(): (() => void) {
    const oArticleEle = document
      .querySelector('#article-detail-content') || document.createElement('div');

    function aidedClick(e: MouseEvent): void {
      const oTarget = e.target as HTMLElement;

      if (oTarget.localName === 'img') {
        if (oTarget.hasAttribute('data-src')) {
          const sTargetUrl = oTarget
            .getAttribute('data-src') || '';

          setState({
            previewBoxVisible: true,
            previewImgUrl: sTargetUrl,
          });
        }
      }
    }

    oArticleEle.addEventListener('click', aidedClick);

    return () => {
      oArticleEle.removeEventListener('click', aidedClick);
    };
  }

  // ** 处理图片预览容器点击 **
  function handleImagePreviewContainerClick(): void {
    setState({
      previewBoxVisible: false,
      previewImgUrl: '',
    });
  }

  return (
    <LeftContentContainer>
      <Skeleton
        loading={props.visible}
        active={true}
        paragraph={{
          rows: 5,
        }}
      >

        {/* 内容区 */}
        <LeftContent
          id="article-detail-content"
          dangerouslySetInnerHTML={{
            __html: props.html
          }}
        />

        {/* 图片预览 */}
        <BaseImagePreview
          visible={articleImgPreviewInfo.previewBoxVisible}
          currentUrl={articleImgPreviewInfo.previewImgUrl}
          onImagePreviewContainerClick={handleImagePreviewContainerClick}
        />
      </Skeleton>
    </LeftContentContainer>
  );
});

export default DetailsMainRich;