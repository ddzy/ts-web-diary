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


class NotFound extends React.PureComponent<INotFoundProps, INotFoundState> {

  public timer: any = 0

  public readonly state = {
    time: 5,
  }


  public componentDidMount(): void {
    this.timer = setInterval(this.handleTick, 1000);
  }


  public componentWillUnmount(): void {
    clearInterval(this.timer);
  }


  public handleTick = (): void => {
    this.state.time <= 1
      ? this.props.history.push('/home')
      : this.setState((prevState) => {
          return {
            time: prevState.time - 1,
          };
        }); 
  }

  
  public render(): JSX.Element {
    return (
      <NotFoundWrapper
        bg_img={bgImg}
      >
        <NotFoundContent>
          <NotFoundTitle>页面开发中...</NotFoundTitle>
          <NotFoundRedirect>
            <Link to="/home">
              {this.state.time}秒后回到首页  
            </Link>
          </NotFoundRedirect>
        </NotFoundContent>
      </NotFoundWrapper>
    );
  }

}

export default NotFound;