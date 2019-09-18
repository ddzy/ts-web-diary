import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import PinMainEditActionTopicContentSearch from './search/PinMainEditActionTopicContentSearch';
import PinMainEditActionTopicContentDisplay from './display/PinMainEditActionTopicContentDisplay';


export interface IPinMainViewEditActionTopicContentProps { };
export interface IPinMainViewEditActionTopicContentState { }


const PinMainViewEditActionTopicContent = React.memo((props: IPinMainViewEditActionTopicContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        {/* 话题搜索框区块 */}
        <PinMainEditActionTopicContentSearch />

        {/* 话题列表展示区块 */}
        <PinMainEditActionTopicContentDisplay />
      </ContentMain>
    </ContentWrapper>
  );
});

export default PinMainViewEditActionTopicContent;