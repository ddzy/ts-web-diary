import styled, { keyframes } from 'styled-components';

export interface ILoadingWrapperProps {
  visible: boolean;
};

//
export const LOADING = keyframes`
  50% { height: 40px; }
  100% { height: 15px; }
`;
//

export const LoadingWrapper = styled<ILoadingWrapperProps, 'div'>('div')`
  display: ${(props) => props.visible ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 800px;
  height: 600px;
  background-color: rgba(255, 255, 255, .7);
`;

export const LoadingMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LoadingMainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
`;

export const MainContentItem = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 2px;
  background-color: #1890ff;
`;

