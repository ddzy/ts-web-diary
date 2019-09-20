import styled from "styled-components";


export const ActionWrapper = styled.div``;
export const ActionMain = styled.div`
  width: 90%;
  padding-top: 8px;
`;

/**
 * 控制栏
 */
export const ActionMainControlBox = styled.div`
  text-align: center;

  span {
    display: block;
    border: 1px solid #ebebeb;
    transition: all .3s ease;
    line-height: 1.5;
    cursor: pointer;

    &:hover {
      background-color: #999;
      color: #fff;
    }
  }
`;

export const ActionMainControlStarBox = styled.div`
  padding: 12px 0;
`;
export const ActionMainControlStar = styled.span`

`;
export const ActionMainControlCommentBox = styled.div`
  padding: 12px 0;
`;
export const ActionMainControlComment = styled.span`
`;
export const ActionMainControlShareBox = styled.div`
  padding: 12px 0;
`;
export const ActionMainControlShare = styled.span`
`;


/**
 * 折叠框
 */
export const ActionMainCollpseBox = styled.div``;