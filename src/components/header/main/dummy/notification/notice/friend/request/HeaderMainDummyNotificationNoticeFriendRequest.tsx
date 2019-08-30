import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import {
  Input,
  Row,
  Col,
  Button,
} from 'antd';

import {
  RequestWrapper,
  RequestMain,
  MainTitle,
  MainTitleText,
  MainDescription,
  MainControl,
} from './style';


export interface IHeaderMainDummyNotificationNoticeFriendRequestProps {
  // ? 加好友相关信息
  notificationInfo: {
    // * 发送方id
    from_user_id: string,
    // * 发送方用户名
    from_user_name: string,
    // * 接收方id
    to_user_id: string,
    // * 备注信息
    description: string,
  };
};


const IHeaderMainDummyNotificationNoticeFriendRequestProps = React.memo((props: IHeaderMainDummyNotificationNoticeFriendRequestProps) => {
  return (
    <RequestWrapper>
      <RequestMain>
        {/* 文本消息区 */}
        <MainTitle>
          <MainTitleText>
            用户
            <NavLink
              to={`/user/${props.notificationInfo.from_user_id}`}
            >  {props.notificationInfo.from_user_name}</NavLink>  请求加你为好友.
          </MainTitleText>
        </MainTitle>

        {/* 备注区 */}
        <MainDescription>
          <Input.TextArea
            defaultValue={props.notificationInfo.description}
            disabled={true}
            autosize={false}
          />
        </MainDescription>

        {/* 控制区 */}
        <MainControl>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                icon="check"
              >同意</Button>
            </Col>
            <Col span={12}>
              <Button
                type="danger"
                icon="close"
              >拒绝</Button>
            </Col>
          </Row>
        </MainControl>
      </RequestMain>
    </RequestWrapper>
  );
});

export default IHeaderMainDummyNotificationNoticeFriendRequestProps;