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
import { CHAINDATA, networks_data, explorer_, rpc_, icons_, iMigrator_status, network_, V1_DIGITAL_ASSET, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, websiteURI, ui_friendly_networks, migratorABI, iMigratorAddress } from "../constants";
import { getTokenMetadata, getERC20Metadata } from "../api";
import { toggleDrawer } from '../components/Header';
import Loader from '../components/Loader';
import DateTime from '../components/DateTime';
import { useNavigate } from "react-router-dom";
import { alterLoaderText } from '../components/Loader';
import { deposit, approve, approve_iMigrator, allowance, getTokenBalance, getERC20balance, getERC20allowance, getData, explorer, updateProfile, getEtherBalance, w3, getETHtoChecksum, _toBN, _getBN, _getUIfmt, migrate_v1_to_v2 } from "../web3"
export let handle_Date;
const Migrations = (props) => {

    const { account, connector, chainId, active } = useWeb3React();
    const [activeStep, setActiveStep] = useState(0);
    const [upperLimit, setUpperLimit] = React.useState(2);
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
    const [migrateAmount, setLockAmount] = useState(0);
    const [tokenDecimals, setTokenDecimals] = useState(18);
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenBalanceString, setTokenBalanceString] = useState("");
    const [etherBalance, setEtherBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [tokenAllowance, setTokenAllowance] = useState(0);
    const [withdrawDate, setWithdrawDate] = useState(undefined);
    const [dateUseful, setDateUseful] = useState(false);
    const [web3Enabled, setWeb3Enabled] = useState(false);
    const [addressDemand, setAddressDemand] = useState(false);
    const [isAllowed, setIsAllowed] = useState(0);
    const [lockAmountMax, setLockAmountMax] = useState(false);
    const maxSteps = 4;
    const theme = useTheme();
    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const MigratorClasses = useStyles.dashboard();
    const isMobile = useMediaQuery("(max-width:600px)");
    const userBalance = useSelector(state => state.userBalance);
    const token = useSelector(state => state.tokenData);
    const data = useSelector(state => state.tokenLists);
    const test_data = useSelector(state => state);
    console.log("test_data: ", test_data, test_data.tokenData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const token_contract_v1 = useState();
    // const token_contract_v2 = useState("0xC046dDd298bC41f2b2924b6aFfF66893a160Cf96");

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

    const checkAllowance = async (token, account, network) => {
        allowance(token, account, network).then(results => {
            if (results) {
                setTokenAllowance(results);
                console.log("allowance: ", results, tokenAllowance);
            };
            return results;
        });
    };
    const checkEtherBalance = async (provider, account) => {
        getEtherBalance(provider, account, network).then(async (ebf) => {
            if (ebf) {
                console.log("ethereumBalance: ", ebf[0], ebf[1], ebf[2]);
                fetchEtherBalance(ebf[2]);
            };
        });
    };
    async function handleNext (events) {
        if (account) {
            console.log("events: ", events);
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
                };
                    if (events == 0 || activeStep==0) {
                        if (!chainId||account === undefined) {
                            setModalTitle("Please connect Wallet");
                            setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                            handleOpen();
                        };
                    } else if (events > 1 || activeStep>1) {
                        return true;
                    };
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
                    } else if (switchError.code === 4200) {
                        console.log("You have succefully switched to ", network);
                        if (activeStep == 0 || events==0) {
                            if (account === undefined || !chainId) {
                                setModalTitle("Please connect Wallet");
                                setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                                handleOpen();
                            };
                        } else if (activeStep > 1 || events>1) {
                            return true;
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
            setTokenBalance(tokenBalance);
        // eslint-disable-next-line
        console.log("tokenBalance: ", tokenBalance, data_, (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
        // eslint-disable-next-line
        window.alert("V1 Balance: " + (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
        dispatch({ type: USERBALANCE, payload: tokenBalance });
    };

    useEffect(() => {
        if (!account) {
            setLoaderText(" ... ");
            alterLoaderText(loaderText);
            toggleDrawer();
            setIsAllowed(0);
            setWeb3Enabled(true);
            alterLoaderText("Connect Wallet");
        } else if (account && !network && !tokenContract) {
            setWeb3Enabled(false);
            setIsAllowed(0);
            alterLoaderText("Select Network");
        } else if (account && network && !tokenContract) {
            setWeb3Enabled(false);
            setIsAllowed(0);
            alterLoaderText("Make a selection");
            setTokenContract(V1_DIGITAL_ASSET);
        } else {
            setWeb3Enabled(false);
            setTokenContract(V1_DIGITAL_ASSET);
            try {
                if (tokenContract && tokenDecimals) {
                    start_(tokenContract, tokenDecimals);
                } else {
                    if (tokenContract)
                    start_(tokenContract, 18);
                };
            } catch (e) {
                console.log(e);
                window.alert("Token not found, please try again...");
            } finally {
                alterLoaderText("Migrate V1 Tokens");
                if (!migrateAmount) {
                    // eslint-disable-next-line
                    window.alert("Network: "+ui_friendly_networks[network]+"\n "+" migrate your digital assets from V1 to V2...");
                };
            };
        };
    }, [account, V1_DIGITAL_ASSET, tokenContract, migrateAmount, setTokenContract, tokenDecimals, connector, network, web3Enabled, setWeb3Enabled]);

    const handleAllowance = async (e) => {
        if (!account || !tokenContract){ 
            setIsAllowed(0);
            return true;
        } else {
            try {
                let provider = await connector.getProvider();
                const tokenBalance = await getERC20balance(provider, tokenContract, account, network);
                setTokenBalance(tokenBalance);
                console.log("tokenBalance: ", tokenBalance, tokenContract, account);
                dispatch({ type: USERBALANCE, payload: tokenBalance });
            } catch (e) {
                console.log(e);
            } finally {
                if (!migrateAmount || isNaN(migrateAmount)) {
                    return true;
                } else {
                    console.log("tokenContract: ", tokenContract);
                    try {
                        let provider = await connector.getProvider();
                        const tokenBalanceFormatted = await _getBN(migrateAmount.toString(),tokenDecimals?tokenDecimals:18);
                        const tokenBalanceFormatted_UI = await _getUIfmt(migrateAmount.toString(), tokenDecimals?tokenDecimals:18);
                        setTokenBalanceString(tokenBalanceFormatted_UI);
                        const allowanceAmount = await getERC20allowance(provider, tokenContract, account, iMigratorAddress[network], network);
                        setTokenAllowance(allowanceAmount);
                        const migrateAmountFormatted = tokenBalanceFormatted.toString();
                        let allowanceAmountFormatted = await _getBN(allowanceAmount, parseFloat(tokenDecimals?tokenDecimals:18));
                        const allowanceAmountFormatted_UI = await _getUIfmt(allowanceAmount, tokenDecimals?tokenDecimals:18);
                        console.log("tokenBalanceFormatted_UI",tokenBalanceFormatted, tokenBalanceFormatted.toString(), tokenBalanceFormatted_UI,"Allowance: ", tokenDecimals, allowanceAmountFormatted_UI, migrateAmountFormatted, parseFloat(allowanceAmountFormatted_UI) < parseFloat(migrateAmountFormatted));
                        if (parseFloat(allowanceAmountFormatted_UI) == parseFloat(0)) {
                            setIsAllowed(0);
                            console.log("isAllowed: ",isAllowed);
                        } else if (parseFloat(allowanceAmountFormatted_UI) < parseFloat(migrateAmountFormatted)) {
                            setIsAllowed(1);
                            console.log("isAllowed: ",isAllowed);
                        } else {
                            if (parseFloat(allowanceAmountFormatted_UI) >= parseFloat(migrateAmountFormatted)) {
                                setIsAllowed(2);
                            }; 
                        };
                    } catch (e) {
                        console.log(e);
                    };
                };
            };
        };
    };
    const handleChange = async (event) => {
        const contract_address = iMigratorAddress[network];
        setValues({ tokenAddress: iMigratorAddress[network] });
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
                setTokenDecimals(18);
                console.log("e: ", e);
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
        try {
            if (!account) {
                return true;
            } else if (account&&activeStep < 2) {
                setActiveStep((activeStep) => activeStep - 1);
            };
        } catch(e){
            return true;
        };
    };

    const handleStepChange = (events) => {
        if (!account || !chainId) {
            event.preventDefault();
            return true;
        } else {
            if (!account) {
                return true;
            } else {
                if(activeStep == 0) {
                    setActiveStep(1);
                    handleNext(events);
                } else if(activeStep == 1) {
                    handleNext(events);
                    return true;
                } else if(activeStep == 2) {
                    return true;
                };
            };
            console.log("activeStep: ",activeStep);
        };
    };

    const handleRestart = (step) => {
        console.log("step: ", step);
        if (!account) {
            event.preventDefault();
            return true;
        } else {
            setActiveStep(0);
        };
    };

    const fetchEtherBalance = (eb) => {
        setEtherBalance(eb);
    };

    const bumpStep = () => {
        setActiveStep((activeStep) => activeStep + 1);
    };

    const selectLockAmountMax = () => {
        const _amount = (test_data.userBalance / Math.pow(10, tokenDecimals)).toFixed(2);
        setLockAmount(_amount);
        console.log("_amount: ", migrateAmount);
        setLockAmountMax(true);
    };

    function handleLocker(e) {
        setLockAmount(parseFloat(e.target.value));
        setLockAmountMax(false);
        handleAllowance(e);
        console.log("_amount: ", migrateAmount);
    };
    const handleLockAmount = (e) => {
        console.log("e.target.value: ", e.target.value);
        handleLocker(e);
    };
    const handleTokenDecimals = (e) => {
        setTokenDecimals(parseFloat(e.target.value).toFixed(0));
    };
    const handleLockToken = async (e) => {
        console.log("handleLockToken: ", e);
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
                        setTokenContract(V1_DIGITAL_ASSET);
                    } else if (la == false && lb == false) {
                        window.alert("Savings Token Selected");
                        setTokenContract(V1_DIGITAL_ASSET);
                    } else if (la == true && lb == true) {
                        window.alert(string_to_add);
                    } else {
                        window.alert(string_to_add);
                    };
                    break;
                default:
                    break;
            };
            handleChange(e);
        };
        nextMsg(0);
        async function nextCount(ctr, tb, ta) {
            let count_lt = ctr > 0 ? ctr : 0;
            let limit_lt = upperLimit;
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
            console.log("ETHtoChecksum: ", await getETHtoChecksum(provider, tokenContract));
            let tokenBalance = await getTokenBalance(provider ,tokenContract, account, network);
            const allowanceAmount = await getERC20allowance(provider, tokenContract, account, iMigratorAddress[network], network);
            const allowanceAmountFormatted = await _getUIfmt(allowanceAmount.toString(), tokenDecimals);
            const tokenBalanceFormatted = (tokenBalance / Math.pow(10, tokenDecimals)).toFixed(2);
            dispatch({ type: USERBALANCE, payload: tokenBalance });
            const migrateAmountFormatted = (migrateAmount).toFixed(2).toString();
            console.log("tokenBalance: ", tokenBalance, tokenBalanceFormatted, parseFloat(tokenBalance) > 0);
            console.log("allowanceAmount/migrateAmount: ", migrateAmountFormatted, allowanceAmountFormatted, parseFloat(allowanceAmount), migrateAmount * 10 ** tokenDecimals);
            if (parseFloat(allowanceAmount) > 0) {
                window.alert("Savings Token Selected");
                setTokenContract(V1_DIGITAL_ASSET);
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
        console.log("DATETIME (Migrator): ", value, currentDate, value > currentDate)
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

    const migrateAssets = async () => {
        try {
            let tokenAmount;
            tokenAmount = migrateAmount.toString();
            let isEth = false;
            let amountFormatted = await _getBN(migrateAmount.toString(), (tokenDecimals?tokenDecimals:18));
                console.log("migrateAmount: ", migrateAmount, amountFormatted);
            let __decimals = 18;
                __decimals = tokenDecimals ? tokenDecimals : 18;
            if (holder == undefined) {
                console.log("holder unset! Defaulting ", holder);
                setHolder(account);
            };
            const balanceChecker = true;
            if (balanceChecker == true) {
                console.log("migrateAssets: ", addressDemand, tokenAmount, account, holder, __decimals, network);
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
                        let results = await migrate_v1_to_v2(provider, depositCreator, amountFormatted.toString(), depositNetwork);
                            if(results) {
                                try {
                                        setActiveStep(0); 
                                        dispatch({
                                            type: TOKENDATA,
                                            payload: {}
                                        });
                                } catch (e) {
                                    console.log("err: ", e);
                                    try {
                                            dispatch({
                                                type: TOKENDATA,
                                                payload: {}
                                            });
                                            setActiveStep(0);
                                     } catch (e) {
                                        console.log("err: ", e);
                                        dispatch({
                                            type: TOKENDATA,
                                            payload: {}
                                        });
                                        setActiveStep(0);
                                    };
                                };
                            };
                      });
                };
            } else {
                try {
                    window.alert("ERC20 insufficient balance. Reduce amount or fund balance to process specified token amount.");
                    document.getElementById("iMigratorChange").blur();
                    document.getElementById("standard-number-amount").focus({ focusVisible: true });
                    const restore = async () => {
                        document.getElementById("iMigratorChange").focus();
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
        setAddressDemand(true);
    };

    const approveToken = async () => {
        if(!migrateAmount) {
            return true;
        } else {
            let ap = migrateAmount * 10 ** (tokenDecimals?tokenDecimals:18);
            let amountFormatted = await _getBN(migrateAmount.toString(), (tokenDecimals?tokenDecimals:18));
            console.log("approving: ", migrateAmount, tokenDecimals, ap, "\n ", amountFormatted);
            let provider = await connector.getProvider();
            approve_iMigrator(provider, tokenContract, account, amountFormatted.toString(), network).then((status) => {
                if (status) setIsAllowed(2);
            });
        };
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
                            <h1>Migrate from participating V1 to V2 tokens instantly.</h1>
                            <p>All digital assets migrateable from V1 to V2 could pass through public migrations to avoid human errors or loss of contact with project operators. This utility has been specially engineered
                             by the top devs and tested to serve this purpose. 
                             iMigrator certified smart contracts are deployed with multi-chain, interoperability, and scaleability. 
                             Participating digital assets providers and projects operators deploy public iMigrators && designate reserves for holders to easily, smoothly migrate from V1 to V2 for example; in just a few simple steps.
                            </p>
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
                                className={MigratorClasses.cardHeader}
                                title="Migrate V1 to V2"
                            />
                            <CardContent >
                                <img src="/mylock.png" />
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        disabled={activeStep == 1}
                                        onChangeIndex={(e)=>handleStepChange(e)}
                                    >
                                       
                                        <div key={1} style={{paddingLeft:1, paddingRight:1}}>
                                            <p style={{textAlign:'center'}} color="textSecondary">
                                                Select V1 blockchain network where to migrate FROM.
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
                                                                <img className={MigratorClasses.networkImage} src={item.url} alt="network" />
                                                            </Grid>
                                                            <Grid item   xs={9} sm={10} md={10}>
                                                                <p  color="textSecondary" className={MigratorClasses.networkTitle}>
                                                                    {ui_friendly_networks[item.name]}
                                                                </p>
                                                                <p color="textSecondary" className={MigratorClasses.networkDes}>
                                                                    {item.subtitle}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item  className="text-center" xs={2} sm={1} md={1}>
                                                        {item.name==network ? <div style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#fff', display:'inline-block'}} /> :
                                                        <div style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #fff', display:'inline-block'}} />}
                                                    </Grid>
                                                </Grid>
                                                )
                                            : <></> }
                                        </div>
                                        <div id="iMigratorChange" key={2} style={{paddingLeft:1, paddingRight:1}}>
                                            <br />
                                             <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className={MigratorClasses.balanceContainer}
                                                style={{marginTop:"10%"}}
                                            >
                                                <Grid item className={MigratorClasses.textLeft} xs={6} sm={6} md={6}>
                                                    <TextField
                                                        id="standard-number-amount"
                                                        label="Migrate Amount"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1 } }}
                                                        variant="standard"
                                                        onChange={(e)=>handleLockAmount(e)}
                                                        value={migrateAmount}
                                                    />
                                                </Grid>
                                                <Grid item className={MigratorClasses.textRight}  xs={6} sm={6} md={6}>
                                                    <p style={{marginBottom:2, marginTop:0, fontSize: "10px"}}>
                                                        Balance: {(parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2)}
                                                    </p>
                                                    <Grid 
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Grid item className={MigratorClasses.textLeft} xs={6} sm={6} md={6}>
                                                            <Button variant="contained" color="error" sm={12} onClick={selectLockAmountMax}>Max</Button>
                                                        </Grid>
                                                        <Grid item className={MigratorClasses.textRight} xs={6} sm={6} md={6}>
                                                            <img style={{height:30}} src="/lock.png" alt="network" />
                                                            <p  color="textSecondary" className={MigratorClasses.tokenTitle}>
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
                                                    alignItems="center"
                                                    justify="center"
                                                >
                                                <Grid item xs={12} sm={12} md={12} justify="center" alignItems="center">
                                                  <br />
                                                    {
                                                        activeStep == 1 && isAllowed == 2 ? <Button variant="contained" color="secondary" xs={12} sm={12} md={12} style={{textAlign: 'center', paddingRight:1, paddingLeft: 1, marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', maxHeight:'100%', minWidth: '100%', minHeight: '100%'}}
                                                 onClick={()=>migrateAssets()} >Migrate</Button> : activeStep == 1 && isAllowed <= 1 ? <Button variant="contained" color="secondary" xs={12} sm={12} md={12} style={{textAlign: 'center', paddingRight:1, paddingLeft: 1, marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', maxHeight:'100%', minWidth: '100%', minHeight: '100%'}}
                                                 onClick={()=>approveToken()} >Approve</Button> : <></>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </SwipeableViews>
                                    <MobileStepper
                                        className={MigratorClasses.mobileStepper}
                                        steps={maxSteps}
                                        position="static"
                                        activeStep={activeStep}
                                        nextButton={
                                        activeStep < 1?<Button
                                            size="small"
                                            onClick={(e)=>handleStepChange(e)}
                                            disabled={activeStep >= 1?true:false}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                            ) : (
                                            <KeyboardArrowRight />
                                            )}
                                        </Button> : activeStep == 1 ?
                                        <Button
                                            size="small"
                                            onClick={()=>setActiveStep(0)}
                                            disabled={activeStep < 1?true:false}
                                        >
                                            Start Over
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                            ) : (
                                            <KeyboardArrowRight />
                                            )}
                                        </Button> : <></>
                                        }
                                        backButton={
                                        activeStep < 1?<Button size="small" onClick={handleBack} disabled={activeStep >= 1?true:false}>
                                            {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                            ) : (
                                            <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button> : <></>
                                    }
                                    />
                                </RadioGroup>
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

export default connect(mapStateToProps)(Migrations);