import styled from "styled-components";

export interface ICommonProps {
  isSend: boolean;
};


export const InfoWrapper = styled.div`
  flex: 1;
  margin-right: 12px;
`;
export const InfoMain = styled.div`
`;

// 上半部分
export const InfoMainUser = styled.div`
`;
export const InfoMainUserInner = styled('div')<ICommonProps>`
  display: flex;

  /* 发送方 */
  flex-direction: ${(props) => props.isSend ? 'row-reverse' : 'initial'};
`;
export const InfoMainUserName = styled.div`
`;
export const InfoMainUserTime = styled('div')<ICommonProps>`
  margin: 0 ${(props) => props.isSend ? '8px' : 0} 0 ${(props) => props.isSend ? 0 : '8px'};
  color: #999;
  font-size: 12px;
`;

// 下半部分
export const InfoMainContent = styled.div`
`;
export const InfoMainContentInner = styled.div`
  padding-top: 8px;
`;
export const InfoMainContentInnerText = styled('p')<ICommonProps>`
  position: relative;
  width: fit-content;
  padding: 4px;
  border-radius: 12px;

  background-color: ${(props) => props.isSend ? '#1da57a' : '#fff'};
  color: ${(props) => props.isSend ? '#fff' : 'initial'};

  /* 接收方 */
  &::before {
    display: ${(props) => props.isSend ? 'none' : 'block'};
    content: '';
    position: absolute;
    left: -12px;
    top: 0;
    border: 12px solid transparent;
    border-color: transparent;
    border-top-color: #fff;
  }

  /* 发送方 */
  ::after {
    display: ${(props) => props.isSend ? 'block' : 'none'};
    content: '';
    position: absolute;
    right: -12px;
    top: 0;
    border: 12px solid transparent;
    border-color: transparent;
    border-top-color: #1da57a;
  }
`;