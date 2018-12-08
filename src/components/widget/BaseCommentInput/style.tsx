import styled from 'styled-components';

export interface ICommentInputMainProps {
  containerStyle: React.CSSProperties;
};


export const CommentInputBox = styled.div`
  padding: 0 3rem;
`;

export const CommentInputMain = styled<ICommentInputMainProps, 'div'>('div')`
  padding: ${((props) => {
    return props.containerStyle.padding
      ? props.containerStyle.padding
      : '1.5rem'
  })};
  background-color: ${(props) => {
    return props.containerStyle.backgroundColor
      ? props.containerStyle.backgroundColor
      : '#fafbfc'
  }};
`;

export const InputTop = styled.div``;

export const InputTopAvatar = styled.div``;

export const InputTopText = styled.div``;

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