import * as React from 'react';
import Lazyload from 'react-lazyload';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Empty,
  Divider,
  Button,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface ITopicAllPossessContentProps extends RouteComponentProps {
  // ? 我关注的话题列表
  allTopicList: IBaseCommonTopicInfo[];

  onToggleAttention: (
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) => void;
};
export interface ITopicAllPossessContentState { };


const TopicAllPossessContent = React.memo((props: ITopicAllPossessContentProps) => {
  /**
   * [初始化] - 话题列表
   */
  function _initTopicList() {
    const topicList = props.allTopicList;

    return topicList.length === 0
      ? (<Empty description="暂时没有话题..." />)
      : (
        topicList.map((v) => {
          return (
            <ContentMainItem
              key={v._id}
              onClick={() => handleTopicItemClick(v._id)}
            >
              <BaseGoodsDisplay
                cover={
                  <Lazyload>
                    <img
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      src={v.cover_img}
                    />
                  </Lazyload>
                }
                title={<span>{v.name}</span>}
                content={
                  <div>
                    <span>
                      {v.followers.length}  关注
                    </span>
                    <Divider
                      type="vertical"
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                      }}
                    />
                    <span>
                      {v.pins.length}  沸点
                    </span>
                  </div>
                }
                action={
                  <div>
                    <Button
                      type="link"
                      icon={v.is_attention ? 'minus' : 'plus'}
                      onClick={(e) => handleToggleAttention(e, v._id, !v.is_attention)}
                    >
                      {v.is_attention ? '取消关注' : '关注'}
                    </Button>
                  </div>
                }
              />
            </ContentMainItem>
          );
        })
      )
  }

  /**
   * [处理] - 话题列表项点击
   * @param topicId 话题id
   */
  function handleTopicItemClick(
    topicId: string,
  ) {
    props.history.push(`/topic/${topicId}`);
  }

  /**
   * [处理] - 关注 or 取消关注话题
   * @param e 点击的 DOM 元素事件流
   * @param topicId 话题id
   * @param isAttention 关注 or 取消
   */
  function handleToggleAttention(
    e: React.MouseEvent,
    topicId: string,
    isAttention: boolean,
  ) {
    e.stopPropagation();

    props.onToggleAttention({ topicId, isAttention });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initTopicList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});


export default withRouter(TopicAllPossessContent);