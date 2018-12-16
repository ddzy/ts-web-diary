import styled from 'styled-components';


export const ActionContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
`;

export const ActionLogin = styled.div`
  flex: 1;
`;

export const ActionRegister = styled.div`
  flex: 1;
`;

// 个人中心
export const ActionMeCenter = styled.div`
  flex: 1;
`;

export const ActionWrite = styled.div`
  flex: 2;
`;

// 个人中心 气泡提示内容
export const PopoverContent = styled.div`
  width: 8.75rem;
`;

export const PopoverContentList = styled.ul``;

export const PopoverListItem = styled.li`
  width: 100%;
  &:nth-of-type(2) {
    margin-top: 0.625rem;
  }
  &:nth-of-type(2) {
    margin-top: 0.3125rem;
  }
`;

export const PopoverItemText = styled.span``;