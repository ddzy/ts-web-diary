import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './global.css';


export interface IAppProps extends RouteComponentProps<any> {};


class App extends React.Component<IAppProps, {}> {

  public render(): JSX.Element {
    return (
      <TransitionGroup 
        className="transition-router" 
        style={{ height: '100%' }} 
      >
        <CSSTransition
          key={this.props.location.pathname}
          timeout={1000}
          classNames="left"
        >
          {this.props.children}
        </CSSTransition>
      </TransitionGroup>
    );
  }
  
}


export default withRouter(App);