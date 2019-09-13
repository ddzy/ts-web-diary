import * as React from 'react';
import {
  notification, message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  EditWrapper,
  EditMain,
  EditMainList,
  EditMainItem,
} from './style';
import { query } from 'services/request';
import SettingsViewAccountEditWechat from './wechat/SettingsViewAccountEditWechat';
import SettingsViewAccountEditWeibo from './weibo/SettingsViewAccountEditWeibo';
import SettingsViewAccountEditGithub from './github/SettingsViewAccountEditGithub';
import SettingsViewAccountEditEmail from './email/SettingsViewAccountEditEmail';
import SettingsViewAccountEditPhone from './phone/SettingsViewAccountEditPhone';


export interface ISettingsViewAccountEditProps extends RouteComponentProps { };
export interface ISettingsViewAccountEditState {
  // ? 用户账号的关联信息相关
  accountInfo: {
    github: {
      is_bind_github: boolean,
      bind_github_id: number,
      bind_github_user_info: {
        login: string,
      } | null,
    },
  };
}


const SettingsViewAccountEdit = React.memo((props: ISettingsViewAccountEditProps) => {
  const [state, setState] = React.useState<ISettingsViewAccountEditState>({
    accountInfo: {
      github: {
        is_bind_github: false,
        bind_github_id: 0,
        bind_github_user_info: null,
      },
    },
  });

  React.useEffect(() => {
    _getAccountInfoFromServer();
  }, []);


  /**
   * [获取] - 当前账号的关联信息
   */
  function _getAccountInfoFromServer() {
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户信息已丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    query({
      url: '/api/user/info/account/detail',
      method: 'GET',
      jsonp: false,
      data: {
        userId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const accountInfo = resData.accountInfo;

        setState({
          ...state,
          accountInfo,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <EditWrapper>
      <EditMain>
        <EditMainList>
          {/* 绑定微信 */}
          <EditMainItem>
            <SettingsViewAccountEditWechat />
          </EditMainItem>

          {/* 绑定微博 */}
          <EditMainItem>
            <SettingsViewAccountEditWeibo />
          </EditMainItem>

          {/* 绑定Github */}
          <EditMainItem>
            <SettingsViewAccountEditGithub
              accountGithubInfo={state.accountInfo.github}
            />
          </EditMainItem>

          {/* 绑定邮箱 */}
          <EditMainItem>
            <SettingsViewAccountEditEmail />
          </EditMainItem>

          {/* 绑定手机 */}
          <EditMainItem>
            <SettingsViewAccountEditPhone />
          </EditMainItem>
        </EditMainList>
      </EditMain>
    </EditWrapper>
  );
});

export default withRouter(SettingsViewAccountEdit);