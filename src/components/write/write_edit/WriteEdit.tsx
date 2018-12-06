import * as React from 'react';
import ReactQuill from 'react-quill';
import {
  Row,
  Col,
  Card,
  Input,
  Icon,
  Form,
  Popover
} from 'antd';
import 'react-quill/dist/quill.snow.css';
import * as qiniu from 'qiniu-js';
import { FormComponentProps } from 'antd/lib/form';
import Quill, { Sources, Delta } from 'quill';

import {
  WriteEditWrapper,
} from './style';
import BaseLoading from 'src/components/widget/BaseLoading/BaseLoading';
import QuillImageBlot from './QuillImageBlot';


Quill.register(QuillImageBlot, true);


export interface IWriteEditProps extends FormComponentProps {
  username: string;

  editTitle: string;
  editContent: any;
  onEditTitleChange: (data: any) => void;
  onEditContentChange: (
    content: string,
    delta: any,
  ) => void;
  onEditContentImageUpload: (
    callback: (info: object) => void,
  ) => void;
};
interface IWriteEditState {
  loadingVisible: boolean;
};


/**
 * 富文本编辑
 */
class WriteEditForm extends React.Component<IWriteEditProps, IWriteEditState> {

  public static _createFileInput = (): HTMLInputElement => {
    const oInput: HTMLInputElement = document.createElement('input');
    oInput.setAttribute('type', 'file');
    oInput.setAttribute('accept', 'image/jpg,image/gif,image/png, image/bmp,image/jpeg');
    oInput.setAttribute('id', 'ql-upload-image');
    oInput.style.cssText = `display: none;`;
    document.body.appendChild(oInput);

    return oInput;
  }

  public inputRef: Input;
  public editorRef: ReactQuill;

  public readonly state = {
    loadingVisible: false,
  }


  public initModules = (): object => {
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, false] },],
          [
            { 'size': ['small', false, 'large', 'huge'] }, {
              'color': [
                '#000', '#e70000', '#ff9a00', '#ff0', '#00bb00', '#1890ff', '#0066cd', '#facdcd', '#f06666',
                '#bcbcbc', '#fff',
              ]
            }
          ],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],

          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: this.handleEditorImageUpload,
        },
      },
    };
  }


  public initFormats = (): string[] => {
    return [
      'header', 'size', 'color',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
      'header', 'header',
      'list', 'bullet', 'indent',
      'link', 'image',
    ];
  }


  public componentDidMount(): void {
    this.inputRef.focus();
  }


  //// 处理富文本
  public handleChange = (
    content: string,
    _delta: Delta,
    _source: Sources,
    editor: any,
  ): void => {
    this.props.onEditContentChange(
      content,
      editor.getContents(),
    );
  }


  //// 处理富文本图片上传
  public handleEditorImageUpload = (): void => {
    const editor: Quill = this.editorRef.getEditor();
    const editorSelRange = editor.getSelection();
    const oInput = WriteEditForm._createFileInput();

    oInput.click();

    oInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      const file = files.item(0) as File;

      this.props.onEditContentImageUpload(async (info: any) => {
        const date: string = new Date().toLocaleDateString();
        const username: string = this.props.username;
        const key: string = `${date}/${username}/posts/${Date.now()}`;
        const token: string = info.uploadToken;
        const domain: string = info.domain;

        // loading
        this.setState({ loadingVisible: true });

        const $qiniu: qiniu.Observable = qiniu.upload(
          file,
          key,
          token,
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
              fontsize: 14,
              font: '微软雅黑',
              dx: 10,
              dy: 10,
              fill: '#1890ff',
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
          this.setState({ loadingVisible: false });
        });
      });
    });
  }


  //// 获取input的ref
  public getInputinputRef = (el: Input): void => {
    this.inputRef = el;
  }

  //// 获取editor的ref
  public getEditorRef = (el: ReactQuill): void => {
    this.editorRef = el;
  }


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <WriteEditWrapper>
          <Row style={{ marginTop: '15px' }}>
            <Col>
              <Card
                title={
                  <Form>
                    <Form.Item>
                      {getFieldDecorator('editTitle', {
                        rules: [{ required: true, message: '标题一定要填!' }],
                      })(
                        <Input
                          ref={this.getInputinputRef}
                          type="text"
                          prefix={
                            <Popover
                              title="警告信息"
                              content={
                                <p>给你的文章取个响亮的标题, 必填项!</p>
                              }
                            >
                              <Icon
                                type="exclamation-circle"
                                style={{ color: '#d50' }}
                              />
                            </Popover>
                          }
                          placeholder="文章标题, 此为必填项!"
                        />
                      )}
                    </Form.Item>
                  </Form>
                }
              >
                <ReactQuill
                  ref={this.getEditorRef}
                  value={this.props.editContent}
                  modules={this.initModules()}
                  formats={this.initFormats()}
                  placeholder="创作您的文章..."
                  onChange={this.handleChange}
                />
              </Card>
            </Col>
          </Row>
        </WriteEditWrapper>
        <BaseLoading visible={this.state.loadingVisible} />
      </React.Fragment>
    );
  }
}


const WriteEdit = Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onEditTitleChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      editTitle: Form.createFormField({
        ...props.editTitle,
        value: props.editTitle,
      }),
    };
  },

})(WriteEditForm);



export default WriteEdit as React.ComponentClass<any>;