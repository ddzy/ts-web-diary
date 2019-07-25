import styled from 'styled-components';


export const UserWrapper = styled.div`
`;
export const UserMain = styled.div`
`;

// 登录过期情况下显示登录、注册按钮
export const UserMainLogin = styled.div`
  text-align: right;
`;
export const UserMainRegister = styled.div`
`;

// 个人中心
export const UserMainMeCenter = styled.div`
`;
// 个人中心 气泡提示内容
export const UserMainPopoverContent = styled.div`
  width: 8.75rem;
`;
export const UserMainPopoverContentList = styled.ul``;
export const UserMainPopoverListItem = styled.li`
  width: 100%;
  &:nth-of-type(2) {
    margin-top: 0.625rem;
  }
  &:nth-of-type(2) {
    margin-top: 0.3125rem;
  }
`;
export const UserMainPopoverItemText = styled.span``;