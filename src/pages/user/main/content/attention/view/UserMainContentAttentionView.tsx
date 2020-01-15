import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
} from 'antd';

import {
  ViewWrapper,
  ViewMain,
} from './style';
import { query } from 'services/request';
import { IBasicUserInfo, IBasicTopicInfo } from 'pages/basic.types';
import UserMainContentAttentionViewUser from './user/UserMainContentAttentionViewUser';
import UserMainAttentionViewTopic from './topic/UserMainAttentionViewTopic';
import { TRACK_TYPE } from 'constants/constants';

export interface IUserMainContentAttentionViewProps extends RouteComponentProps<{
  id: string,
  type: string,
}>  {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};
export interface IUserMainContentAttentionViewState {
  userAttentionList: Array<IBasicUserInfo & { is_attention: boolean }>; // 关注的用户列表
  topicAttentionList: Array<IBasicTopicInfo & { is_attention: boolean }>; // 关注的话题列表
};


const UserMainContentAttentionView = React.memo((props: IUserMainContentAttentionViewProps) => {
  const [state, setState] = React.useState<IUserMainContentAttentionViewState>({
    userAttentionList: [],
    topicAttentionList: [],
  });

  React.useEffect(() => {
    _getAttentionListFromServer();
  }, []);

  /**
   * @description 获取用户的关注列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _getAttentionListFromServer() {
    const userId = localStorage.getItem('userid');
    const ownerId = props.match.params.id;
    const attentionType = props.match.params.type;

    query({
      method: 'GET',
      url: '/api/user/info/partial/attention/list_by_type',
      jsonp: false,
      data: {
        userId,
        ownerId,
        attentionType,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const attentionList = resData.attentionList;

        setState({
          ...state,
          [`${attentionType}AttentionList`]: attentionList,
        });
      } else if (resCode === 1) {
        message.info(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * @description 初始化我的关注列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _initAttentionList() {
    const attentionType = props.match.params.type;

    // TODO: 根据不同的关注类型, 初始化不同的列表

    if (attentionType === 'user') {
      return (
        <UserMainContentAttentionViewUser
          isOwner={props.isOwner}
          attentionList={state.userAttentionList}
          onToggleUserAttention={handleToggleUserAttention}
        />
      );
    } else if (attentionType === 'topic') {
      return (
        <UserMainAttentionViewTopic
          isOwner={props.isOwner}
          attentionList={state.topicAttentionList}
          onToggleTopicAttention={handleToggleTopicAttention}
        />
      );
    }

    return null;
  }

  /**
   * @description 切换关注的用户列表的当前关注状态
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleToggleUserAttention(
    peopleId: string,
    isAttention: boolean,
  ) {
    const trackType = TRACK_TYPE.attention.people;
    const fromUserId = localStorage.getItem('userid');
    const toUserId = peopleId;
    const newIsAttention = !isAttention;

    query({
      method: 'POST',
      url: '/api/action/attention/people',
      jsonp: false,
      data: {
        trackType,
        fromUserId,
        toUserId,
        isAttention: newIsAttention,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      if (resCode === 0) {
        // TODO: 更新关注的用户列表的指定项的状态
        const newUserAttentionList = state.userAttentionList.map((v) => {
          if (v._id === toUserId) {
            return {
              ...v,
              is_attention: newIsAttention,
            };
          } else {
            return v;
          }
        });

        setState({
          ...state,
          userAttentionList: newUserAttentionList,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * @description 切换关注的话题列表的当前关注状态
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleToggleTopicAttention(
    topicId: string,
    isAttention: boolean,
  ) {
    const trackType = TRACK_TYPE.attention.topic;
    const userId = localStorage.getItem('userid');
    const newIsAttention = !isAttention

    query({
      method: 'POST',
      url: '/api/action/attention/topic',
      jsonp: false,
      data: {
        userId,
        topicId,
        trackType,
        isAttention: newIsAttention,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message

      if (resCode === 0) {
        // TODO: 更新关注的话题列表的指定项的状态
        const newTopicAttentionList = state.topicAttentionList.map((v) => {
          if (v._id === topicId) {
            return {
              ...v,
              is_attention: newIsAttention,
            };
          } else {
            return v;
          }
        });

        setState({
          ...state,
          topicAttentionList: newTopicAttentionList,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <ViewWrapper>
      <ViewMain>
        {_initAttentionList()}
      </ViewMain>
    </ViewWrapper>
  );
});


export default withRouter(UserMainContentAttentionView);