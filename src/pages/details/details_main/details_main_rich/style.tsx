import styled from 'styled-components';


export const LeftContentContainer = styled.div``;

export const LeftContent = styled.article`
  ul, ol {
    list-style-type: initial !important;
    padding: 0 2rem;
  }
  padding: 0 1.875rem 2.5rem;
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
  }
  pre {
    padding: 1.125rem 0.9375rem 0.75rem;
    background-color: #f8f8f8;
  }
`;