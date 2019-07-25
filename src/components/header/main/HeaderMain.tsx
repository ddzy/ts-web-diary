import * as React from 'react';
import { Row, Col } from 'antd';

import {
  MainContainer,
  MainInner,
  MainOuter,
} from './style';
import HeaderMainLogo from './logo/HeaderMainLogo';
import HeaderMainNav from './nav/HeaderMainNav';
import HeaderMainAction from './action/HeaderMainAction';
import HeaderMainSearch from './search/HeaderMainSearch';
import HeaderMainNotification from './notification/HeaderMainNotification';
import HeaderMainChat from './chat/HeaderMainChat';


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
          <Col span={12}>
            <HeaderMainNav {...props} />
          </Col>
          <Col span={8}>
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
          <Col span={8}>
            <HeaderMainSearch {...props} />
          </Col>
          <Col span={8}>
            <HeaderMainNotification />
          </Col>
          <Col span={4}>
            <HeaderMainChat />
          </Col>
        </Row>
      </MainOuter>
    </MainContainer>
  );
});


export default HeaderMain;