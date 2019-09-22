import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import BasePinItem from 'components/widget/base_pin_item/BasePinItem';


export interface IPinMainViewContentProps extends RouteComponentProps<{
  id: string,
  type: string,
}> {
};
export interface IPinMainViewContentState { }


const PinMainViewContent = React.memo((props: IPinMainViewContentProps) => {
  React.useEffect(() => {
    console.log(props.match.params);
  }, [props.location.pathname]);

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
        <ContentMainList>
          {_initPinList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(PinMainViewContent);