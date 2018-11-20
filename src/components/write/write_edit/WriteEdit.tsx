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
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

import { WriteEditWrapper } from '../style';
import { FormComponentProps } from 'antd/lib/form';
import { Sources, Delta } from 'quill';


export interface IWriteEditProps extends FormComponentProps {
  editTitle: string;
  editContent: any;
  onEditTitleChange: (data: any) => void;
  onEditContentChange: (value: any) => void;
};
interface IWriteEditState {
  selfEditContent: string;
};


/**
 * 富文本编辑
 */
class WriteEditForm extends React.Component<IWriteEditProps, IWriteEditState> {

  public ref: any = null


  public readonly state = {
    selfEditContent: '',
  }


  public initModules = () => {
    return {
      toolbar: [
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
    };
  }


  public initFormats = () => {
    return [
      'header', 'size', 'color',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
      'list', 'bullet', 'indent',
      'link', 'image'
    ];
  }

  
  public componentDidMount(): void {
    this.ref.focus();
  }


  public _convertBase64UrlToBlob = (url: string): Blob => {
    const bytes = window.atob(url.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);

    ia.forEach((v: number, i: number) => ia[i] = bytes.charCodeAt(i));

    return new Blob([ia], {
      type: url.split(',')[0].split(':')[1].split(';')[0],
    });
  }


  //// 处理富文本
  // public handleChange = (...args: any[]): void => {
  //   const editor: Quill = args[3];
  //   const { ops }: DeltaStatic = editor.getContents();

  //   this.props.onEditContentChange(ops);
  // }
  public handleChange = (
    content: string,
    delta: Delta,
    source: Sources,
    editor: any,
  ) => {
    //content: string, delta: Delta, source: Sources, editor: UnprivilegedEditor
    
    
  }


  //// 获取input的ref
  public getInputRef = (el: any) => {
    this.ref = el;
  }


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    const converter = new QuillDeltaToHtmlConverter(this.props.editContent, {});
    const html = converter.convert();

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
                        ref={(el) => this.getInputRef(el)}
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
                value={html}
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