import * as React from 'react';
import { Divider, Tag } from 'antd';
import 'react-quill/dist/quill.snow.css';  


import { formatTime } from '../../../utils/utils';
import {
  MERGED_ARTICLE_TAG,
} from '../../../constants/constants';
import DetailsLeftComment from './DetailsLeftComment';
import {
  DetailsLeftWrapper,
  LeftTitleContainer,
  LeftContentContainer,
  LeftTitleBox,
  LeftTitle,
  LeftInfoBox,
  LeftInfoList,
  LeftInfoListItem,
  LeftContent,
} from '../style';
import Quill from 'quill';



export interface IDetailsLeftProps {
  author: string;
  articleContent: string;
  articleTitle: string;
  create_time: number;
  mode: string;
  tag: string;
  type: string;
  comments: any[];

  useravatar: string;

  onSendComment: (
    e: React.MouseEvent,
    inputRef: any,
  ) => void;


  replyInputValue: string | '';
  onReplyInputChange: (
    changedFields: any,
  ) => void;
  onSendReply: (
    e: React.MouseEvent,
    inputRef: any,
    commentid: string,
  ) => void;



  // 重构
  onCommentInputChangeNew: (
    e: React.ChangeEvent,
  ) => void;
  commentInputValueNew: string;
  onSendCommentNew: () => void;

  onCommentEmojiChange: (e: React.MouseEvent) => void;
};
interface IDetailsLeftState {};



/**
 * 左侧文章信息区域
 */
class DetailsLeft extends React.PureComponent<IDetailsLeftProps, IDetailsLeftState> {


  public readonly state = {}


  //// 初始化文章标签
  public initArticleTag = (): JSX.Element[] => {
    return this.props.tag
      .split(',')
      .map((item) => {
        return (
          <Tag 
            key={item}
            style={{ marginLeft: '3px !important' }} 
            color={MERGED_ARTICLE_TAG[item]}
          >{item}</Tag>
        );
      });
  }


  //// 初始化富文本editor内容
  public initArticleContent = (): string => {
    const { articleContent } = this.props;
    const parsedArticleContent = articleContent
      ? JSON.parse(articleContent)
      : { ops: [] };

    const tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(parsedArticleContent);

    return tempCont
      .getElementsByClassName("ql-editor")[0].innerHTML;
  }


  public render(): JSX.Element {
    return (
      <DetailsLeftWrapper>
        <LeftTitleContainer>
          {/* 标题 */}
          <LeftTitleBox>
            <LeftTitle>
              {this.props.articleTitle}
            </LeftTitle>
          </LeftTitleBox>

          {/* 信息栏 */}
          <LeftInfoBox>
            <LeftInfoList>
              <LeftInfoListItem>
                {this.props.mode}
              </LeftInfoListItem>
              <Divider type="vertical"/>
              <LeftInfoListItem>
                {this.props.author}
              </LeftInfoListItem>
              <Divider type="vertical"/>
              <LeftInfoListItem>
                {this.props.type}
              </LeftInfoListItem>
              <Divider type="vertical"/>
              <LeftInfoListItem>
                {this.initArticleTag()}
              </LeftInfoListItem>
              <Divider type="vertical"/>
              <LeftInfoListItem>
                {formatTime(this.props.create_time)}
              </LeftInfoListItem>
            </LeftInfoList>
          </LeftInfoBox>
        </LeftTitleContainer>
        <Divider />

        {/* 富文本 */}
        <LeftContentContainer>
          <LeftContent
            dangerouslySetInnerHTML={{
              __html: this.initArticleContent(),
            }}
          />
        </LeftContentContainer>
        <Divider />

        {/* 评论 */}
        <DetailsLeftComment
          useravatar={this.props.useravatar}

          comments={this.props.comments} 
          onSendComment={this.props.onSendComment}

          onReplyInputChange={this.props.onReplyInputChange}
          onSendReply={this.props.onSendReply}
          replyInputValue={this.props.replyInputValue}

          onCommentInputChangeNew={this.props.onCommentInputChangeNew}
          onSendCommentNew={this.props.onSendCommentNew}
          commentInputValueNew={this.props.commentInputValueNew}

          onCommentEmojiChange={this.props.onCommentEmojiChange}
        />
      </DetailsLeftWrapper>
    );
  }

}


export default DetailsLeft;