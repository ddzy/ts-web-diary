import styled from 'styled-components';

export interface IInputBottonProps {
  isShowSendBtnBox: boolean;
};


export const LeftCommentContainer = styled.div`
  margin-top: 0.625rem;
  padding: 0 3rem 1.25rem;
  background-color: #fff;
`;

export const EmojiItem = styled.span`
  text-align: center;
  cursor: pointer;
  transition: transform .15s ease-in;
  &:hover {
    transform: scale(1.3, 1.3);
  }
`;


export const CommentShowBox = styled.div`
  margin-top: 1.875rem;
  padding-left: 3rem;
`;

export const CommentShowList = styled.ul``;