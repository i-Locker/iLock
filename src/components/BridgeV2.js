import React, { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Button,
    Paper,
    CardHeader,
    Input,
    Chip,
    Avatar,
    Alert,
    Collapse,
    Card,
    RadioGroup,
    CardContent
} from '@mui/material';
import Web3 from 'web3';
import SwipeableViews from 'react-swipeable-views';
import Cwallet from "../assets/constants/Cwallet";
import { CustomTab } from '../config/style';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import List from '@mui/material/List';
import { useNavigate } from "react-router-dom"
import LoopIcon from '@mui/icons-material/Loop';
import ListSubheader from '@mui/material/ListSubheader';
import { useEagerConnect, useInactiveListener } from "../hooks";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { fetch_Balance, get_iVault_Quote_EthToToken, get_iVault_Quote_TokenToEth, calculateSuggestedDonation, getEtherBalance, allowance, bridgeToken, w3, approve_Token } from "../web3";
import { erc20Abi, network_lower_to_proper, iBridgeAbi, CHAINDATA, networks_data, explorer_, rpc_, icons_, network_, lockerAddress, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, wrappedAddress, websiteURI, ui_friendly_networks, network_dec_to_hex, tokens_data, iBridgeAddress } from "../constants";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChainATokens from './ChainATokens';
import './swap.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Elevate from './Elevated';
import { coreAdjust } from './Elevated';
import MenuListSpecial from './MenuListSpecial';
import useStyles from '../assets/styles';
import fren from '../assets/img/common/fren.svg';
import { styled, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export let baseFee = async function() {
  //
}
let approveToken = approve_Token;
const SwapButton = styled(Button)(() => ({
    width: "100%",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    borderRadius: "12px",
    background: "linear-gradient(100.22deg, #34F14B 0%, #139F24 100%)"
}));
let SwapPaper = styled(Paper)(() => ({
    margin: "99px 0 0"
}));
let GridLeaderMin = styled(Grid)(() => ({
    alignItems:'center',
    textAlign:'center',
    fontSize: '.375rem',
    padding: 'auto',
    height:'100%',
    maxHeight:'93%',
    maxWidth: '98%',
    minWidth: '50%',
    width: '100%',
    margin: 'auto'
}));
let GridLeader = styled(Grid)(() => ({
    alignItems:'center',
    textAlign:'center',
    maxHeight:'93%',
    height:'100%',
    maxWidth: '100%',
    marginTop:40
}));
let BasicStack = styled(Stack)(() => ({
    margin: 'auto'
}));
let FlexibleContainer = styled(Stack)(() => ({
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
    margin: 'auto'
}));
export default function BridgeV2({ token1, token2, setToken1, setToken2, chainState, setChainState }) {
    const { active, account, connector, chainId } = useWeb3React();
    const [swapTabValue, setSwapTabValue] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const [tokenDialogState, setTokenDialogState] = React.useState(false);
    const [poolCreateDialogState, setPoolCreateDialogState] = React.useState(false);
    const [swapSettingDialogState, setSwapSettingDialogState] = React.useState(false);
    const [token1Balance, setToken1Balance] = React.useState(0);
    const [token2Balance, setToken2Balance] = React.useState(0);
    const [swapSelectData, setSwapSelectData] = React.useState(0);
    const [etherBalance, setEtherBalance] = React.useState(0);
    const [bridgeAmount, setBridgeAmount] = React.useState(0);
    const [swapBtnState, setSwapBtnState] = React.useState(0);
    const [pools, setPools] = React.useState([]);
    const [maxAmount, setMaxAmount] = React.useState(0);
    const [importAlert, setImportAlert] = React.useState({ state1: false, state2: "success", data: "" });
    const [network, setNetwork] = React.useState("");
    const [chainA, setChainA] = useState("");
    const [chainB, setChainB] = useState("");
    const [modalTitle, setModalTitle] = React.useState("");
    const [modalDes, setModalDes] = React.useState("");
    const [swapSelectState, setSwapSelectState] = React.useState("");
    const [tokenContract, setTokenContract] = React.useState("");
    const [swappingAmount, setSwappingAmount] = React.useState(0);
    const [addressDemand, setAddressDemand] = React.useState(false);
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);

    const web3 = new Web3(window.ethereum);
    const BN = web3.utils.BN;
    const networkData = networks_data;
    const isMobile = useMediaQuery('(max-width:768px)');
    const isTiny = useMediaQuery('(max-width:374px)');

    const classes = useStyles.base();
    const V2_classes = useStyles.footer();
    const dashboardClasses = useStyles.dashboard();
    const triedEager = useEagerConnect();

    baseFee = async function(rate) {
      console.log("rate: ",rate);
      await setProcessingHandling(rate);
      return processingHandling;
    };

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
   
    useInactiveListener(!triedEager);
    
    async function token_Change(token1,token2) {
        let token_var = token1;
        setToken1(token2);
        setToken2(token_var);
        console.log("tokenChange: ",token1,token2);
    }

    const selectToken = async (data) => {
        if (tokenDialogState === 1) {
            if (data.address === token2.address) {
                setToken2(token1);
            }
            setToken1(data);
        } else if (tokenDialogState === 2) {
            if (data.address === token1.address) {
                setToken1(token2);
            }
            setToken2(data);
        }
    };

    const changeBridgeAmount = async(newValue) => {
        if (newValue != swappingAmount || parseFloat(newValue) != parseFloat(swappingAmount)) {
            console.log("changeBridgeAmount: ", parseFloat(newValue), swappingAmount, newValue, parseFloat(newValue) != parseFloat(swappingAmount), newValue != swappingAmount);
            if(parseFloat(newValue) > 0) {
                setSwapBtnState(4);
                let swapAmount = await setSwapping(newValue);
                console.log("setSwapping: ", swapAmount);
                return false;
            }
        }
    };

    const checkEtherBalance = async (provider, account) => {
        getEtherBalance(provider, account, network).then(async (ebf) => {
            console.log("ethereumBalance: ", ebf[0], ebf[1], ebf[2]);
            fetchEtherBalance(ebf[2]);
        });
    };

    const handleNext = async (activeStep, chain__A) => {
        console.log("activeStep: ", activeStep, chain__A);
        if (account&&chainId) {
            const provider = window.ethereum;
            checkEtherBalance(provider, account);
            let NETWORK = chainId == chain__A ? true : false;
            console.log("handleNext: ",chainId,chain__A,NETWORK,network_dec_to_hex[chainId]);
            try {
                console.log("NETWORK: ", NETWORK, "\n existing: ", chainId);
                if (NETWORK) {
                    console.log("You are already on the proper network:  ", network);
                } else {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: network_dec_to_hex[chainId] }],
                    });
                    console.log("You have successfully switched to ", network);
                }
                if (activeStep == 0) {
                    if (account === undefined) {
                        setModalTitle("Please connect Wallet");
                        setModalDes(`Before you can create a lock on ${network}, you must connect your wallet to ${network} network on your wallet. Use testnet for test transactions, and mainnet for real token locks.`);
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                } else if (activeStep >= 2) {
                    return;
                } else {
                    console.log("activeStep: ", activeStep);
                    if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                }
            } catch (switchError) {
                try {
                    const params_network_add = {
                        chainId: network_dec_to_hex[chainId],
                        rpcUrls: [rpc_[network_dec_to_hex[chainId]]],
                        chainName: network_[network_dec_to_hex[chainId]],
                        nativeCurrency: { name: network_symbols[network_dec_to_hex[chainId]], decimals: network_decimals[network_dec_to_hex[chainId]], symbol: network_symbols[network_dec_to_hex[chainId]] },
                        blockExplorerUrls: [explorer_[network_dec_to_hex[chainId]]],
                        iconUrls: [icons_[network_dec_to_hex[chainId]]]
                    };
                    console.log("params_network_add: ", switchError.code, params_network_add);
                    if (switchError.code === 4902) {
                        console.log("This network is not available in your metamask, please add it");
                        try {
                            let provider = await connector.getProvider();
                            console.log("Switch Request has rejected:", "\n network: ", network, "\n chainId:", chainId, network_dec_to_hex[chainId]);
                            provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [{ ...params_network_add }]
                            }).catch((error) => {
                                console.log("provider_err: ", error);
                            });
                        } catch(e) {
                            //
                        }
                    } else if (switchError.code === 4001) {
                        console.log("Switch Request has rejected:", "\n network: ", network, "\n chainId:", chainId, network_dec_to_hex[chainId]);
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    } else if (switchError.code === 4200) {
                        console.log("You have succefully switched to ", network);
                        if (activeStep == 0) {
                            if (account === undefined) {
                                setModalTitle("Please connect Wallet");
                                setModalDes(`Before you can bridge digital assets from ${network}, you must connect your wallet to ${network} network.`);
                            } else {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                        } else if (activeStep >= 1) {
                            return;
                        } else {
                            if (addressDemand && tokenContract == undefined || addressDemand && tokenContract == "") {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            } else {
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                        }
                    }
                } catch (e) {
                    console.log("err: ", e);
                }
            }
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        if(!account || !chainId) {
            event.preventDefault();
            return true;
        } else {
            if (addressDemand&&activeStep < 4 || !addressDemand&&activeStep < 3) {
                handleNext(step);
            };
        };
    };

    const fetchEtherBalance = (eb) => {
        setEtherBalance(eb);
    };

    const changeNetwork = (item) => {
        setNetwork(item.name);
        setChainA(network_hex_to_dec[item.chainData.chainId]);
        console.log("changeNetwork: ", chainA, network, item, network_hex_to_dec[item.chainData.chainId]);
        return handleNext(activeStep,network_hex_to_dec[item.chainData.chainId]);
    };

    async function set_Chain(chain__,chain__id) {
        let chain_state;
        console.log("networking: (fi) ", chain__,chain__id);
        switch(chain__) {
            case "A":
                chain_state = await setChainA(chain__id);
                break;
            case "B":
                chain_state = await setChainB(chain__id);
                break;
            default:
                break;
        }
        return chain_state;
    }

    async function chainA_Network(i_D) {
        return await set_Chain("A",network_hex_to_dec[i_D]);
    }

    async function chainB_Network(name, i_D) {
        console.log("chainB_Network: ", chainB);
        return await set_Chain("B",network_hex_to_dec[i_D]);
    }

    async function setSwapping(newValue) {
        let swapAmount = await setSwappingAmount(newValue);
        return swapAmount;
    }

    const tokenApprove = async () => {
        if(token1 && network) {
            let approve_amount = (new BN(maxAmount).mul(new BN(10).pow(new BN(token1.decimals)))).toString();
            try {
                let provider = await connector.getProvider();
                approveToken(provider, token1, account, iBridgeAddress[network], approve_amount).then(async (W3) => {
                    setSwapBtnState(4);
                });
                setSwapBtnState(5);
            } catch(e) {
                setSwapBtnState(6);
            }
        }
    }

    const tokenSwap = async () => {
        let bridgeAmount = (new BN(maxAmount).mul(new BN(10).pow(new BN(token2.decimals)))).toString();
        try {
            let provider = await connector.getProvider();
            w3(provider, network).then(async (W3) => {
                let block = await W3.eth.getBlock("latest");
                console.log("(w3) block: ", block);
                console.log("(w3) gasLimit: ", block.gasLimit);
                let gasLimit = block.gasLimit;
                bridgeToken(provider, token1.address, token1.address, token2.address, account, bridgeAmount, chainA, chainB, network, gasLimit).then(results =>{
                    if (!results) {
                        setSwapBtnState(5);
                    } else {
                        setSwapBtnState(5);
                        console.log("Results: ",results);
                    };
                });
            });
        } catch(e) {
            //
        };
        let deadline = new Date().valueOf() + 10000000;
        setSwapBtnState(6);
        setSwapBtnState(4);
    };
    const maxSteps = 3;
    let networking = [];
    const theme = useTheme();
    const mobileClasses = useStyles.mobile();
    const test_data = useSelector(state => state);
    const token = useSelector(state => state.tokenData);
    const data = useSelector(state => state.tokenLists);
    const userBalance = useSelector(state => state.userBalance);
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
        p: 4
    };

    const [values, setValues] = React.useState({
        tokenAddress: "",
    });

    return (<>
        <ThemeProvider theme={theme}>
                <Stack direction="column" sx={{ p: "0 5.2%" }} style={{maxHeight:"100%", height:'100%'}}>
                    <Grid container justifyContent="space-between">
                    {isTiny ? <GridLeaderMin item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Card className="card" style={{width: '100%', height:'100%'}}>
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Cross-Chain"
                            />
                            <CardContent>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={()=>handleStepChange(activeStep)}
                                    >
                                        <div key={1} style={{margin: 'auto'}}>
                                            <Typography color="textSecondary" sx={{ height: '100%', maxHeight: 50, minHeight: '100%', fontSize: '0.9rem', margin: 'auto', marginBottom: -3, textAlign:'center', wordWrap: 'break-word', maxWidth: '88%'}}>
                                                Select Chain A blockchain network.
                                            </Typography>
                                            {
                                                networkData ? networkData.map((item)=>
                                                <Grid
                                                    className={classes.networkSelector}
                                                    container
                                                    direction="row"
                                                    justifyContent="space-evenly"
                                                    alignItems="center"
                                                    spacing={5}
                                                    style={{margin: 'auto', textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                                    value={item.chainData.chainId}
                                                    key={item.name}
                                                    onClick={()=>changeNetwork(item)} 
                                                >
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{margin: 'auto', paddingLeft:1, paddingRight:1, textAlign:'center', wordWrap: 'break-word', alignItems: 'center', maxWidth: '88%'}}>
                                                        <Grid 
                                                            container
                                                            direction="row"
                                                            alignItems="center"
                                                        >
                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{margin: 'auto', padding: 5, wordWrap: 'break-word', textAlign:'center', alignItems: 'center' }}>
                                                                <div style={{padding:6}}>
                                                                    <img className={dashboardClasses.networkImage} src={item.url} alt="network" />
                                                                </div>
                                                                <p color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                    {ui_friendly_networks[item.name]}
                                                                </p>
                                                                <p color="textSecondary" sx={{wordWrap: 'break-word'}} className={dashboardClasses.networkDes}>
                                                                    {item.subtitle}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                        {item.name==network ? <div value={chainA} style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#fff', display:'inline-block'}} /> : <div value={chainA} style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #fff', display:'inline-block'}} />}
                                                    </Grid>
                                                </Grid>
                                                )
                                            : <></> }
                                        </div>
                    <div key={2} style={{paddingLeft:1, paddingRight:1,maxHeight:"800px",height:"44%"}}>
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} item={true} container direction="column" alignItems="center" style={{textAlign:'center', alignItems:'center', borderColor: "white"}} >
                            <Collapse in={importAlert.state1} sx={{ mb: "-50px", mt: "50px" }}>
                                <Alert variant="filled" severity={importAlert.state2} sx={{ mb: 2 }}>{importAlert.data}</Alert>
                            </Collapse>
                            <SwapPaper variant='outlined' sx={{ background: "#191919", marginBottom: "-60%", margin: "auto", padding: 1, borderRadius: "12px", maxWidth: "100%", width: "100%", maxHeight: "100%", height: "100%", textAlign:'center', alignItems:'center'}}>
                                <Box sx={{ m: "0 8% 25px" }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Stack direction="row" justifyContent="space-between" sx={{ width: "45%", maxWidth: "200px" }} spacing={1}>
                                                <CustomTab text={["iBridge"]} padding={20} tabValue={swapTabValue} setTabValue={setSwapTabValue} position={"top"} />
                                            </Stack>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p style={{margin:'auto', alignItems:"center"}}>
                                                Select Chain B (Receiving Chain)
                                            </p>
                                        </Stack>
                                        <Box m={3} sx={{ minWidth: 120 }}>
                                            <List
                                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                                component="nav"
                                                fullwidth="true"
                                                menuprops={{
                                                  PaperProps: {
                                                    sx: {
                                                      bgcolor: 'green',
                                                      '& .MuiMenuItem-root': {
                                                        padding: 2,
                                                      },
                                                    },
                                                  },
                                                }}
                                                aria-labelledby="nested-list-subheader"
                                                subheader={
                                                  <ListSubheader component="div" id="nested-list-subheader">
                                                    Compatible Networks
                                                  </ListSubheader>
                                                }
                                              > 
                                                { networkData ? <MenuListSpecial items={networkData} setItems={setChainB} chainB_Networks={chainB_Network} chainB={chainB} sx={{textAlign:"center"}} />
                                                : <></> }
                                            </List>
                                        </Box>
                                    {!isMobile&&swapTabValue === 0 && <FlexibleContainer direction="column" alignItems="center" style={{maxHeight:"1200px",height:"44%"}}>
                                            <Paper sx={{ margin: "auto", width: "100%", background: "#101010", borderRadius: "12px", minHeight: "225px", padding: 2 }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <p style={{margin:'auto', alignItems:"center", padding: "2%"}}>
                                                            Chain A
                                                        </p>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}></Typography>
                                                    </Stack>
                                                    <Stack direction="row" alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74", padding: "1%" }}>From: {token1.name?token1.name:""} </Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                            <ChainATokens token={token1&&token1} setToken={setToken1} />
                                                       <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                    {
                                                        active ? <Box sx={{ verticalAlign: "center", width: "88.8%", marginLeft: "auto", marginRight: "auto", padding: 2, textAlign: 'center', alignItems:'center' }} >
                                                                {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Amount to Bridge</Typography></SwapButton>}
                                                                {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography></SwapButton>}
                                                                {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography></SwapButton>}
                                                                {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography></SwapButton>}
                                                                {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Approve usage of {token1.symbol}</SwapButton>}
                                                                {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>Transport</SwapButton>}
                                                                {swapBtnState === 6 && <SwapButton disabled={true}>Loading...</SwapButton>}
                                                                {swapBtnState === 7 && <SwapButton disabled={true}>TRANSPORT SUCCESS...</SwapButton>}
                                                            </Box>
                                                            : <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                                    }
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B", padding: "2%" }}>
                                                <br />
                                            </Stack>
                                            <Paper sx={{ margin: "auto", width: "100%", background: "#101010", borderRadius: "12px", minHeight: "275px", height: "100%", padding: 2  }}>
                                                <Stack direction="column" sx={{ p: "12px 24px", minHeight: "280px" }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <p style={{margin:'auto', alignItems:"center"}}>
                                                            Chain B 
                                                        </p>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px" }}></Typography>
                                                    </Stack>
                                                    <Stack direction="row" alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74", padding: "1%" }}>To: {token1.name?token1.name:""} </Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "100%" }} />
                                                    </Stack>
                                                </Stack>
                                            </Paper>                                            
                                        </FlexibleContainer>
                                    }
                                    {isMobile&&swapTabValue === 0 && <BasicStack direction="column" alignItems="center" style={{maxHeight:"1200px",height:"44%"}}>
                                            <Paper sx={{ width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>Origin: {`${chainA}`}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                            <ChainATokens token={token1&&token1} setToken={setToken1} />
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:""}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <Paper sx={{ margin: "0 0 24px", width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#7E8B74" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>Destination Chain ID: {`${chainB !== "" ? chainB : "Select Destination Chain"}`}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:""}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <Box component="ul" sx={{textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                <CardContent>
                                                {
                                                    active ?
                                                        <Box sx={{ width: "100%", textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                            {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Amount to Bridge</Typography>
                                                            </SwapButton>}
                                                            {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography>
                                                            </SwapButton>}
                                                            {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography>
                                                            </SwapButton>}
                                                            {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography>
                                                            </SwapButton>}
                                                                {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Approve usage of {token1.symbol}
                                                            </SwapButton>}
                                                            {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>
                                                                Transport
                                                            </SwapButton>}
                                                            {swapBtnState === 6 && <SwapButton disabled={true}>
                                                                Loading...
                                                            </SwapButton>}
                                                            {swapBtnState === 7 && <SwapButton disabled={true}>
                                                                TRANSPORT SUCCESS...
                                                            </SwapButton>}
                                                        </Box>
                                                        :
                                                        <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                                }
                                                </CardContent>
                                            </Box>
                                        </BasicStack>
                                    }
                                </Box>
                            </SwapPaper>
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
                                    onClick={()=>handleStepChange(activeStep)}
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
                      </GridLeaderMin> : 
                      <GridLeader item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} style={{width: '100%', maxHeight: '1500px', height: '75%', minHeight: '666px'}}>
                        <Card className="card" style={{width: '100%', height: '100%', minHeight: '666px'}}>
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Cross-Chain"
                            />
                            <CardContent
                                sx={{maxHeight: '1500px', height: '75%', minHeight: '666px'}}
                            >
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={()=>handleStepChange(activeStep)}
                                    >
                                        <div key={1} style={{margin: 'auto'}}>
                                                <Grid 
                                                    container
                                                    spacing={100}
                                                    alignItems="center"
                                                    className={classes.networkSelector}
                                                    justifyContent="space-evenly"
                                                    direction="row"
                                                    style={{margin: 'auto', paddingLeft:1, height: '100%', maxHeight: '100%', paddingRight:1, textAlign:'center', wordWrap: 'break-word', alignItems: 'center', maxWidth: '88%'}}
                                                >  
                                                    <Paper className={classes.paper}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                          <Paper className={classes.paper}>
                                                                <Typography color="textSecondary" sx={{ fontSize: '0.9rem', height: '80%', minHeight: 50, paddingTop: 2, margin: 'auto', textAlign:'center', wordWrap: 'break-word', width: '100%', maxWidth: '100%'}}>
                                                                    Select Chain A blockchain network.
                                                                </Typography>
                                                          </Paper>
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            className={classes.networkSelector}
                                                            style={{margin: 'auto',maxHeight: 1000, height: '60%', minHeight: 555, textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                                        >
                                                        { networkData ? networkData.map((item)=>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                item
                                                                className={classes.networkSelector}
                                                                xs={6} sm={4} md={3} lg={3} xl={4} xxl={4}
                                                                style={{margin: 'auto', textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                                                value={item.chainData.chainId}
                                                                key={item.name}
                                                                onClick={()=>changeNetwork(item)}
                                                            >
                                                                <Grid 
                                                                    item
                                                                    className={classes.networkSelector}
                                                                    xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                                                                    style={{margin: 'auto', textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                                                >
                                                                    <div style={{padding:6}}>
                                                                        <img className={dashboardClasses.networkImage} src={item.url} alt="network" />
                                                                    </div>
                                                                    <p color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                        {ui_friendly_networks[item.name]}
                                                                    </p>
                                                                    <p color="textSecondary" className={dashboardClasses.networkDes}>
                                                                        {item.subtitle}
                                                                    </p>
                                                                    <div style={{padding:6}}>
                                                                        {item.name==network ? <div value={chainA} style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#fff', display:'inline-block'}} /> : <div value={chainA} style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #fff', display:'inline-block'}} />}
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    : <></> }
                                                      </Grid>
                                                  </Paper>
                                                </Grid>
                                        </div>   
                    <div key={2} style={{paddingLeft:1, paddingRight:1,maxHeight:"1200px",height:"55%"}}>
                        <Grid xs={12} lg={12} md={12} item={true} container direction="column" alignItems="center" style={{textAlign:'center', alignItems:'center', borderColor: "white"}} >
                            <Collapse in={importAlert.state1} sx={{ mb: "-50px", mt: "50px" }}>
                                <Alert variant="filled" severity={importAlert.state2} sx={{ mb: 2 }}>{importAlert.data}</Alert>
                            </Collapse>
                            <SwapPaper variant='outlined' sx={{ background: "#191919", marginBottom: "-60%", margin: "auto", padding: 1, borderRadius: "12px", maxWidth: "100%", width: "100%", maxHeight: "100%", height: "100%", textAlign:'center', alignItems:'center'}}>
                                <Box sx={{ m: "0 8% 25px" }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Stack direction="row" justifyContent="space-between" sx={{ width: "45%", maxWidth: "200px" }} spacing={1}>
                                                <CustomTab text={["iBridge"]} padding={20} tabValue={swapTabValue} setTabValue={setSwapTabValue} position={"top"} />
                                            </Stack>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p style={{margin:'auto', alignItems:"center"}}>
                                                Select Chain B (Receiving Chain)
                                            </p>
                                        </Stack>
                                        <Box m={3} sx={{ minWidth: 120 }}>
                                            <List
                                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                                component="nav"
                                                fullwidth="true"
                                                menuprops={{
                                                  PaperProps: {
                                                    sx: {
                                                      bgcolor: 'green',
                                                      '& .MuiMenuItem-root': {
                                                        padding: 2,
                                                      },
                                                    },
                                                  },
                                                }}
                                                aria-labelledby="nested-list-subheader"
                                                subheader={
                                                  <ListSubheader component="div" id="nested-list-subheader">
                                                    Compatible Networks
                                                  </ListSubheader>
                                                }
                                              > 
                                                { networkData ? <MenuListSpecial items={networkData} setItems={setChainB} chainB_Networks={chainB_Network} chainB={chainB} sx={{textAlign:"center"}} />
                                                : <></> }
                                            </List>
                                        </Box>
                                    {!isMobile&&swapTabValue === 0 &&  <FlexibleContainer xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} direction="column" alignItems="center" style={{maxHeight:"1200px",height:"44%"}}>
                                            <Grid 
                                                item
                                                direction="row"
                                                className={classes.networkSelector}
                                                xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}
                                                style={{margin: 'auto', textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                            >   
                                                {chainB!==""?<Elevate token1={token1} token2={token2} chainA={chainA} chainB={chainB} bridgeAmount={bridgeAmount} /> :
                                                
                                                <LoopIcon sx={{ position: 'relative', top: '-10%', animation: "spin 2s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(360deg)", },"100%": { transform: "rotate(0deg)", }, }, }} />}
                                            </Grid>   
                                            <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B", padding: "2%" }}>
                                                <br />
                                            </Stack>
                                                <Grid 
                                                    item
                                                    direction="row"
                                                    className={classes.networkSelector}
                                                    xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}
                                                    style={{margin: 'auto', textAlign:'center', wordWrap: 'break-word', maxWidth:'100%'}}
                                                >
                                                    <Stack alignItems="center" direction="column" sx={{ marginTop: "-12px", zIndex: "5", width: "100%" }}>
                                                        <Stack direction="column" alignItems="center" sx={{ p: "14px 8px", width: "100%", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                <Paper sx={{ margin: "auto", width: "100%", background: "#101010", borderRadius: "12px", minHeight: "225px", padding: 2 }}>
                                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                        <p style={{margin:'auto', alignItems:"center", padding: "2%"}}>
                                                                            Chain A
                                                                        </p>
                                                                    </Stack>
                                                                    <Stack direction="row" justifyContent="space-between">
                                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}></Typography>
                                                                    </Stack>
                                                                    <Stack direction="row" alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                                            :
                                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                                    </Stack>
                                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                                            <ChainATokens token={token1&&token1} setToken={setToken1} />
                                                                       <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                                    </Stack>
                                                                    <Typography sx={{ fontSize: "14px" }}><br/></Typography>
                                                                    <Typography sx={{ fontSize: "14px" }}><br/></Typography>
                                                                    <Typography sx={{ fontSize: "14px" }}><br/></Typography>
                                                                    <Typography sx={{ fontSize: "14px" }}><br/></Typography>
                                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                        <p style={{margin:'auto', alignItems:"center"}}>
                                                                            Chain B 
                                                                        </p>
                                                                    </Stack>
                                                                    <Stack direction="row" justifyContent="space-between">
                                                                        <Typography sx={{ fontSize: "14px" }}></Typography>
                                                                    </Stack>
                                                                    <Stack direction="row" alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                                            :
                                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                                    </Stack>
                                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "100%" }} />
                                                                    </Stack>
                                                                </Stack>
                                                                </Paper>
                                                            </Stack>
                                                        </Stack>
                                                        <Chip 
                                                            size='small' 
                                                            label='Confirm Transaction' 
                                                            sx={{ color: "white", zIndex: "4", background: "#37AF43", borderRadius: "10px 10px 10px 0px" }} 
                                                        />
                                                        <Paper sx={{ margin: "auto", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }} onClick={() => setSwapSelectData(0, setSwapSelectState(false))}>
                                                            <Stack direction="column" alignItems="center" sx={{ p: "14px 8px", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                    <Typography 
                                                                        sx={{ fontSize: "14px", color: `${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}` }}
                                                                    />
                                                                        <CardContent>
                                                                        {
                                                                            active ?
                                                                                <Box sx={{ width: "100%", textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                                                    {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                        <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Enter an Amount</Typography>
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                        <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography>
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                        <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography>
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                        <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography>
                                                                                    </SwapButton>}
                                                                                        {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Approve usage of {token1.symbol}
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>
                                                                                        Transport
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 6 && <SwapButton disabled={true}>
                                                                                        Loading...
                                                                                    </SwapButton>}
                                                                                    {swapBtnState === 7 && <SwapButton disabled={true}>
                                                                                        TRANSPORT SUCCESS...
                                                                                    </SwapButton>}
                                                                                </Box>
                                                                                :
                                                                                <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                                                        }
                                                                        </CardContent>
                                                                </Stack>
                                                            </Stack>
                                                        </Paper>
                                                    </Stack>            
                                                </Grid>                             
                                        </FlexibleContainer>
                                    }
                                    {isMobile&&swapTabValue === 0 && <BasicStack direction="column" alignItems="center" style={{maxHeight:"2000px",height:"66.6%"}}>
                                            <Paper sx={{ margin: "-12px 0 8px", width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>Origin: {`${ui_friendly_networks[network_[network_dec_to_hex[chainA.toString()]]]}`}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                            <ChainATokens token={token1&&token1} setToken={setToken1} />
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:""}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <Typography justifyContent="space-between">
                                                <br />
                                            </Typography>
                                            <Paper sx={{ margin: "-12px 0 8px", width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#7E8B74" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>Destination: {`${chainB !== "" ? ui_friendly_networks[network_[network_dec_to_hex[chainB.toString()]]] : ""}`}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => changeBridgeAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Typography sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):""}</Typography>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:""}</Typography>
                                                    </Stack>
                                                   
                                                </Stack>
                                            </Paper>
                                            <Stack alignItems="center" sx={{ marginTop: "-12px",marginBottom: "-3%", zIndex: "3", width: "100%" }}>
                                                <Chip 
                                                    size='small' 
                                                    label='Confirm Transaction' 
                                                    sx={{ color: "white", zIndex: "4", background: "#37AF43", borderRadius: "10px 10px 10px 0px" }} 
                                                />
                                                <Paper sx={{ margin: "-12px 0 8px", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }} onClick={() => setSwapSelectData(0, setSwapSelectState(false))}>
                                                    <Stack direction="column" alignItems="center" sx={{ p: "14px 8px", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                            <Typography 
                                                                sx={{ fontSize: "14px", color: `${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}` }}
                                                            />
                                                                <CardContent>
                                                                {
                                                                    active ?
                                                                        <Box sx={{ width: "100%", textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                                            {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Amount to Bridge</Typography>
                                                                            </SwapButton>}
                                                                            {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography>
                                                                            </SwapButton>}
                                                                            {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography>
                                                                            </SwapButton>}
                                                                            {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}>
                                                                                <Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography>
                                                                            </SwapButton>}
                                                                                {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Approve usage of {token1.symbol}
                                                                            </SwapButton>}
                                                                            {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>
                                                                                Transport
                                                                            </SwapButton>}
                                                                            {swapBtnState === 6 && <SwapButton disabled={true}>
                                                                                Loading...
                                                                            </SwapButton>}
                                                                            {swapBtnState === 7 && <SwapButton disabled={true}>
                                                                                TRANSPORT SUCCESS...
                                                                            </SwapButton>}
                                                                        </Box>
                                                                        :
                                                                        <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                                                }
                                                                </CardContent>
                                                        </Stack>
                                                    </Stack>
                                                </Paper>
                                            </Stack>
                                        </BasicStack>
                                    }
                                </Box>
                            </SwapPaper>
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
                                            onClick={()=>handleStepChange(activeStep)}
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
                      </GridLeader>}
                    </Grid>
                </Stack>
            </ThemeProvider>  
            <Cwallet isOpenDialog = { isOpenDialog } setIsOpenDialog = { setIsOpenDialog } chain = { chainState } setChain = { setChainState } tokenDialogState = { tokenDialogState } setTokenDialogState = { setTokenDialogState } selectToken = { selectToken } swapSettingDialogState = { swapSettingDialogState } setSwapSettingDialogState = { setSwapSettingDialogState } poolCreateDialogState = { poolCreateDialogState } setPoolCreateDialogState = { setPoolCreateDialogState } setPools = { setPools } setImportAlert = { setImportAlert }/> 
        </>
    );
}