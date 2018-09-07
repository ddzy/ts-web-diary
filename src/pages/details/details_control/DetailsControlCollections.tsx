import * as React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Popconfirm,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CollectionPopContentContainer,
  CollectionPopFormBox,
  CollectionsPopShowList,
  CollectionsPopShowListItem,
} from '../style';


export interface IDetailsControlCollectionsProps extends FormComponentProps {

  collectionInputValue: any,
  onCollectionsInputChange: (
    changedFields: any,
  ) => void;
  onSendCollection: (

  ) => void;

};
interface IDetailsControlCollectionsState {};



/**
 * 收藏 弹出层
 */
class DetailsControlCollections extends React.PureComponent<
  IDetailsControlCollectionsProps,
  IDetailsControlCollectionsState
> {

  public readonly state = {}


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <CollectionPopContentContainer>
        <CollectionsPopShowList>
          <Popconfirm
            title="要添加到该收藏夹吗?"
          >
            <CollectionsPopShowListItem>
              yyy
            </CollectionsPopShowListItem>
          </Popconfirm>
        </CollectionsPopShowList>
        <CollectionPopFormBox>
          <Form>
            <Form.Item>
              {getFieldDecorator('collection_input', {
                
              })(
                <Row>
                  <Col span={20}>
                    <Input 
                      type="text"
                      size="small"
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      htmlType="button"
                      type="default"
                      size="small"
                      onClick={this.props.onSendCollection}
                    >创建</Button>
                  </Col>
                </Row>
              )}
            </Form.Item>
          </Form>
        </CollectionPopFormBox>
      </CollectionPopContentContainer>
    );
  }

}


export default Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onCollectionsInputChange(changedFields);
  },

  mapPropsToFields(props) {
    return {
      collection_input: Form.createFormField({
        ...props.collectionInputValue,
        value: props.collectionInputValue.value || '',
      }),
    };
  },
})(DetailsControlCollections);