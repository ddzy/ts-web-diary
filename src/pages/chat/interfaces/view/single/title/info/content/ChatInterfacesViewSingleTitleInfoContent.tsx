import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';
import {
  notification,
  Descriptions,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import { query } from 'services/request';
import { formatTimeByYYYYMMDD } from 'utils/utils';


export interface IChatInterfacesViewSingleTitleInfoContentProps extends RouteComponentProps {
  match: match<{
    // ? 单聊唯一标识
    id: string,
  }>;
};
export type IChatInterfacesViewSingleTitleInfoContentState = typeof inititalState;

const inititalState = {
  chatSingleDetail: {
    // ? 聊天唯一标识id
    chat_id: '',
    // ? 发起的用户
    create_by_user: '',
    // ? 会话消息总数
    message_total: 0,
    // ? 单聊创建时间
    create_time: Date.now(),
    // ? 最近一次的会话时间
    last_message_time: Date.now(),
    // ? 单聊最近更新时间
    update_time: Date.now(),
  },
};

const ChatInterfacesViewSingleTitleInfoContent = React.memo((props: IChatInterfacesViewSingleTitleInfoContentProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleTitleInfoContentState>(inititalState);

  React.useEffect(() => {
    _getChatSingleInfo();
  }, []);

  /**
   * [获取] - 单聊详细信息
   */
  function _getChatSingleInfo() {
    const chatId = props.match.params.id;
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      props.history.push('/login');

      notification.error({
        message: '错误',
        description: 'token已过期, 请重新登录'
      });
    } else {
      query({
        jsonp: false,
        url: '/api/chat/info/single/detail',
        method: 'GET',
        data: {
          userId,
          chatId,
        },
      }).then((res) => {
        const { chat_single_detail } = res.data;

        setState({
          ...state,
          chatSingleDetail: {
            ...state.chatSingleDetail,
            ...chat_single_detail,
          },
        });
      });
    }
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <Descriptions title={'单聊信息'} bordered={true} column={1} size={'default'}>
          <Descriptions.Item label={'发起人'}>
            {state.chatSingleDetail.create_by_user}
          </Descriptions.Item>
          <Descriptions.Item label={'消息总数'}>
            {state.chatSingleDetail.message_total}
          </Descriptions.Item>
          <Descriptions.Item label={'创建时间'}>
            {formatTimeByYYYYMMDD(state.chatSingleDetail.create_time)}
          </Descriptions.Item>
          <Descriptions.Item label={'最后会话时间'}>
            {formatTimeByYYYYMMDD(state.chatSingleDetail.last_message_time)}
          </Descriptions.Item>
          <Descriptions.Item label={'最近更新于'}>
            {formatTimeByYYYYMMDD(state.chatSingleDetail.update_time)}
          </Descriptions.Item>
        </Descriptions>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleTitleInfoContent);