import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  SingleWrapper,
  SingleMain,
} from './style';


export interface ITopicSingleProps extends RouteComponentProps<{
  id: string,
}> { };
export interface ITopicSingleState { };


const TopicSingle = React.memo((props: ITopicSingleProps) => {
  React.useEffect(() => {
    _getTopicInfoFromServer();
  }, [props.match.params.id]);


  /**
   * [获取] - 后台获取单个话题的详细信息
   */
  function _getTopicInfoFromServer() {
    console.log('get single topic info from server');
  }

  return (
    <SingleWrapper>
      <SingleMain>
        单个话题详情页
      </SingleMain>
    </SingleWrapper>
  );
});


export default withRouter(TopicSingle);