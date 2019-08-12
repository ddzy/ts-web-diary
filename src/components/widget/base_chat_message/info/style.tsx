import styled from "styled-components";

export interface ICommonProps {
  isSend: boolean;
};


export const InfoWrapper = styled.div`
  flex: 1;
  margin-right: 0.75rem;
`;
export const InfoMain = styled.div`
`;

// 上半部分
export const InfoMainUser = styled.div`
`;
export const InfoMainUserInner = styled('div')<ICommonProps>`
  display: flex;

  /* 发送方 */
  flex-direction: ${(props) => props.isSend ? 'row-reverse' : 'row'};
`;
export const InfoMainUserName = styled.div`
`;
export const InfoMainUserTime = styled('div')<ICommonProps>`
  margin: 0 ${(props) => props.isSend ? '0.5rem' : 0} 0 ${(props) => props.isSend ? 0 : '0.5rem'};
  color: #999;
  font-size: 0.75rem;
`;

// 下半部分
export const InfoMainContent = styled('div')<ICommonProps>`
  display: flex;
  flex-direction: ${(props) => props.isSend ? 'row-reverse' : 'row'};
  padding: 0 ${(props) => props.isSend ? '0.75rem' : 0} 0 ${(props) => props.isSend ? 0 : '0.75rem'};
`;
export const InfoMainContentInner = styled.div`
  padding-top: 0.5rem;
`;
export const InfoMainContentInnerText = styled('p')<ICommonProps>`
  position: relative;
  width: fit-content;
  padding: 0.25rem;
  border-radius: 0.75rem;

  background-color: ${(props) => props.isSend ? '#1da57a' : '#fff'};
  color: ${(props) => props.isSend ? '#fff' : 'initial'};

  /* 接收方 */
  &::before {
    display: ${(props) => props.isSend ? 'none' : 'block'};
    content: '';
    position: absolute;
    left: -0.75rem;
    top: 0;
    border: 0.75rem solid transparent;
    border-color: transparent;
    border-top-color: #fff;
  }

  /* 发送方 */
  ::after {
    display: ${(props) => props.isSend ? 'block' : 'none'};
    content: '';
    position: absolute;
    right: -0.75rem;
    top: 0;
    border: 0.75rem solid transparent;
    border-color: transparent;
    border-top-color: #1da57a;
  }
`;