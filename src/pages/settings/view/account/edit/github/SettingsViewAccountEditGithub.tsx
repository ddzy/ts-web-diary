import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  GithubWrapper,
  GithubMain,
  GithubMainItemTitleText,
  GithubMainItemContentText,
  GithubMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditGithubProps { };
export interface ISettingsViewAccountEditGithubState { }


const SettingsViewAccountEditGithub = React.memo((props: ISettingsViewAccountEditGithubProps) => {
  return (
    <GithubWrapper>
      <GithubMain>
        <Row>
          <Col span={5}>
            <Icon
              theme="filled"
              type="github"
              style={{
                fontSize: 18,
              }}
            />
            <GithubMainItemTitleText>Github</GithubMainItemTitleText>
          </Col>
          <Col span={15}>
            <GithubMainItemContentText>ddzy</GithubMainItemContentText>
          </Col>
          <Col span={4}>
            <GithubMainItemActionText>解除绑定</GithubMainItemActionText>
          </Col>
        </Row>
      </GithubMain>
    </GithubWrapper>
  );
});

export default SettingsViewAccountEditGithub;