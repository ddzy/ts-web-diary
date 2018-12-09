import * as React from 'react';
import { Divider, Tag } from 'antd';
import * as hljs from 'highlight.js';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-light.css';

import { formatTime } from '../../../utils/utils';
import {
  MERGED_ARTICLE_TAG,
} from '../../../constants/constants';
import DetailsLeftComment from './details_main_comment/DetailsMainComment';
import BaseImagePreview from '../../../components/widget/BaseImagePreview/BaseImagePreview';
import DetailsMainRich from './details_main_rich/DetailsMainRich';
import {
  DetailsLeftWrapper,
  LeftTitleContainer,
  LeftTitleBox,
  LeftTitle,
  LeftInfoBox,
  LeftInfoList,
  LeftInfoListItem,
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

  useravatar: string;

  onSendComment: (v: string) => void;
  onSendReply: (v: string) => void;
};
interface IDetailsMainState {
  articleImgPreviewInfo: {
    previewBoxVisible: boolean,
    previewImgUrl: string,
  },
};


/**
 * 左侧文章信息区域
 */
class DetailsMain extends React.PureComponent<IDetailsMainProps, IDetailsMainState> {

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

        {/* 富文本展示区 */}
        <React.Fragment>
          <DetailsMainRich
            html={this.initArticleContent()}
          />
          <Divider />
        </React.Fragment>

        {/* 评论 */}
        <DetailsLeftComment
          useravatar={this.props.useravatar}
          comments={this.props.comments}
          onSendComment={this.props.onSendComment}
          onSendReply={this.props.onSendReply}
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


export default DetailsMain;