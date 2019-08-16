import {
  createGlobalStyle,
  GlobalStyleComponent,
} from 'styled-components';


const GloablStyle: GlobalStyleComponent<{}, any> = createGlobalStyle`
  /*
    ??? Reset CSS
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  h1, h2, h3, h4 {
    font-weight: bold;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    font-size: 16px;
    word-break: break-word;
    text-rendering: optimizeLegibility;
  }
  html, body, #app {
    height: 100%;
  }
  body {
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif !important;
    color: #000 !important;
    line-height: 2;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }


  /*
    ??? 重置 antd 样式
  */
  .ant-list-item {
    &:hover {
      background-color: rgba(0, 0, 0, .01);
    }
  }
  .ant-anchor-wrapper, .ant-anchor {
    font-size: 1rem;
    background-color: transparent !important;
    overflow: hidden !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
  }
  .ant-anchor .ant-anchor-link {
    padding: 0;
  }
  .ant-upload {
    width: 160px !important;
    height: 160px !important;
  }
  .ant-input-group-wrapper {
    vertical-align: middle !important;
  }


  /*
    ??? 路由过渡效果 - 1
  */
  .onlyTransformScale-appear,
  .left-enter {
    opacity: 0.5;
    transform: scale(0) rotate(30deg);
  }
  .onlyTransformScale-appear-active,
  .onlyTransformScale-enter-active {
    opacity: 1;
    transform: scale(1) rotate(0);
    transition: transform 0.3s ease-in-out;
  }
  .onlyTransformScale-exit {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.2) rotate(-30deg);
  }
  .onlyTransformScale-exit-active {
    transform: scale(0) rotate(0);
  }

  /*
    ??? 路由过渡效果 - 2
  */
 .fadeTranslate-enter,
 .fadeTranslate-appear {
  opacity: 0;
  transform: translate(0, -3vh);
  }

  .fadeTranslate-enter-active,
  .fadeTranslate-appear-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity 500ms ease-in 500ms, transform 500ms ease-in-out 500ms;
  }

  .fadeTranslate-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  .fadeTranslate-exit-active {
    opacity: 0;
    transform: translate(0, 3vh);
    transition: opacity 300ms ease-in, transform 300ms ease-in-out;
  }

  /*
    ??? 路由过渡效果 - 3
  */
  .fadeTranslateZ-enter {
    opacity: 0.01;
    transform: scale(0.9) translateY(50%);
  }
  .fadeTranslateZ-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0%);
    transition: all .3s ease-out;
  }
  .fadeTranslateZ-exit {
    opacity: 1;
    transform: scale(1) translateY(0%);
  }
  .fadeTranslateZ-exit-active {
    opacity: 0.01;
    transform: scale(0.9) translateY(50%);
    transition: all .3s ease-out;
  }


  /*
    ??? 重置react-quill样式
  */
  .ql-editor {
    min-height: 16.6667rem;
  }

  /*
    ??? 顶部progress_bar加载条样式
  */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.128rem;
    background-color: #1da57a;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 6.25rem;
    height: 100%;
    box-shadow: 0 0 0.625rem #1da57a, 0 0 0.3125rem #1da57a;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 0.9375rem;
    right: 0.9375rem;
  }

  #nprogress .spinner-icon {
    box-sizing: border-box;
    width: 1.125rem;
    height: 1.125rem;
    border: solid 2px transparent;
    border-top-color: #1da57a;
    border-left-color: #1da57a;
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default GloablStyle;
