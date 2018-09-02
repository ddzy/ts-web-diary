import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Avatar, Popover, Modal } from 'antd';

import headerNavConfig from '../../config/headerNav.config';
import { 
  HeaderWrapper, 
  HeaderMain,
  MainLogo,
  MainLogoContent,
  MainNav,
  MainNavList,
  MainNavItem,
  MainQuick,
  QuickLogin,
  QuickRegister,
  QuickMeCenter,
  QuickWrite,
  PopoverContent,
  PopoverContentList,
  PopoverListItem,
  PopoverItemText,
} from './style';


export interface IHeaderProps extends RouteComponentProps<any> {
  AuthRouteReducer: { 
    isAuth: boolean;
    username: string;
    useravatar: string;
  };
};
interface IHeaderState {
  navList: object[];
};



class Header extends React.Component<IHeaderProps, IHeaderState> {

  public readonly state = {
    navList: [
      { path: '/home', value: '首页', children: null },
      { path: '/article', value: '文章', children: null },
    ],
  }


  public componentDidMount(): void {
    const { pathname } = this.props.location;

    const result = headerNavConfig.filter((item: any) => {
      return item.path === pathname;
    });

    /\/details\/\w*/.test(pathname) 
      && result.push({ path: '/details', value: '详情', children: null });

    this.setState((prevState) => {
      return {
        navList: prevState.navList.concat(result),
      };
    }, () => {
      // 默认选中菜单栏
      const oUl = document.getElementById('header-navbar');
      const oLi = oUl && oUl.querySelectorAll('li');

      oLi && Array.from(oLi).forEach((item) => {
        // item.getAttribute('data-pane') === pathname
        pathname.includes(item.getAttribute('data-pane') || '')
          && item.classList.add('header-active');
      }); 
    }); 

    
  }


  //// 初始化菜单栏
  public initHeaderNavList = (): JSX.Element[] => {
    return this.state.navList.map((item) => {
      return (
        <MainNavItem 
          key={item.path}
          data-pane={item.path}
        >
            <Link to={item.path}>{item.value}</Link>
        </MainNavItem>
      );
    });
  }


  //// 退出登录
  public handleLogout: React.MouseEventHandler = (): void => {
    Modal.confirm({
      content: '确定要退出登录吗?',
      onOk: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        this.props.history.push('/login');
      },
    });
  }


  //// 个人中心
  public handleToMe: React.MouseEventHandler = (): void => {
    this.props.history.push('/me');
  }


  //// 写文章
  public handleToWrite: React.MouseEventHandler = () => {
    this.props.history.push('/publish');
  }


  public initPopoverContent = (): JSX.Element => {
    return (
      <PopoverContent>
        <PopoverContentList>
          <PopoverListItem>
            <Button
              htmlType="button"
              type="primary"
              icon="setting"
              block={true}
              onClick={this.handleToMe}
            >
              <PopoverItemText>
                个人中心
              </PopoverItemText>
            </Button>
          </PopoverListItem>
          <PopoverListItem>
            <Button
              htmlType="button"
              type="danger"
              icon="logout"
              block={true}
              onClick={this.handleLogout}
            >
              <PopoverItemText>
                退出登录
              </PopoverItemText>
            </Button>
          </PopoverListItem>
        </PopoverContentList>
      </PopoverContent>
    );
  }


  public render(): JSX.Element {
    return (
      <HeaderWrapper>
        <HeaderMain>
          <MainLogo>
            <MainLogoContent>
              <a href="https://github.com/ddzy">ddzy</a>
            </MainLogoContent>
          </MainLogo>
          <MainNav>
            <MainNavList id="header-navbar">
              {this.initHeaderNavList()}
            </MainNavList>
          </MainNav>
          <MainQuick>

            {
              this.props.AuthRouteReducer.isAuth
                ? (
                    // 头像
                    <QuickMeCenter>
                      <Popover
                        content={this.initPopoverContent()}
                        placement="bottom"
                      >
                        <Avatar
                          icon="user"
                          shape="square"
                          src={this.props.AuthRouteReducer.useravatar}
                        />
                      </Popover>
                    </QuickMeCenter>
                  )
                : (
                    <React.Fragment>
                      <QuickLogin>
                        <Link to="/login">登录</Link>
                      </QuickLogin>
                      <QuickRegister>
                        <Link to="/register">注册</Link>
                      </QuickRegister>
                    </React.Fragment>
                  )
            }
            
            <QuickWrite>
              <Button 
                htmlType="button"
                type="primary"
                icon="edit"
                onClick={this.handleToWrite}
              >写文章</Button>
            </QuickWrite>
          </MainQuick>
        </HeaderMain>
      </HeaderWrapper>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Header)) as React.ComponentClass<any>;