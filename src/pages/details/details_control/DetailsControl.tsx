import * as React from 'react';
import {
  Icon,
  Tooltip,
} from 'antd';

import {
  GlobalStyleSet,
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from './style';
import DetailsControlCollection from './details_control_collection/DetailsControlCollection';
import DetailsControlComment from './details_control_comment/DetailsControlComment';


export interface IDetailsControlProps {
  isLiked: boolean;
  // ** 固钉栏点赞 **
  onControlBarStar: (
    e: React.MouseEvent,
  ) => void;
};


/**
 * 左侧固钉控制栏
 */
const DetailsControl = React.memo<IDetailsControlProps>((
  props: IDetailsControlProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <FixedControlContainer>
        <FixedControlContent>
          <FixedControlList>
            {/* 点赞 */}
            <Tooltip title="赞一个" placement="right">
              <FixedControlListItem>
                <Icon
                  className={`
                  fixed-control-bar-star
                  ${
                    props.isLiked
                    && 'fixed-control-bar-star-active'
                    }
                `}
                  type="star"
                  theme="filled"
                  onClick={props.onControlBarStar}
                />
              </FixedControlListItem>
            </Tooltip>
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

      {/* Global Style Set */}
      <GlobalStyleSet />
    </React.Fragment>
  );
})


export default DetailsControl;
