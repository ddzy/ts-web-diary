import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import BasePinItem from 'components/widget/base_pin_item/BasePinItem';


export interface IPinMainViewContentProps { };
export interface IPinMainViewContentState { }


const PinMainViewContent = React.memo((props: IPinMainViewContentProps) => {
  /**
   * [初始化] - 沸点列表
   */
  function _initPinList() {
    return (
      <React.Fragment>
        <ContentMainItem>
          <BasePinItem />
        </ContentMainItem>
        <ContentMainItem>
          <BasePinItem />
        </ContentMainItem>
        <ContentMainItem>
          <BasePinItem />
        </ContentMainItem>
        <ContentMainItem>
          <BasePinItem />
        </ContentMainItem>
      </React.Fragment>
    );
  }

  return (
    <ContentWrapper>
      <ContentMain>
        {/* <BasePinItem /> */}
        <ContentMainList>
          {_initPinList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});

export default PinMainViewContent;