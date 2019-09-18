import styled, {
  createGlobalStyle,
} from "styled-components";


export const GlobalStyle = createGlobalStyle`
  .pin-main-view-edit-contenteditable-input {
    min-height: 120px;
    padding: 12px;
    background-color: #f9fafb;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;

    &:focus {
      background-color: #fff;
      border-color: #1da57a;
    }
  }

  .pin-main-view-edit-contenteditable-input:empty::before {
    content: attr(data-placeholder);
    color: #bbb;
  }
`;


export const InputWrapper = styled.div``;
export const InputMain = styled.div`

`;