import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist"

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <App />
      </PersistGate>

    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
