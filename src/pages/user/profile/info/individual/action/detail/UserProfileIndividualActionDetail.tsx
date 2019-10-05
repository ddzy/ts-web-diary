import * as React from 'react';
import {
  Collapse,
  Row,
  Col,
} from 'antd';

import {
  DetailWrapper,
  DetailMain,
  CollapseHeaderTipText,
  DetailsMainContent,
  DetailMainContentList,
  DetailMainContentItem,
  DetailMainContentItemName,
  DetailMainContentItemValue,
} from './style';
import {
  IBaseCommonUserInfo,
} from 'pages/user/User.types';


export interface IUserProfileIndividualActionDetailProps {
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserInfo;
};
export interface IUserProfileIndividualActionDetailState { }


const UserProfileIndividualActionDetail = React.memo((props: IUserProfileIndividualActionDetailProps) => {


  /**
   * [初始化] - 个人详细信息的折叠框标题
   */
  function _initCollapseHeader(): JSX.Element {
    return (
      <CollapseHeaderTipText>
        查看详细信息
      </CollapseHeaderTipText>
    );
  }

  /**
   * [初始化] - 个人详细信息的折叠框内容
   */
  function _initCollapseContent(): JSX.Element[] {
    const {
      usergender,
      address,
      website,
      job,
      education,
    } = props.userProfileInfo;
    const data = [
      {
        key: 'usergender',
        value: usergender,
      },
      {
        key: 'address',
        value: address,
      },
      {
        key: 'website',
        value: website,
      },
      {
        key: 'job',
        value: job,
      },
      {
        key: 'education',
        value: education,
      },
    ];

    return data.map((v) => {
      return (
        <DetailMainContentItem key={v.key}>
          <Row>
            <Col span={8}>
              <DetailMainContentItemName>
                {v.key}:
              </DetailMainContentItemName>
            </Col>
            <Col span={12}>
              <DetailMainContentItemValue>
                {v.value}
              </DetailMainContentItemValue>
            </Col>
          </Row>
        </DetailMainContentItem>
      );
    });
  }

  return (
    <DetailWrapper>
      <DetailMain>
        <Collapse bordered={false}>
          <Collapse.Panel
            header={_initCollapseHeader()}
            key="1"
          >
            <DetailsMainContent>
              <DetailMainContentList>
                {_initCollapseContent()}
              </DetailMainContentList>
            </DetailsMainContent>
          </Collapse.Panel>
        </Collapse>
      </DetailMain>
    </DetailWrapper>
  );
});

export default UserProfileIndividualActionDetail;