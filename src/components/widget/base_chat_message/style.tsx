import styled from 'styled-components';

export interface ICommonProps {
  isSend: boolean;
};


export const MessageWrapper = styled('div')<ICommonProps>`
  display: flex;

  /* 发送方 */
  flex-direction: ${(props) => props.isSend ? 'row-reverse' : 'initial'};
`;
export const MessageMain = styled('div')<ICommonProps>`
  display: flex;

  /* 发送方 */
  flex-direction: ${(props) => props.isSend ? 'row-reverse' : 'initial'};
`;