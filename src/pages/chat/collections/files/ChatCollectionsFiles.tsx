import * as React from 'react';

import {
  FilesWrapper,
  FilesMain,
} from './style';


export interface IChatCollectionsFilesProps { };

const ChatCollectionsFiles = React.memo((props: IChatCollectionsFilesProps) => {
  return (
    <FilesWrapper>
      <FilesMain>
        收藏的文件内容
      </FilesMain>
    </FilesWrapper>
  );
});

export default ChatCollectionsFiles;