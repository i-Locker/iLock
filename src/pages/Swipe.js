import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';
// ** Import Material UI Components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from '@mui/material/Modal';
import { RadioGroup } from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Search from '@mui/icons-material/Search';
import { Snackbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";
import useStyles from "../assets/styles";
import { TOKENDATA, USERBALANCE, TOKENLISTS } from "../redux/constants";
import { CHAINDATA, networks_data, explorer_, rpc_, icons_, network_, lockerAddress, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, websiteURI, ui_friendly_networks } from "../constants";
import { getTokenMetadata, getERC20Metadata } from "../api";
import { toggleDrawer } from '../components/Header';
import Loader from '../components/Loader';
import DateTime from '../components/DateTime';
import { useNavigate } from "react-router-dom";
import { alterLoaderText } from '../components/Loader';
import { deposit, approve, allowance, getTokenBalance, getERC20balance, getERC20allowance, getData, explorer, updateProfile, getEtherBalance, w3, getETHtoChecksum, _toBN, _getBN, _getUIfmt } from "../web3"
export let handle_Date;
const Dashboard = (props) => {

    const { account, connector, chainId, active } = useWeb3React();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [lockerListEnabled, setLockerListEnabled] = useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [loaderText, setLoaderText] = React.useState("");
    const [network, setNetwork] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalDes, setModalDes] = useState("");
    const [tokenContract, setTokenContract] = useState("");
    const [holder, setHolder] = useState("");
    const [subMethod, setSubMethod] = useState("Project Tokens");
    const [lockAmount, setLockAmount] = useState(0);
    const [tokenDecimals, setTokenDecimals] = useState(0);
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenBalanceString, setTokenBalanceString] = useState("");
    const [etherBalance, setEtherBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [tokenAllowance, setTokenAllowance] = useState(0);
    const [withdrawDate, setWithdrawDate] = useState(undefined);
    const [dateUseful, setDateUseful] = useState(false);
    const [addressDemand, setAddressDemand] = useState(false);
    const [isAllowed, setIsAllowed] = useState(0);
    const [lockAmountMax, setLockAmountMax] = useState(false);
    const maxSteps = 4;
    const theme = useTheme();
    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const dashboardClasses = useStyles.dashboard();
    const isMobile = useMediaQuery("(max-width:600px)");
    const userBalance = useSelector(state => state.userBalance);
    const token = useSelector(state => state.tokenData);
    const data = useSelector(state => state.tokenLists);
    const test_data = useSelector(state => state);
    console.log("test_data: ", test_data, test_data.tokenData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    const [values, setValues] = React.useState({
        tokenAddress: "",
    });

    const selectToken = async () => {
        console.log("activeStep: ", activeStep);
    };
    const checkAllowance = async (token, account, network) => {
        allowance(token, account, network).then(results => {
            setTokenAllowance(results);
            console.log("allowance: ", results, tokenAllowance);
            return results;
        });
    };
    const checkEtherBalance = async (provider, account) => {
        getEtherBalance(provider, account, network).then(async (ebf) => {
            console.log("ethereumBalance: ", ebf[0], ebf[1], ebf[2]);
            fetchEtherBalance(ebf[2]);
        });
    };
    const handleNext = async (events) => {
        if (account) {
            console.log("events: ",events);
            console.log("activeStep: ",activeStep);
            const provider = window.ethereum;
            checkEtherBalance(provider, account);
            const currentNetworkData = networkData.filter((each) => each.name === network);
            try {
                let NETWORK = chainId == network_hex_to_dec[currentNetworkData[0].chainData.chainId] ? true : false;
                console.log("NETWORK: ", NETWORK, "\n existing: ", chainId, "\n requested ", network_hex_to_dec[currentNetworkData[0].chainData.chainId]);
                if (NETWORK) {
                    console.log("You are already on the proper network:  ", network);
                } else {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: currentNetworkData[0].chainData.chainId }],
                    });
                    console.log("You have successfully switched to ", network);
                }
                if (activeStep == 0) {
                    if (account === undefined) {
                        setModalTitle("Please connect Wallet");
                        setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                        handleOpen();
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                } else if (activeStep >= 2) {
                    if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                        setModalTitle("Please select Token");
                        setModalDes(`Before you can create a lock on ${network}, you must select token on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                        handleOpen();
                    } else {
                        console.log(activeStep);
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                } else {
                    console.log("activeStep: ", activeStep);
                    if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 2);
                    };
                }
            } catch (switchError) {
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
                        console.log("Switch Request has rejected:", "\n network: ", network, "\n chainId:", chainId);
                        console.log("chainId: ", chainId);
                        provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [{ ...params_network_add }]
                        }).catch((error) => {
                            console.log("provider_err: ", error);
                        });
                    } else if (switchError.code === 4001) {
                        console.log("Switch Request has rejected:", "\n network: ", network, "\n chainId:", chainId);
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    } else if (switchError.code === 4200) {
                        console.log("You have succefully switched to ", network);
                        if (activeStep == 0) {
                            if (account === undefined) {
                                setModalTitle("Please connect Wallet");
                                setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                                handleOpen();
                            } else {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                        } else if (activeStep == 2) {
                            if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                                setModalTitle("Please select Token");
                                setModalDes(`Before you can create a lock on ${network}, you must select token on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                                handleOpen();
                            } else {
                                console.log(activeStep);
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                        } else {
                            if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            } else {
                                setActiveStep((prevActiveStep) => prevActiveStep + 2);
                            };
                        };
                    };
                } catch (e) {
                    console.log("err: ", e);
                };
            };
        };
    };
    async function start_(tokenContract, tokenDecimals) {
        let provider = await connector.getProvider();
        const tokenBalance = await getTokenBalance(provider, tokenContract, account, network);
        let data_ = await _getUIfmt(tokenBalance.toString(), parseFloat(tokenDecimals));
        // eslint-disable-next-line
        console.log("tokenBalance: ", tokenBalance, data_, (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
        // eslint-disable-next-line
        window.alert("Token Found! Balance: " + (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
        dispatch({ type: USERBALANCE, payload: tokenBalance });
    };

    useEffect(() => {
        if (!account) {
            setLoaderText(" ... ");
            alterLoaderText(loaderText);
            toggleDrawer();
            setIsAllowed(0);
            alterLoaderText("Connect Wallet");
        } else if (account && !network && !tokenContract) {
            setIsAllowed(0);
            alterLoaderText("Select Network");
        } else if (account && network && !tokenContract) {
            setIsAllowed(0);
            alterLoaderText("Make a selection");
        } else {
            try {
                if (tokenContract && tokenDecimals) {
                    start_(tokenContract, tokenDecimals);
                };
            } catch (e) {
                console.log(e);
                window.alert("Token not found, please try again...");
            } finally {
                alterLoaderText("Deploy iLocker");
                if (!lockAmount) {
                    window.alert("Awesome! Let's continue to create your iLocker smart contract...");
                };
            };
        };
    }, [account, tokenContract, tokenDecimals, connector, network]);

    const handleAllowance = async (e) => {
        if (!account || !tokenContract) return;
        setIsAllowed(0);
        try {
            let provider = await connector.getProvider();
            const tokenBalance = await getERC20balance(provider, tokenContract, account, network);
            console.log("tokenBalance: ", tokenBalance);
            dispatch({ type: USERBALANCE, payload: tokenBalance });
        } catch (e) {
            console.log(e);
        } finally {
            if (!lockAmount) {
                //
            } else {
                try {
                    let provider = await connector.getProvider();
                    const allowanceAmount = await getERC20allowance(provider, tokenContract, account, lockerAddress[network], network);
                    console.log("allowanceAmount/lockAmount: ", parseFloat(allowanceAmount), lockAmount * 10 ** tokenDecimals, parseFloat(allowanceAmount) >= parseFloat(lockAmount * 10 ** tokenDecimals));
                    setTokenAllowance(allowanceAmount);
                    let allowanceAmountFormatted = await _getBN(allowanceAmount, parseFloat(tokenDecimals));
                    let allowanceAmountFormatted_UI = await _getUIfmt(allowanceAmount, parseFloat(tokenDecimals));
                    console.log("allowanceAmountFormatted: ", allowanceAmount, parseFloat(allowanceAmountFormatted).toFixed(0), parseFloat(allowanceAmountFormatted_UI).toFixed(0));
                    if (parseFloat(allowanceAmount) < parseFloat(lockAmount * 10 ** tokenDecimals)) {
                        setIsAllowed(1);
                    } else {
                        setIsAllowed(2);
                    };
                } catch (e) {
                    console.log(e);
                };
            };
        };
    };
    const handleChange = async (event) => {
        setValues({ tokenAddress: event.target.value });
        if (event.target.value.length == 42) {
            const contract_address = event.target.value;
            try {
                let provider = await connector.getProvider();
                console.log("ETHtoChecksum: ", await getETHtoChecksum(provider, contract_address));
                const contractData = await getERC20Metadata(provider, CHAINDATA.find((item) => item.name == network).chain, await getETHtoChecksum(provider, contract_address), await getETHtoChecksum(provider, account));
                let tokenData = contractData;
                dispatch({
                    type: TOKENDATA,
                    payload: tokenData[0]
                });
                setTokenDecimals(parseFloat(JSON.parse(contractData[0]["decimals"])).toFixed(0));
                setTokenBalance(parseFloat(JSON.parse(contractData[0]["balanceOf"])).toFixed(2));
                setTokenSymbol(contractData[0]["symbol"].toString());
                setTokenName(contractData[0]["name"].toString());
            } catch (e) {
                console.log("e: ", e);
            };
        } else {
            window.alert("Token not found, please try again...");
        };
    };

    const handleClickSearch = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        handleNext(step);
    };

    const fetchEtherBalance = (eb) => {
        setEtherBalance(eb);
    };

    const selectLockAmountMax = () => {
        const _amount = addressDemand ? (test_data.userBalance / Math.pow(10, tokenDecimals)).toFixed(2) : etherBalance;
        setLockAmount(_amount);
        console.log("_amount: ", lockAmount);
        setLockAmountMax(true);
    }

    function handleLocker(e) {
        setLockAmount(parseFloat(e.target.value));
        setLockAmountMax(false);
        handleAllowance(e);
        console.log("_amount: ", lockAmount);
    }
    const handleLockAmount = (e) => {
        console.log("e.target.value: ", e.target.value);
        handleLocker(e);
    };
    const handleTokenDecimals = (e) => {
        console.log("balance: ", test_data.userBalance / Math.pow(10, e.target.value));
        setTokenDecimals(parseFloat(e.target.value).toFixed(0));
    };
    const handleLockToken = async (e) => {
        async function nextMsg(ctr, lb, la) {
            // eslint-disable-next-line
            let string_to_add = lb == true ? "there is no balance " : "there is a balance ";
            // eslint-disable-next-line
            string_to_add = la == true ? string_to_add + "this wallet has a low iLocker allowance... " : string_to_add + "";
            let final_string = lb == true ? "Transfer that Token to this wallet, " : "";
            final_string = la == true ? "increase allowance on the next page, " : "";
            let provider = await connector.getProvider();
            switch (ctr) {
                case 0:
                    break;
                case 1:
                    window.alert("Good news friends...");
                    nextCount(ctr, lb, la);
                    break;
                case 2:
                    // eslint-disable-next-line
                    window.alert("Token Found! ")
                    nextCount(ctr, lb, la);
                    break;
                case 3:
                    // eslint-disable-next-line
                    if (la == true && lb == false) {
                        window.alert("Savings Token Selected");
                        setTokenContract(await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value));
                    } else if (la == false && lb == false) {
                        window.alert("Savings Token Selected");
                        setTokenContract(await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value));
                    } else if (la == true && lb == true) {
                        window.alert(string_to_add);
                    } else {
                        window.alert(string_to_add);
                    };
                    break;
                default:
                    break;
            }
        };
        nextMsg(0);
        async function nextCount(ctr, tb, ta) {
            let count_lt = ctr > 0 ? ctr : 0;
            let limit_lt = 3;
            count_lt = count_lt > limit_lt ? 0 : count_lt += 1;
            setTimeout(await nextMsg, 1024, count_lt, parseFloat(tb) > 0, parseFloat(ta) > 0);
        };
        try {
            if (!network) {
                window.alert("Hey there friends, Network was not detected... Are your connected to a Blockchain via Web3?");
                return false;
            };
            if (!account) {
                window.alert("Hi friends, Web3 was not detected... Are you connected to a network?");
                return false;
            };
            let provider = await connector.getProvider();
            console.log("ETHtoChecksum: ", await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value));
            let tokenBalance = await getTokenBalance(provider, await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value), account, network);
            const allowanceAmount = await getERC20allowance(provider, await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value), account, lockerAddress[network], network);
            const allowanceAmountFormatted = await _getUIfmt(allowanceAmount.toString(), tokenDecimals);
            const tokenBalanceFormatted = (tokenBalance / Math.pow(10, tokenDecimals)).toFixed(2)
            const lockAmountFormatted = (lockAmount).toFixed(2).toString();
            console.log("tokenBalance: ", tokenBalance, tokenBalanceFormatted, parseFloat(tokenBalance) > 0);
            setTokenBalanceString(tokenBalanceFormatted);
            console.log("allowanceAmount/lockAmount: ", lockAmountFormatted, allowanceAmountFormatted, parseFloat(allowanceAmount), lockAmount * 10 ** tokenDecimals);
            if (parseFloat(allowanceAmount) > 0) {
                window.alert("Savings Token Selected");
                setTokenContract(await getETHtoChecksum(provider, document.getElementById("digital-asset-erc20-compatible-interchained-ilock").value));
            } else {
                await nextCount(0, parseFloat(tokenBalanceFormatted), parseFloat(allowanceAmountFormatted));
            };
        } catch (e) {
            window.alert("Valued member, Web3 could not detect this token... Please try another token.");
            console.log("e: ", e);
        };
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbar(false);
    const handleSnackbarOpen = () => setSnackbar(true);
    const handleHolder = async (e) => {
        setHolder(e.target.value);
        console.log("holder: ", holder);
    };

    handle_Date = (value) => {
        const currentDate = new Date();
        console.log("DATETIME (dashboard): ", value, currentDate, value > currentDate)
        if (value > currentDate) {
            setDateUseful(true);
        } else {
            setDateUseful(false);
        };
        setWithdrawDate(value);
    };

    const showLockup = async (network, lockId) => {
        navigate(`/lockers/${network.toLowerCase()}/${lockId}`);
    };

    const depositToken = async (e) => {
        try {
            let tokenAmount;
            tokenAmount = lockAmount;
            let isEth = false;
            let __decimals = 18;
            let unlockDate = withdrawDate;
            if (addressDemand == true) {
                isEth = false;
                console.log("(ERC-20) tokenSymbol: ", tokenSymbol);
                __decimals = tokenDecimals ? tokenDecimals : 18;
            } else {
                isEth = true;
                __decimals = 18;
            };
            if (holder == undefined) {
                console.log("holder unset! Defaulting ", holder);
                setHolder(account);
            };
            const balanceChecker = true;
            if (balanceChecker == true) {
                console.log("depositToken: ", e.target.value, addressDemand, tokenAmount, unlockDate, account, holder, __decimals, network);
                let unset = true;
                let allSet = false;
                let gasLimit;
                let depositAmount;
                let depositNetwork;
                let depositHolder;
                let depositCreator;
                if (unset) {
                    depositAmount = tokenAmount;
                    depositNetwork = network;
                    depositHolder = holder;
                    depositCreator = account;
                    unset = false;
                    allSet = true;
                };
                if (allSet) {
                    let provider = await connector.getProvider();
                    w3(provider, network).then(async (W3) => {
                        let block = await W3.eth.getBlock("latest");
                        console.log("(w3) block: ", block);
                        console.log("(w3) gasLimit: ", block.gasLimit);
                        gasLimit = block.gasLimit;
                        deposit(provider, tokenSymbol ? tokenSymbol : "iLocker", isEth, tokenContract, tokenAmount, unlockDate, depositCreator, depositHolder, depositNetwork, __decimals, gasLimit).then(async (results) => {
                            setWithdrawDate(undefined);
                            setDateUseful(false);
                            try {
                                console.log("events: (Transfer)", parseFloat(results["events"]["Transfer"]["returnValues"].tokenId));
                                console.log("events (LockCreated): ", parseFloat(results["events"]["LockCreated"]["returnValues"].lockId));
                                showLockup(network, parseFloat(results["events"]["Transfer"]["returnValues"].tokenId));
                            } catch (e) {
                                dispatch({
                                    type: TOKENDATA,
                                    payload: {}
                                })
                                setActiveStep(0);
                                window.alert("Transaction error, check block explorer for more intel.");
                                console.log("err: ", e);
                            } finally {
                                const newData = await getData(provider, account, network);
                                dispatch({ type: TOKENLISTS, payload: newData });
                            };
                        });
                    });
                };
            } else {
                try {
                    window.alert("ERC20 insufficient balance. Reduce amount or fund balance to process specified token amount.");
                    document.getElementById("iLockerDeploy").blur();
                    document.getElementById("standard-number-amount").focus({ focusVisible: true });
                    const restore = async () => {
                        document.getElementById("iLockerDeploy").focus();
                    };
                    setTimeout(restore, 7777);
                } catch (e) {
                    console.log("err: ", e);
                };
            };
        } catch (e) {
            console.log(e);
        };
    };

    const handleNativeTokenMismatch = async (e) => {
        if (e !== "Project Tokens") {
            console.log("NATIVE: ", e);
            setAddressDemand(false);
        } else {
            console.log("ERC-20: ", e);
            setAddressDemand(true);
        };
    };

    const approveToken = async () => {
        let ap = lockAmount * 10 ** tokenDecimals;
        let amountFormatted = await _getBN(lockAmount, tokenDecimals);
        console.log("approving: ", lockAmount, tokenDecimals, ap, "\n ", amountFormatted);
        let provider = await connector.getProvider();
        approve(provider, tokenContract, account, amountFormatted, network).then((status) => {
            if (status) setIsAllowed(2);
        });
    };

    const networkData = networks_data;

    const changeNetwork = (name) => {
        setNetwork(name);
    };

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

        return ( <
            >
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
                </TableRow> <
            />
        )
    }
    return (
        <Container className={classes.root} maxWidth="lg" style={{paddingLeft:20, paddingRight:20}}>
            <Box className={classes.info}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                    <Grid className={isMobile ? `${mobileClasses.root} grid text-center`  : "grid text-center"} style={{marginTop:40}} item xs={12} sm={12} md={6} >
                        <div style={{maxWidth:400, display:'inline-block', textAlign:'left'}}>
                            <h1>Create your own custom TimeLock instantly.</h1>
                            <p>All digital assets are locked into your very own TimeLock enabled smart contract which has been specially engineered by the top devs and tested to serve this purpose. TimeLock certified digital assets can only be withdrawn after the preset time lock expires.</p>
                            <Link
                                href={`${websiteURI}`}
                                target="_blank"
                                color="blue"
                                underline="none"
                                className={classes.button}
                            ><Button variant="contained">Powered by {`${PROJECTNAME}`}</Button></Link>
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
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={(e)=>handleStepChange(e)}
                                    >
                                       
                                        <div key={1} style={{paddingLeft:1, paddingRight:1}}>
                                            <p style={{textAlign:'center'}} color="textSecondary">
                                                Choose the blockchain network.
                                            </p>
                                            {
                                                networkData ? networkData.map((item)=>
                                                <Grid
                                                    className={classes.networkSelector}
                                                    container
                                                    direction="row"
                                                    justifyContent="space-evenly"
                                                    alignItems="center"
                                                    style={{padding:"10px 0px", border:item.name==network?"1px solid #fff":"1px solid transparent", borderRadius:'5px'}}
                                                    key={item.name}
                                                    onClick = {()=>changeNetwork(item.name)}
                                                >
                                                    <Grid item  xs={10} sm={11} md={11}>
                                                        <Grid 
                                                            container
                                                            direction="row"
                                                            alignItems="center"
                                                        >
                                                            <Grid item className="text-center" xs={3} sm={2} md={2}>
                                                                <img className={dashboardClasses.networkImage} src={item.url} alt="network" />
                                                            </Grid>
                                                            <Grid item   xs={9} sm={10} md={10}>
                                                                <p  color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                    {ui_friendly_networks[item.name]}
                                                                </p>
                                                                <p color="textSecondary" className={dashboardClasses.networkDes}>
                                                                    {item.subtitle}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item  className="text-center" xs={2} sm={1} md={1}>
                                                        {item.name==network ? <div style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#fff', display:'inline-block'}} />: <div style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #fff', display:'inline-block'}} />}
                                                    </Grid>
                                                </Grid>
                                                )
                                            : <></> }
                                        </div>
                                        <div key={2} style={{paddingLeft:1, paddingRight:1}}>
                                            <p style={{textAlign:'center'}} color="textSecondary">
                                                Select the type of token you would like to create a lock for.
                                                You can create multiple locks with different settings for each one.
                                            </p>
                                            {
                                                network !="" && networkData.find((item)=>item.name==network).subData.map((each)=><Grid
                                                className={classes.networkSelector}
                                                container
                                                direction="row"
                                                justifyContent="space-evenly"
                                                alignItems="center"
                                                style={{padding:"10px 0px", border:each.name==subMethod?"1px solid #fff":"1px solid transparent", borderRadius:'5px'}}
                                                key={each.name}
                                                onClick = {
                                                    ()=>{
                                                        setSubMethod(each.name)
                                                        handleNativeTokenMismatch(each.name)
                                                    }
                                                }
                                            >
                                                <Grid item  xs={10} sm={11} md={11}>
                                                    <Grid 
                                                        container
                                                        direction="row"
                                                        alignItems="center"
                                                    >
                                                        <Grid item className="text-center" xs={3} sm={2} md={2}>
                                                            <img className={dashboardClasses.networkImage} src={each.url} alt="network" />
                                                        </Grid>
                                                        <Grid item   xs={9} sm={10} md={10}>
                                                            <p  color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                {each.name}
                                                            </p>
                                                            <p  color="textSecondary" className={dashboardClasses.networkDes}>
                                                                {each.subTitle}
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item  className="text-center" xs={2} sm={1} md={1}>
                                                    {each.name==subMethod ? <div className={dashboardClasses.fillCircle} />: <div className={dashboardClasses.emptyCircle} />}
                                                </Grid>
                                            </Grid>)
                                            }
                                        </div>
                                        { <div key={3} style={{paddingLeft:1, paddingRight:1}}>
                                            <p className="text-center" color="textSecondary">
                                                Enter the token address you would like to lock for
                                            </p>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{width:'-webkit-fill-available'}}>
                                                <InputLabel htmlFor="digital-asset-erc20-compatible-interchained-ilock">Address</InputLabel>
                                                <OutlinedInput
                                                    id="digital-asset-erc20-compatible-interchained-ilock"
                                                    type="text"
                                                    value={values.tokenAddress}
                                                    onChange={handleChange}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle search"
                                                        onClick={handleLockToken}
                                                        onKeyDown={handleMouseDownPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        <Search />
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                            
                                            {
                                                tokenContract && token.symbol ? 
                                                <div style={{paddingLeft:20, paddingRight:20}}>
                                                    <p style={{margin:"0px"}}>Token Found</p>
                                                    <Grid 
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                            <img className={dashboardClasses.tokenImage} src="/lock.png" alt="network" />
                                                            <p  color="textSecondary" className={dashboardClasses.tokenTitle}>
                                                                {token.symbol}
                                                            </p>
                                                        </Grid>
                                                        <Grid item className={dashboardClasses.textRight}  xs={6} sm={6} md={6}>
                                                            <Button variant="contained" color="error" sm={12} onClick={selectToken}>Select</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div> : <></>
                                            }
                                            
                                        </div> }
                                        <div id="iLockerDeploy" key={4} style={{paddingLeft:1, paddingRight:1}}>
                                            <br />
                                            { addressDemand ? <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                    <TextField
                                                        id="standard-number-decimals"
                                                        label="Token Decimals"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 0, max: 18 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 0, max: 18 } }}
                                                        variant="standard"
                                                        onChange={handleTokenDecimals}
                                                        value={tokenDecimals}
                                                    />
                                                </Grid>
                                            </Grid> : <span></span> }
                                            <br />
                                             <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                    <TextField
                                                        id="standard-number-amount"
                                                        label="Lock Amount"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1 } }}
                                                        variant="standard"
                                                        onChange={handleLockAmount}
                                                        value={lockAmount}
                                                    />
                                                </Grid>
                                                <Grid item className={dashboardClasses.textRight}  xs={6} sm={6} md={6}>
                                                    <p style={{marginBottom:2, marginTop:0, fontSize: "10px"}}>Balance: {addressDemand ? (tokenBalance / Math.pow(10, tokenDecimals)).toFixed(2) : etherBalance}</p>
                                                    <Grid 
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                            <Button variant="contained" color="error" sm={12} onClick={selectLockAmountMax}>Max</Button>
                                                        </Grid>
                                                        <Grid item className={dashboardClasses.textRight} xs={6} sm={6} md={6}>
                                                            <img style={{height:30}} src="/lock.png" alt="network" />
                                                            <p  color="textSecondary" className={dashboardClasses.tokenTitle}>
                                                                {token.symbol}
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br />
                                             <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.textLeft} xs={6} sm={6} md={6}>
                                                    <TextField
                                                        id="standard-holder"
                                                        label="Holder"
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1 } }}
                                                        variant="standard"
                                                        onChange={handleHolder}
                                                        value={holder}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={!isMobile ? `${dashboardClasses.balanceContainer}` : `${mobileClasses.balanceContainer}`}
                                            >
                                                    <DateTime />
                                                    <div>
                                                    {
                                                        !addressDemand || isAllowed == 2 ? <Button variant="contained" color="secondary" sm={12} value={addressDemand} onClick={(e)=>depositToken(e)} className={isMobile ? `${mobileClasses.button}` : ``}>Deposit</Button>
                                                        : (isAllowed == 1 ? <Button variant="contained" color="secondary" sm={12} onClick={approveToken} className={isMobile ? `${mobileClasses.button}` : ``}>Approve</Button> : <Button variant="contained" color="secondary" sm={12} onClick={approveToken} className={isMobile ? `${mobileClasses.button}` : ``}>Approve</Button>)
                                                    }
                                                    </div>
                                            </Grid>
                                        </div>
                                    </SwipeableViews>
                                    <MobileStepper
                                        className={dashboardClasses.mobileStepper}
                                        steps={maxSteps}
                                        position="static"
                                        activeStep={activeStep}
                                        nextButton={
                                        <Button
                                            size="small"
                                            onClick={handleNext}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                            ) : (
                                            <KeyboardArrowRight />
                                            )}
                                        </Button>
                                        }
                                        backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                            ) : (
                                            <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                        }
                                    />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
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
                </Grid>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    {networkData.find((item)=>item.name==network) && <div style={{textAlign:'center'}}><img style={{width:"50px"}} src={networkData.find((item)=>item.name==network).url} alt="network" /></div>}
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
})

export default connect(mapStateToProps)(Dashboard);