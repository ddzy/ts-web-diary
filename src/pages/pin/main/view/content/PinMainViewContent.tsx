import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface IPinMainViewContentProps { };
export interface IPinMainViewContentState { }


const PinMainViewContent = React.memo((props: IPinMainViewContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        沸点展示区
      </ContentMain>
    </ContentWrapper>
  );
});

export default PinMainViewContent;