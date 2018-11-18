import styled from 'styled-components';

export interface IContentEditableInputProps {
  placeholder?: string;
};


export const ContentEditableWrapper = styled.div`

`;

export const ContentEditableInput = styled<IContentEditableInputProps, 'div'>('div')`
  width: 200px;
  min-height: 25px;
  padding: 9px 12px 7px;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  cursor: text;
  transition: border .15s ease-in,
              background-color .15s ease-in;
  &:hover {
    background-color: #f8f8f8;
    border-color: #8590a6;
  }
  &:focus {
    border: 1px solid #1890ff;
    background-color: #fff;
  }
  &:empty::before {
    content: '${(props) => {
      return props.placeholder
        ? props.placeholder
        : '请理性评论...'
    }}';
    color: #ccc;
  }
`;