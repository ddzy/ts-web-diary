import * as React from 'react';

import {
  PinWrapper,
  PinContent,
} from './style';
import PinMain from './main/PinMain';


export interface IPinProps { };
export interface IPinState { }


const Pin = React.memo((props: IPinProps) => {
  return (
    <PinWrapper>
      <PinContent>
        {/* 主内容区块 */}
        <PinMain />
      </PinContent>
    </PinWrapper>
  );
});

export default Pin;