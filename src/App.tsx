import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';


export interface IAppProps extends RouteComponentProps<any> {
  children: React.ReactElement<HTMLElement>;
};


const App = React.memo<IAppProps>((
  props: IAppProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <TransitionGroup
        className="transition-router"
      >
        <CSSTransition
          timeout={1000}
          classNames="left"
        >
          {props.children}
        </CSSTransition>
      </TransitionGroup>

      <GlobalStyle />
    </React.Fragment>
  );
});


export default withRouter(App);