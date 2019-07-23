import * as React from 'react';

import {
  CollectionsWrapper,
  CollectionsMain,
} from './style';


export interface IChatCollectionsProps {

};


export default function ChatCollections(props: IChatCollectionsProps) {
  return (
    <CollectionsWrapper>
      <CollectionsMain>
        我的收藏视图
      </CollectionsMain>
    </CollectionsWrapper>
  );
}