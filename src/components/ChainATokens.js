import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from 'react-redux';
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReplayIcon from '@mui/icons-material/Replay';
import useStyles from "../assets/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";
import { injected, walletconnect } from "../assets/constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CHANGE_WALLET } from "../redux/constants";
import GroupOrientation from './GroupButtons';
import { createStyles, DialogContent, IconButton, makeStyles, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import { explorer_, network_, network_dec_to_hex, network_hex_to_dec, __NETWORKS, _token_map } from "../constants.js";

export default function ChainATokens({ token, setToken }) {
    const classes = useStyles.base();
    const { activate, active, account, deactivate, connector, error, setError, chainId } = useWeb3React();
    const dashboardClasses = useStyles.dashboard();
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const [tokenMap, setTokenMap] = React.useState(undefined);
    const [network, setNetwork] = React.useState("");
    const [networkData, setNetworkData] = React.useState("");
    const [holderString, setHolderString] = React.useState("");
    const [tokenIdHolderString, setTokenIdHolderString] = React.useState("");
    const [loadingError, setLoadingError] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLocalLoading, setLocalLoading] = React.useState(false);
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const [selectionError, setSelectionError] = React.useState("");

    const cWallet = ConnectedWallet();
    const dispatch = useDispatch();

    const openDialog = React.useCallback(() => {
        setHolderString("");
        setSelectionError("");
        setDialogIsOpen(true);
    }, []);

    const closeDialog = React.useCallback(() => {
        setDialogIsOpen(false);
    }, []);

    const searchFilter = React.useCallback((option) => {
        if (!holderString) {
            return true;
        };
        const optionString = ((option.publicKey || "") +
            " " +
            (option.mintKey || "") +
            " " +
            (option.symbol || "") +
            " " +
            (option.name || " ")).toLowerCase();
        const searchString = holderString.toLowerCase();
        return optionString.includes(searchString);
    }, [holderString]);

    let showLoader = false;

    const copyAddress = () => {
        alert(`Copied to clipboard.`, "info");
    };

    const viewBlockUrl = (account) => {
        const { ethereum } = window;
        console.log("chainId: ", chainId, ethereum.chainId, chainId == ethereum.chainId)
        window.open(`${explorer_[ethereum.chainId.toString()]}/address/${account}`);
    };

    useEffect(() => {
        if(chainId) {
            _token_map[chainId.toString()];
            const { ethereum } = window;
            setTokenMap(_token_map[chainId.toString()]);
            console.log("chainId: ", _token_map[chainId.toString()], _token_map[chainId.toString()].tokens, chainId, ethereum.chainId, chainId == ethereum.chainId);
        };
    }, [chainId, _token_map]);


    const handleContract = (event) => {
        setHolderString(event);
        console.log("holderString: ",event, holderString);
    };

    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };

    const localLoader = (<div className={classes.alignCenter}>
      <CircularProgress />
      <Typography variant="body2">
        {showLoader ? "Loading available tokens" : "Searching for results"}
      </Typography>
    </div>);
    const displayLocalError = (<div className={classes.alignCenter}>
      <Typography variant="body2" color="error">
        {loadingError || selectionError}
      </Typography>
    </div>);
    const dialog = (<Dialog style={{margin:'auto', alignItems:"center"}} onClose={closeDialog} aria-labelledby="simple-dialog-title" open={dialogIsOpen} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div id="simple-dialog-title" className={classes.flexTitle}>
          <Typography variant="h5">Select a token</Typography>
          <div className={classes.grower}/>
        </div>
      </DialogTitle>
      <DialogContent style={{margin:'auto', alignItems:"center"}} className={classes.dialogContent}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" style={{margin:'auto', alignItems:"center"}}>
            <Button className={classes.selectionButton} onClick={closeDialog} >
                {<GroupOrientation items={chainId&&_token_map[chainId.toString()].tokens} token={token} setToken={setToken}/>}
            </Button>
        </Stack>
      </DialogContent> 
    </Dialog>);
    const selectionChip = (<div className={classes.selectionButtonContainer}>
      <Button onClick={openDialog} disabled={false} variant="outlined" startIcon={<KeyboardArrowDownIcon />} className={classes.selectionButton}>
        {<Typography color="textSecondary">Digital Asset</Typography>}
      </Button>
    </div>);
    return (<>
      {dialog}
      {selectionChip}
    </>);
};