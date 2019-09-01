import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  NavLink,
} from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Modal,
  Input,
} from 'antd';

import {
  RequestWrapper,
  RequestMain,
  MainTitle,
  MainTitleText,
  MainDescription,
  MainControl,
} from './style';
import {
  IBaseNoficationUserFriendRequestParams,
} from 'components/header/Header.types';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


export interface IHeaderMainDummyNotificationNoticeFriendRequestProps {
  // ? 加好友相关信息
  notificationInfo: IBaseNoficationUserFriendRequestParams;
};
export interface IHeaderMainDummyNotificationNoticeFriendRequestState {
  // ? 用户通知的socket
  notificationUserIOClient: SocketIOClient.Socket;

  // ? 是否显示拒绝好友的备注的模态框
  isShowRefuseModal: boolean;
  // ? 拒绝好友请求的理由
  refuseDescription: string;

  // ? 是否显示控制栏的同意和拒绝按钮
  isShowControl: boolean;
  // ? 不显示同意和拒绝按钮时, 控制栏显示的文字
  controlTextWhenHiden: string;
};


const IHeaderMainDummyNotificationNoticeFriendRequestProps = React.memo((props: IHeaderMainDummyNotificationNoticeFriendRequestProps) => {
  const [state, setState] = React.useState<IHeaderMainDummyNotificationNoticeFriendRequestState>({
    notificationUserIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user`),
    isShowRefuseModal: false,
    refuseDescription: '',
    isShowControl: true,
    controlTextWhenHiden: '',
  });

  React.useEffect(() => {
    // ? 根据好友申请通知的状态, 来初始化控制栏的状态
    const agreeState = props.notificationInfo.agree_state;

    let isShowControl = false;
    let controlTextWhenHiden = '';

    switch (agreeState) {
      // 等待状态
      case 0: {
        isShowControl = true;
        controlTextWhenHiden = '';
        break;
      };
      // 同意状态
      case 1: {
        isShowControl = false;
        controlTextWhenHiden = '已同意该用户的好友申请!';
        break;
      };
      // 拒绝状态
      case -1: {
        isShowControl = false;
        controlTextWhenHiden = '已拒绝该用户的好友申请!';
        break;
      };
      default: {
        break;
      };
    }

    setState({
      ...state,
      isShowControl,
      controlTextWhenHiden,
    });
  }, [props.notificationInfo]);

  /**
   * [初始化] - 拒绝加好友请求的备注模态框的内容
   */
  function _initRefuseModalContent(): JSX.Element {
    return (
      <Input.TextArea
        placeholder="请输入拒绝的理由..."
        autosize={{
          minRows: 3,
          maxRows: 5,
        }}
        value={state.refuseDescription}
        onChange={handleRefuseModalDescriptionChange}
      />
    );
  }

  /**
   * [初始化] - 好友申请的控制栏的状态
   */
  function _initControlContent() {
    return state.isShowControl
      ? (
        <Row>
          <Col span={12}>
            <Button
              type="primary"
              icon="check"
              onClick={handleAgree}
            >同意</Button>
          </Col>
          <Col span={12}>
            <Button
              type="danger"
              icon="close"
              onClick={handleRefuse}
            >拒绝</Button>
          </Col>
        </Row>
      )
      : (
        <MainTitleText>
          {state.controlTextWhenHiden}
        </MainTitleText>
      );
  }

  /**
   * [处理] - 拒绝加好友的备注信息模态框输入框更新
   */
  function handleRefuseModalDescriptionChange(
    e: React.ChangeEvent,
  ) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setState({
      ...state,
      refuseDescription: value,
    });
  }

  /**
   * [处理] - 隐藏拒绝加好友的备注模态框
   */
  function handleRefuseModalHide() {
    setState({
      ...state,
      isShowRefuseModal: false,
    });
  }

  /**
   * [处理] - 显示拒绝加好友的备注模态框
   */
  function handleRefuseModalShow() {
    setState({
      ...state,
      isShowRefuseModal: true,
    });
  }

  /**
   * [处理] - 同意加好友请求
   */
  function handleAgree() {
    const fromUserId = props.notificationInfo.from._id;
    const toUserId = props.notificationInfo.to._id;

    state.notificationUserIOClient.emit('sendMakeFriendAgree', {
      notificationId: props.notificationInfo._id,
      from: toUserId,
      to: fromUserId,
    });

    setState({
      ...state,
      isShowControl: false,
      controlTextWhenHiden: '已同意该用户的好友申请!',
    });
  }

  /**
   * [处理] - 拒绝加好友请求
   */
  function handleRefuse() {
    handleRefuseModalShow();
  }

  /**
   * [处理] - 发送拒绝加好友的请求
   */
  function handleRefuseSend() {
    const fromUserId = props.notificationInfo.from._id;
    const toUserId = props.notificationInfo.to._id;
    const refuseDescription = state.refuseDescription;

    state.notificationUserIOClient.emit('sendMakeFriendRefuse', {
      notificationId: props.notificationInfo._id,
      from: toUserId,
      to: fromUserId,
      description: refuseDescription,
    });

    setState({
      ...state,
      isShowRefuseModal: false,
      isShowControl: false,
      controlTextWhenHiden: '已拒绝该用户的好友申请!',
    });
  }

  return (
    <RequestWrapper>
      <RequestMain>
        {/* 文本消息区 */}
        <MainTitle>
          <MainTitleText>
            用户
            <NavLink
              to={`/user/${props.notificationInfo.from._id}`}
            >  {props.notificationInfo.from.username}</NavLink>  申请加你为好友.
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
          {_initControlContent()}
        </MainControl>

        {/* 好友请求的备注信息 */}
        <Modal
          centered={true}
          closable={false}
          visible={state.isShowRefuseModal}
          onOk={handleRefuseSend}
          onCancel={handleRefuseModalHide}
        >
          {_initRefuseModalContent()}
        </Modal>
      </RequestMain>
    </RequestWrapper>
  );
});

export default IHeaderMainDummyNotificationNoticeFriendRequestProps;