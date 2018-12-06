import * as React from 'react';
import { Divider, Tag } from 'antd';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

import { formatTime } from '../../../utils/utils';
import {
  MERGED_ARTICLE_TAG,
} from '../../../constants/constants';
import DetailsLeftComment from './details_main_comment/DetailsMainComment';
import BaseImagePreview from '../../../components/widget/BaseImagePreview/BaseImagePreview';
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

  commentInputValue: string;
  onCommentInputChange: (
    e: React.ChangeEvent,
  ) => void;
  onSendComment: () => void;
  onCommentEmojiChange: (e: React.MouseEvent) => void;
};
interface IDetailsLeftState {
  articleImgPreviewInfo: {
    previewBoxVisible: boolean,
    previewImgUrl: string,
  },
};


/**
 * 左侧文章信息区域
 */
class DetailsLeft extends React.PureComponent<IDetailsLeftProps, IDetailsLeftState> {

  public readonly state = {
    articleImgPreviewInfo: {
      previewBoxVisible: false,
      previewImgUrl: '',
    },
  }

  public componentDidMount(): void {
    this.handleArticleImagePreview();
  }

  /**
   * 处理 富文本图片预览
   */
  public handleArticleImagePreview = () => {
    const oArticleEle = document
      .querySelector('#article-detail-content') as HTMLDivElement;

    oArticleEle.addEventListener('click', (e) => {
      const oTarget = e.target as HTMLElement;

      if (oTarget.localName === 'img') {
        if (oTarget.hasAttribute('data-src')) {
          const sTargetUrl = oTarget
            .getAttribute('data-src') as string;

          this.setState((prevState) => {
            return {
              ...prevState,
              articleImgPreviewInfo: {
                ...prevState.articleImgPreviewInfo,
                previewBoxVisible: true,
                previewImgUrl: sTargetUrl,
              },
            };
          });
        }
      }
    });
  }

  /**
   * 处理图片预览容器点击
   */
  public handleImagePreviewContainerClick = (e: React.MouseEvent): void => {
    this.setState((prevState) => {
      return {
        articleImgPreviewInfo: {
          ...prevState.articleImgPreviewInfo,
          previewBoxVisible: false,
        },
      };
    });
  }

  /**
   * 初始化文章标签
   */
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

  /**
   * 初始化富文本editor内容
   */
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
              <Divider type="vertical" />
              <LeftInfoListItem>
                {this.props.author}
              </LeftInfoListItem>
              <Divider type="vertical" />
              <LeftInfoListItem>
                {this.props.type}
              </LeftInfoListItem>
              <Divider type="vertical" />
              <LeftInfoListItem>
                {this.initArticleTag()}
              </LeftInfoListItem>
              <Divider type="vertical" />
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
            id="article-detail-content"
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

          onCommentInputChange={this.props.onCommentInputChange}
          onSendComment={this.props.onSendComment}
          commentInputValue={this.props.commentInputValue}

          onCommentEmojiChange={this.props.onCommentEmojiChange}
        />

        {/* 图片预览 */}
        <BaseImagePreview
          visible={this.state.articleImgPreviewInfo.previewBoxVisible}
          currentUrl={this.state.articleImgPreviewInfo.previewImgUrl}
          onImagePreviewContainerClick={this.handleImagePreviewContainerClick}
        />
      </DetailsLeftWrapper>
    );
  }

}


export default DetailsLeft;