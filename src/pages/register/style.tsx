import styled from 'styled-components';


export interface IRegisterWrapperProps {
  bg_url?: string;
};


export const RegisterWrapper = styled('div')<IRegisterWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(${props => props.bg_url});
  background-size: cover;
`;

export const RegisterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 500px;
`;

export const FormWrapper = styled.div`
  width: 400px;
`;

export const FormTitle = styled.h1`
  color: #999;
  font-size: 24px;
`;

export const FormFriendLink = styled.div``;