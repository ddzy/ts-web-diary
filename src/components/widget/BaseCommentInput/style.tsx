import styled from 'styled-components';


export const CommentInputBox = styled.div`
  padding: 0 30px;
  background-color: #f7f8f9;
`;

export const InputTop = styled.div`
  
`;

export const InputTopAvatar = styled.div`
  
`;

export const InputTopText = styled.div`
  padding: 9px 12px 7px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const TopTextMain = styled.div`
  height: 100%;
  outline: none;
`;

export const InputBottom = styled.div`
  display: block;
`;

/// 评论区表情框
export const EmojiWrapper = styled.div`
  display: flex;
  width: 200px;
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