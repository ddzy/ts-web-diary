import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleMainText,
} from './style';


export interface ISettingsViewProfileTitleProps { };
export interface ISettingsViewProfileTitleState { }


const SettingsViewProfileTitle = React.memo((props: ISettingsViewProfileTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleMainText>
          个人资料
        </TitleMainText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default SettingsViewProfileTitle;