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
  onControlBarStar: (           // 固定栏点赞
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
                className="fixed-control-bar-star"
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
