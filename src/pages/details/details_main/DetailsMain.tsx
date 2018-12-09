import * as React from 'react';
import { Divider } from 'antd';
import * as hljs from 'highlight.js';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-light.css';

import DetailsLeftComment from './details_main_comment/DetailsMainComment';
import DetailsMainRich from './details_main_rich/DetailsMainRich';
import DetailsMainTitle from './details_main_title/DetailsMainTitle';
import {
  DetailsLeftWrapper,
} from './style';


export interface IDetailsMainProps {
  author: string;
  articleContent: string;
  articleTitle: string;
  create_time: number;
  mode: string;
  tag: string;
  type: string;
  comments: any[];
  img: string;
  useravatar: string;

  onSendComment: (v: string) => void;
  onSendReply: (v: string) => void;
};
interface IDetailsMainState {};


/**
 * 左侧文章信息区域
 */
class DetailsMain extends React.PureComponent<IDetailsMainProps, IDetailsMainState> {

  public readonly state = {}

  /**
   * 初始化富文本editor内容
   */
  public initArticleContent = (): string => {
    const { articleContent } = this.props;
    const parsedArticleContent = articleContent
      ? JSON.parse(articleContent)
      : { ops: [] };

    // delta-to-html暂时使用这种方式替代
    const tempCont = document
      .createElement("div");
    (new Quill(tempCont))
      .setContents(parsedArticleContent);
    const tempContPres = tempCont
      .querySelectorAll('pre') as NodeListOf<HTMLPreElement>;

    // 代码高亮
    tempContPres.forEach((element) => {
      const elementTagname = element.localName as string;
      elementTagname === 'pre'
        && hljs.highlightBlock(element);
    });

    return tempCont
      .getElementsByClassName("ql-editor")[0].innerHTML;
  }

  public render(): JSX.Element {
    return (
      <DetailsLeftWrapper>
        {/* 标题文章信息展示区 */}
        <React.Fragment>
          <DetailsMainTitle
            {...this.props}
          />
          <Divider />
        </React.Fragment>

        {/* 富文本展示区 */}
        <React.Fragment>
          <DetailsMainRich
            html={this.initArticleContent()}
          />
          <Divider />
        </React.Fragment>

        {/* 评论区 */}
        <React.Fragment>
          <DetailsLeftComment
            useravatar={this.props.useravatar}
            comments={this.props.comments}
            onSendComment={this.props.onSendComment}
            onSendReply={this.props.onSendReply}
          />
        </React.Fragment>
      </DetailsLeftWrapper>
    );
  }

}


export default DetailsMain;