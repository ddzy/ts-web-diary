import * as React from 'react';
import { Tabs, } from 'antd';
import { withRouter, RouteComponentProps, } from 'react-router-dom';

import {
  ContentContainer,
  ContentMain,
} from './style';

export interface IUserMainContentProps extends RouteComponentProps<any> {
  children?: React.ReactElement<HTMLElement>
};


const UserMainContent = React.memo<IUserMainContentProps>((
  props: IUserMainContentProps,
): JSX.Element => {

  function handleTabChange(
    path: string,
  ): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.replace(`/user/${userId}/${path}`);
  }

  return (
    <ContentContainer>
      <ContentMain>
        <Tabs
          defaultActiveKey="activity"
          size="large"
          onChange={handleTabChange}
          animated={false}
        >
          <Tabs.TabPane
            tab="动态"
            key="activity"
          >{props.children}</Tabs.TabPane>
          <Tabs.TabPane
            tab="文章"
            key="post"
          >{props.children}</Tabs.TabPane>
          <Tabs.TabPane
            tab="收藏"
            key="collection"
          >{props.children}</Tabs.TabPane>
          <Tabs.TabPane
            tab="关注"
            key="attention"
          >{props.children}</Tabs.TabPane>
        </Tabs>
      </ContentMain>
    </ContentContainer>
  );

});


export default withRouter(UserMainContent);