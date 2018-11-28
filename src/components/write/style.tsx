import styled from 'styled-components';


export interface IStyleProps {};


// 写文章
export const WriteWrapper = styled<IStyleProps, 'div'>('div')`
  /* margin-top: 50px; */
  padding-top: 10px;
  background-color: #f4f5f5;
`;

export const WriteContent = styled<IStyleProps, 'div'>('div')`
  width: 80%;
  margin: 0 auto;
`;


// 富文本
export const WriteEditWrapper = styled<IStyleProps, 'div'>('div')`
  h2::after {
    display: block;
    content: ' ';
    border-bottom: 1px solid #d9dce1;
  }
`;


// 上传图片
export const WriteUploadWrapper = styled<IStyleProps, 'div'>('div')`
  
`;

// 文章备注
export const WriteExtraWrapper = styled<IStyleProps, 'div'>('div')`

`;


export const TagWrapper = styled<IStyleProps, 'div'>('div')`
  width: 300px;
  padding: 10px;
  border: 1px solid #09c;
`;