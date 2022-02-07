import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { createAPI } from './api/api';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './store/reducer';
import {fetchAllGuitarsAction, fetchGuitarsAction} from './store/api-actions';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';

const api = createAPI();

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchAllGuitarsAction());
store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ToastContainer />
          <App />
        </QueryParamProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
