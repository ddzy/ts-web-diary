import * as React from 'react';

import {
  LoadingWrapper,
  LoadingMain,
  LoadingMainContent,
  MainContentItem,
  LOADING,
} from './style';
import { getWindowWH } from 'utils/utils';


export interface IBaseLoadingProps {
  visible: boolean;
  width?: number;
  height?: number;
};


const BaseLoading = React.memo<IBaseLoadingProps>((
  {
    visible,
    width,
    height,
  }: IBaseLoadingProps,
): JSX.Element => {
  const { winWidth, winHeight } = getWindowWH();
  const nWidth: number = width ? width : winWidth;
  const nHeight: number = height ? height : winHeight;

  const initLoaderItem = (): JSX.Element[] => {
    const result: JSX.Element[] = [];
    let i: number = 0;

    while (i++ < 5) {
      result.push(<MainContentItem
        key={i}
        style={{
          animation: `${LOADING.getName()} 1.5s ${0.3 * (i - 1)}s infinite`,
        }}
      />);
    }

    return result;
  }

  return (
    <LoadingWrapper
      visible={visible}
      width={nWidth}
      height={nHeight}
    >
      <LoadingMain>
        <LoadingMainContent>
          {initLoaderItem()}
        </LoadingMainContent>
      </LoadingMain>
    </LoadingWrapper>
  );
});


export default BaseLoading;