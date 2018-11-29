import styled, { keyframes } from 'styled-components';

export interface ILoadingWrapperProps {
  visible: boolean;
  width?: number;
  height?: number;
};

//
export const LOADING = keyframes`
  50% { height: 2.5rem; }
  100% { height: 0.9375rem; }
`;
//

export const LoadingWrapper = styled<ILoadingWrapperProps, 'div'>('div')`
  display: ${(props) => props.visible ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
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
  width: 18.75rem;
  height: 18.75rem;
`;

export const MainContentItem = styled.div`
  display: inline-block;
  width: 0.9375rem;
  height: 0.9375rem;
  margin-left: 0.125rem;
  background-color: #1890ff;
`;

