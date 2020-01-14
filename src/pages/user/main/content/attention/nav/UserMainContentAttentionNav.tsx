import * as React from "react";
import { Row, Col, Divider } from "antd";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import {
  NavWrapper,
  NavMain,
  NavMainTipBox,
  NavMainTipText,
  NavMainLinkBox
} from "./style";

export interface IUserMainContentAttentionNavProps
  extends RouteComponentProps {}
export interface IUserMainContentAttentionNavState {}

const UserMainContentAttentionNav = React.memo(
  (props: IUserMainContentAttentionNavProps) => {
    /**
     * [处理] - 链接点击, 进入对应的二级路由
     * @param path url地址
     */
    function handleLinkClick(path: string): string {
      const newPath = `${props.match.url}/${path}`;

      return newPath;
    }

    return (
      <NavWrapper>
        <NavMain>
          <Row>
            <Col span={18}>
              <NavMainTipBox>
                <NavMainTipText>收藏集</NavMainTipText>
              </NavMainTipBox>
            </Col>
            <Col span={6}>
              <NavMainLinkBox>
                <NavLink
                  strict
                  activeStyle={{
                    color: "#1DA57A"
                  }}
                  to={handleLinkClick("user")}
                >
                  用户
                </NavLink>
                <Divider type="vertical" />
                <NavLink
                  strict
                  activeStyle={{
                    color: "#1DA57A"
                  }}
                  to={handleLinkClick("topic")}
                >
                  话题
                </NavLink>
              </NavMainLinkBox>
            </Col>
          </Row>
        </NavMain>
      </NavWrapper>
    );
  }
);

export default withRouter(UserMainContentAttentionNav);
