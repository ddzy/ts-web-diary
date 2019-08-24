import * as React from 'react';
import {
  Card,
  Form,
  Input,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  TitleWrapper,
  TitleMain,
} from './style';


export interface IWriteTitleProps extends FormComponentProps {
  // ? 文章相关信息
  articleInfo: {
    title: string,
  },

  onArticleTitleChange: (
    changedFields: any,
  ) => void;
};

const WriteTitle = React.memo((props: IWriteTitleProps) => {
  const { getFieldDecorator } = props.form;

  const $inputRef = React.useRef(null);

  React.useEffect(() => {
    handleInputAutoFocus();
  }, []);

  /**
   * [处理] - 输入框自动聚焦
   */
  function handleInputAutoFocus() {
    if ($inputRef) {
      if ($inputRef.current) {
        const oInput = $inputRef.current as unknown as HTMLInputElement;

        oInput.focus();
      }
    }
  }

  return (
    <TitleWrapper>
      <TitleMain>
        <Card
          title={'文章标题'}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('article_title', {
                rules: [{ required: true, message: '标题一定要填!' }],
              })(
                <Input
                  ref={$inputRef}
                  type="text"
                  prefix={
                    <Icon
                      type="exclamation-circle"
                      style={{ color: '#d50' }}
                    />
                  }
                  placeholder="文章标题, 此为必填项!"
                />
              )}
            </Form.Item>
          </Form>
        </Card>
      </TitleMain>
    </TitleWrapper>
  );
});

export default Form.create({
  onValuesChange(props: IWriteTitleProps, changedFields) {
    props.onArticleTitleChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      article_title: Form.createFormField({
        value: props.articleInfo.title,
      }),
    };
  },
})(WriteTitle);