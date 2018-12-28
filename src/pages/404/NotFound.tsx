import * as React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';

import bgImg from '../../static/images/bg_img.png';
import {
  NotFoundWrapper,
  NotFoundContent,
  NotFoundTitle,
  NotFoundRedirect,
} from './style';


export interface INotFoundProps {
  history: History;
};
interface INotFoundState {
  time: number;
};


const NotFound = React.memo<INotFoundProps>((
  props: INotFoundProps,
): JSX.Element => {
  const [
    state,
    setState,
  ] = React.useState<INotFoundState>({
    time: 5,
  });
  let timer = 0;

  React.useEffect(() => {
    function aidedTick(): void {
      state.time <= 1
        ? props.history.push('/home/frontend')
        : setState({
            time: state.time - 1,
        });
    }

    timer = window.setInterval(aidedTick, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [state]);

  return (
    <NotFoundWrapper
      bg_img={bgImg}
    >
      <NotFoundContent>
        <NotFoundTitle>页面开发中...</NotFoundTitle>
        <NotFoundRedirect>
          <Link to="/home">
            {state.time}秒后回到首页
          </Link>
        </NotFoundRedirect>
      </NotFoundContent>
    </NotFoundWrapper>
  );
});


export default NotFound;