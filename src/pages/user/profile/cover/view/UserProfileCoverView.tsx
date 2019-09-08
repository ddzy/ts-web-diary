import * as React from 'react';

import {
  ViewWrapper,
  ViewMain,
} from './style';


export interface IUserProfileCoverViewProps {
  // ? 封面图片地址
  coverImgUrl: string;
};
export interface IUserProfileCoverViewState { }


const UserProfileCoverView = React.memo((props: IUserProfileCoverViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain url={props.coverImgUrl} />
    </ViewWrapper>
  );
});

export default UserProfileCoverView;