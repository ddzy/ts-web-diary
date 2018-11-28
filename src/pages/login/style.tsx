import styled from 'styled-components';


export interface IStyleProps {
  bg_url?: string;
};


export const LoginWrapper = styled<IStyleProps, 'div'>('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(${props => props.bg_url});
`;

export const LoginContent = styled<IStyleProps, 'div'>('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 500px;
`;

export const FormWrapper = styled<IStyleProps, 'div'>('div')`
  width: 400px;
`;

export const FormTitle = styled<IStyleProps, 'h1'>('h1')`
  color: #999;
  font-size: 24px;
`;

export const FormFriendLink = styled<IStyleProps, 'div'>('div')`
  
`;