import styled, {
  createGlobalStyle,
} from "styled-components";


export const GlobalStyle = createGlobalStyle`
  .pin-main-view-edit-contenteditable-input {
    min-height: 40px;
    outline: none;
  }

  .pin-main-view-edit-contenteditable-input:empty::before {
    content: attr(data-placeholder);
    color: #bbb;
    cursor: text;
  }
`;


export const InputWrapper = styled.div``;
export const InputMain = styled.div`
  min-height: 110px;
  padding: 12px;
  background-color: #f9fafb;
  border: 1px solid #ccc;
  border-radius: 6px;

  &.active {
    background-color: #fff;
    border-color: #1da57a;
  }
`;

export const InputMainEditBox = styled.div``;
export const InputMainImageBox = styled.div`
  margin-top: 16px;
`;

export const InputMainTopicBox = styled.div`
  margin-top: 16px;
`;
export const InputMainTopicList = styled.ul``;
export const InputMainTopicItem = styled.li`
  display: inline-block;
  margin-left: 8px;

  &:first-child {
    margin-left: 0;
  }
`;
export const InputMainTopicTag = styled.span`
  display: inline-block;
  padding: 1px 12px;
  border: 1px solid #1da57a;
  border-radius: 14px;
  font-size: 13px;
  line-height: 22px;
  color: #1da57a;
  user-select: none;
`;