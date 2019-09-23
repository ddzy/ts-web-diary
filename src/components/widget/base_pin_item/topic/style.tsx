import styled from "styled-components";


export const TopicWrapper = styled.div`
`;
export const TopicMain = styled.div`
  padding-top: 8px;
`;

export const TopicMainList = styled.ul``;
export const TopicMainItem = styled.li`
  display: inline-block;
  margin-left: 8px;

  &:first-child {
    margin-left: 0;
  }
`;

export const TopicMainItemTag = styled.span`
  display: inline-block;
  padding: 1px 12px;
  border: 1px solid #1da57a;
  border-radius: 14px;
  font-size: 13px;
  line-height: 22px;
  color: #1da57a;
  user-select: none;
  cursor: pointer;
`;