import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  LogoWrapper,
  LogoMain,
  LogoMainLink,
} from './style';


export interface IHeaderMainDummyLogoProps { };


const HeaderMainDummyLogo = React.memo((
  props: IHeaderMainDummyLogoProps,
): JSX.Element => {
  return (
    <LogoWrapper>
      <LogoMain>
        <LogoMainLink href="https://github.com/ddzy" target="_blank">
          <Icon
            type="github"
            theme="filled"
            title={'github'}
          />
        </LogoMainLink>
      </LogoMain>
    </LogoWrapper>
  );
});


export default HeaderMainDummyLogo;