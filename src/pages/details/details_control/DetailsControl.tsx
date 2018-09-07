import * as React from 'react';
import {
  Icon,
  Anchor,
  Popover,
} from 'antd';

import {
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from '../style';
import DetailsControlCollections from './DetailsControlCollections';


export interface IDetailsControlProps {
  isLiked: boolean;             // 点赞状态

  onControlBarStar: (           // 固定栏点赞
    e: React.MouseEvent,
  ) => void;      
  
  collectionInputValue: any,    // 固钉栏弹出层
  onCollectionsInputChange: (
    changedFields: any,
  ) => void;
  onSendCollection: (

  ) => void;

};
interface IDetailsControlState { };


/**
 * 左侧固钉控制栏
 */
class DetailsControl extends React.PureComponent<
  IDetailsControlProps,
  IDetailsControlState
  > {

  public readonly state = {}

  // 3.8.2

  public render(): JSX.Element {
    return (
      <FixedControlContainer>
        <FixedControlContent>
          <FixedControlList>
            {/* 点赞 */}
            <FixedControlListItem>
              <Icon
                className={`
                  fixed-control-bar-star
                  ${
                    this.props.isLiked 
                      && 'fixed-control-bar-star-active'
                  }
                `}
                type="star"
                theme="filled"
                onClick={this.props.onControlBarStar}
              />
            </FixedControlListItem>
            
            {/* 评论 */}
            <FixedControlListItem>
              <Anchor>
                <Anchor.Link
                  title={
                    <Icon
                      className="fixed-control-bar-message"
                      type="message"
                      theme="filled"
                    />
                  }
                  href="#left-comment-container"
                />             
              </Anchor>     
            </FixedControlListItem>
            
            {/* 收藏 */}
            <FixedControlListItem>
              <Popover
                trigger="click"
                placement="right"
                title="添加收藏夹"
                content={
                  <DetailsControlCollections
                    collectionInputValue={this.props.collectionInputValue} 
                    onCollectionsInputChange={this.props.onCollectionsInputChange}
                    onSendCollection={this.props.onSendCollection}
                  />
                }
              >
                <Icon
                  className="fixed-control-bar-collection"
                  type="heart"
                  theme="filled"
                />
              </Popover>
            </FixedControlListItem>
            <FixedControlListItem>
              分享
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon
                type="qq"
                theme="outlined"
              />
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon
                type="twitter"
                theme="outlined"
              />
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon
                type="weibo-circle"
                theme="outlined"
              />
            </FixedControlListItem>
          </FixedControlList>
        </FixedControlContent>
      </FixedControlContainer>
    );
  }

}


export default DetailsControl;
