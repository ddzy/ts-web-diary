import styled from 'styled-components';

export interface IInputBottonProps {
  isShowSendBtnBox: boolean;
};


// 左边评论
export const LeftCommentContainer = styled.div`
  margin-top: 0.625rem;
  padding: 0 3rem 1.25rem;
  background-color: #fff;
`;

export const CommentWrapper = styled.div``;

export const CommentTipBox = styled.div`
  padding-top: 1.25rem;
  text-align: center;
`;

export const TipText = styled.h3`
  margin-bottom: auto;
  font-size: 1.25rem;
  color: #999;
`;



export const CommentInputBox = styled.div`
  padding: 0 1.875rem;
  background-color: #f7f8f9;
`;

export const InputTop = styled.div`

`;

export const InputTopAvatar = styled.div`

`;

export const InputTopText = styled.div`

`;

export const InputBottom = styled<IInputBottonProps, 'div'>('div')`
  display: ${(props) => (
    props.isShowSendBtnBox ? 'block' : 'none'
  )};
`;

/// 评论区表情框
export const EmojiWrapper = styled.div`
  display: flex;
  width: 12.5rem;
  justify-content: space-around;
  flex-wrap: wrap;
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