import styled, {
  createGlobalStyle,
} from 'styled-components';

export interface ICommentInputMainProps {
  containerStyle: React.CSSProperties;
};


// ** Global Style **
export const GlobalStyleSet = createGlobalStyle`
  .yyg-contenteditable {
    height: 100%;
    padding: 0.5rem 0.6667rem 0.3889rem;
    background-color: #f8f9f9;
    border: 1px solid #ccc;
    border-radius: 0.3333rem;
    outline: none;
    transition: border .15s ease-in,
                background-color .15s ease-in;
  }
  .yyg-contenteditable:hover {
    background-color: #f8f8f8;
    border-color: #8590a6;
  }
  .yyg-contenteditable:focus {
    border: 1px solid #1da57a;
    background-color: #fff;
  }
  .yyg-contenteditable:empty::before {
    content: attr(data-placeholder);
    color: #ccc;
  }
`;


export const CommentInputBox = styled.div`
  padding: 0 3rem;
`;

export const CommentInputMain = styled('div')<ICommentInputMainProps>`
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