import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
  List,
  Empty,
} from 'antd';

import {
  TrackWrapper,
  TrackMain,
} from './style';
import { query } from 'services/request';
import {
  TRACK_TYPE,
} from 'constants/constants';
import UserMainContentTrackAttentionPeople from './attention/people/UserMainContentTrackAttentionPeople';
import UserMainContentTrackAttentionTopic from './attention/topic/UserMainContentTrackAttentionTopic';
import UserMainContentTrackStarArticleSelf from './star/article/self/UserMainContentTrackStarArticleSelf';


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
    const { ownerTrackList } = state;

    return ownerTrackList.length === 0
      ? (
        <Empty description="暂时没有更多足迹~" />
      )
      : ownerTrackList.map((v) => {
        return (
          <List.Item
            key={v._id}
            style={{
              borderBottom: 'none',
            }}
          >
            {_initTrackContent(v)}
          </List.Item>
        )
      })
  }

  /**
   * [初始化] - 根据足迹的不同类型, 初始化对应的内容
   * @param v 足迹的相关信息值
   */
  function _initTrackContent(
    v: any,
  ) {
    const type = v.type;

    switch (type) {
      case TRACK_TYPE.attention.people: {
        return (
          <UserMainContentTrackAttentionPeople
            trackInfo={v}
          />
        );
      };
      case TRACK_TYPE.attention.topic: {
        return (
          <UserMainContentTrackAttentionTopic
            trackInfo={v}
          />
        );
      };
      case TRACK_TYPE.star.article.self: {
        return (
          <UserMainContentTrackStarArticleSelf
            trackInfo={v}
          />
        );
      };
      default: {
        return (<React.Fragment />)
      };
    }
  }

  return (
    <TrackWrapper>
      <TrackMain>
        <List>
          {_initTrackList()}
        </List>
      </TrackMain>
    </TrackWrapper>
  );
});


export default withRouter(UserMainContentTrack);