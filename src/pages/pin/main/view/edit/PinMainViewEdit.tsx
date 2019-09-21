import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
} from 'antd';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEdit from 'components/widget/base_pin_edit/BasePinEdit';
import { query } from 'services/request';


export interface IPinMainViewEditProps extends RouteComponentProps { };
export interface IPinMainViewEditState { }


const PinMainViewEdit = React.memo((props: IPinMainViewEditProps) => {
  function handlePinSend(
    pinInfo: {
      plainContent: string,
      imageContent: Array<{
        originUrl: string,
        processedUrl: string,
      }>,
      linkContent: {
        title: string,
        domain: string,
        coverImgUrl: string,
      },
      topic: string,
    },
    callback?: () => void,
  ) {
    // 用户凭证检测
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/pin/self/create',
      data: {
        pinInfo,
        userId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        console.log(resData);

        message.success('沸点发表成功!');
      } else {
        notification.error(resMessage);
      }

      callback && callback();
    });
  }

  return (
    <EditWrapper>
      <EditMain>
        <BasePinEdit
          onSend={handlePinSend}
        />
      </EditMain>
    </EditWrapper>
  );
});

export default withRouter(PinMainViewEdit);