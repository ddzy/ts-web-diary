import * as React from 'react';
import {
  Tooltip,
  Icon,
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';

import {
  serviceHandleFixedControlBarStar,
} from '../../Details.service';


export interface IDetailsControlStarProps extends RouteComponentProps {
  match: match<{
    id: string,
  }>;

  // ? 文章信息
  articleInfo: {
    author: any,
  };
};
interface IDetailsControlStarState {
  isLiked: boolean;
};


const DetailsControlStar = React.memo<IDetailsControlStarProps>((
  props: IDetailsControlStarProps,
): JSX.Element => {

  let saveStarIcon: any = document
    .createElement('div');

  const [state] = React.useState<IDetailsControlStarState>({
    isLiked: false,
  });

  // React.useEffect(() => {
  //   setState({
  //     isLiked: props.isLiked,
  //   });
  // }, [props.isLiked]);

  /**
   * 处理固钉栏 点赞
   */
  function handleControlBarStar(
    e: React.MouseEvent,
  ): void {
    saveStarIcon = e.currentTarget;
    saveStarIcon.classList
      .contains('fixed-control-bar-star-active')
      ? serviceHandleFixedControlBarStar(
        {
          articleId: props.match.params.id,
          liked: false,
        },
        () => {
          saveStarIcon.classList.remove('fixed-control-bar-star-active');
          message.info('取消了赞!');
        },
      )
      : serviceHandleFixedControlBarStar(
        {
          articleId: props.match.params.id,
          liked: true,
        },
        () => {
          saveStarIcon.classList.add('fixed-control-bar-star-active');
          message.success(`你赞了 ${props.articleInfo.author.username} 的文章`);
        },
      );
  }

  return (
    <Tooltip title="赞一个" placement="right">
      <Icon
        className={`fixed-control-bar-star${
          state.isLiked && ' fixed-control-bar-star-active'
          }`}
        type="star"
        theme="filled"
        onClick={handleControlBarStar}
      />
    </Tooltip>
  );
});


export default withRouter(DetailsControlStar);