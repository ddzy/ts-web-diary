import * as React from 'react';

import {
  ImagesWrapper,
  ImagesMain,
} from './style';


export interface IChatCollectionsImagesProps { };

const ChatCollectionsImages = React.memo((props: IChatCollectionsImagesProps) => {
  return (
    <ImagesWrapper>
      <ImagesMain>
        <h3>收藏的图片内容</h3>
      </ImagesMain>
    </ImagesWrapper>
  );
});

export default ChatCollectionsImages;