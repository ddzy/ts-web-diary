import * as React from 'react';
import {
  Tooltip,
  Icon,
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  serviceHandleFixedControlBarStar,
} from '../../Details.service';


export interface IDetailsControlStarProps extends RouteComponentProps<any> {
  author: string;
  isLiked: boolean;
};


const DetailsControlStar = React.memo<IDetailsControlStarProps>((
  props: IDetailsControlStarProps,
): JSX.Element => {
  /**
   * 处理固钉栏 点赞
   */
  function handleControlBarStar(
    e: React.MouseEvent,
  ): void {
    e.currentTarget.classList
      .contains('fixed-control-bar-star-active')
      ? serviceHandleFixedControlBarStar(
          props.match.params.id,
          false,
          () => {
            message.info('取消了赞!');
        },
      )
      : serviceHandleFixedControlBarStar(
          props.match.params.id,
          true,
          () => {
            message.success(`你赞了 ${props.author} 的文章`);
        },
      );

    e.currentTarget.classList
      .toggle('fixed-control-bar-star-active');
  }

  return (
    <Tooltip title="赞一个" placement="right">
      <Icon
        className={`fixed-control-bar-star${
          props.isLiked && 'fixed-control-bar-star-active'
        }`}
        type="star"
        theme="filled"
        onClick={handleControlBarStar}
      />
    </Tooltip>
  );
});


export default withRouter(DetailsControlStar);