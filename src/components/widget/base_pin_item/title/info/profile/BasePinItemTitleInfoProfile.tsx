import * as React from 'react';
import {
  Divider,
} from 'antd';

import {
  ProfileWrapper,
  ProfileMain,
  ProfileMainTitle,
  ProfileMainInfo,
  ProfileMainInfoDescription,
  ProfileMainInfoTime,
} from './style';


export interface IBasePinItemTitleInfoProfileProps { };
export interface IBasePinItemTitleInfoProfileState { }


const BasePinItemTitleInfoProfile = React.memo((props: IBasePinItemTitleInfoProfileProps) => {
  return (
    <ProfileWrapper>
      <ProfileMain>
        {/* 沸点作者名称区 */}
        <ProfileMainTitle>
          清蒸不是水煮
        </ProfileMainTitle>

        {/* 沸点作者信息区 */}
        <ProfileMainInfo>
          {/* 沸点作者的简介 */}
          <ProfileMainInfoDescription>
            全干工程师
          </ProfileMainInfoDescription>

          <Divider
            type="vertical"
            style={{
              height: 3,
              width: 3,
              backgroundColor: '#ccc',
              borderRadius: '50%',
            }}
          />

          {/* 沸点的创建时间 */}
          <ProfileMainInfoTime>
            2 天前
          </ProfileMainInfoTime>
        </ProfileMainInfo>
      </ProfileMain>
    </ProfileWrapper>
  );
});

export default BasePinItemTitleInfoProfile;