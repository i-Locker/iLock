import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";

import { Provider as ReduxProvider } from "react-redux";

// ** Initialize Store
import configureStore from "./redux/store";

// ** Import App
import App from "./App";

const store = configureStore();

const container = document.getElementById('app-root');
const root = createRoot(container);
root.render(<ReduxProvider store={store}>
        <MaterialThemeProvider>
            <MuiSnackbarProvider>
                <NotificationProvider>
                    <Web3Provider>
                        <App />
                    </Web3Provider>
                </NotificationProvider>
            </MuiSnackbarProvider>
        </MaterialThemeProvider>
    </ReduxProvider>);