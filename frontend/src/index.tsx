import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PersistStore from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("ukrsolution-barcode-scanner");

if (rootElement)
  ReactDOM.render(
    <Provider store={PersistStore.store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={PersistStore.persistor}>
        <App />
      </PersistGate>
    </Provider>,
    rootElement
  );

window.parent.postMessage({ message: "iframe.onload" }, "*");

reportWebVitals();
