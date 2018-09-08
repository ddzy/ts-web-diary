import * as React from 'react';
import {
  Card,
  Icon,
} from 'antd';


export interface IMyCollectionListProps {
  id: string,
  name: string,
  create_time: string,

  onCollectionItemClick: (
    e: React.MouseEvent,
    collectionId: string, 
  ) => void;
};
interface IMyCollectionListState {};



/**
 * 收藏列表
 */
class MyCollectionList extends React.PureComponent<
  IMyCollectionListProps,
  IMyCollectionListState
> {

  public readonly state = {}


  public render(): JSX.Element {
    return (
      <Card
        hoverable={true}
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <Icon
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
            type="eye"
            key="eye"
            theme="twoTone"
            onClick={(e: React.MouseEvent) => 
              this.props.onCollectionItemClick(
                e,
                this.props.id,
              )
            }
          />,
        ]}
      >
        <Card.Meta
          title={this.props.name}
          description={`创建于: ${
            this.props.create_time
          }`}
        />
      </Card>
    );
  }

}


export default MyCollectionList;