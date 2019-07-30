import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Button,
} from 'antd';

import {
  PublishWrapper,
  PublishMain,
} from './style';


export interface IHeaderMainDummyPublishProps extends RouteComponentProps { };

const HeaderMainDummyPublish = React.memo((props: IHeaderMainDummyPublishProps) => {
  /**
   * 处理 - 跳转至发表文章页
   */
  function handleToPublishPage() {
    props.history.push('/publish');
  }

  return (
    <PublishWrapper>
      <PublishMain>
        <Button
          htmlType="button"
          type="primary"
          icon="edit"
          onClick={handleToPublishPage}
        >写文章</Button>
      </PublishMain>
    </PublishWrapper>
  );
});

export default withRouter(HeaderMainDummyPublish);