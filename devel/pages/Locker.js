import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useWeb3React} from "@web3-react/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import CheckIcon from '@mui/icons-material/Check';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, IconButton } from "@mui/material";
{/*
    // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
    // import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
*/}
import Link from "@mui/material/Link";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";
import useStyles from "../assets/styles";
import { TOKENDATA, USERBALANCE, TOKENLISTS } from "../redux/constants";
import { CHAINDATA, networks_data } from "../constants";
import { getTokenMetadata } from "../api";
import { deposit, approve, allowance, getTokenBalance, getData, lockerAddress, explorer } from "../web3"

const Dashboard = (props) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [network, setNetwork] = useState("Frenchain");
    const [modalTitle, setModalTitle] = useState("");
    const [tokenContract, setTokenContract] = useState("");
    const [modalDes, setModalDes] = useState("");
    const [subMethod, setSubMethod] = useState("Project Tokens"); 
    const [lockAmount, setLockAmount] = useState(0);
    const [tokenDecimals, setTokenDecimals] = useState(0);
    const [withdrawDate, setWithdrawDate] = useState(undefined);
    const [dateUseful, setDateUseful] = useState(false);
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
    console.log("test_data: ",test_data,test_data.tokenData);
    const dispatch = useDispatch();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        borderRadius:'10px',
        boxShadow: 24,
        p: 4,
    };

    const { account, connector } = useWeb3React();

    const [values, setValues] = React.useState({
        tokenAddress:"",
    });

    const selectToken = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleNext = async () => {
        const provider = window.ethereum;
        const currentNetworkData = networkData.filter((each)=>each.name === network);
        try {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: currentNetworkData[0].chainData.chainId}],
            });
            console.log("You have succefully switched to ",network)
            if (activeStep == 0) {
                if (account === undefined) {
                    setModalTitle("Please connect Wallet");
                    setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                    handleOpen();
                }else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            }else if(activeStep == 2) {
                if (tokenContract == undefined) {
                    setModalTitle("Please select Token");
                    setModalDes(`Before you can create a lock on ${network}, you must select token on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                    handleOpen();
                }else {
                    console.log(activeStep);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } catch (switchError) {
                {/*
                    // This error code indicates that the chain has not been added to MetaMask.
                */}
            if (switchError.code === 4902) {
             console.log("This network is not available in your metamask, please add it");
             provider
                .request({
                    method: 'wallet_addEthereumChain',
                    params: [{...currentNetworkData[0].chainData}]
                })
                .catch((error) => {
                    console.log(error)
                })
            } else if (switchError.code === 4001) {
                console.log("Switch Request has rejected");
            };
        };
    };

    useEffect(() => {
        if (!account) return;
        if (!network) return;
        if (!TOKENLISTS) return;
        try {
            // eslint-disable-next-line
            getData(account, network).then(newData => {
                if (!newData) return;
                if (!TOKENLISTS) return;
                try {
                    dispatch({type:TOKENLISTS, payload: newData});
                } catch(e) {
                    console.log(e);
                };
            });
            // eslint-disable-next-line
            const interval = setInterval(() => { 
                getData(account, network).then(newData => {
                    try {
                        if (!newData) return;
                        if (!TOKENLISTS) return;
                        dispatch({type:TOKENLISTS, payload: newData});
                    } catch(e) {
                        console.log(e);
                    };
                });
            }, 5000);
            return () => clearInterval(interval);
        } catch(e) {
            console.log(e);
        };
    }, [account, network]);

    useEffect(async () => {
        setIsAllowed(0);
        if (!account || !tokenContract) return;
        try {
            const tokenBalance = await getTokenBalance(tokenContract, account, network);
            dispatch({type:USERBALANCE, payload: tokenBalance});
        } catch(e) {
            console.log(e);
        } finally { 
            try {
                const allowanceAmount = await allowance(tokenContract, account, network);
                // eslint-disable-next-line
                if (allowanceAmount < 115792089237316195423570985008687907853269984665640564039457584007913129639935) {
                    setIsAllowed(1);
                } else { 
                    setIsAllowed(2);
                };
            } catch(e) {
                console.log(e);
            };
        };
    }, [account, tokenContract, connector, network, allowance, getTokenBalance]);

    const handleChange = async (event) => {
        setValues({ tokenAddress: event.target.value });
        if (event.target.value.length == 42) {
            const address = event.target.value;
            try {
                const tokenData = await getTokenMetadata(CHAINDATA.find((item)=>item.name==network).chain, address);
                dispatch({
                    type:TOKENDATA,
                    payload: tokenData[0]
                });
            } catch(e) {
                dispatch({
                    type:TOKENDATA,
                    payload: {}
                });
            };
        }else {
            dispatch({
                type:TOKENDATA,
                payload: {}
            });
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
        setActiveStep(step);
    };

    const selectLockAmountMax = () => {
        const _amount = (test_data.userBalance / Math.pow(10, tokenDecimals));
        console.log("_amount: ",_amount);
        setLockAmount(_amount);
        setLockAmountMax(true);
    }
    const handleLockAmount = (e) => {
        console.log("e.target.value: ",e.target.value)
        setLockAmount(parseFloat(e.target.value));
        setLockAmountMax(false);
    };
    const handleTokenDecimals = (e) => {
        console.log("balance: ",test_data.userBalance / Math.pow(10, e.target.value));
        setTokenDecimals(parseFloat(e.target.value));
    };
    const handleLockToken = (e) => {
        setTokenContract(document.getElementById("outlined-adornment-password").value);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbar(false);
    const handleSnackbarOpen = () => setSnackbar(true);

    const handleDate = (value) => {
        const currentDate = new Date();
        console.log("DATETIME: ",value,value > currentDate)
        if (value > currentDate) {
            setDateUseful(true);
            setWithdrawDate(value);
         } else {
            setDateUseful(false);
        };
    }

    const depositToken = async (lockAmount) => {
        try {
            let tokenAmount;
                console.log("lockAmount: ",lockAmount);
                tokenAmount = lockAmount;
            let unlockDate = withdrawDate;
            let provider = await connector.getProvider();
            deposit(provider, tokenContract, tokenAmount, unlockDate, account, network).then(async (status) => {
                const newData = await getData(account);
                dispatch({type:TOKENLISTS, payload: newData});
                setActiveStep(0);
                dispatch({
                    type:TOKENDATA,
                    payload: {}
                })
                setWithdrawDate(undefined);
                setDateUseful(false);
            });
        } catch(e) {
            console.log(e);
        };
    }

    const approveToken = async () => {
        let provider = await connector.getProvider()
        approve(provider, tokenContract, account, network).then((status) => {
            if (status) setIsAllowed(2);
        });
    }

    const showLockup = async (tokenAddress) => {
        props.history.push(`/lockup/${account}/${tokenAddress}`);
    }

    const networkData=networks_data;

    const changeNetwork = (name) => {
        setNetwork(name);
        dispatch({
            type:TOKENDATA,
            payload: {}
        })
    }

    const Row = (props) => {
        const { index, row } = props;
        let nextUnlock, lockedTokenAmount = 0, lockedLiquidity = false;
        const currentTime = Date.now();
        row.data.map(each => {
            if (each.timestamp > currentTime / 1000) {
                if (!nextUnlock) nextUnlock = each.timestamp;
                else if (nextUnlock > each.timestamp) nextUnlock = each.timestamp;
            }
            if (!each.isWithdrawn && !each.isLiquidity) lockedTokenAmount += each.amount / Math.pow(10, each.decimals);
            if (!each.isWithdrawn && each.isLiquidity) lockedLiquidity = true;
        })
        
        return (
            <>
                <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
                > 
                    <TableCell>
                        {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <span style={{cursor: "pointer"}} onClick={()=>showLockup(row.token.address)}>{row.token.symbol}</span>
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
                        <Button variant="contained" color="secondary" style={{width: '100%'}}  onClick={() => showLockup(row.token.address)}>View</Button>
                    </TableCell>
                </TableRow>
                {/* <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Withdrawable Date</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {row.vesting.map((vestingRow) => (
                                    <TableRow key={vestingRow[0]}>
                                        <TableCell component="th" scope="row">
                                            {new Date(vestingRow[0] * 1000).toDateString()}
                                        </TableCell>
                                        <TableCell align="right">{(vestingRow[1] / Math.pow(10, row.decimals)).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                    </TableCell>
                </TableRow> */}
            </>
        )
    }
    return (
        <Container className={classes.root} maxWidth="lg" style={{paddingLeft:20, paddingRight:20}}>
            <Box className={classes.info}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                    <Grid className={isMobile ? `${mobileClasses.root} grid text-center`  : "grid text-center"} style={{marginTop:40}} item xs={12} sm={12} md={6} >
                        <div style={{maxWidth:400, display:'inline-block', textAlign:'left'}}>
                            <h1>Create your own custom token lock instantly.</h1>
                            <p>All digital assets are locked into a TimeLock enabled smart contract which has been specially engineered and tested to serve this purpose. TimeLock certified digital assets can only be withdrawn after the preset time lock expires.</p>
                            <Link
                                href={`https://locker.interchained.org`}
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
                                title="Create New Lock"
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
                                        onChangeIndex={handleStepChange}
                                    >
                                       
                                        <div key={1} style={{paddingLeft:1, paddingRight:1}}>
                                            <p style={{textAlign:'center'}} color="textSecondary">
                                                Choose the blockchain network.
                                            </p>
                                            {
                                                networkData.map((item)=>
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
                                                                    {item.name}
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
                                            }
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
                                                onClick = {()=>setSubMethod(each.name)}
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
                                        <div key={3} style={{paddingLeft:1, paddingRight:1}}>
                                            <p className="text-center" color="textSecondary">
                                                Enter the token address you would like to lock for
                                            </p>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{width:'-webkit-fill-available'}}>
                                                <InputLabel htmlFor="outlined-adornment-password">Address</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type="text"
                                                    value={values.tokenAddress}
                                                    onChange={handleChange}
                                                    // onKeyDown={handleChange}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle search"
                                                        onClick={handleLockToken}
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
                                                tokenContract &&
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
                                                </div>
                                            }
                                            
                                        </div>
                                        <div key={4} style={{paddingLeft:1, paddingRight:1}}>
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
                                                        id="standard-number-decimals"
                                                        label="Token Decimals"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1,max: 18 } }}
                                                        variant="standard"
                                                        onChange={handleTokenDecimals}
                                                        value={tokenDecimals}
                                                    />
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
                                                        id="standard-number"
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
                                                    <p style={{marginBottom:2, marginTop:0, fontSize: "10px"}}>Balance: {(test_data.userBalance / Math.pow(10, tokenDecimals)).toFixed(2)}</p>
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
                                                className={!isMobile ? `${dashboardClasses.balanceContainer}` : `${mobileClasses.balanceContainer}`}
                                            >
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DateTimePicker
                                                            id="standard-number"
                                                            label="Unlock Date"
                                                            renderInput={(props) => <TextField {...props} className={isMobile ? `${mobileClasses.datetimepicker}` : ``} />}
                                                            value={withdrawDate}
                                                            onChange={(value) => handleDate(value)}
                                                        />
                                                    </LocalizationProvider>
                                                    <div>
                                                    {
                                                        isAllowed == 2 ? <Button variant="contained" color="secondary" sm={12} disabled={!dateUseful} onClick={depositToken} className={isMobile ? `${mobileClasses.button}` : ``}>Deposit</Button>
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
                    <Grid className={isMobile ? `${mobileClasses.root} grid `  : "grid"} style={{marginTop:40}} item xs={12} sm={12} md={12} >
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

export default connect(mapStateToProps)(Dashboard);
