import * as React from 'react';

import {
  ProfileWrapper,
  ProfileMain,
} from './style';


export interface ISettingsViewProfileProps { };
export interface ISettingsViewProfileState { }


const SettingsViewProfile = React.memo((props: ISettingsViewProfileProps) => {
  return (
    <ProfileWrapper>
      <ProfileMain>
        个人资料编辑
      </ProfileMain>
    </ProfileWrapper>
  );
});

export default SettingsViewProfile;