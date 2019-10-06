import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
  List,
  Empty,
  Skeleton,
} from 'antd';

import {
  TrackWrapper,
  TrackMain,
} from './style';
import { query } from 'services/request';
import {
  TRACK_TYPE,
  TRACK_PAGE_SIZE_MEDIUM,
} from 'constants/constants';
import UserMainContentTrackAttentionPeople from './attention/people/UserMainContentTrackAttentionPeople';
import UserMainContentTrackAttentionTopic from './attention/topic/UserMainContentTrackAttentionTopic';
import UserMainContentTrackStarArticleSelf from './star/article/self/UserMainContentTrackStarArticleSelf';
import UserMainContentTrackStarPinSelf from './star/pin/self/UserMainContentTrackStarPinSelf';
import UserMainContentTrackCreateArticle from './create/article/UserMainContentTrackCreateArticle';
import UserMainContentTrackCreatePin from './create/pin/UserMainContentTrackCreatePin';


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

  // ? 首次加载足迹列表时的loading
  isFirstLoading: boolean;
  // ? 分页相关: 加载更多足迹时的loading
  isLoadMoreLoading: boolean;
  // ? 分页相关: 是否还有更多足迹
  hasMoreTrack: boolean;
};


const UserMainContentTrack = React.memo((props: IUserMainContentTrackProps) => {
  const [state, setState] = React.useState<IUserMainContentTrackState>({
    ownerInfo: {
      _id: '',
      username: '',
    },
    ownerTrackList: [],
    isFirstLoading: false,
    isLoadMoreLoading: false,
    hasMoreTrack: true,
  });

  React.useEffect(() => {
    _getUserTrackListFromServer('', true);
  }, [props.match.params.id]);


  /**
   * [获取] - 后台获取当前主人的足迹列表
   * @param lastTrackId 上次获取的最后一条足迹
   * @param initialLoad 是否首次加载
   */
  function _getUserTrackListFromServer(
    lastTrackId: string,
    initialLoad: boolean,
  ) {
    const ownerId = props.match.params.id;

    if (ownerId) {
      setState({
        ...state,
        isFirstLoading: initialLoad,
        isLoadMoreLoading: initialLoad,
      });

      const pageSize = TRACK_PAGE_SIZE_MEDIUM;

      query({
        method: 'POST',
        jsonp: false,
        url: '/api/user/info/partial/track/list',
        data: {
          ownerId,
          pageSize,
          lastTrackId,
        },
      }).then((res) => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const trackInfo = resData.trackInfo;
          const ownerInfo = resData.ownerInfo;
          const ownerTrackList = trackInfo.trackList;

          const newOwnerTrackList = initialLoad
            ? ownerTrackList
            : state.ownerTrackList.concat(ownerTrackList);

          setState({
            ...state,
            ownerInfo,
            ownerTrackList: newOwnerTrackList,
            isFirstLoading: false,
            isLoadMoreLoading: false,
            hasMoreTrack: ownerTrackList.length !== 0,
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
      case TRACK_TYPE.star.pin.self: {
        return (
          <UserMainContentTrackStarPinSelf
            trackInfo={v}
          />
        );
      };
      case TRACK_TYPE.create.article: {
        return (
          <UserMainContentTrackCreateArticle
            trackInfo={v}
          />
        );
      };
      case TRACK_TYPE.create.pin: {
        return (
          <UserMainContentTrackCreatePin
            trackInfo={v}
          />
        );
      };
      default: {
        return (<React.Fragment />)
      };
    }
  }

  /**
   * [处理] - 分页加载足迹列表
   * @param page 当前页数
   */
  function handleLoadMoreTrack(
    page: number,
  ) {
    const { ownerTrackList } = state;

    ownerTrackList.length && _getUserTrackListFromServer(
      ownerTrackList[ownerTrackList.length - 1]._id,
      false,
    );
  }

  return (
    <TrackWrapper>
      <TrackMain>
        <InfiniteScroll
          hasMore={state.hasMoreTrack && !state.isLoadMoreLoading}
          pageStart={2}
          initialLoad={false}
          loadMore={handleLoadMoreTrack}
        >
          <List>
            <Skeleton
              active={true}
              loading={state.isFirstLoading}
            >
              <Skeleton
                active={true}
                loading={state.isLoadMoreLoading}
              >
                {_initTrackList()}
              </Skeleton>
            </Skeleton>
          </List>
        </InfiniteScroll>
      </TrackMain>
    </TrackWrapper>
  );
});


export default withRouter(UserMainContentTrack);