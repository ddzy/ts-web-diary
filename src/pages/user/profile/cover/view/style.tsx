import styled from "styled-components";


export interface IViewMainProps {
  url: string;
};

export const ViewWrapper = styled.div`
  height: 100%;
`;
export const ViewMain = styled('div')<IViewMainProps>`
  height: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f9f9f9;
`;