import * as React from 'react';
import { Row, Col } from 'antd';

import {
  MainContainer,
  MainInner,
  MainOuter,
} from './style';
import HeaderMainDummyLogo from './dummy/logo/HeaderMainDummyLogo';
import HeaderMainDummyNav from './dummy/nav/HeaderMainDummyNav';
import HeaderMainDummyUser from './dummy/user/HeaderMainDummyUser';
import HeaderMainDummySearch from './dummy/search/HeaderMainDummySearch';
import HeaderMainDummyNotification from './dummy/notification/HeaderMainDummyNotification';
import HeaderMainDummyChat from './dummy/chat/HeaderMainDummyChat';
import HeaderMainDummyPublish from './dummy/publish/HeaderMainDummyPublish';


export interface IHeaderMainProps {
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  };
};


const HeaderMain = React.memo<IHeaderMainProps>((
  props: IHeaderMainProps,
): JSX.Element => {
  return (
    <MainContainer
      id="header-main-container"
    >
      <MainInner>
        <Row>
          <Col span={4}>
            <HeaderMainDummyLogo />
          </Col>
          <Col span={8}>
            <HeaderMainDummyNav />
          </Col>
          <Col span={6} offset={2}>
            <HeaderMainDummyNotification />
          </Col>
          <Col span={4}>
            <HeaderMainDummyPublish />
          </Col>
        </Row>
      </MainInner>
      <MainOuter>
        <Row
          style={{
            width: '100%',
          }}
        >
          <Col span={4}>
            <HeaderMainDummyLogo />
          </Col>
          <Col span={8}>
            <HeaderMainDummySearch />
          </Col>
          <Col span={6} offset={2}>
            <HeaderMainDummyUser {...props} />
          </Col>
          <Col span={4}>
            <HeaderMainDummyChat />
          </Col>
        </Row>
      </MainOuter>
    </MainContainer>
  );
});


export default HeaderMain;