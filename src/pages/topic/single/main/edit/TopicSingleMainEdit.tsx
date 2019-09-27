import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEdit from 'components/widget/base_pin_edit/BasePinEdit';


export interface ITopicSingleMainEditProps { };
export interface ITopicSingleMainEditState { };


const TopicSingleMainEdit = React.memo((props: ITopicSingleMainEditProps) => {
  function handleSend(v: any) {
    console.log(v);
  }

  return (
    <EditWrapper>
      <EditMain>
        <BasePinEdit
          onSend={handleSend}
        />
      </EditMain>
    </EditWrapper>
  );
});


export default TopicSingleMainEdit;