import * as React from 'react';
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
      {props.children}
      <GlobalStyle />
    </React.Fragment>
  );
});


export default withRouter(App);