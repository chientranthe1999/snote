import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ReactQueryProvider } from "./provider/reactQueryProvider";
import { BrowserRouter } from "react-router-dom";
import { NewPageContextProvider } from "./context/NewPageContext";
import theme from './lib/mui';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider>
              <NewPageContextProvider>
                <App />
              </NewPageContextProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </Provider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
