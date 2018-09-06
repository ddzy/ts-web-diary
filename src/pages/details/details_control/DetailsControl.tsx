import * as React from 'react';
import {
  Icon,
  Anchor,
} from 'antd';

import {
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from '../style';


export interface IDetailsControlProps {
  isLiked: boolean;             // 点赞状态

  onControlBarStar: (           // 固定栏点赞
    e: React.MouseEvent,
  ) => void;      
  onControlBarCollection: (     // 固钉栏收藏文章 
    e: React.MouseEvent,
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
            <FixedControlListItem>
              <Icon
                // className="fixed-control-bar-star"
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
            <FixedControlListItem>
              <Icon
                className="fixed-control-bar-collection"
                type="heart"
                theme="filled"
                onClick={this.props.onControlBarCollection}
              />
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
