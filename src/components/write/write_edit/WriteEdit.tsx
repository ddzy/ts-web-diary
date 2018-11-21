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
import { Sources, Delta } from 'quill';


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

  public ref: any = null


  public readonly state = {
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


  //// 处理富文本
  public handleChange = (
    content: string,
    _delta: Delta,
    _source: Sources,
    editor: any,
  ) => {
    this.props.onEditContentChange(
      content,
      editor.getContents(),
    );
  }


  //// 获取input的ref
  public getInputRef = (el: any) => {
    this.ref = el;
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