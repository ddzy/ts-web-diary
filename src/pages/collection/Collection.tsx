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

  // 收藏夹信息
  CollectionReducer: {
    collectionInfo: any,
  },

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


  /**
   * 处理 获取单个收藏夹信息
   */
  public handleGetCollectionInfo = () => {
    const { id } = this.props.match.params;

    this.props.reduxHandleGetCollectionInfo(
      id,
    );
  }


  /**
   * 处理 初始化单个收藏夹 文章列表
   */
  public handleInitShowItem = () => {
    return (
      <CollectionShowItem 
        {...this.props.CollectionReducer.collectionInfo}
        onDeleteCollectionArticle={
          this.handleDeleteCollectionArticle
        }
      />
    );
  }


  /**
   * 处理 删除单个文章
   */
  public handleDeleteCollectionArticle = (
    e: React.MouseEvent,
    articleId: string,
  ) => {
    console.log(e.currentTarget);
    console.log(articleId);
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
                {this.props.CollectionReducer.collectionInfo.name}
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