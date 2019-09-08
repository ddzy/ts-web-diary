import * as React from 'react';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';
import {
  Affix,
} from 'antd';

import {
  NavWrapper,
  NavMain,
  NavMainList,
  NavMainItem,
} from './style';


export interface ISettingsNavProps { };
export interface ISettingsNavState { }


const SettingsNav = React.memo((props: ISettingsNavProps) => {
  return (
    <NavWrapper>
      <NavMain>
        <Affix offsetTop={60}>
          <NavWrapper>
            <NavMain>
              <NavMainList>
                <NavMainItem>
                  <NavLink
                    to="/settings/profile"
                    activeStyle={{
                      color: '#1da57a',
                    }}
                  >个人资料</NavLink>
                </NavMainItem>
                <NavMainItem>
                  <NavLink
                    to="/settings/account"
                    activeStyle={{
                      color: '#1da57a',
                    }}
                  >账号关联</NavLink>
                </NavMainItem>
                <NavMainItem>
                  <NavLink
                    to="/settings/password"
                    activeStyle={{
                      color: '#1da57a',
                    }}
                  >修改密码</NavLink>
                </NavMainItem>
                <NavMainItem>
                  <NavLink
                    to="/settings/more"
                    activeStyle={{
                      color: '#1da57a',
                    }}
                  >待续...</NavLink>
                </NavMainItem>
              </NavMainList>
            </NavMain>
          </NavWrapper>
        </Affix>
      </NavMain>
    </NavWrapper>
  );
});

export default withRouter(SettingsNav);