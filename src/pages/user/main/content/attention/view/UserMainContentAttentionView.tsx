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

export interface IUserMainContentAttentionViewProps extends RouteComponentProps<{
  id: string,
  type: string,
}>  {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};
export interface IUserMainContentAttentionViewState {
  userAttentionList: IBasicUserInfo[];
  topicAttentionList: IBasicTopicInfo[];
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
    const ownerId = props.match.params.id;
    const attentionType = props.match.params.type;

    query({
      method: 'GET',
      url: '/api/user/info/partial/attention/list_by_type',
      jsonp: false,
      data: {
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
        />
      );
    } else if (attentionType === 'topic') {
      return (
        <UserMainAttentionViewTopic
          isOwner={props.isOwner}
          attentionList={state.topicAttentionList}
        />
      );
    }

    return null;
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