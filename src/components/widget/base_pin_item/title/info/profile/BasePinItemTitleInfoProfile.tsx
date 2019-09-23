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
import {
  ICommonBasePinItemInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';
import { formatTime } from 'utils/utils';


export interface IBasePinItemTitleInfoProfileProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'create_time' | 'author_id'>;
};
export interface IBasePinItemTitleInfoProfileState { }


const BasePinItemTitleInfoProfile = React.memo((props: IBasePinItemTitleInfoProfileProps) => {
  return (
    <ProfileWrapper>
      <ProfileMain>
        {/* 沸点作者名称区 */}
        <ProfileMainTitle>
          {props.pinInfo.author_id.username}
        </ProfileMainTitle>

        {/* 沸点作者信息区 */}
        <ProfileMainInfo>
          {/* 沸点作者的简介 */}
          <ProfileMainInfoDescription>
            {
              props.pinInfo.author_id.job
              || props.pinInfo.author_id.website
              || props.pinInfo.author_id.introduction
              || '保密'
            }
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
            {formatTime(props.pinInfo.create_time)}
          </ProfileMainInfoTime>
        </ProfileMainInfo>
      </ProfileMain>
    </ProfileWrapper>
  );
});

export default BasePinItemTitleInfoProfile;