import * as React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import { 
  WriteWrapper,
  WriteContent,
} from './style';
import WriteEdit from './write_edit/WriteEdit';
import WriteUpload from './write_upload/WriteUpload';
import WriteExtra from './write_extra/WriteExtra';
import { getBase64 } from '../../utils/utils';
import { reduxHandleGetQiniuToken } from './Write.redux';


export interface IWriteProps {
  onSendArticle: (      // 发表文章
    data: any,
  ) => void;

  defaultEditValue?: any;     // 编辑文章默认数据

  WriteReducer: { editorImageInfo: object };
  reduxHandleGetQiniuToken: (
    record: { userid: string },
    callback: () => void,
  ) => void;
};
interface IWriteState {
  editTitle?: string;        // 文章标题
  editContent?: any;      // 文章内容
  article_title_image?: string;          // 文章标题图片
  extraContent?: {            // 附加信息
    article_mode: { value: string },
    article_type: { value: string },
    article_tag: { value: string[] },
  };     
};


/**
 * 写文章
 */
class Write extends React.PureComponent<
  IWriteProps, 
  IWriteState
> {

  public readonly state = {
    editTitle: '',        
    editContent: {},      
    article_title_image: '',         
    extraContent: {       
      article_mode: { 
        value: '' 
      },
      article_type: { 
        value: '', 
      },
      article_tag: { 
        value: [], 
      },
    },
  }


  public componentWillReceiveProps(nextProps: any) {
    if(nextProps.defaultEditValue) {
      this.setState({
        editTitle: nextProps.defaultEditValue.title,
        editContent: nextProps.defaultEditValue.content,
        article_title_image: nextProps.defaultEditValue.img,
        extraContent: {
          article_mode: {
            value: nextProps.defaultEditValue.mode,
          },
          article_type: {
            value: nextProps.defaultEditValue.type,
          },
          article_tag: {
            value: nextProps.defaultEditValue.tag,
          },
        },
      });
    }
  }


  //// 处理标题栏表单
  public handleEditFormChange = (changedFields: any): void => {
    this.setState({ editTitle: changedFields.editTitle.value });
  }


  //// 处理富文本编辑
  public handleEditContentChange = (
    content: string,
    delta: any,
  ) => {
    this.setState({ editContent: content });
  }


  //// 处理上传主题图片
  public handleTitleImageChange = (file: any): void => {
    const img = file.article_title_image.value.file;

    getBase64(img, (result) => {
      this.setState({ article_title_image: result });
    });
  }


  //// 处理附加栏表单
  public handleExtraFormChange = (changedFields: any): void => {
    this.setState((prevState) => {
      return {
        extraContent: {
          ...prevState.extraContent,
          ...changedFields,
        },
      };
    });
  }


  //// 提交文章
  public handleSend: React.MouseEventHandler = () => {
    this.props.onSendArticle(
      this.state,
    );
  }


  //// 处理 富文本上传图片
  public handleEditContentImageUpload = (
    callback: (info: object) => void,
  ): void => {
    this.props.reduxHandleGetQiniuToken({
      userid: localStorage.getItem('userid') || '',
    }, () => {
      callback && callback(this.props.WriteReducer.editorImageInfo);
    });
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <WriteWrapper>
          <WriteContent>
            {/* 编辑器 */}
            <WriteEdit
              editTitle={this.state.editTitle}
              editContent={this.state.editContent}
              onEditTitleChange={this.handleEditFormChange}
              onEditContentChange={this.handleEditContentChange}
              onEditContentImageUpload={this.handleEditContentImageUpload}
            />

            {/* 上传图片 */}
            <WriteUpload 
              article_title_image={
                this.state.article_title_image
              }
              onTitleImageChange={this.handleTitleImageChange}
            />

            {/* 附加信息 */}
            <WriteExtra 
              onChange={this.handleExtraFormChange}
              {...this.state.extraContent}
            />

            {/* 提交按钮 */}
            <Row style={{ marginTop: '15px' }}>
              <Col>
                <Card>
                  <Button
                    htmlType="button"
                    type="primary"
                    block
                    onClick={this.handleSend}
                  >提交</Button>
                </Card>
              </Col>
            </Row>
          </WriteContent>
        </WriteWrapper>
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    WriteReducer: state.WriteReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleGetQiniuToken,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Write);