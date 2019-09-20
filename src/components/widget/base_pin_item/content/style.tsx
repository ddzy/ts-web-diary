import styled from "styled-components";


export const ContentWrapper = styled.div``;
export const ContentMain = styled.div`
  padding-top: 8px;
`;

/**
 * 文本内容部分
 */
export const ContentMainTextBox = styled.div`
  width: 90%;

  input[name="toggle"]:checked {
    & + p {
      -webkit-line-clamp: unset;
    }

    & ~ label {
      &::after {
        content: "收起";
      }
    }
  }

  label {
    &::after {
      content: "展开";
    }
  }
`;
export const ContentMainInput = styled.input`
  display: none;
`;
export const ContentMainText = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  &.is-truncated {
    & + label {
      display: block;
    }
  }
`;
export const ContentMainLabel = styled.label`
  display: none;
  color: #1da57a;
  cursor: pointer;
`;

/**
 * 图片内容部分
 */
export const ContentMainImageBox = styled.div`
  width: 80%;
  padding-top: 8px;
`;
export const ContentMainImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export const ContentMainImageItem = styled.li`
  max-width: 140px;
  max-height: 160px;
  margin-top: 4px;
  margin-right: 4px
`;
export const ContentMainImage = styled.img`
  max-width: 100%;
  cursor: zoom-in;
`;