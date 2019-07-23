import * as React from 'react';
import {
  Tooltip,
  Anchor,
  Icon,
} from 'antd';


export interface IDetailsControlCommentProps { };


const DetailsControlComment = React.memo<IDetailsControlCommentProps>((
  props: IDetailsControlCommentProps,
): JSX.Element => {
  function handleAnchorClick(
    e: React.MouseEvent<HTMLLinkElement>,
  ): void {
    e.preventDefault();
  }

  return (
    <Tooltip title="去评论" placement="right">
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
    </Tooltip>
  );
});


export default DetailsControlComment;