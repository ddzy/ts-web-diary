import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  ExtraWrapper,
  ExtraMain,
} from './style';


export interface IBasePinItemTitleActionExtraProps { };
export interface IBasePinItemTitleActionExtraState { }


const BasePinItemTitleActionExtra = React.memo((props: IBasePinItemTitleActionExtraProps) => {
  return (
    <ExtraWrapper>
      <ExtraMain>
        <Icon
          type="unordered-list"
          style={{
            fontSize: 18,
          }}
        />
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default BasePinItemTitleActionExtra;