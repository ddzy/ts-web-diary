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

import { WriteEditWrapper } from '../style';
import { FormComponentProps } from 'antd/lib/form';
import Quill, { Sources, Delta } from 'quill';


export interface IWriteEditProps extends FormComponentProps {
  editTitle: string;
  editContent: any;
  onEditTitleChange: (data: any) => void;
  onEditContentChange: (
    content: string,
    delta: any,
  ) => void;
};
interface IWriteEditState {};


/**
 * 富文本编辑
 */
class WriteEditForm extends React.Component<IWriteEditProps, IWriteEditState> {

  public inputRef: Input;
  public editorRef: ReactQuill;


  public readonly state = {
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
  public handleEditorImageUpload = (
    image: any,
    callback: any
  ): void => {
    const editor: Quill = this.editorRef.getEditor();
    const editorSelRange = editor.getSelection();
    
    editor.insertEmbed(
      editorSelRange.index,
      'image',
      'baidu.com',
      'user'
    );

    // 重新定位光标
    const editorContentLen: number = editor.getLength();
    editor.setSelection(
      editorSelRange.index + 1,
      editorContentLen - 1,
      'user',
    );
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