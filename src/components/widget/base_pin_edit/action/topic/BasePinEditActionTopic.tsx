import * as React from 'react';
import {
  Button,
  Popover,
} from 'antd';

import {
  TopicWrapper,
  TopicMain,
} from './style';
import BasePinEditActionTopicContent from './content/BasePinEditActionTopicContent';
import {
  IBaseCommonTopicInfo,
} from '../../BasePinEdit.types';


export interface IBasePinEditActionTopicProps {
  onTopicContentChange: (
    topicInfo: IBaseCommonTopicInfo,
  ) => void;
};
export interface IBasePinEditActionTopicState { }


const BasePinEditActionTopic = React.memo((props: IBasePinEditActionTopicProps) => {
  /**
   * [初始化] - 模态框的内容
   */
  function _initPopoverContent() {
    return (
      <BasePinEditActionTopicContent
        onTopicContentChange={props.onTopicContentChange}
      />
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

export default BasePinEditActionTopic;