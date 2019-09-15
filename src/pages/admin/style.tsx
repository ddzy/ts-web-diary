import styled from 'styled-components';

export interface IAdminContentProps {
  bgImg: string;
};


export const AdminWrapper = styled.div`
  min-height: 100%;
  height: 100%;
`;
export const AdminContent = styled('div')<IAdminContentProps>`
  position: relative;
  min-height: 100%;
  padding-left: calc(100vw - 100%);
  background-image: url(${(props) => props.bgImg});
`;