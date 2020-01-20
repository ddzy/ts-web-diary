import styled from "styled-components";

export const ContentWrapper = styled.div``;
export const ContentMain = styled.div``;

export const MainTitleText = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
`;

// 群聊成员列表
export const MainGroupMemberWrapper = styled.div`
  width: 100%;
`;
export const MainGroupMemberList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const MainGroupMemberItem = styled.li`
  margin: 12px;

  &:nth-last-child(1) {
    cursor: pointer;
  }
  svg {
    width: 100%;
    height: 100%;
    color: #1da57a;
  }
`;