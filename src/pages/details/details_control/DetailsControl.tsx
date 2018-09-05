import * as React from 'react';
import { 
  Icon,
} from 'antd';

import {
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from '../style';


export interface IDetailsControlProps {};
interface IDetailsControlState {};


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
                type="star" 
                theme="outlined" 
              />
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon 
                type="message" 
                theme="outlined" 
              />
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon 
                type="heart" 
                theme="outlined" 
              />
            </FixedControlListItem>
            <FixedControlListItem>
              分享
            </FixedControlListItem>
            <FixedControlListItem>
              <Icon type="qq" theme="outlined" />
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
