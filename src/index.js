import React, { StrictMode } from "react";
import { Buffer } from 'buffer/';
import * as ReactDOMClient from "react-dom/client";
import { createRoot } from "react-dom/client";
// ** Import Providers
import { Provider as ReduxProvider } from "react-redux";
import { ColorModeScript } from "@chakra-ui/react";
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
// @ts-ignore
window.Buffer = window.Buffer || Buffer;
// ** Initialize Store
import configureStore from "./redux/store";
import ListsUpdater from "./state/lists/updater";
// ** Import App
import App from "./App";
const store = configureStore();
const container = document.getElementById('app-root');
const root = createRoot(container);
function Updaters() {
    return (<>
      <ListsUpdater />
    </>);
};
root.render(
   <Buffer>
  <StrictMode>
    <ReduxProvider store={store}>
        <MaterialThemeProvider>
            <MuiSnackbarProvider>
                <NotificationProvider>
                    <Web3Provider>
                     <Updaters />
                      <ColorModeScript />
                       <App />
                    </Web3Provider>
                </NotificationProvider>
            </MuiSnackbarProvider>
        </MaterialThemeProvider>
    </ReduxProvider>
  </StrictMode>
   </Buffer>
);