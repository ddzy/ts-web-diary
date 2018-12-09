import * as React from 'react';

import {
  LeftContentContainer,
  LeftContent,
} from '../style';


export interface IDetailsMainRichProps {
  html: string;
};


const DetailsMainRich = ((props: IDetailsMainRichProps) => {
  return (
    <LeftContentContainer>
      <LeftContent
        id="article-detail-content"
        dangerouslySetInnerHTML={{
          __html: props.html
        }}
      />
    </LeftContentContainer>
  );
});

export default DetailsMainRich;