import * as React from 'react';

import {
  MainLogoContainer,
  MainLogoContent,
} from './style';


export interface IHeaderMainLogoProps { };


const HeaderMainLogo: React.SFC<IHeaderMainLogoProps> = (): JSX.Element => {
  return (
    <MainLogoContainer>
      <MainLogoContent>
        <a href="https://github.com/ddzy">ddzy</a>
      </MainLogoContent>
    </MainLogoContainer>
  );
}


export default HeaderMainLogo;