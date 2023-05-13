import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';
// ** Import Material UI Components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RadioGroup } from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled, createTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Router_address } from "../config/abi/router/dexRouter";
import { Factory_address } from "../config/abi/router/dexFactory";
import Search from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";
import useStyles from "../assets/styles";
import { TOKENDATA, USERBALANCE, TOKENLISTS } from "../redux/constants";
import { CHAINDATA, networks_data, explorer_, rpc_, icons_, network_, lockerAddress, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, websiteURI, ui_friendly_networks, iBridgeAddress, network_dec_to_hex, tokens_data } from "../constants";
import { deposit, approve, allowance, getTokenBalance, getERC20balance, getERC20allowance, getData, explorer, updateProfile, getEtherBalance, w3, getETHtoChecksum, _toBN, _getBN, _getUIfmt } from "../web3"
import { getTokenMetadata, getERC20Metadata } from "../api";
import MenuListSpecial from '../components/MenuListSpecial';
import { toggleDrawer } from '../components/Header';
import { alterLoaderText } from '../components/Loader';
import Loader from '../components/Loader';
import DateTime from '../components/DateTime';
import BridgeV2 from '../components/BridgeV2';
export let handle_dispatch;
export let handle_Date;
let Bridge = BridgeV2;   
export let chainHook;
const CrossChainV2 = (props) => {

    const { account, connector, chainId, active } = useWeb3React();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [lockerListEnabled, setLockerListEnabled] = useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [bridgeAddress, setBridgeAddress] = React.useState("");
    const [chainState, setChainState] = React.useState("");
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
    const [routerAddress, setRouterAddress] = useState("");
    const [factoryAddress, setFactoryAddress] = useState("");
    const [tokenAllowance, setTokenAllowance] = useState(0);
    const [token1, setToken1] = useState("");
    const [token2, setToken2] = useState("");
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
        tokenAddress: ""
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

    let checked = false;
    const checkEtherBalance = async (provider, account) => {
        if(!checked) {
            checked = true;
            getEtherBalance(provider, account, network).then(async (ebf) => {
                console.log("ethereumBalance: ", ebf[0], ebf[1], ebf[2]);
                fetchEtherBalance(ebf[2]);
            });
        };
    };

    async function chain_Hook(tokens_____) {
        let state_chain = {
            "chainId": chainId,
            "tokens": [tokens_____]
        };
        setChainState(state_chain);
    };
    chainHook = chain_Hook;
    let checked_all = false;
    async function start_(tokenContract, tokenDecimals) {
        if(!checked_all) {
            checked_all = true;
            let state_chain = {
                "chainId": chainId,
                "tokens": [{
                    "name": "FrenChain",
                    "address": tokens_data[network_[network_dec_to_hex[chainId]]][0].address,
                    "symbol": "FREN"
                }, tokens_data[network_[network_dec_to_hex[chainId]]][0]],
                "symbol": "FREN"
            };
            console.log("tokens_data: ", tokens_data[network_[network_dec_to_hex[chainId]]][0].address);
            let provider = await connector.getProvider();
            const tokenBalance = await getTokenBalance(provider, tokenContract, account, network);
            let data_ = await _getUIfmt(tokenBalance.toString(), parseFloat(tokenDecimals));
            // eslint-disable-next-line
            console.log("tokenBalance: ", tokenBalance, data_, (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
            // eslint-disable-next-line
            window.alert("Token Found! Balance: " + (parseFloat(tokenBalance) / Math.pow(10, parseFloat(tokenDecimals))).toFixed(2));
            dispatch({ type: USERBALANCE, payload: tokenBalance });
        }
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
        } else if (account && network && chainId && !tokenContract) {
            setIsAllowed(0);
            console.log("tokens_data: ", [network_[network_dec_to_hex[chainId]]][0].address);
            alterLoaderText("Make a selection");
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

    const handleDispatch = (d) => {
        dispatch({ type: TOKENLISTS, payload: d });
    };
    handle_dispatch = handleDispatch;

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
        setActiveStep(step);
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
        console.log("DATETIME (dashboard): ", value, value > currentDate)
        if (value > currentDate) {
            setDateUseful(true);
            setWithdrawDate(value);
        } else {
            setDateUseful(false);
        };
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
        <Container className={classes.root} maxWidth="fluid" style={{margin:'auto', backgroundColor: "green", width: "100 vw", height: "100 vh", background: "linear-gradient(45deg, rgba(12,38,16,1) 0%, rgba(6,23,11,0.9948354341736695) 20%, rgba(17,38,21,1) 64%, rgba(0,0,0,1) 100%)"}}>
            <Bridge token1={token1} token2={token2} setToken1={setToken1} setToken2={setToken2} chainState={chainState?chainState:{"tokens":[{},{}]}}setChainState={setChainState} /> 
        </Container>
    )
}
const mapStateToProps = state => ({
    statistics: state.statistics,
})

export default connect(mapStateToProps)(CrossChainV2);