import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Empty,
} from 'antd';

import {
  ViewWrapper,
  ViewMain,
} from './style';


export interface IUserMainContentAttentionViewProps extends RouteComponentProps<{
  id: string,
  type: string,
}>  {
  // ? 标识当前是访问者还是主人
  isOwner: boolean;
};
export interface IUserMainContentAttentionViewState { };


const UserMainContentAttentionView = React.memo((props: IUserMainContentAttentionViewProps) => {
  /**
   * @description 初始化我的关注列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _initAttentionList() {
    const attentionType = props.match.params.type;

    if (attentionType === 'user') {
      return (
        <Empty description="暂时没有关注任何用户..." />
      );
    } else if (attentionType === 'topic') {
      return (
        <Empty description="暂时没有关注任何话题..." />
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