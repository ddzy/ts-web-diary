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
} from '../../style';


export interface IDetailsControlCollectionsProps extends FormComponentProps {

  collections: any[];           // 收藏夹列表
  collectionInputValue: any,
  onCollectionsInputChange: (
    changedFields: any,
  ) => void;
  onSendCollection: (
    e: React.MouseEvent,
    inputRef: any,
  ) => void;

  onSaveToCollection: (         // 确认添加至收藏夹
    collectionId: string,
  ) => void    

};
interface IDetailsControlCollectionsState {};



/**
 * 收藏 弹出层
 */
class DetailsControlCollections extends React.PureComponent<
  IDetailsControlCollectionsProps,
  IDetailsControlCollectionsState
> {

  public inputRef = null


  public readonly state = {}


  public handleGetInputRef = (
    el: any,
  ) => {
    this.inputRef = el;
  }


  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <CollectionPopContentContainer>
        <CollectionsPopShowList>
          {
            this.props.collections.length !== 0
              && this.props.collections.map((item) => {
                return (
                  <Popconfirm 
                    title="要添加到该收藏夹吗?"
                    key={item._id}
                    onConfirm={() => this.props.onSaveToCollection(item._id)}
                  >
                    <CollectionsPopShowListItem>
                      {item.name}
                    </CollectionsPopShowListItem>
                  </Popconfirm>
                );
              })
          }
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
                      placeholder="新建一个收藏夹..."
                      ref={(
                        el: any
                      ) => this.handleGetInputRef(el)}
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      htmlType="button"
                      type="default"
                      size="small"
                      onClick={(
                        e: React.MouseEvent
                      ) => this.props.onSendCollection(
                        e, 
                        this.inputRef
                      )}
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