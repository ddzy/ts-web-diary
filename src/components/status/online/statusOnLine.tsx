import * as React from 'react';
import {
  Statistic,
  Icon,
} from 'antd';

import {
  OnLineWrapper,
  OnLineMain,
  OnLineMainContent,
  OnLineMainContentText,
} from './style';


export interface IStatusOnLineProps {
  userOnLineTotal: number;
};
export interface IStatusOnLineState {
};


const StatusOnLine = React.memo((props: IStatusOnLineProps) => {
  return (
    <OnLineWrapper>
      <OnLineMain>
        <OnLineMainContent>
          <OnLineMainContentText>
            <Statistic
              title={'实时在线人数'}
              value={props.userOnLineTotal}
              prefix={<Icon type="user" />}
            />
          </OnLineMainContentText>
        </OnLineMainContent>
      </OnLineMain>
    </OnLineWrapper>
  );
});

export default StatusOnLine;