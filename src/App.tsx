import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './global.css';


export interface IAppProps extends RouteComponentProps<any> {
  children: React.ReactElement<HTMLElement>;
};

const App: React.SFC<IAppProps> = (
  props: IAppProps,
): JSX.Element => {
  return (
    <TransitionGroup 
        className="transition-router" 
        // style={{ height: '100%' }} 
      >
        <CSSTransition
          key={props.location.pathname}
          timeout={1000}
          classNames="left"
        >
          {props.children}
        </CSSTransition>
      </TransitionGroup>
  );
}


export default withRouter(App);