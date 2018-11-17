import * as React from 'react';
import { Divider, Tag } from 'antd';
import ReactQuill from 'react-quill';
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
} from '../style';



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
          <ReactQuill
            className="details-rich-editor"
            value={this.props.articleContent}
            readOnly={true}
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
          commentInputValueNew={this.props.commentInputValueNew}
        />
      </DetailsLeftWrapper>
    );
  }

}


export default DetailsLeft;