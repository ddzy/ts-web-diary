import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/configureStore';
import App from 'App';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app') as HTMLDivElement
);