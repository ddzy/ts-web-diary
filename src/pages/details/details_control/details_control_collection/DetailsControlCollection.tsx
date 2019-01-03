import * as React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Popconfirm,
  notification,
  Tooltip,
  Popover,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';

import {
  CollectionPopContentContainer,
  CollectionPopFormBox,
  CollectionsPopShowList,
  CollectionsPopShowListItem,
} from './style';
import {
  serviceHandleSaveToCollection,
  serviceHandleCreateCollection,
} from '../../Details.service';


export interface IDetailsControlCollectionProps extends FormComponentProps, RouteComponentProps<any> { };
interface IDetailsControlCollectionState {
  collections: any[];
};


/**
 * 收藏 弹出层
 */
class DetailsControlCollection extends React.PureComponent<
IDetailsControlCollectionProps,
IDetailsControlCollectionState
  > {
  public inputRef: any;

  public readonly state = {
    collections: [],
  }

  public handleGetInputRef = (el: any): void => {
    this.inputRef = el;
  }

  /**
   * 处理 提交添加收藏表单
   * @param e mouseEvent
   * @param inputRef input输入框
   */
  public handleSendCollection = (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const {
        collection_input
      } = values;

      if (!collection_input) {
        notification.error({
          message: '错误',
          description: '请输入正确的收藏夹名称!',
        });

        return;
      }

      serviceHandleCreateCollection({
        collectionName: collection_input,
      }, (data) => {
          const {
            collectionInfo,
          } = data.info;

        this.setState((prevState) => {
          return {
            ...prevState,
            collections: prevState.collections.concat(
              collectionInfo,
            )
          };
        }, () => {
          this.inputRef.input.value = '';
        });
      });
    });
  }

  /**
   * 处理 确认添加至收藏夹
   * @param collectionId 收藏夹id
   */
  public handleSaveToCollection = (
    collectionId: string,
  ) => {
    serviceHandleSaveToCollection(
      {
        collectionId,
        articleId: this.props.match.params.id,
      },
      (data) => {
        const {
          name,
        } = data.info.collectionInfo;

        notification.success({
          message: '提示',
          description: `成功添加到收藏夹: ${
            name
            }`,
        });
      }
    );
  }

  /**
   * 处理初始化气泡框内容
   */
  public handleInitPopoverContent = (): JSX.Element => {
    const {
      getFieldDecorator,
    } = this.props.form;

    return (
      <CollectionPopContentContainer>
        <CollectionsPopShowList>
          {
            this.state.collections.length !== 0
            && this.state.collections.map((item: any) => {
              return (
                <Popconfirm
                  title="要添加到该收藏夹吗?"
                  key={item._id}
                  onConfirm={() => this.handleSaveToCollection(item._id)}
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
          <Form
            onSubmit={this.handleSendCollection}
          >
            <Form.Item>
              {getFieldDecorator('collection_input', {})(
                <Row>
                  <Col span={20}>
                    <Input
                      type="text"
                      size="small"
                      placeholder="新建一个收藏夹..."
                      ref={(el) => this.handleGetInputRef(el)}
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      htmlType="submit"
                      type="default"
                      size="small"
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

  public render(): JSX.Element {
    return (
      <Tooltip title="收藏" placement="right">
        <Popover
          trigger="click"
          placement="right"
          title="我的收藏夹"
          content={this.handleInitPopoverContent()}
        >
          <Icon
            className="fixed-control-bar-collection"
            type="heart"
            theme="filled"
          />
        </Popover>
      </Tooltip>
    );
  }
}


export default withRouter(Form.create()(DetailsControlCollection));