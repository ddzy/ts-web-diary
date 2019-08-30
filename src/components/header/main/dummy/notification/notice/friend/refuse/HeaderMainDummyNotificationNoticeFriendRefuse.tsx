import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import {
  Input,
} from 'antd';

import {
  RefuseWrapper,
  RefuseMain,
  MainTitle,
  MainTitleText,
  MainDescription,
} from './style';


export interface IHeaderMainDummyNotificationNoticeFriendRefuseProps {
  // ? 拒绝加好友的相关信息
  notificationInfo: {
    from_user_id: string;
    to_user_id: string;
    to_user_name: string;
    description: string;
  };
};


const HeaderMainDummyNotificationNoticeFriendRefuse = React.memo((props: IHeaderMainDummyNotificationNoticeFriendRefuseProps) => {
  return (
    <RefuseWrapper>
      <RefuseMain>
        {/* 文本消息区 */}
        <MainTitle>
          <MainTitleText>
            用户
            <NavLink
              to={`/user/${props.notificationInfo.to_user_id}`}
            >  {props.notificationInfo.to_user_name}</NavLink>  拒绝了你的好友申请!
          </MainTitleText>
        </MainTitle>

        {/* 备注区 */}
        <MainDescription>
          <Input.TextArea
            defaultValue={props.notificationInfo.description}
            disabled={true}
            autosize={false}
          />
        </MainDescription>

      </RefuseMain>
    </RefuseWrapper>
  );
});

export default HeaderMainDummyNotificationNoticeFriendRefuse;