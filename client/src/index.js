import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import AppRouter from './AppRouter';
import store from "./redux/configureStore"
import "./styles/App.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>
);

