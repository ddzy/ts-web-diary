import styled from 'styled-components';


export interface IStyleProps {};


export const HeaderWrapper = styled<IStyleProps, 'div'>('div')`
/*   position: fixed;
  top: 0;
  left: 0;
  z-index: 100; */
  width: 100%;
  // background-color: hsla(0,0%,100%,.4);
  background-color: #fff;
  filter: drop-shadow(0, 5px, 10px #000);
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
`;

export const HeaderMain = styled<IStyleProps, 'div'>('div')`
  display: flex;
  width: 75rem;
  height: 3.125rem;
  margin: 0 auto;
  line-height: 3.125rem;
  text-align: center;
`;

// Logo
export const MainLogo = styled<IStyleProps, 'div'>('div')`
  flex: 1;
`;

export const MainLogoContent = styled<IStyleProps, 'h1'>('h1')`
  font-size: 1.5rem;
  color: #09c;
`;

// 一级导航
export const MainNav = styled<IStyleProps, 'div'>('div')`
  flex: 6;
`;

export const MainNavList = styled<IStyleProps, 'ul'>('ul')`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  font-size: 1rem;
`;

export const MainNavItem = styled<IStyleProps, 'li'>('li')`
  width: 3.75rem;
  height: 100%;
  margin: 0 0.625rem;
  text-align: center;
  transition: background-color .3s ease,
              color .3s ease;
  &:hover {
    background-color: #1890ff;
    a {
      color:  #fff;
    }
  }

  a {
    display: block;
    height: 100%;
  }
`;

// 快捷导航
export const MainQuick = styled<IStyleProps, 'div'>('div')`
  flex: 2;
  display: flex;
  justify-content: space-between;
`;

export const QuickLogin = styled<IStyleProps, 'div'>('div')`
  flex: 1;
`;

export const QuickRegister = styled<IStyleProps, 'div'>('div')`
  flex: 1;
`;

// 个人中心
export const QuickMeCenter = styled<IStyleProps, 'div'>('div')`
  flex: 1;
`;

export const QuickWrite = styled<IStyleProps, 'div'>('div')`
  flex: 2;
`;

// 个人中心 气泡提示内容
export const PopoverContent = styled<IStyleProps, 'div'>('div')`
  width: 8.75rem;
`;

export const PopoverContentList = styled<IStyleProps, 'ul'>('ul')`

`;

export const PopoverListItem = styled<IStyleProps, 'li'>('li')`
  width: 100%;
  &:nth-of-type(2) {
    margin-top: 0.625rem;
  }
  &:nth-of-type(2) {
    margin-top: 0.3125rem;
  }
`;

export const PopoverItemText = styled<IStyleProps, 'span'>('span')`

`;