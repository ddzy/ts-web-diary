import * as React from 'react';

import Header from './components/header/Header';


export interface IAdminProps {
  location: any;
  children: any;
};

const Admin = React.memo<IAdminProps>((
  props: IAdminProps,
) => {
  React.useEffect(() => {
    function aidedHandleMouseWheel(
      e: WheelEvent,
    ): void {
      const nDeltaY = e.deltaY as number;
      const oHeaderContainer = document
        .querySelector('#header-main-container') as HTMLDivElement;

      // ** 处理header滚动状态 **
      oHeaderContainer.style.cssText += `
        transform: translateY(${
          nDeltaY > 0 ? '-100%' : 0
        });
      `;
    }

    window.addEventListener('wheel', aidedHandleMouseWheel);

    return () => {
      window.removeEventListener('wheel', aidedHandleMouseWheel);
    };
  }, []);

  return (
    <div className="admin-wrapper">
      <div
        className="admin-content"
      >
        <Header location={props.location} />
        {props.children}
      </div>
    </div>
  );
});


export default Admin;