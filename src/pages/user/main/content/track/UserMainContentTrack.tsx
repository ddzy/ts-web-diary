import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
} from 'antd';

import {
  TrackWrapper,
  TrackMain,
} from './style';
import { query } from 'services/request';


export interface IUserMainContentTrackProps extends RouteComponentProps<{
  id: string,
}> { };
export interface IUserMainContentTrackState {
  // ? 当前个人中心的主人信息
  ownerInfo: {
    _id: string,
    username: string,
  };
  // ? 当前个人中心的主人足迹列表
  ownerTrackList: any[];
};


const UserMainContentTrack = React.memo((props: IUserMainContentTrackProps) => {
  const [state, setState] = React.useState<IUserMainContentTrackState>({
    ownerInfo: {
      _id: '',
      username: '',
    },
    ownerTrackList: [],
  });

  React.useEffect(() => {
    _getUserTrackListFromServer();
  }, [props.match.params.id]);


  /**
   * [获取] - 后台获取当前主人的足迹列表
   */
  function _getUserTrackListFromServer() {
    const ownerId = props.match.params.id;

    if (ownerId) {
      query({
        method: 'GET',
        jsonp: false,
        url: '/api/user/info/partial/track/list',
        data: {
          ownerId,
        },
      }).then((res) => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const trackInfo = resData.trackInfo;
          const ownerInfo = resData.ownerInfo;
          const ownerTrackList = trackInfo.trackList;

          setState({
            ...state,
            ownerInfo,
            ownerTrackList,
          });
        } else {
          message.error(resMessage);
        }
      });
    }
  }

  /**
   * [初始化] - 足迹列表
   */
  function _initTrackList() {
    console.log(state);

    return null;
  }

  return (
    <TrackWrapper>
      <TrackMain>
        {_initTrackList()}
      </TrackMain>
    </TrackWrapper>
  );
});


export default withRouter(UserMainContentTrack);