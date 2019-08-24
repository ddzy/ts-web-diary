import * as React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Radio,
  Tag,
  Input,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  ARTICLE_TAG_PICKER,
  ARTICLE_TYPE_PICKER,
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
} from 'constants/constants';
import {
  WriteExtraWrapper,
  TagWrapper,
} from './style';


export interface IWriteExtraProps extends FormComponentProps {
  // ? 文章相关信息
  articleInfo: {
    mode: string,
    type: string,
    tag: string[],
  },

  onArticleExtraChange: (data: any) => void;
};
interface IWriteExtraState {
  selectedTags: any[];
};


const WriteExtraForm = React.memo<IWriteExtraProps>((
  props: IWriteExtraProps,
): JSX.Element => {
  const [
    state,
    setState,
  ] = React.useState<IWriteExtraState>({
    selectedTags: [],
  });
  const { getFieldDecorator } = props.form;

  React.useEffect(() => {
    props.form.setFieldsValue({
      article_tag: state.selectedTags,
    });
  }, [state]);


  /**
   * [初始化] - 文章类型
   */
  function _initArticleType(): JSX.Element[] {
    return ARTICLE_TYPE_PICKER.map((v: string, index: number) => (
      <Radio.Button
        key={index}
        value={ARTICLE_TYPE_WITH_ENGLISH_PICKER[index]}
      >{v}</Radio.Button>
    ));
  }

  /**
   * [初始化] - 文章标签
   */
  function _initArticleTag(): any[] {
    return ARTICLE_TAG_PICKER
      .map((item: never) => {
        return (
          <Tag.CheckableTag
            key={item}
            checked={state.selectedTags.indexOf(item) !== -1}
            onChange={(checked: boolean) => handleTagChange(item, checked)}
          >
            {item}
          </Tag.CheckableTag>
        );
      });
  }

  /**
   * [处理] - 选择文章标签
   * @param item 标签名称
   * @param checked 是否选中
   */
  function handleTagChange(item: string, checked: boolean) {
    setState({
      selectedTags: checked
        ? state.selectedTags.concat(item)
        : state.selectedTags.filter((v) => v !== item),
    });
  }

  return (
    <WriteExtraWrapper>
      <Row style={{ marginTop: '15px' }}>
        <Col>
          <Card
            title="备注信息"
          >
            <Form layout="vertical" id="write-extra-form">
              <Form.Item label="文章形式">
                {getFieldDecorator('article_mode', {
                  rules: [{
                    required: true,
                    message: '文章形式一定要选',
                  }],
                  validateTrigger: 'onBlur',
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="原创">原创</Radio.Button>
                    <Radio.Button value="转载">转载</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="文章类型">
                {getFieldDecorator('article_type', {
                  rules: [{
                    required: true,
                    message: '文章类型一定要选'
                  }],
                  validateTrigger: 'onBlur',
                })(
                  <Radio.Group buttonStyle="solid">
                    {_initArticleType()}
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="标签">
                {getFieldDecorator('article_tag', {
                  rules: [{
                    required: true,
                    message: '至少选择一个标签'
                  }],
                  validateTrigger: 'onBlur',
                })(
                  <Input
                    type="text"
                    prefix={
                      <Icon
                        type="exclamation-circle"
                        style={{ color: '#d50' }}
                      />
                    }
                  />
                )}
                <TagWrapper>
                  {_initArticleTag()}
                </TagWrapper>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </WriteExtraWrapper>
  );
});


const WriteExtra = Form.create({
  onValuesChange(props: any, changedFields) {
    props.onArticleExtraChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      article_mode: Form.createFormField({
        value: props.articleInfo.mode,
      }),

      article_type: Form.createFormField({
        value: props.articleInfo.type,
      }),

      article_tag: Form.createFormField({
        value: props.articleInfo.tag,
      }),
    };
  },

})(WriteExtraForm);

export default WriteExtra;
