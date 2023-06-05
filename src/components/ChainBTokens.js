import React, { useEffect } from "react";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from 'react-redux';
import useStyles from "../assets/styles";
import { ConnectedWallet } from "../assets/constants/wallets";
import { CHANGE_WALLET } from "../redux/constants";
import GroupOrientationB from './GroupButtonsB';
import { DialogContent } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { explorer_, network_, network_dec_to_hex, __NETWORKS, _token_map } from "../constants.js";

export default function ChainBTokens({ token, setToken, chain_B }) {
    const classes = useStyles.base();
    const { connector, chainId } = useWeb3React();
    const dashboardClasses = useStyles.dashboard();
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const [network, setNetwork] = React.useState("");
    const [networkData, setNetworkData] = React.useState("");
    const [holderString, setHolderString] = React.useState("");
    const [loadingError, setLoadingError] = React.useState("");
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const [selectionError, setSelectionError] = React.useState(""); 
    const [tokenMap, setTokenMap] = React.useState(undefined);

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

    let networks;
    let networks___ = [];
    let subMethod = false;
    let showLoader = false;
    let useTokenId = false;

    useEffect(() => {
        if (account) {
            dispatch({
                type: CHANGE_WALLET,
                payload: account
            })
        };
        const { ethereum } = window;
        let __id;
        try {
            if (chainId || ethereum.chainId) {
                if (!chainId) {
                    try {
                        __id = ethereum.chainId;
                    } catch(e) {
                        return;
                    };
                } else {
                    try {
                        __id = network_dec_to_hex[chainId];
                    } catch(e) {
                        return;
                    };
                };
                console.log("__id: ", __id);
                if (account && __id) {
                    setNetwork(network_[__id]);
                    networks = network_[__id];
                    console.log("network: ", network, network_[__id], networks);
                    if (network) {
                        let ran = false;
                        let WROTE = false;
                        __NETWORKS.find((item) => item.name == network).chainData.map((each) => {
                            if (each["rpcUrls"].length > 0 && !WROTE) {
                                WROTE = true;
                                console.log("chainData: ", each, each["rpcUrls"]);
                                ran = each;
                                setNetworkData(ran);
                                if (networkData) {
                                    console.log("networkData: ", networkData);
                                };
                            };
                        });
                        __NETWORKS.forEach((_network_) => {
                            let _chainData_ = `${_network_.name}`;
                            networks___.push(_network_);
                            console.log("chainData (b): ", _chainData_, _network_);
                        });
                    };
                };
            };
        } catch(e) {
            window.alert("Web3 not detected. Are you connected?");
            return;
        };
    }, [account, network, networkData, networks, chainId]);

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
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        };
    }, [activatingConnector, connector]);

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
        {loaingError&&loadingError || selectionError&&selectionError}
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
            {<GroupOrientationB items={chainId&&_token_map[chainId.toString()].tokens} token={token} setToken={setToken} />}
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