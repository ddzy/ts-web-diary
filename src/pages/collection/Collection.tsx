import * as React from 'react';

import Header from '../../components/header/Header';
import {
  CollectionContainer,
  CollectionMain,
  MainHeaderWrapper,
  MainHeaderContent,
  MainContentWrapper,
} from './style';

export interface ICollectionProps {};
interface ICollectionState {};


class Collection extends React.PureComponent<
  ICollectionProps,
  ICollectionState
> {

  public readonly state = {}


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />

        <CollectionContainer>
          <CollectionMain>
            <MainHeaderWrapper>
              <MainHeaderContent 
                bg_img_url={require('../../static/images/collection_bg.jpg')}
              />
            </MainHeaderWrapper>

            <MainContentWrapper>
              收藏文章列表
            </MainContentWrapper>
          </CollectionMain>
        </CollectionContainer>
      </React.Fragment>
    );
  }

}


export default Collection as React.ComponentClass<any>;