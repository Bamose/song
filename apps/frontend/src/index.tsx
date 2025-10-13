import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { NuqsAdapter } from "nuqs/adapters/react";
import "./index.css";
import App from "./App";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </Provider>
  </React.StrictMode>
);
