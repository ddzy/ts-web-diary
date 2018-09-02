import * as React from 'react';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, RouteComponentProps } from 'react-router-dom';



export interface IAdminProps extends RouteComponentProps<any> {
  
};
interface IAdminState {

};



class Admin extends React.PureComponent<IAdminProps, IAdminState> {

  public readonly state = {};

  public render(): JSX.Element {
    return (
      <div className="adminWrapper">

        {/* Router-view */}
        {/* <TransitionGroup className="transition-router" >
          <CSSTransition
            key={this.props.location.pathname}
            timeout={1000}
            classNames="fade"
          >
            <div className="admin-content" style={{ position: 'relative', 'minHeight': '530px' }}>
              {this.props.children}
            </div>
          </CSSTransition>
        </TransitionGroup> */}
        <div className="admin-content" style={{ position: 'relative', 'minHeight': '530px' }}>
          {this.props.children}
        </div>
      </div>
    );
  } 

}



export default withRouter(Admin) as React.ComponentClass<any>;