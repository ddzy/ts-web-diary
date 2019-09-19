import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import PinMainEditActionTopicContentSearch from './search/BasePinEditActionTopicContentSearch';
import PinMainEditActionTopicContentDisplay from './display/BasePinEditActionTopicContentDisplay';


export interface IBasePinEditActionTopicContentProps { };
export interface IBasePinEditActionTopicContentState { }


const BasePinEditActionTopicContent = React.memo((props: IBasePinEditActionTopicContentProps) => {
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

export default BasePinEditActionTopicContent;