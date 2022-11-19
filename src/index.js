import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

//(element, container)
//#1 - stari nacin
// import {render} from "react-dom";
// render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   container
// );

//#2 - novi react 18 nacin
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
