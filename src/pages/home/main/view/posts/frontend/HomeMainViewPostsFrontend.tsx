import * as React from 'react';
import { withRouter } from 'react-router-dom';

export interface IHomeMainViewPostsFrontendProps { };


// export default function HomeMainViewPostsFrontend(props: IHomeMainViewPostsFrontendProps) {
//   return (
//     <h1>前端文章列表</h1>
//   );
// }

const HomeMainViewPostsFrontend = React.memo(() => {
  return (
    <div>
      前端文章列表
    </div>
  );
});

export default withRouter(HomeMainViewPostsFrontend);