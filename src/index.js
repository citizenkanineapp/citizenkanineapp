import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store , persistedStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('react-root'),
);
