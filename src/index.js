import React from "react";
import ReactDOM from "react-dom";
// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
import { Buffer } from 'buffer';
import { Provider as ReduxProvider } from "react-redux";

// ** Initialize Store
import configureStore from "./redux/store";

// ** Import App
import App from "./App";
window.Buffer = window.Buffer || Buffer;

const store = configureStore();

{/*
const container = document.getElementById('app-root');
import { createRoot } from 'react-dom/client';
const root = createRoot(container);
root.render();
*/}

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <MaterialThemeProvider>
            <MuiSnackbarProvider>
                <NotificationProvider>
                    <Web3Provider>
                        <App />
                    </Web3Provider>
                </NotificationProvider>
            </MuiSnackbarProvider>
        </MaterialThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
 document.getElementById('app-root')
);