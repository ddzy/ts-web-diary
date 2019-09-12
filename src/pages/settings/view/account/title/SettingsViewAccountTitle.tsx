import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleMainText,
} from './style';


export interface ISettingsViewAccountTitleProps { };
export interface ISettingsViewAccountTitleState { }


const SettingsViewAccountTitle = React.memo((props: ISettingsViewAccountTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleMainText>
          账号关联
        </TitleMainText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default SettingsViewAccountTitle;