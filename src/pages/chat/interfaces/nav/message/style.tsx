import styled from 'styled-components';


export const MessageWrapper = styled.div``;
export const MessageMain = styled.div`
  overflow: auto;
  max-height: 31.25rem;

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background: rgba(0, 0, 0, .06);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .08);
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    height: 32px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, .08);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, .2);
  }
`;

export const MessageMainItem = styled.div``;
export const MessageMainItemInner = styled.div`
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 10px #eee;
    transition: all .3s ease;
  }
`;