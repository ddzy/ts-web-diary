import * as React from 'react';

import {
  ViewWrapper,
  ViewMain,
} from './style';


export interface IPinMainViewProps { };
export interface IPinMainViewState { }


const PinMainView = React.memo((props: IPinMainViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        主视图区
      </ViewMain>
    </ViewWrapper>
  );
});

export default PinMainView;