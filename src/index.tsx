import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@/containers/App.tsx';
import {Provider} from 'react-redux';
import store from '@/store';

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
