import React, { useEffect } from "react";
// ** Web3 React
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
// ** Import Material-Ui Components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from 'react-redux';

// ** Import Material Icons
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReplayIcon from '@mui/icons-material/Replay';

// ** Import Assets
import useStyles from "../assets/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";
import { injected, walletconnect } from "../assets/constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CHANGE_WALLET } from "../redux/constants";
import { explorer_, network_, network_dec_to_hex, network_hex_to_dec, __NETWORKS } from "../constants.js";

const ConnectWallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles.base();
    const dashboardClasses = useStyles.dashboard();
    const triedEager = useEagerConnect();
    const { activate, active, account, deactivate, connector, error, setError, chainId } = useWeb3React();
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const [network, setNetwork] = React.useState("");
    const [networkData, setNetworkData] = React.useState("");
    const cWallet = ConnectedWallet();
    const dispatch = useDispatch();
    let networks;
    let networks___ = [];
    let subMethod = false;
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
            console.log("error: ",e);
            window.alert("Web3 not detected. Are you connected?");
            return;
        };
    }, [account, network, networkData, networks, chainId]);

    const copyAddress = () => {
        alert(`Copied to clipboard.`, "info");
    };

    const viewBlockUrl = (account) => {
        const { ethereum } = window;
        console.log("chainId: ", chainId, ethereum.chainId, chainId == ethereum.chainId)
        window.open(`${explorer_[ethereum.chainId.toString()]}/address/${account}`);
    };

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useInactiveListener(!triedEager);
    const retryConnect = () => {
        setError(false);
    };

    const onConnectWallet = async (item) => {
        setActivatingConnector(item.connector);
        await activate(item.connector);
    };

    const onDeactiveWallet = () => {
        deactivate();
    };

    const handleOpenWalletList = () => {
        setIsOpen(true);
    };

    const handleCloseWalletList = () => {
        setIsOpen(false);
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
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            classes={{
                paper: classes.connectWallet,
            }}
            fullWidth={true}
        >
            {error && <Alert severity="error" action={
                <Button color="primary" onClick={() => retryConnect()}>
                    <ReplayIcon />
                </Button>
            }>{getErrorMessage(error)}</Alert>}
            <DialogTitle open={isOpen} onClose={() => setIsOpen(false)} className="action">
                <Typography>{active && "Account"}</Typography>
            </DialogTitle>
            {active && (
                <Box className={classes.connectWalletButton}>
                    <Button endIcon={<img src={cWallet && cWallet.logo} alt={cWallet && cWallet.name} />}>
                        <Typography variant="caption">
                            {`${cWallet&&cWallet.name} Connected`}
                        </Typography>
                    </Button>
                    <TextField
                        inputProps={{
                            readOnly: true,
                        }}
                        value={
                            account
                                ? `${account.substring(
                                    0,
                                    16
                                )} ... ${account.substring(
                                    account.length - 4
                                )}`
                                : "Connect Wallet"
                        }
                    />
                    <ButtonGroup
                        className="buttonGroup"
                        color="primary"
                        aria-label="outlined primary button group"
                    >
                        <CopyToClipboard
                            text={account}
                            onCopy={() => copyAddress()}
                        >
                            <Button
                                onClick={() => copyAddress()}
                                startIcon={<FileCopyOutlinedIcon />}
                            >
                                <Typography variant="caption">Copy</Typography>
                            </Button>
                        </CopyToClipboard>
                        <Button
                            onClick={() => viewBlockUrl(account)}
                            startIcon={<OpenInNewOutlinedIcon />}
                        >
                            <Typography variant="caption">View</Typography>
                        </Button>
                        <Button
                            onClick={() => onDeactiveWallet()}
                            startIcon={<ExitToAppOutlinedIcon />}
                        >
                            <Typography variant="caption">
                                Deactivate
                            </Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
            )}
            {!active ? (
                <List className="wallet-list">
                    <p style={{textAlign:'center'}} color="textSecondary">
                        Connect via Web3
                    </p>
                    {Wallets.map((item, idx) => {
                        const activating =
                            item.connector === activatingConnector;
                        const connected = item.connector === connector;
                        const disabled =
                            !triedEager ||
                            !!activatingConnector ||
                            connected ||
                            !!error;
                        return (
                            activating ? <></> : <ListItem
                                button
                                key={item.name}
                                className="item"
                                disabled={disabled}
                                onClick={() => onConnectWallet(item)}
                            >
                                <Grid item
                                   className={classes.networkSelector}
                                   container
                                   direction="row"
                                   justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{padding:"10px 0px", border:"1px solid transparent", borderRadius:'5px'}}
                                >
                                    <Grid item className="text-center" xs={3} sm={2} md={2}>
                                        <img className={dashboardClasses.networkImage} style={{width:"150%",height:"150%"}} src={item.logo1} alt={item.logo1} />
                                    </Grid>
                                </Grid>
                                <ListItemIcon className="symbol">
                                    {activating ? (
                                        <CircularProgress />
                                    ) : (
                                        <Grid item  className="text-center" xs={3} sm={2} md={2}>
                                            {subMethod ? <div className={dashboardClasses.fillCircle} />: <div className={dashboardClasses.emptyCircle} />}
                                        </Grid>
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        activating
                                            ? "Initializing..."
                                            : item.description
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                ""
            )}
        </Dialog>
    );
};

export default ConnectWallet;