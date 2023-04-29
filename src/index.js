import React from "react";
import { createRoot } from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
import { Buffer } from 'buffer';
import { Provider as ReduxProvider } from "react-redux";
// ** Initialize Store
import configureStore from "./redux/store";
import ListsUpdater from "./state/lists/updater";
// ** Import App
import App from "./App";
window.Buffer = window.Buffer || Buffer;

const store = configureStore();
const container = document.getElementById('app-root');
const root = createRoot(container);
function Updaters() {
    return (<>
      <ListsUpdater />
    </>);
}
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);