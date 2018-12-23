import * as React from 'react';

import Header from './components/header/Header';


export interface IAdminProps {
  location: any;
  children: any;
};

const Admin = React.memo<IAdminProps>((
  props: IAdminProps,
) => {
  return (
    <div className="admin-wrapper">
      <div
        className="admin-content"
      >
        <Header location={props.location} />
        <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
});


export default Admin;