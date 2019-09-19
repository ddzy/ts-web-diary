import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEdit from 'components/widget/base_pin_edit/BasePinEdit';


export interface IPinMainViewEditProps { };
export interface IPinMainViewEditState { }


const PinMainViewEdit = React.memo((props: IPinMainViewEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <BasePinEdit />
      </EditMain>
    </EditWrapper>
  );
});

export default PinMainViewEdit;