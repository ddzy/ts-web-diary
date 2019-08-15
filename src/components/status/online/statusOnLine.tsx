import * as React from 'react';

import {
  OnLineWrapper,
  OnLineMain,
  OnLineMainTitle,
  OnLineMainTitleText,
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
        <OnLineMainTitle>
          <OnLineMainTitleText>
            站内实时在线人数
          </OnLineMainTitleText>
        </OnLineMainTitle>
        <OnLineMainContent>
          <OnLineMainContentText>
            {props.userOnLineTotal}
          </OnLineMainContentText>
        </OnLineMainContent>
      </OnLineMain>
    </OnLineWrapper>
  );
});

export default StatusOnLine;