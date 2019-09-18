import * as React from 'react';

import {
  NavWrapper,
  NavMain,
} from './style';


export interface IPinMainNavProps { };
export interface IPinMainNavState { }


const PinMainNav = React.memo((props: IPinMainNavProps) => {
  return (
    <NavWrapper>
      <NavMain>
        左侧导航区块
      </NavMain>
    </NavWrapper>
  );
});

export default PinMainNav;