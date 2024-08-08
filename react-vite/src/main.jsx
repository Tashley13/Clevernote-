import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import * as noteActions from "./redux/note"
//import modal and modal provider from context folder
import "./index.css";
import "./normilize.css"

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.noteActions = noteActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      //modal provider call here
    <ReduxProvider store={store}>
      //insert modal
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
