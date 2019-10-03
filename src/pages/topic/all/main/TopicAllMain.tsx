import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
  notification,
} from 'antd';

import {
  MainWrapper,
  MainMain,
} from './style';
import { query } from 'services/request';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import {
  TRACK_TYPE,
} from 'constants/constants';
import TopicAllMainAttention from './attention/TopicAllMainAttention';
import TopicAllMainPossess from './possess/TopicAllMainPossess';


export interface ITopicAllMainProps extends RouteComponentProps { };
export interface ITopicAllMainState {
  topicInfo: {
    // ? 我关注的话题列表
    attentionTopicList: IBaseCommonTopicInfo[],
    // ? 所有话题列表
    allTopicList: IBaseCommonTopicInfo[],
  };
  // ? 是否显示获取首屏数据时的loading
  isShowFirstlyLoading: boolean;
};


const TopicAllMain = React.memo((props: ITopicAllMainProps) => {
  const [state, setState] = React.useState<ITopicAllMainState>({
    topicInfo: {
      attentionTopicList: [],
      allTopicList: [],
    },
    isShowFirstlyLoading: false,
  });

  React.useEffect(() => {
    _getTopicListFromServer();
  }, []);


  /**
   * [获取] - 后台获取话题列表
   * @description 包括我关注的话题 + 全部话题
   */
  function _getTopicListFromServer() {
    setState({
      ...state,
      isShowFirstlyLoading: true,
    });

    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    query({
      method: 'GET',
      jsonp: false,
      url: '/api/topic/self/info/list/attention_and_all',
      data: {
        userId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const topicInfo = resData.topicInfo;
        const {
          attentionTopicList,
          allTopicList,
        } = topicInfo;

        setState({
          ...state,
          topicInfo: {
            ...state.topicInfo,
            attentionTopicList,
            allTopicList,
          },
          isShowFirstlyLoading: false,
        });
      } else {
        message.error(resMessage);

        setState({
          ...state,
          isShowFirstlyLoading: false,
        });
      }
    });
  }

  /**
   * [处理] - 关注 or 取消关注话题
   * @param data 关注话题相关
   * @param callback 回调处理器
   */
  function handleToggleAttention(
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const trackType = TRACK_TYPE.attention.topic;

    query({
      jsonp: false,
      url: '/api/action/attention/topic',
      method: 'POST',
      data: {
        userId,
        trackType,
        ...data,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      if (resCode === 0) {
        // 根据是否关注, 重置话题数组的状态
        const newAttentionTopicList = state.topicInfo.attentionTopicList.map((v) => {
          let newFollowers = v.followers.slice();

          if (data.isAttention) {
            newFollowers = newFollowers.concat(userId);
          } else {
            newFollowers = newFollowers.filter((follower) => follower !== userId);
          }

          if (v._id === data.topicId) {
            return {
              ...v,
              is_attention: data.isAttention,
              followers: newFollowers,
            };
          }

          return v;
        });
        const newAllTopicList = state.topicInfo.allTopicList.map((v) => {
          let newFollowers = v.followers.slice();

          if (data.isAttention) {
            newFollowers = newFollowers.concat(userId);
          } else {
            newFollowers = newFollowers.filter((follower) => follower !== userId);
          }

          if (v._id === data.topicId) {
            return {
              ...v,
              is_attention: data.isAttention,
              followers: newFollowers,
            };
          }

          return v;
        });

        setState({
          ...state,
          topicInfo: {
            ...state.topicInfo,
            attentionTopicList: newAttentionTopicList,
            allTopicList: newAllTopicList,
          },
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <MainWrapper>
      <MainMain>
        {/* 我关注的话题区 */}
        <TopicAllMainAttention
          attentionTopicList={state.topicInfo.attentionTopicList}
          isShowFirstlyLoading={state.isShowFirstlyLoading}
          onToggleAttention={handleToggleAttention}
        />

        {/* 全部话题区 */}
        <TopicAllMainPossess
          allTopicList={state.topicInfo.allTopicList}
          isShowFirstlyLoading={state.isShowFirstlyLoading}
          onToggleAttention={handleToggleAttention}
        />
      </MainMain>
    </MainWrapper>
  );
});


export default withRouter(TopicAllMain);