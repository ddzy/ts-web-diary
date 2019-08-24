import * as React from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  message,
} from 'antd';
import {
  withRouter,
} from 'react-router-dom';

import {
  WriteWrapper,
  WriteContent,
} from './style';
import WriteEdit from './edit/WriteEdit';
import WriteUpload from './upload/WriteUpload';
import WriteExtra from './extra/WriteExtra';
import WriteTitle from './title/WriteTitle';
import { getBase64 } from '../../utils/utils';


export interface IWriteProps {
  onSendArticle: (
    data: any,
  ) => void;
  username: string;

  // ? 默认文章信息
  // * 据此来判断是发表新文章还是编辑文章
  defaultArticleInfo?: typeof initialState.articleInfo;
};
export type IWriteState = typeof initialState;


const initialState = {
  // ? 文章相关信息
  articleInfo: {
    // 文章标题
    title: '',
    // 文章内容
    content: {
      ops: [],
    },
    // 文章主题图片
    cover_img: '',
    // 文章模式
    mode: '',
    // 文章分类
    type: '',
    // 文章标签
    tag: [],
  },
};


const Write = React.memo((props: IWriteProps) => {
  const [state, setState] = React.useState<IWriteState>(initialState);

  React.useEffect(() => {
    // 编辑文章
    if (props.defaultArticleInfo) {
      setState({
        ...state,
        articleInfo: props.defaultArticleInfo,
      });
    }
  }, [props.defaultArticleInfo]);

  /**
   * [处理] - 文章标题更新
   */
  function handleArticleTitleChange(
    changedFields: {
      article_title: string,
    },
  ) {
    setState({
      ...state,
      articleInfo: {
        ...state.articleInfo,
        title: changedFields.article_title,
      },
    });
  }

  /**
   * [处理] - 文章内容更新
   */
  function handleArticleContentChange(
    content: any,
    deltaContent: any,
  ){
    setState({
      ...state,
      articleInfo: {
        ...state.articleInfo,
        content: deltaContent,
      },
    });
  }

  /**
   * [处理] - 上传文章主题图片
   */
  function handleArticleCoverImageChange(
    changedFields: {
      article_cover_img: {
        file: File,
      },
    },
  ) {
    const img = changedFields.article_cover_img.file;

    const isJpgOrPng = img.type === 'image/jpeg' || img.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('目前只支持上传`JPG`和`PNG`格式的图片!');

      return;
    }

    const isLt1M = img.size / 1024 / 1024 < 1;

    if (!isLt1M) {
      message.error('目前只支持上传小于`1MB`的图片!');

      return;
    }

    getBase64(img, (result) => {
      setState({
        ...state,
        articleInfo: {
          ...state.articleInfo,
          cover_img: result,
        },
      });
    });
  }

  /**
   * [处理] - 文章附加信息更新
   */
  function handleArticleExtraChange(
    changedFields: any,
  ) {
    setState({
      ...state,
      articleInfo: {
        ...state.articleInfo,
        mode: changedFields.article_mode || state.articleInfo.mode,
        type: changedFields.article_type || state.articleInfo.type,
        tag: changedFields.article_tag || state.articleInfo.tag,
      },
    });
  }

  /**
   * [处理] - 提交文章
   */
  function handleSend() {
    props.onSendArticle(
      state.articleInfo,
    );
  }

  return (
    <React.Fragment>
      <WriteWrapper>
        <WriteContent>
          {/* 标题区块 */}
          <WriteTitle
            {...state}
            onArticleTitleChange={handleArticleTitleChange}
          />

          {/* 编辑器区块 */}
          <WriteEdit
            {...state}
            username={props.username}
            onArticleContentChange={handleArticleContentChange}
          />

          {/* 上传封面图片区块 */}
          <WriteUpload
            {...state.articleInfo}
            onArticleCoverImageChange={handleArticleCoverImageChange}
          />

          {/* 附加信息区块 */}
          <WriteExtra
            {...state}
            onArticleExtraChange={handleArticleExtraChange}
          />

          {/* 提交按钮区块 */}
          <Row style={{ marginTop: '15px' }}>
            <Col>
              <Card>
                <Button
                  htmlType="button"
                  type="primary"
                  block
                  onClick={handleSend}
                >提交</Button>
              </Card>
            </Col>
          </Row>
        </WriteContent>
      </WriteWrapper>
    </React.Fragment>
  );
});


export default withRouter(Write as any) as any;