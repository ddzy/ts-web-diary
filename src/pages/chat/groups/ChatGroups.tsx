import * as React from 'react';

import {
  GroupsWrapper,
  GroupsMain,
} from './style';


export interface IChatGroupsProps {

};


export default function ChatGroups(props: IChatGroupsProps) {
  return (
    <GroupsWrapper>
      <GroupsMain>
        群聊列表视图
      </GroupsMain>
    </GroupsWrapper>
  );
}