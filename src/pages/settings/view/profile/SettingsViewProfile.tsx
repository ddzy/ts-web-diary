import * as React from 'react';

import {
  ProfileWrapper,
  ProfileMain,
} from './style';
import SettingsViewProfileTitle from './title/SettingsViewProfileTitle';
import SettingsViewProfileEdit from './edit/SettingsViewProfileEdit';


export interface ISettingsViewProfileProps { };
export interface ISettingsViewProfileState { }


const SettingsViewProfile = React.memo((props: ISettingsViewProfileProps) => {
  return (
    <ProfileWrapper>
      <ProfileMain>
        {/* 标题区 */}
        <SettingsViewProfileTitle />

        {/* 编辑区 */}
        <SettingsViewProfileEdit />
      </ProfileMain>
    </ProfileWrapper>
  );
});

export default SettingsViewProfile;