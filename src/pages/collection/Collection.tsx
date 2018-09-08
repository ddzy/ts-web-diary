import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import {
  CollectionContainer,
  CollectionMain,
  MainHeaderWrapper,
  MainHeaderContent,
  MainContentWrapper,
  MainContentTipBox,
  MainContentTipText,
  MainContentShowBox,
} from './style';
import collection_bg from '../../static/images/bg_img.png';
import CollectionShowItem from './CollectionShowItem';
import { 
  reduxHandleGetCollectionInfo
} from './Collection.redux';


export interface ICollectionProps {
  match: match<any>;

  // 获取收藏夹信息
  reduxHandleGetCollectionInfo: (
    collectionId: string,
    callback?: () => void,
  ) => void;
};
interface ICollectionState {};



/**
 * 收藏页
 */
class Collection extends React.PureComponent<
  ICollectionProps,
  ICollectionState
> {

  public readonly state = {}


  public componentDidMount(): void {
    this.handleGetCollectionInfo();
  }


  public handleGetCollectionInfo = () => {
    const { id } = this.props.match.params;

    this.props.reduxHandleGetCollectionInfo(
      id,
    );
  }


  public handleInitShowItem = () => {
    return (
      <CollectionShowItem />
    );
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />

        <CollectionContainer>
          <CollectionMain>
            <MainHeaderWrapper>
              <MainHeaderContent 
                bg_img_url={collection_bg}
              />
            </MainHeaderWrapper>

            <MainContentWrapper>
              <MainContentTipBox>
                <MainContentTipText>
                  我的收藏夹名称
                </MainContentTipText>
              </MainContentTipBox>

              <MainContentShowBox>
                {this.handleInitShowItem()}
              </MainContentShowBox>
            </MainContentWrapper>
          </CollectionMain>
        </CollectionContainer>
      </React.Fragment>
    );
  }

}



function mapStateToProps(state: any) {
  return {
    CollectionReducer: state.CollectionReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleGetCollectionInfo,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Collection) as React.ComponentClass<any>;