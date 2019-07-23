import * as React from 'react';

import {
  ExtraWrapper,
} from './style';


export interface IHomeMainViewExtraProps { };
interface IHomeMainViewExtraState { };


/**
 * 文章展示
 */
class HomeMainViewPosts extends React.PureComponent<IHomeMainViewExtraProps, IHomeMainViewExtraState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ExtraWrapper />
      </React.Fragment>
    );
  }

}


export default HomeMainViewPosts;