import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import {
  Divider,
} from 'antd';

import {
  NavWrapper,
  NavMain,
  NavMainList,
  NavMainItem,
} from './style';


export interface IPinMainNavProps { };
export interface IPinMainNavState { }


const PinMainNav = React.memo((props: IPinMainNavProps) => {
  function _initNavItem() {
    const pinList = [
      {
        name: '推荐',
        path: '/pin/recommend',
      },
      {
        name: '热门',
        path: '/pin/hot',
      },
      {
        name: '关注',
        path: '/pin/attention',
      },
      {
        name: '开源推荐',
        path: '/pin/topic/1',
      },
      {
        name: '内推招聘',
        path: '/pin/topic/2',
      },
      {
        name: '掘金相亲',
        path: '/pin/topic/3',
      },
      {
        name: '上班摸鱼',
        path: '/pin/topic/4',
      },
      {
        name: '应用安利',
        path: '/pin/topic/5',
      },
      {
        name: '开发工具',
        path: '/pin/topic/6',
      },
    ];

    return pinList.map((v, i) => {
      if (i === 2) {
        return (
          <React.Fragment key={i}>
            <NavMainItem
              key={i}
            >
              <NavLink
                strict={true}
                activeStyle={{
                  color: '#1da57a',
                }}
                to={v.path}
              >{v.name}</NavLink>
            </NavMainItem>

            <Divider />
          </React.Fragment>
        );
      }

      return (
        <NavMainItem
          key={i}
        >
          <NavLink
            strict={true}
            activeStyle={{
              color: '#1da57a',
            }}
            to={v.path}
          >{v.name}</NavLink>
        </NavMainItem>
      );
    });
  }

  return (
    <NavWrapper>
      <NavMain>
        <NavMainList>
          {_initNavItem()}
        </NavMainList>
      </NavMain>
    </NavWrapper>
  );
});

export default PinMainNav;