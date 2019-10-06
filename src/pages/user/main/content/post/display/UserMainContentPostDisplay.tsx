import * as React from 'react';
import {
  Divider,
} from 'antd';

import {
  DisplayWrapper,
  DisplayMain,
  DisplayMainList,
  DisplayMainItem,
} from './style';
import UserMainContentPostDisplayItem from './item/UserMainContentPostDisplayItem';


export interface IUserMainContentPostDisplayProps { };
export interface IUserMainContentPostDisplayState { };


const UserMainContentPostDisplay = React.memo((props: IUserMainContentPostDisplayProps) => {
  /**
   * [初始化] - 主人的文章列表
   */
  function _initArticleList() {
    return (
      <React.Fragment>
        <DisplayMainItem>
          <UserMainContentPostDisplayItem />
        </DisplayMainItem>
        <Divider type="horizontal" />

        <DisplayMainItem>
          <UserMainContentPostDisplayItem />
        </DisplayMainItem>
        <Divider type="horizontal" />

        <DisplayMainItem>
          <UserMainContentPostDisplayItem />
        </DisplayMainItem>
        <Divider type="horizontal" />
      </React.Fragment>
    );
  }

  return (
    <DisplayWrapper>
      <DisplayMain>
        <DisplayMainList>
          {_initArticleList()}
        </DisplayMainList>
      </DisplayMain>
    </DisplayWrapper>
  );
});


export default UserMainContentPostDisplay;