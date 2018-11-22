import * as React from 'react';

import {
  LoadingWrapper,
  LoadingMain,
  LoadingMainContent,
  MainContentItem,
  LOADING,
} from './style';


export interface IBaseLoadingProps {
  visible: boolean;
};


const BaseLoading: React.SFC<IBaseLoadingProps> = (
  { visible }: IBaseLoadingProps,
): JSX.Element => {
  
  const initLoaderItem = (): JSX.Element[] => {
    const result: JSX.Element[] = [];
    let i: number = 0;

    while (i++ < 5) {
      result.push(<MainContentItem
        key={i}
        style={{
          animation: `${LOADING} 1.5s ${0.3 * (i - 1)}s infinite`,
        }}
      />);
    }

    return result;
  }

  return (
    <LoadingWrapper visible={visible}>
      <LoadingMain>
        <LoadingMainContent>
          {initLoaderItem()}
        </LoadingMainContent>
      </LoadingMain>
    </LoadingWrapper>
  );
}


export default BaseLoading;