import * as React from 'react';
import {
  Collapse,
} from 'antd';

import {
  DetailWrapper,
  DetailMain,
  CollapseHeaderTipText,
} from './style';


export interface IUserProfileIndividualActionDetailProps { };
export interface IUserProfileIndividualActionDetailState { }


const UserProfileIndividualActionDetail = React.memo((props: IUserProfileIndividualActionDetailProps) => {


  /**
   * [初始化] - 个人详细信息的折叠框内容
   */
  function _initCollapseHeader(): JSX.Element {
    return (
      <CollapseHeaderTipText>
        查看详细信息
      </CollapseHeaderTipText>
    );
  }

  return (
    <DetailWrapper>
      <DetailMain>
        <Collapse bordered={false}>
          <Collapse.Panel
            header={_initCollapseHeader()}
            key="1"
          >个人信息详情</Collapse.Panel>
        </Collapse>
      </DetailMain>
    </DetailWrapper>
  );
});

export default UserProfileIndividualActionDetail;