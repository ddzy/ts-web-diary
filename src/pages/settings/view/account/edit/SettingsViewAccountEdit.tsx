import * as React from 'react';

import {
  EditWrapper,
  EditMain,
  EditMainList,
  EditMainItem,
} from './style';
import SettingsViewAccountEditWechat from './wechat/SettingsViewAccountEditWechat';
import SettingsViewAccountEditWeibo from './weibo/SettingsViewAccountEditWeibo';
import SettingsViewAccountEditGithub from './github/SettingsViewAccountEditGithub';
import SettingsViewAccountEditEmail from './email/SettingsViewAccountEditEmail';
import SettingsViewAccountEditPhone from './phone/SettingsViewAccountEditPhone';


export interface ISettingsViewAccountEditProps { };
export interface ISettingsViewAccountEditState { }


const SettingsViewAccountEdit = React.memo((props: ISettingsViewAccountEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <EditMainList>
          {/* 绑定微信 */}
          <EditMainItem>
            <SettingsViewAccountEditWechat />
          </EditMainItem>

          {/* 绑定微博 */}
          <EditMainItem>
            <SettingsViewAccountEditWeibo />
          </EditMainItem>

          {/* 绑定Github */}
          <EditMainItem>
            <SettingsViewAccountEditGithub />
          </EditMainItem>

          {/* 绑定邮箱 */}
          <EditMainItem>
            <SettingsViewAccountEditEmail />
          </EditMainItem>

          {/* 绑定手机 */}
          <EditMainItem>
            <SettingsViewAccountEditPhone />
          </EditMainItem>
        </EditMainList>
      </EditMain>
    </EditWrapper>
  );
});

export default SettingsViewAccountEdit;