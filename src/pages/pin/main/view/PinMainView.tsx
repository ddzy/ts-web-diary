import * as React from 'react';

import {
  ViewWrapper,
  ViewMain,
} from './style';
import PinMainViewEdit from './edit/PinMainViewEdit';
import PinMainViewContent from './content/PinMainViewContent';


export interface IPinMainViewProps { };
export interface IPinMainViewState { }


const PinMainView = React.memo((props: IPinMainViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        {/* 沸点发表区 */}
        <PinMainViewEdit />

        {/* 沸点展示区 */}
        <PinMainViewContent />
      </ViewMain>
    </ViewWrapper>
  );
});

export default PinMainView;