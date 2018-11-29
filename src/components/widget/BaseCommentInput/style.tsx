import styled from 'styled-components';


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

export const TopTextMain = styled.div`
  height: 100%;
  padding: 0.5625rem 0.75rem 0.4375rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  transition: border .15s ease-in;
  &:empty::before {
    content: attr(placeholder);
    color: #ccc;
  }
  &:focus::before {
    content: none;
  }
  &:focus {
    border: 1px solid #1890ff;
  }
`;

export const InputBottom = styled.div`
  display: block;
  margin-top: 1.25rem;
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