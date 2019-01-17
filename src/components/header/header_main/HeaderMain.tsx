import * as React from 'react';
import { Row, Col } from 'antd';

import {
  MainContainer,
  MainInner,
  MainOuter,
} from './style';
import HeaderMainLogo from './header_main_logo/HeaderMainLogo';
import HeaderMainNav from './header_main_nav/HeaderMainNav';
import HeaderMainAction from './header_main_action/HeaderMainAction';
import HeaderMainSearch from './header_main_search/HeaderMainSearch';
import HeaderMainNotification from './header_main_notification/HeaderMainNotification';
import HeaderMainChat from './header_main_chat/HeaderMainChat';


export interface IHeaderMainProps {
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  };

  // ** header_main_nav **
  location: any;

  // ** header_main_search **
  searchedArticles: any;
  hotTags: object;
  onSearch: (
    e: any,
  ) => void;
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
            <HeaderMainLogo />
          </Col>
          <Col span={10}>
            <HeaderMainNav {...props} />
          </Col>
          <Col span={10}>
            <HeaderMainAction {...props} />
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
            <HeaderMainLogo />
          </Col>
          <Col span={10}>
            <HeaderMainSearch {...props} />
          </Col>
          <Col span={4}>
            <HeaderMainNotification />
          </Col>
          <Col span={6}>
            <HeaderMainChat />
          </Col>
        </Row>
      </MainOuter>
    </MainContainer>
  );
});


export default HeaderMain;