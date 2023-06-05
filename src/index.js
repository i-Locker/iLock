import React from "react";
import { Buffer } from 'buffer';
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ColorModeScript } from "@chakra-ui/react";
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
// @ts-ignore
window.Buffer = window.Buffer || Buffer;
import configureStore from "./redux/store";
import App from "./App";
const store = configureStore();
const root = createRoot(document.getElementById('app-root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <MaterialThemeProvider>
            <MuiSnackbarProvider>
                <NotificationProvider>
                    <Web3Provider>
                      <ColorModeScript />
                       <App />
                    </Web3Provider>
                </NotificationProvider>
            </MuiSnackbarProvider>
        </MaterialThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);