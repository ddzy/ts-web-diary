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
  onChange: (data: any) => void;
  article_mode: { value: string };
  article_type: { value: string };
  article_tag: { value: any };
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

  // ** 处理初始化标签 **
  function initTags(): any[] {
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

  // ** 处理标签点击, 添加至输入框 **
  function handleTagChange(item: string, checked: boolean) {
    setState({
      selectedTags: checked
        ? state.selectedTags.concat(item)
        : state.selectedTags.filter((v) => v !== item),
    });
  }

  // ** 处理初始化文章类型 **
  function handleInitArticleType(): JSX.Element[] {
    return ARTICLE_TYPE_PICKER.map((v: string, index: number) => (
      <Radio.Button
        key={index}
        value={ARTICLE_TYPE_WITH_ENGLISH_PICKER[index]}
      >{v}</Radio.Button>
    ));
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
                  rules: [{ required: true, message: '文章形式一定要选' }],
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="原创">原创</Radio.Button>
                    <Radio.Button value="转载">转载</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="文章类型">
                {getFieldDecorator('article_type', {
                    rules: [{ required: true, message: '文章类型一定要选' }],
                  })(
                    <Radio.Group buttonStyle="solid">
                      {handleInitArticleType()}
                    </Radio.Group>
                  )}
              </Form.Item>
              <Form.Item label="标签">
                {getFieldDecorator('article_tag', {
                  rules: [{
                    required: true,
                    message: '至少选择一个标签'
                  }],
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
                  {initTags()}
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
  onFieldsChange(props: any, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      article_mode: Form.createFormField({
        ...props.article_mode,
        value: props.article_mode.value,
      }),

      article_type: Form.createFormField({
        ...props.article_type,
        value: props.article_type.value,
      }),

      article_tag: Form.createFormField({
        ...props.article_tag,
        value: props.article_tag.value,
      }),
    };
  },

})(WriteExtraForm);

export default WriteExtra;
