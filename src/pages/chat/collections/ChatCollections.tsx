import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Collapse,
} from 'antd';

import {
  CollectionsWrapper,
  CollectionsMain,
} from './style';

const LoadableChatCollectionsImages = Loadable({
  loader: () => import('./images/ChatCollectionsImages'),
  loading: () => null,
});
const LoadableChatCollectionsFiles = Loadable({
  loader: () => import('./files/ChatCollectionsFiles'),
  loading: () => null,
});
const LoadableChatCollectionsTexts = Loadable({
  loader: () => import('./texts/ChatCollectionsTexts'),
  loading: () => null,
});


export interface IChatCollectionsProps extends RouteComponentProps {

};

const ChatCollections = React.memo((props: IChatCollectionsProps) => {
  /**
   * 处理Collapse切换
   * @param type collapse类型,对应当前路由
   */
  function handleTabChange(type: string) {
    type && props.history.push(`/chat/collections/${type}`);
  }

  /**
   * 处理 - 当前页路由与Collapse联调
   * [Bug]: 路由有时可能与Collapse的默认展开面板不对应
   */
  function handleTabsDefaultActiveKey() {
    const basePathname = ['images', 'files', 'texts'];
    const currentPathname = props.location.pathname;
    const processedPathname = basePathname.find((v) => currentPathname.includes(v));

    return processedPathname ? [processedPathname] : [basePathname[0]];
  }

  return (
    <CollectionsWrapper>
      <CollectionsMain>
        <Route exact path="/chat/collections" render={() => <Redirect to="/chat/collections/images" />} />

        <Collapse
          accordion
          defaultActiveKey={handleTabsDefaultActiveKey()}
          onChange={handleTabChange}
        >
          <Collapse.Panel header="收藏的图片" key="images">
            <Route path="/chat/collections/images" component={LoadableChatCollectionsImages} />
          </Collapse.Panel>
          <Collapse.Panel header="收藏的文件" key="files">
            <Route path="/chat/collections/files" component={LoadableChatCollectionsFiles} />
          </Collapse.Panel>
          <Collapse.Panel header="收藏的文本" key="texts">
            <Route path="/chat/collections/texts" component={LoadableChatCollectionsTexts} />
          </Collapse.Panel>
        </Collapse>
      </CollectionsMain>
    </CollectionsWrapper>
  );
});

export default withRouter(ChatCollections);