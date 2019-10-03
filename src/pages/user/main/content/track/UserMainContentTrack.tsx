import * as React from 'react';

import {
  TrackWrapper,
  TrackMain,
} from './style';


export interface IUserMainContentTrackProps { };
export interface IUserMainContentTrackState { };


const UserMainContentTrack = React.memo((props: IUserMainContentTrackProps) => {
  return (
    <TrackWrapper>
      <TrackMain>
        我的足迹
      </TrackMain>
    </TrackWrapper>
  );
});


export default UserMainContentTrack;