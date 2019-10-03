import * as React from 'react';
import {
  Button,
  Avatar,
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


export interface ITopicSingleAsideInfoContentProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };

  onToggleAttention: (
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) => void;
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


  function handleToggleAttention() {
    const topicId = props.topicInfo._id;
    const isAttention = !props.topicInfo.is_attention;

    props.onToggleAttention({ topicId, isAttention });
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
            onClick={handleToggleAttention}
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