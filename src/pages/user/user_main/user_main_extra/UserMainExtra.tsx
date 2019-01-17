import * as React from 'react';

import {
  ExtraContainer,
  ExtraMain,
} from './style';

export interface IUserMainExtraProps { };


const UserMainExtra = React.memo<IUserMainExtraProps>((
  props: IUserMainExtraProps,
): JSX.Element => {

  return (
    <ExtraContainer>
      <ExtraMain>
        附加信息区域
      </ExtraMain>
    </ExtraContainer>
  );

});


export default UserMainExtra;