import styled from 'styled-components';


export const ContentWrapper = styled.div``;
export const ContentMain = styled.div`
  overflow: auto;
  height: 450px;
  max-height: 450px;
  padding: 12px;

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
    height: 64px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, .08);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, .2);
  }
`;
export const ContentMainList = styled.ul``;
export const ContentMainItem = styled.li`
  margin-top: 12px;
`;