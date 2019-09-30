import * as React from 'react';
import {
  Button,
  Avatar,
  notification,
  message,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainAvatarBox,
  ContentMainNameBox,
  ContentMainName,
  ContentMainAttentionBox,
  ContentMainDescriptionBox,
  ContentMainDescription,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';
import { query } from 'services/request';


export interface ITopicSingleAsideInfoContentProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
export interface ITopicSingleAsideInfoContentState {
  // ? 用户是否关注了该话题
  isAttentionTopic: boolean;
};


const TopicSingleAsideInfoContent = React.memo((props: ITopicSingleAsideInfoContentProps) => {
  const [state, setState] = React.useState<ITopicSingleAsideInfoContentState>({
    isAttentionTopic: false,
  });

  React.useEffect(() => {
    setState({
      ...state,
      isAttentionTopic: props.topicInfo.is_attention,
    });
  }, [props.topicInfo]);


  /**
   * [处理] - 关注 or 取消关注话题
   */
  function handleAttentionBtnClick() {
    /* 用户鉴权 */
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });
    }

    const topicId = props.topicInfo._id;
    const oldIsAttention = state.isAttentionTopic;
    const newIsAttention = !oldIsAttention;

    query({
      jsonp: false,
      method: 'POST',
      url: '/api/action/attention/topic',
      data: {
        userId,
        topicId,
        isAttention: newIsAttention,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const attentionInfo = resData.attentionInfo;

        setState({
          ...state,
          isAttentionTopic: attentionInfo.isAttention,
        });

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        {/* 头像区 */}
        <ContentMainAvatarBox>
          <Avatar
            size={60}
            shape="square"
            src={props.topicInfo.cover_img}
          />
        </ContentMainAvatarBox>

        {/* 名称区 */}
        <ContentMainNameBox>
          <ContentMainName>
            {props.topicInfo.name}
          </ContentMainName>
        </ContentMainNameBox>

        {/* 关注区 */}
        <ContentMainAttentionBox>
          <Button
            type="primary"
            onClick={handleAttentionBtnClick}
          >
            {
              state.isAttentionTopic ? '取消关注' : '关注'
            }
          </Button>
        </ContentMainAttentionBox>

        {/* 介绍区 */}
        <ContentMainDescriptionBox>
          <ContentMainDescription>
            {props.topicInfo.description}
          </ContentMainDescription>
        </ContentMainDescriptionBox>
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleAsideInfoContent;