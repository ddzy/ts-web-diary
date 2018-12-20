import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


export interface IAdminProps extends RouteComponentProps<any> {
  children: any;
};

const Admin: React.SFC<IAdminProps> = (
  props: IAdminProps,
): JSX.Element => {
  return (
    <div className="adminWrapper">
      <div
        className="admin-content"
      >
        {props.children}
      </div>
    </div>
  );
}


export default withRouter(Admin);