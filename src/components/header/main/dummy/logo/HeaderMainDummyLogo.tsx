import * as React from 'react';

import {
  LogoWrapper,
  LogoMain,
} from './style';


export interface IHeaderMainDummyLogoProps { };


const HeaderMainDummyLogo = React.memo((
  props: IHeaderMainDummyLogoProps,
): JSX.Element => {
  return (
    <LogoWrapper>
      <LogoMain>
        <a href="https://github.com/ddzy">ddzy</a>
      </LogoMain>
    </LogoWrapper>
  );
});


export default HeaderMainDummyLogo;