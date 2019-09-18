import * as React from 'react';

import {
  ExtraWrapper,
  ExtraMain,
} from './style';


export interface IPinMainExtraProps { };
export interface IPinMainExtraState { }


const PinMainExtra = React.memo((props: IPinMainExtraProps) => {
  return (
    <ExtraWrapper>
      <ExtraMain>
        额外信息区
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default PinMainExtra;