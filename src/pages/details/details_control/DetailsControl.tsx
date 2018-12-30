import * as React from 'react';
import {
  Icon,
  Anchor,
  Popover,
  Tooltip,
} from 'antd';

import {
  GlobalStyleSet,
  FixedControlContainer,
  FixedControlContent,
  FixedControlList,
  FixedControlListItem,
} from './style';
import DetailsControlCollections from './details_control_collections/DetailsControlCollections';


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

  /**
   * 解决二次渲染问题
   */
  function handleAnchorClick(
    e: React.MouseEvent,
  ): void {
    e.preventDefault();
  }

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
            <Tooltip title="去评论" placement="right">
              <FixedControlListItem>
                <Anchor onClick={handleAnchorClick}>
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
            </Tooltip>
            {/* 收藏 */}
            <Tooltip title="收藏" placement="right">
              <FixedControlListItem>
                <Popover
                  trigger="click"
                  placement="right"
                  title="我的收藏夹"
                  content={
                    <DetailsControlCollections
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
            </Tooltip>
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
