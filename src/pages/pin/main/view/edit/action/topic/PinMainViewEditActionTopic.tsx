import * as React from 'react';
import {
  Button,
  Popover,
} from 'antd';

import {
  TopicWrapper,
  TopicMain,
} from './style';
import PinMainViewEditActionTopicContent from './content/PinMainViewEditActionTopicContent';


export interface IPinMainViewEditActionTopicProps { };
export interface IPinMainViewEditActionTopicState { }


const PinMainViewEditActionTopic = React.memo((props: IPinMainViewEditActionTopicProps) => {
  /**
   * [初始化] - 模态框的内容
   */
  function _initPopoverContent() {
    return (
      <PinMainViewEditActionTopicContent />
    );
  }


  return (
    <TopicWrapper>
      <TopicMain>
        <Popover
          title={null}
          placement="bottom"
          trigger="click"
          content={_initPopoverContent()}
        >
          <Button
            type="link"
            icon="bulb"
          >话题</Button>
        </Popover>
      </TopicMain>
    </TopicWrapper>
  );
});

export default PinMainViewEditActionTopic;