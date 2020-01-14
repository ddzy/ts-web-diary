import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Empty,
} from 'antd';

import {
  ActivityContainer,
  ActivityMain,
} from './style';


export interface IUserMainContentActivityProps extends RouteComponentProps { };


const UserMainContentActivity = React.memo<IUserMainContentActivityProps>((
  props: IUserMainContentActivityProps,
): JSX.Element => {
  /**
   * @description 初始化我的动态相关内容
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/14
   */
  function _initActivityList() {
    return (
      <Empty
        description="暂时没有更多足迹..."
      />
    );
  }

  return (
    <ActivityContainer>
      <ActivityMain>
        {_initActivityList()}
      </ActivityMain>
    </ActivityContainer>
  );

});


export default withRouter(UserMainContentActivity);