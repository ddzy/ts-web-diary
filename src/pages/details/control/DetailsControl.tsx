import * as React from 'react';
import {
  Icon,
  Anchor,
} from 'antd';

import {
  GlobalStyleSet,
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from './style';
import DetailsControlCollection from './collection/DetailsControlCollection';
import DetailsControlComment from './comment/DetailsControlComment';
import DetailsControlStar from './star/DetailsControlStar';


export interface IDetailsControlProps {
  controlStarAreaState: {
    author: string;
    isLiked: boolean;
  };
};


/**
 * 左侧固钉控制栏
 */
const DetailsControl = React.memo<IDetailsControlProps>((
  props: IDetailsControlProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <Anchor offsetTop={70}>
        <FixedControlContainer>
          <FixedControlContent>
            <FixedControlList>
              {/* 点赞 */}
              <FixedControlListItem>
                <DetailsControlStar
                  {...props.controlStarAreaState}
                />
              </FixedControlListItem>
              {/* 评论 */}
              <FixedControlListItem>
                <DetailsControlComment />
              </FixedControlListItem>
              {/* 收藏 */}
              <FixedControlListItem>
                <DetailsControlCollection />
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
      </Anchor>

      {/* Global Style Set */}
      <GlobalStyleSet />
    </React.Fragment>
  );
})


export default DetailsControl;
