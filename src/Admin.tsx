import * as React from 'react';
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
        <div className="admin-content" style={{ position: 'relative', 'minHeight': '530px' }}>
          {this.props.children}
        </div>
      </div>
    );
  } 

}



export default withRouter(Admin) as React.ComponentClass<any>;