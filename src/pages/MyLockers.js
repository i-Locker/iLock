import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// ** Import Material UI Components
import Modal from '@mui/material/Modal';
import { RadioGroup } from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Search from '@mui/icons-material/Search';
import { Snackbar } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { getTokenMetadata } from "../api";
import { Collapse } from '@mui/material';
import { deposit, approve, allowance, getERC20allowance, updateProfile } from "../web3"
import { connect, useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useStyles from '../assets/styles';
import { TOKENDATA, USERBALANCE, TOKENLISTS, LOCKERDATA, LOCKERSDATA } from "../redux/constants";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { explorer_, networks_data, network_dec_to_hex, network_to_chain, network_lower_to_proper, rpc_, icons_, network_, network_symbols, network_decimals, network_hex_to_dec, websiteURI } from '../constants';
import Loader from '../components/Loader';
import { alterLoaderText } from '../components/Loader';
import { toggleDrawer } from '../components/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TransferOwnershipModal from '../components/TransferOwnership.js';
import { Tooltip } from "@mui/material";
import WithdrawModal from '../components/Transfer.js';
import { _toggleOwnershipModal } from '../components/TransferOwnership.js';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton } from "@mui/material";
import { _toggleWithdrawalModal } from '../components/Transfer.js';
import { transferOwnership_iLock, w3, isLockClaimed, getERC20balance, getEtherBalance, getLocker, getLockers, getData, withdraw, explorer, getTokenBalance, } from '../web3';
import { getERC20Metadata } from "../api";
export let _wrap;
export let getLockId;
export let getAccount;
export let getNetwork;
export let linkWeb3;
export let _transfer;
let connector_;
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
const dateTime = async (date) => {
    return date.toLocaleString();
};
const MyLockers = (props) => {
    const { chainName, wallet } = props.match.params;
    const { account, connector } = useWeb3React();
    connector_ = connector;
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [_token, set_Token] = useState("");
    const [vesting, setVesting] = useState("");
    const [lockToken, setLockToken] = useState("");
    const [chainId, setChainId] = useState(0);
    const [network, setNetwork] = useState("");
    const [status_, setStatus_] = useState(false);
    const [ownable, setOwnable] = useState(false);
    const [ready, setReady] = useState(false);
    const [ether, setEther] = useState(false);
    const [notMiner, setNotMiner] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [lockerListEnabled, setLockerListEnabled] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [unlockDate, setUnlockDate] = useState("");
    const [theHolder, setTheHolder] = useState("");
    const [theCreator, setTheCreator] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [loaderText, setLoaderText] = React.useState("");
    const [tokenDecimals, setTokenDecimals] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const dashboardClasses = useStyles.dashboard();
    const [modalTitle, setModalTitle] = useState("");
    const [modalDes, setModalDes] = useState("");
    const [etherBalance, setEtherBalance] = useState(0);
    const [isWithdrawn, setIsWithdrawn] = useState("");
    const [unlockAble, setUnlockAble] = useState(false);
    const [doneForSure, setDoneForSure] = useState(false);
    const [tokenSet, setTokenSet] = useState(false);
    const [unlockTimestamp, setUnlockTimestamp] = useState("");
    const [modalInner, setModalInner] = useState("Transferring Ownership is irreversible. Provide an Address");
    const [holdingContract, setHoldingContract] = useState("");
    const [currentTimestamp, setCurrentTimestamp] = useState("");
    const dispatch = useDispatch();
    const data = useSelector(state => state.tokenLists);
    let index = 0;
    let __vesting = [];
    let nextUnlock = 0;
    let tokenData = undefined;
    if (network) {
        console.log("net: ", account, network_lower_to_proper[chainName], network_to_chain[network], explorer_[network_dec_to_hex[chainId]]);
    } else {
        //
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };
    getAccount = async () => {
        return account;
    };
    getNetwork = async () => {
        return network;
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSnackbarClose = () => setSnackbar(false);
    const handleSnackbarOpen = () => setSnackbar(true);
    const showLocker = async (net, lid) => {
        props.history.push(`/lockers/${net.toLowerCase()}/${lid}`);
    };
    const showLockup = async () => {
        return props.history.push(`/dashboard/`);
    };
    const _transfer_ownership = async (e) => {
        _toggleOwnershipModal(modalInner, "Ownership Transfer", await getLockId(), await getNetwork());
    };
    useEffect(async () => {
        if (!account) {
            toggleDrawer();
        };
        if (chainName) {
            changeNetwork(network_lower_to_proper[chainName]);
            console.log('network: ', network);
        } else {
            if (!chainName || chainName == "" || chainName == undefined) {
                showLockup();
                console.log("chainName: ", chainName);
            } else {
                console.log("chainName: ", chainName);
            };
        };
        const checkLocker = async (id, account, network) => {
            return await getLocker(account, network);
        };
        const setDate = async (utcSeconds) => {
            let d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            setUnlockDate(d);
            return d;
        };

        function epoch(date) {
            return Date.parse(date)
        };
        const __dispatch = async (newData) => {
            try {
                dispatch({ type: TOKENLISTS, payload: newData });
            } catch (e) {
                console.log(e);
            };
        };
        const __prepare = async (connector) => {
            // eslint-disable-next-line
            setModalInner(modalInner);
            try {
                connector.getChainId().then((chainId) => {
                    setChainId(chainId);
                    if (Number(chainId) === 1) setNetwork("Ethereum");
                    if (Number(chainId) === 3) setNetwork("Ropsten");
                    if (Number(chainId) === 5) setNetwork("Goerli");
                    if (Number(chainId) === 56) setNetwork("Binance Smart Chain");
                    if (Number(chainId) === 97) setNetwork("Binance_testnet");
                    if (Number(chainId) === 444) setNetwork("Frenchain_testnet");
                    if (Number(chainId) === 43114) setNetwork("Avalanche");
                    if (Number(chainId) === 43113) setNetwork("Avalanche_testnet");
                    if (Number(chainId) === 44444) setNetwork("Frenchain");
                    if (Number(chainId) === 420420) setNetwork("Kekchain");
                    if (Number(chainId) === 420666) setNetwork("Kekchain_testnet");
                });
            } catch (e) {
                console.log("err: ", e);
            };
        };
        try {
            let provider = await connector.getProvider();
            getLockers(provider, account, network).then(async (newData) => {
                if (newData) {
                    setVesting(newData);
                    __vesting.push(newData[0]["getLock"][0]);
                    console.log("newData: ", newData[0]["getLock"][0]);
                    for (const index_ in newData[0]["getLock"][0]) {
                        console.log("indy: ", newData[0]["getLock"][0][index_]);
                    };
                    if (newData[0]["getLock"][0] !== undefined) {
                        console.log("newData2: ", newData[0]);
                        setReady(true);
                    } else {
                        setReady(false);
                    };
                    __dispatch(newData);
                };
            });
        } catch (e) {
            console.log(e);
        };
        if (account) {
            __prepare(connector);
        } else {
            //
        };
    }, [account, wallet, network])

    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const isMobile = useMediaQuery('(max-width:600px)');

    const change_Network = async () => {
        if (account) {
            const provider = window.ethereum; {
                /*
                    checkEtherBalance(provider, account);
                */
            }
            const currentNetworkData = networks_data.filter((each) => each.name === network);
            try {
                await provider.request({
                    method: 'wallet_switchEthereuChmain',
                    params: [{ chainId: currentNetworkData[0].chainData.chainId }],
                });
                console.log("You have succefully switched to ", network)
            } catch (switchError) {
                {
                    /*
                    // This error code indicates that the chain has not been added to MetaMask.
                    */
                }
                try {
                    const params_network_add = {
                        chainId: currentNetworkData[0].chainData.chainId,
                        rpcUrls: [rpc_[currentNetworkData[0].chainData.chainId]],
                        chainName: network_[currentNetworkData[0].chainData.chainId],
                        nativeCurrency: { name: network_symbols[currentNetworkData[0].chainData.chainId], decimals: network_decimals[currentNetworkData[0].chainData.chainId], symbol: network_symbols[currentNetworkData[0].chainData.chainId] },
                        blockExplorerUrls: [explorer_[currentNetworkData[0].chainData.chainId]],
                        iconUrls: [icons_[currentNetworkData[0].chainData.chainId]]
                    };
                    console.log("params_network_add: ", switchError.code, params_network_add);
                    if (switchError.code === 4902) {
                        console.log("This network is not available in your metamask, please add it");
                        let provider = await connector.getProvider();
                        provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [{ ...params_network_add }]
                        }).catch((error) => {
                            console.log("provider_err: ", error);
                        });
                    } else if (switchError.code === 4001) {
                        console.log("Switch Request has rejected");
                    } else if (switchError.code === 4200) {
                        console.log("You have succefully switched to ", network)
                    };
                } catch (e) {
                    console.log("error: ", e);
                }
            };
        };
    };
    const changeNetwork = (name) => {
        setNetwork(name);
        dispatch({
            type: TOKENDATA,
            payload: {}
        });
        change_Network();
    }

    const fn = (val, decimal = 4) => {
        if (!isNaN(Number(val))) {
            const trimVal = Number(Number(val).toFixed(decimal));
            const decimalVal = trimVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return decimalVal;
        } else {
            return Number(0);
        }
    }

    const withdrawToken = async (lockId, id, receiver, isEth) => {
        if (!account) return;
        if (claimed) return;
        let provider = await connector.getProvider();
        let gasLimit;
        w3(provider, network).then(async (W3) => {
            let block = await W3.eth.getBlock("latest");
            console.log("(w3) block: ", block);
            console.log("(w3) gasLimit: ", block.gasLimit);
            gasLimit = block.gasLimit;
            console.log("Processing withdrawal: ", id, gasLimit, isEth, lockId, account, receiver, network);
            withdraw(provider, lockId, account, receiver, isEth, network, ownable, gasLimit).then(async (status) => {
                const newData = JSON.parse(JSON.stringify(data));
                if (status) {
                    console.log("Withdrawal processed: ", newData);
                    setClaimed(true);
                    setIsWithdrawn(true);
                    _toggleWithdrawalModal("Confirmed", "Transaction: ", id, network);
                };
            });
        });
    };
    _transfer = withdrawToken;

    const withdrawProperty = async (lockId, id) => {
        console.log("withdrawProperty: ", id);
        _toggleWithdrawalModal("Delegate a receiver wallet and submit the transfer", "Withdraw", lockId, network);
    }

    const transferOwnership = async (lockId, id) => {
        if (!account) return;
        let provider = await connector.getProvider()
        withdraw(provider, lockId, account, network).then(async (status) => {
            const newData = JSON.parse(JSON.stringify(data));
            if (status) console.log("Withdrawal processed: ", newData);
        })
    }

    const Row = (props) => {
        const { index, row } = props;
        let nextUnlock, lockedTokenAmount = 0,
            lockedLiquidity = false;
        const currentTime = Date.now();
        row.data.map(each => {
            if (each.timestamp > currentTime / 1000) {
                if (!nextUnlock) nextUnlock = each.timestamp;
                else if (nextUnlock > each.timestamp) nextUnlock = each.timestamp;
            }
            if (!each.isWithdrawn && !each.isLiquidity) lockedTokenAmount += each.amount / Math.pow(10, each.decimals);
            if (!each.isWithdrawn && each.isLiquidity) lockedLiquidity = true;
        })

        return ( < >
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
                > 
                    <TableCell>
                        {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <span style={{cursor: "pointer"}} onClick={()=>showLockup(row.token.address,index + 1)}>{row.token.symbol}</span>
                        <CopyToClipboard text={row.token.address} onCopy={()=>handleSnackbarOpen(true)}>
                            <Tooltip title="copy">
                                <IconButton>
                                    <ContentCopyIcon/>
                                </IconButton>
                            </Tooltip>
                        </CopyToClipboard>
                    </TableCell>
                    <TableCell align="right">{lockedTokenAmount.toFixed(2)}</TableCell>
                    <TableCell align="right">{lockedLiquidity && <CheckIcon />}</TableCell>
                    <TableCell align="right">
                        {nextUnlock ? new Date(nextUnlock).toDateString() : ''}
                    </TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="secondary" style={{width: '100%'}}  onClick={() => showLockup(row.token.address,index + 1)}>View</Button>
                    </TableCell>
                </TableRow> < />
        )
    }
    return (
        <Container className={classes.root} maxWidth="lg" style={{paddingLeft:20, paddingRight:20}}>
            <Box className={classes.info}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                    <Grid className={isMobile ? `${mobileClasses.root} grid text-center`  : "grid text-center"} style={{marginTop:40}} item xs={12} sm={12} md={6} >
                        <div style={{maxWidth:400, display:'inline-block', textAlign:'left'}}>
                            <h1>Did you know?</h1>
                            <p>You could hire us to build for you. We engineer custom protocols, DApps, applications, SaaS platforms and more...</p>
                            <br />
                            <p>We specialize in Web3, blockchain technologies involving Ethereum Virtual Machine, and Monero</p>
                            <Link
                                href={`${websiteURI}`}
                                target="_blank"
                                color="blue"
                                underline="none"
                                className={classes.button}
                            ><Button variant="contained">Powered by Interchained</Button></Link>
                        </div>
                    </Grid>
                    <Grid className={isMobile ? `${mobileClasses.root} grid`  : "grid"} style={{marginTop:40}} item xs={12} sm={12} md={6} >
                        <Card className="card">
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Create New iLock"
                            />
                            <CardContent >
                                <img src="/lock.png" />
                                
                    {
                        lockerListEnabled ? <Grid className={isMobile ? `${mobileClasses.root} grid `  : "grid"} style={{marginTop:40}} item xs={12} sm={12} md={12} >
                        <Card className="card">
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Locked Token List"
                            />
                            <CardContent >
                            {/* <TextField
                                id="outlined-search"
                                label="Search other wallet"
                                type="search"
                                variant="standard"
                                fullWidth={true}
                                color="primary"
                                size="small"
                                onKeyPress={searchOtherWallet}
                                value={searchWallet}
                                onChange={onChangeSearchWallet}
                                error={searchOtherWalletError}
                                helperText={searchHelperText}
                            /> */}
                                {data.length == 0 && 
                                <div className="text-center" style={{width:'100%', padding:"20px 0px"}}>
                                    <img src="/mylock.png" alt="My Lock" style={{height:200}}/>
                                    <h2 style={{marginBottom:0}}>No Locked Coin</h2>
                                    <p style={{color:'grey',margin:0}}>You have not locked up any coins yet.</p>
                                </div>}
                                {data.length != 0 && <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>Token</TableCell>
                                            <TableCell align="right">Tokens Locked</TableCell>
                                            <TableCell align="right">Liquidity Locked</TableCell>
                                            <TableCell align="right">Next Unlock</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {data.map((row, index) => (
                                            <Row key={`lockToken-${index}`} row={row} index={index} />
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </CardContent>
                        </Card>
                        
                    </Grid> : <Loader value={loaderText} />
                    }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    {networks_data.find((item)=>item.name==network) && <div style={{textAlign:'center'}}><img style={{width:"50px"}} src={networks_data.find((item)=>item.name==network).url} alt="network" /></div>}
                    <h3 id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center', marginTop:0}}>
                        {modalTitle}
                    </h3>
                    <p id="modal-modal-description" sx={{ mt: 2 }} style={{textAlign:'center', fontSize:12, color:'grey'}}>
                        {modalDes}
                    </p>
                    <Button variant="contained" color="error" style={{width:'100%'}} onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            <Snackbar
                open={snackbar}
                autoHideDuration={600}
                style={{width:100}}
                onClose={handleSnackbarClose}
                message="Successfully Copied to Clipboard"
                // action={action}
            />
        </Container >
    )
}
const mapStateToProps = state => ({
    statistics: state.statistics,
    walletAddress: state.walletAddress
})

//connect function INJECTS dispatch function as a prop!!
export default connect(mapStateToProps)(MyLockers);