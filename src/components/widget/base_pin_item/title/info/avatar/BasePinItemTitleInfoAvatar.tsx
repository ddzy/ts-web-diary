import * as React from 'react';
import {
  Avatar,
} from 'antd';

import {
  AvatarWrapper,
  AvatarMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemTitleInfoAvatarProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'author_id'>;
};
export interface IBasePinItemTitleInfoAvatarState { }


const BasePinItemTitleInfoAvatar = React.memo((props: IBasePinItemTitleInfoAvatarProps) => {
  return (
    <AvatarWrapper>
      <AvatarMain>
        <Avatar
          icon="user"
          src={props.pinInfo.author_id.useravatar}
          size="large"
        />
      </AvatarMain>
    </AvatarWrapper>
  );
});

export default BasePinItemTitleInfoAvatar;