import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEdit from 'components/widget/base_pin_edit/BasePinEdit';


export interface ITopicSingleMainEditProps {
  onSend: (
    pinInfo: any,
    callback?: () => void,
  ) => void;
};
export interface ITopicSingleMainEditState { };


const TopicSingleMainEdit = React.memo((props: ITopicSingleMainEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <BasePinEdit
          onSend={props.onSend}
        />
      </EditMain>
    </EditWrapper>
  );
});


export default TopicSingleMainEdit;