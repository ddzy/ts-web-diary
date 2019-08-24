import * as React from 'react';
import * as qiniu from 'qiniu-js';
import Quill, { Sources, Delta } from 'quill';
import ReactQuill from 'react-quill';
import {
  Row,
  Col,
  Card,
} from 'antd';
import 'react-quill/dist/quill.snow.css';

import {
  WriteEditWrapper,
} from './style';
import { query } from 'services/request';
import BaseLoading from 'components/widget/base_loading/BaseLoading';
import BaseQuillImageBlot from 'components/widget/base_quill_image_blot/BaseQuillImageBlot';
import {
  quillModuleConfig,
  quillFormatConfig,
} from 'config/quill.config';

Quill.register(BaseQuillImageBlot, true);


export interface IWriteEditProps {
  username: string;

  // ? 文章相关信息
  articleInfo: {
    title: string,
    content: any,
  },
  onArticleContentChange: (
    content: string,
    deltaContent: Delta,
  ) => void;
};
interface IWriteEditState {
  // ? 编辑器内上传图片时的loading状态
  isLoading: boolean;
};


class WriteEdit extends React.Component<IWriteEditProps, IWriteEditState> {
  /**
   * [辅助] - 创建普通的输入框
   */
  public static _createFileInput = (): HTMLInputElement => {
    const oInput: HTMLInputElement = document.createElement('input');
    oInput.setAttribute('type', 'file');
    oInput.setAttribute('accept', 'image/jpg,image/gif,image/png, image/bmp,image/jpeg');
    oInput.setAttribute('id', 'ql-upload-image');
    oInput.style.cssText = `display: none;`;
    document.body.appendChild(oInput);

    return oInput;
  }

  // 编辑器ref
  public editorRef: ReactQuill;

  public readonly state = {
    isLoading: false,
  }

  /**
   * [初始化] - 编辑器的模块
   */
  public _initEditorModules = (): object => {
    return {
      ...quillModuleConfig,
      toolbar: {
        ...quillModuleConfig.toolbar,
        handlers: {
          image: this.handleEditorImageUpload,
        },
      },
    };
  }

  /**
   * [处理] - 获取editor的ref
   */
  public handleGetEditorRef = (el: ReactQuill): void => {
    this.editorRef = el;
  }

  /**
   * [处理] - 富文本更新
   */
  public handleEditorChange = (
    content: string,
    _delta: Delta,
    _source: Sources,
    editor: any,
  ): void => {
    this.props.onArticleContentChange(
      content,
      editor.getContents(),
    );
  }

  /**
   * [处理] - 富文本图片上传
   */
  public handleEditorImageUpload = (): void => {
    const editor: Quill = this.editorRef.getEditor();
    const editorSelRange = editor.getSelection();
    const oInput = WriteEdit._createFileInput();

    oInput.click();

    oInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      const file = files.item(0) as File;

      query({
        url: '/api/upload/qiniu',
        method: 'GET',
        data: {
          userId: localStorage.getItem('userid'),
        },
        jsonp: false,
      }).then(async (data) => {
        const date: string = new Date().toLocaleDateString();
        const username: string = this.props.username;
        const key: string = `${date}/${username}/posts/${Date.now()}`;
        const { uploadToken, domain } = data.info.qiniuInfo;

        // loading
        this.setState({ isLoading: true });

        const $qiniu: qiniu.Observable = qiniu.upload(
          file,
          key,
          uploadToken,
          {},
          {},
        );

        $qiniu.subscribe(() => {
          const processedImgUrl: string = qiniu.pipeline([
            {
              fop: 'watermark',
              mode: 2,
              text: `gayhub@${username}`,
              dissolve: 99,
              gravity: 'SouthEast',
              fontsize: 18,
              font: '微软雅黑',
              dx: 10,
              dy: 10,
              fill: '#ffffff',
            }, {
              fop: 'imageView2',
              mode: 3,
              w: 600,
              h: 600,
              q: 100,
              format: 'png'
            }
          ], key, domain);
          const finalProcessedImgUrl: string = `http://${processedImgUrl}`;
          const finalOriginImgUrl: string = `http://${domain}/${key}`;

          // 插入editor
          editor.insertEmbed(
            editorSelRange.index,
            'image',
            {
              src: finalProcessedImgUrl,
              'data-src': finalOriginImgUrl,
              alt: key,
            },
            'user',
          );

          // fix_bug: 每次会插入两次图片
          editor.deleteText(
            editorSelRange.index + 1,
            1,
          );

          // 光标位置调整
          editor.setSelection(
            editorSelRange.index + 1,
            editor.getLength() - 1,
            'user',
          );

          // loading
          this.setState({ isLoading: false });
        });
      });
    });
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <WriteEditWrapper>
          <Row style={{ marginTop: '15px' }}>
            <Col>
              <Card
                title={'文章内容'}
              >
                <ReactQuill
                  placeholder="创作您的文章..."
                  ref={this.handleGetEditorRef}
                  value={this.props.articleInfo.content}
                  modules={this._initEditorModules()}
                  formats={quillFormatConfig}
                  onChange={this.handleEditorChange}
                />
              </Card>
            </Col>
          </Row>
        </WriteEditWrapper>
        <BaseLoading visible={this.state.isLoading} />
      </React.Fragment>
    );
  }
}

export default WriteEdit;