import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  MainTextBox,
  MainText,
} from './style';


export interface IDetailsMainRelatedTitleProps { };


const DetailsMainRelatedTitle = React.memo<IDetailsMainRelatedTitleProps>((
  props: IDetailsMainRelatedTitleProps,
): JSX.Element => {

  return (
    <TitleWrapper>
      <TitleMain>
        <MainTextBox>
          <MainText>相关推荐</MainText>
        </MainTextBox>
      </TitleMain>
    </TitleWrapper>
  );

});


export default DetailsMainRelatedTitle;