import styled from 'styled-components';


export const LeftContentContainer = styled.div``;

export const LeftContent = styled.article`
  padding: 0 1.875rem 2.5rem;
  p {
    margin: 1.375rem 0;
    line-height: 1.5rem;
  }
  ul, ol {
    list-style-type: initial !important;
    padding: 0 2rem;
    line-height: 1.5rem;
  }
  h3 {
    margin-top: 2.1875rem;
    margin-bottom: 0.625rem;
  }
  pre {
    padding: 1.125rem 0.9375rem 0.75rem;
    background-color: #f8f8f8;
    line-height: 1.75;
  }
  h2::after {
    display: block;
    content: ' ';
    margin-top: 0.9375rem;
    border-bottom: 1px solid #d9dce1;
  }
  img {
    max-width: 42.5rem;
    cursor: zoom-in;
  }
  blockquote {
    padding: 0.625rem 1.4375rem;
    border-left: 4px solid #cbcbcb;
    background-color: #f8f8f8;
    color: #666;
    margin: 1.375rem 0;
  }
`;