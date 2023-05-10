import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Button,
    Paper,
    FormControl,
    InputLabel,
    CardHeader,
    Input,
    IconButton,
    Chip,
    Avatar,
    Alert,
    Collapse,
    AspectRatio,
    Card,
    RadioGroup,
    Divider,
    CardContent,
    CardOverflow,
    Link
} from '@mui/material';
import Web3 from 'web3';
import SwipeableViews from 'react-swipeable-views';
import Cwallet from "../assets/constants/Cwallet";
import { CustomTab } from '../config/style';
import { useTheme } from '@mui/material/styles';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// ** Import Material UI Components
import Container from "@mui/material/Container";
import { erc20Abi, network_lower_to_proper } from "../constants";
import { fetch_Balance, get_iVault_Quote_EthToToken, get_iVault_Quote_TokenToEth, calculateSuggestedDonation, getEtherBalance, allowance } from "../web3";
import { CHAINDATA, networks_data, explorer_, rpc_, icons_, network_, lockerAddress, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, websiteURI, ui_friendly_networks, network_dec_to_hex, tokens_data, iBridgeAddress } from "../constants";
import { getBalance } from "../config/app";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './swap.css';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useStyles from '../assets/styles';
import { Router_address } from "../config/abi/router/dexRouter";
import { Factory_address } from "../config/abi/router/dexFactory";
import fren from '../assets/img/common/fren.svg';
import Filter from '../assets/img/common/filter.png';
import Refresh from '../assets/img/common/refresh.png';
import { styled, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
const theme = createTheme({
    shape: {
        borderRadius: 16,
    },
    palette: {
        primary: {
            main: "#34F14B",
        },
        secondary: {
            main: '#191919',
        }
    }
});
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
let ActiveGrid = styled(Grid)(() => ({
    display: "none"
}));
let ActiveStack = styled(Stack)(() => ({
    display: "none"
}));
let BlockedDisplay = styled(Stack)(() => ({
    display: "none"
}));
let ActiveDisplay = styled(Stack)(() => ({
    display: "block"
}));
let BasicStack = styled(Stack)(() => ({
    margin: 'auto'
}));
let basicStyle = {
    padding: 1
};
let FlexibleContainer = styled(Stack)(() => ({
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
    margin: 'auto'
}));
export default function BridgeV2({ token1, token2, setToken1, setToken2, factoryAddress, routerAddress, setFactoryAddress, setRouterAddress, chainState, setChainState }) {
    const { active, account, chainId, connector } = useWeb3React();
    const [swapTabValue, setSwapTabValue] = useState(0);
    const [activeRate, setActiveRate] = useState(12);
    const [open, setOpen] = React.useState(false);
    const [bridgeAddress, setBridgeAddress] = React.useState("");
    const [activeStep, setActiveStep] = React.useState(0);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [tokenDialogState, setTokenDialogState] = useState(false);
    const [age, setAge] = React.useState('');
    const [poolCreateDialogState, setPoolCreateDialogState] = useState(false);
    const [swapSettingDialogState, setSwapSettingDialogState] = useState(false);
    const [pools, setPools] = useState([]);
    const [token1Balance, setToken1Balance] = useState(0);
    const [token2Balance, setToken2Balance] = useState(0);
    const [token3, setToken3] = useState('WETH');
    const [swapSelectState, setSwapSelectState] = useState(false);
    const [dexsOrder, setDexsOrder] = useState("");
    const [swapSelectData, setSwapSelectData] = useState(0);
    const [swapBtnState, setSwapBtnState] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const [importAlert, setImportAlert] = useState({ state1: false, state2: "success", data: "" });
    const [rateState, setRateState] = useState(0);
    const [slippage, setSlippage] = useState(1);
    const [chainB, setChainB] = useState("");
    const [chainA, setChainA] = useState("");
    const [network, setNetwork] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalDes, setModalDes] = useState("");
    const [tokenContract, setTokenContract] = useState("");
    const [holder, setHolder] = useState("");
    const [subMethod, setSubMethod] = useState("Project Tokens");
    const [bridgeAmount, setLockAmount] = useState(0);
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

    const web3 = new Web3(window.ethereum);
    const BN = web3.utils.BN;
    const networkData = networks_data;

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (importAlert) {
            setTimeout(function() {
                setImportAlert({ state1: false, state2: "success", data: "" });
            }, 5000);
        }
        if (chainId&&!bridgeAddress) {
            try {
                console.log("iBridgeAddress: ", iBridgeAddress[network_[network_dec_to_hex[chainId]]]);
                setBridgeAddress(iBridgeAddress[network_[network_dec_to_hex[chainId]]]);
                console.log("bridgeAddress: ", bridgeAddress);
            } catch (e) {
                console.log("e: ", e);
            };
        }
    }, [importAlert, bridgeAddress, chainId, account, connector, token1, token2]);

    useEffect(() => {
        setSwapSelectData(0);
        async function ____SWAP_ENGINE(chainState) {
            try {
                let select_router = await Router_address.find(data => (data.chainId === chainState.chainId)).dexs;
                let select_factory = await Factory_address.find(data => (data.chainId === chainState.chainId)).dexs;
                console.log(select_router);
                setRouterAddress(select_router);
                setFactoryAddress(select_factory);
                if (chainState.tokens[0].length > 0) {
                    axios.get(`https://api.dex.guru/v2/tokens/search/${chainState.tokens[0].address}?network=${chainState.symbol}`).then(res => {
                        if (res.data.data.length) {
                            console.log(res.data.data[0]);
                            setToken1(res.data.data[0]);
                        } else {
                            let pj1 = { "total": 1, "data": [{ "id": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth", "address": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a", "symbol": "FREN", "name": "FrenChain (ERC20)", "description": "FrenChain/FREN", "txns24h": 2, "txns24hChange": -0.5, "verified": true, "decimals": 18, "volume24h": 0.0, "volume24hUSD": 235.84081844012337, "volume24hETH": 0.12303964262357231, "volumeChange24h": 0.0, "liquidityUSD": 31783.183491244, "liquidityETH": 16.581487310242, "liquidityChange24h": 0.0, "logoURI": "https://assets-stage.dex.guru/icons/0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth.png", "priceUSD": 0.00021155709187981557, "priceETH": 1.1037066929948508e-07, "priceUSDChange24h": -0.036307376632898423, "priceETHChange24h": -0.007719123029520966, "timestamp": 1667493912, "blockNumber": 1, "AMM": "all", "network": "eth", "tokenListsNames": ["CoinGecko"], "marketCap": 0.0, "marketCapChange24h": 0.0, "liquidityUSDChange24h": -0.032555487289210386, "liquidityETHChange24h": -0.0038559326740329647, "volumeUSDChange24h": -0.9497107384650174, "volumeETHChange24h": -0.948233885660636 }] };
                            setToken1(pj1["data"][0]);
                        };
                    });
                };
            } catch (e) {
                let pj1 = { "total": 1, "data": [{ "id": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth", "address": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a", "symbol": "FREN", "name": "FrenChain (ERC20)", "description": "FrenChain/FREN", "txns24h": 2, "txns24hChange": -0.5, "verified": true, "decimals": 18, "volume24h": 0.0, "volume24hUSD": 235.84081844012337, "volume24hETH": 0.12303964262357231, "volumeChange24h": 0.0, "liquidityUSD": 31783.183491244, "liquidityETH": 16.581487310242, "liquidityChange24h": 0.0, "logoURI": "https://assets-stage.dex.guru/icons/0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth.png", "priceUSD": 0.00021155709187981557, "priceETH": 1.1037066929948508e-07, "priceUSDChange24h": -0.036307376632898423, "priceETHChange24h": -0.007719123029520966, "timestamp": 1667493912, "blockNumber": 1, "AMM": "all", "network": "eth", "tokenListsNames": ["CoinGecko"], "marketCap": 0.0, "marketCapChange24h": 0.0, "liquidityUSDChange24h": -0.032555487289210386, "liquidityETHChange24h": -0.0038559326740329647, "volumeUSDChange24h": -0.9497107384650174, "volumeETHChange24h": -0.948233885660636 }] };
                setToken1(pj1["data"][0]);
            };
            try {
                if (chainState.tokens[1].length > 0) {
                    axios.get(`https://api.dex.guru/v2/tokens/search/${chainState.tokens[1].address}?network=${chainState.symbol}`).then(res => {
                        if (res.data.data.length) {
                            setToken2(res.data.data[0]);
                        } else {
                            let pj2 = { "total": 1, "data": [{ "id": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth", "address": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a", "symbol": "FREN", "name": "FrenChain", "description": "FrenChain/FREN", "txns24h": 2, "txns24hChange": -0.5, "verified": true, "decimals": 18, "volume24h": 0.0, "volume24hUSD": 235.84081844012337, "volume24hETH": 0.12303964262357231, "volumeChange24h": 0.0, "liquidityUSD": 31783.183491244, "liquidityETH": 16.581487310242, "liquidityChange24h": 0.0, "logoURI": "https://assets-stage.dex.guru/icons/0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth.png", "priceUSD": 0.00021155709187981557, "priceETH": 1.1037066929948508e-07, "priceUSDChange24h": -0.036307376632898423, "priceETHChange24h": -0.007719123029520966, "timestamp": 1667493912, "blockNumber": 1, "AMM": "all", "network": "eth", "tokenListsNames": ["CoinGecko"], "marketCap": 0.0, "marketCapChange24h": 0.0, "liquidityUSDChange24h": -0.032555487289210386, "liquidityETHChange24h": -0.0038559326740329647, "volumeUSDChange24h": -0.9497107384650174, "volumeETHChange24h": -0.948233885660636 }] };
                            setToken2(pj2["data"][0]);
                        };
                    });
                };
            } catch (e) {
                let pj2 = { "total": 1, "data": [{ "id": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth", "address": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a", "symbol": "FREN", "name": "FrenChain", "description": "FrenChain/FREN", "txns24h": 2, "txns24hChange": -0.5, "verified": true, "decimals": 18, "volume24h": 0.0, "volume24hUSD": 235.84081844012337, "volume24hETH": 0.12303964262357231, "volumeChange24h": 0.0, "liquidityUSD": 31783.183491244, "liquidityETH": 16.581487310242, "liquidityChange24h": 0.0, "logoURI": "https://assets-stage.dex.guru/icons/0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth.png", "priceUSD": 0.00021155709187981557, "priceETH": 1.1037066929948508e-07, "priceUSDChange24h": -0.036307376632898423, "priceETHChange24h": -0.007719123029520966, "timestamp": 1667493912, "blockNumber": 1, "AMM": "all", "network": "eth", "tokenListsNames": ["CoinGecko"], "marketCap": 0.0, "marketCapChange24h": 0.0, "liquidityUSDChange24h": -0.032555487289210386, "liquidityETHChange24h": -0.0038559326740329647, "volumeUSDChange24h": -0.9497107384650174, "volumeETHChange24h": -0.948233885660636 }] };
                setToken2(pj2["data"][0]);
            };
        };
        ____SWAP_ENGINE(chainState);
    }, [chainState]);
    let core_synced;
    useEffect(() => {
        if (account && !core_synced) {
            core_synced = true;
        } else {
            return;
        };
    }, [token1, token2, account, connector, chainId])

    let num = 0;
    let t;
    let sOrders;

    const swapTabChange = (newValue) => {
        setSwapTabValue(newValue);
        if (newValue === 0) {
            setActiveRate(4);
            SwapPaper = styled(Paper)(() => ({
                position: "absolute",
                animationName: "paperAnimate1",
                animationDuration: "0.5s"
            }));
            ActiveGrid = styled(Grid)(() => ({
                animationName: "pageAnimate1",
                animationDuration: "0.5s"
            }));
            ActiveStack = styled(Stack)(() => ({
                animationName: "pageAnimate1",
                animationDuration: "0.5s"
            }));
            setTimeout(function() {
                ActiveGrid = styled(Grid)(() => ({
                    display: "none"
                }));
                ActiveStack = styled(Stack)(() => ({
                    display: "none"
                }));
                SwapPaper = styled(Paper)(() => ({
                    margin: "99px 0 276px"
                }));
                setActiveRate(12);
            }, 500);
        }
        if (newValue === 1) {
            setActiveRate(11);
            SwapPaper = styled(Paper)(() => ({
                position: "absolute",
                animationName: "paperAnimate2",
                animationDuration: "0.5s"
            }));
            ActiveGrid = styled(Grid)(() => ({
                animationName: "pageAnimate2",
                animationDuration: "0.5s"
            }));
            ActiveStack = styled(Stack)(() => ({
                animationName: "pageAnimate2",
                animationDuration: "0.5s"
            }));
            setTimeout(function() {
                SwapPaper = styled(Paper)(() => ({
                    margin: "80px 0 130px"
                }));
                ActiveGrid = styled(Grid)(() => ({
                    display: ""
                }));
                ActiveStack = styled(Stack)(() => ({
                    display: ""
                }));
                setActiveRate(4.8);
            }, 500)
        }
    };

    const handleChange = (event, i_D) => {
        setNetwork(event.target.value);
        setChainA(i_D);
        setAge(event.target.value);
    };

    const TokenSelect3 = (event) => {
        setToken3(event.target.value);
    };

    const tokenChange = () => {
        let token_var = token1;
        setToken1(token2);
        setToken2(token_var);
    };

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
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const swapSettingDialogOpen = () => {
        setSwapSettingDialogState(true);
    }

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

    const handleHolder = async (e) => {
        setHolder(e.target.value);
        console.log("holder: ", holder);
    };

    const changeNetwork = (name, i_D) => {
        setNetwork(name);
        chainA_Network(name, i_D);
    };

    const chainA_Network = (name, i_D) => {
        console.log("networking (A): ", i_D,network_hex_to_dec[i_D]);
        setChainA(network_hex_to_dec[i_D]);
    };

    const chainB_Network = (i_D) => {
        console.log("networking (B): ", i_D,network_hex_to_dec[i_D]);
        setChainB(network_hex_to_dec[i_D]);
    };

    const setSwapAmount = async (newValue) => {
        if (!newValue || newValue <= 0) {
            console.log("swapBtnState: ", swapBtnState);
            return false;
        } else {
            setDexsOrder();
            newValue = (new BN(newValue).mul(new BN(10).pow(new BN(token1.decimals)))).toString();
            let provider = await connector.getProvider();
            let isEth = true;
            console.log("res: ", newValue, isEth, account, network_[network_dec_to_hex[chainId]]);
            calculateSuggestedDonation(provider, newValue, isEth, account, network_[network_dec_to_hex[chainId]]).then((res) => {
                console.log("res: ", res);
            });

            let dexs_amountOuts = [];
            for (let i = 0; i < routerAddress.length; i++) {
                let dexs_amountOut = { amountOut: "0", num: i };
                let routerInsts = new web3.eth.Contract(routerAddress[i].abi, routerAddress[i].address);
                let amountOut = await routerInsts.methods.getAmountsOut(
                    newValue,
                    [token1.address, token2.address]
                ).call();
                dexs_amountOut.amountOut = amountOut[1];
                dexs_amountOut.amountOut = await getBalance(dexs_amountOut.amountOut, token2.decimals);
                dexs_amountOuts.push(dexs_amountOut);
            }
            let dexs_amountOuts_v2 = dexs_amountOuts.slice(1).sort(function(a, b) {
                return Number(b.amountOut) - Number(a.amountOut);
            });

            dexs_amountOuts_v2.splice(0, 0, dexs_amountOuts[0]);
            if (dexs_amountOuts_v2.length > 3) {
                dexs_amountOuts_v2 = dexs_amountOuts_v2.slice(0, 3);
            }
            setDexsOrder(dexs_amountOuts_v2);
        }
    }

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
    const handleNext = async () => {
        if (account) {
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
    const tokenApprove = async () => {
        let tokenInst = new web3.eth.Contract(erc20Abi, token1.address);
        let approve_amount = (new BN(maxAmount).mul(new BN(10).pow(new BN(token1.decimals)))).toString();
        setSwapBtnState(6);
        await tokenInst.methods.approve(routerAddress[dexsOrder[swapSelectData].num].address, approve_amount).send({
            from: account
        }, function(error) {
            if (error) {
                setSwapBtnState(4);
            }
        });
        setSwapBtnState(5);
    }

    const tokenSwap = async () => {
        let swapPath = [token1.address, token2.address];
        let swap_amount = (new BN(maxAmount).mul(new BN(10).pow(new BN(token1.decimals)))).toString();

        let deadline = new Date().valueOf() + 10000000;
        setSwapBtnState(6);
        let routerInst = new web3.eth.Contract(routerAddress[dexsOrder[swapSelectData].num].abi, routerAddress[dexsOrder[swapSelectData].num].address);
        await routerInst.methods.swapExactTokensForTokens(
            swap_amount,
            0,
            swapPath,
            account,
            deadline
        ).send({
            from: account
        }, function(error) {
            if (error) {
                setSwapBtnState(5);
            }
        });
        setSwapBtnState(4);
    }

    const maxSteps = 3;
    const theme = useTheme();
    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const dashboardClasses = useStyles.dashboard();
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

    return ( <
        >
        <ThemeProvider theme={theme}>
                <Stack direction="column" sx={{ p: "0 5.2%" }}>
                    {<Grid container justifyContent="space-between">
                        <ActiveGrid item={true} xs={12} md={12} sm={12} sx={{ margin: "auto" }} className='responsive3'>
                            <Paper sx={{ width: "100%", height: "630px", background: "#191919" }}>
                                <FormControl sx={{ width: "150px", margin: "auto" }}>
                                    <InputLabel id="token-select-label3">Token</InputLabel>
                                        <Select
                                            labelId="token-select-label3"
                                            id="token-select3"
                                            value={token3}
                                            label="Token3"
                                            onChange={TokenSelect3}
                                            color="primary"
                                        >
                                        <MenuItem value="WETH">WETH</MenuItem>
                                        <MenuItem value="FREN">FREN</MenuItem>
                                        <MenuItem value="KEK">KEK</MenuItem>
                                        <MenuItem value="BNB">BNB</MenuItem>
                                        <MenuItem value="MATIC">MATIC</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </ActiveGrid>
                    <Grid style={{marginTop:40, maxHeight:'100%', alignItems:'center', textAlign:'center', minWidth: '100%'}} item xs={12} sm={12} md={12} >
                        <Card className="card" style={{width: '100%'}}>
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="Cross-Chain"
                            />
                            <CardContent >
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
                                            <p style={{textAlign:'center', alignItems:'center'}} color="textSecondary">
                                                Select Chain A blockchain network.
                                            </p>
                                            {
                                                networkData ? networkData.map((item)=>
                                                <Grid
                                                    className={classes.networkSelector}
                                                    container
                                                    direction="row"
                                                    justifyContent="space-evenly"
                                                    alignItems="center"
                                                    spacing={5}
                                                    style={{padding:0, borderRadius:'5px'}}
                                                    key={item.name}
                                                    onClick = {()=>changeNetwork(item.name,item.chainData.chainId)}
                                                >
                                                <Grid item  xs={12} sm={12} md={12}>
                                                        <Grid 
                                                            container
                                                            direction="row"
                                                            alignItems="center"
                                                        >
                                                            <Grid item xs={12} sm={12} md={12} style={{padding:6}}>
                                                                <div style={{padding:6}}>
                                                                    <img className={dashboardClasses.networkImage} src={item.url} alt="network" />
                                                                </div>
                                                                <p  color="textSecondary" className={dashboardClasses.networkTitle}>
                                                                    {ui_friendly_networks[item.name]}
                                                                </p>
                                                                <p color="textSecondary" className={dashboardClasses.networkDes}>
                                                                    {item.subtitle}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                            {item.name==network ? <div style={{width:"20px", height:'20px', borderRadius:"10px", backgroundColor:'#fff', display:'inline-block'}} />: <div style={{width:"20px", height:'20px', borderRadius:"10px", border:'1px solid #fff', display:'inline-block'}} />}
                                                    </Grid>
                                                </Grid>
                                                )
                                            : <></> }
                                        </div>
                    <div key={3} style={{paddingLeft:1, paddingRight:1}}>
                        <Grid xs={12} lg={12} md={12} item={true} container direction="column" alignItems="center" style={{textAlign:'center', alignItems:'center', borderColor: "white"}} >
                            <Collapse in={importAlert.state1} sx={{ mb: "-50px", mt: "50px" }}>
                                <Alert variant="filled" severity={importAlert.state2} sx={{ mb: 2 }}>{importAlert.data}</Alert>
                            </Collapse>
                            <SwapPaper variant='outlined' sx={{ background: "#191919", margin: "auto", padding: 1, borderRadius: "12px", maxWidth: "100%", width: "100%", maxHeight: "100%", height: "100%", textAlign:'center', alignItems:'center'}}>
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
                                              <Select
                                                fullWidth
                                                MenuProps={{
                                                  PaperProps: {
                                                    sx: {
                                                      bgcolor: 'green',
                                                      '& .MuiMenuItem-root': {
                                                        padding: 2,
                                                      },
                                                    },
                                                  },
                                                }}
                                              >
                                                { networkData ? networkData.map((item)=>
                                                        <MenuItem sx={{textAlign:"center"}} key={item.chainData.chainId} onClick = {()=>chainB_Network(item.chainData.chainId)} value={item.chainData.chainId} >{ network_[item.chainData.chainId] +`           (`+ item.chainData.chainId+`)` }</MenuItem>
                                                    )
                                                : <></> }
                                        </Select>
                                        </Box>
                                    {!isMobile&&swapTabValue === 0 && <FlexibleContainer direction="column" alignItems="center">
                                            <Paper sx={{ margin: "auto", width: "100%", background: "#101010", borderRadius: "12px", minHeight: "225px", padding: 2 }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>From Asset : Chain A</Typography>
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>Balance: {token1Balance?token1Balance:0} <a onClick={() => setMaxAmount(token1Balance, setSwapAmount(token1Balance))}>Max</a></Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):fren}</Avatar>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:"FREN"}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                    {
                                                        active ? <Box sx={{ verticalAlign: "center", width: "88.8%", marginLeft: "auto", marginRight: "auto", padding: 2, textAlign: 'center', alignItems:'center' }} >
                                                                {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Amount to Bridge</Typography></SwapButton>}
                                                                {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography></SwapButton>}
                                                                {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography></SwapButton>}
                                                                {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography></SwapButton>}
                                                                {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Give permission to use {token1.symbol}</SwapButton>}
                                                                {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>Transport</SwapButton>}
                                                                {swapBtnState === 6 && <SwapButton disabled={true}>Loading...</SwapButton>}
                                                            </Box>
                                                            : <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                                    }
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <IconButton aria-label="swap" sx={{ color: "white" }} onClick={tokenChange}>
                                                <ArrowCircleDownIcon />
                                            </IconButton>
                                            <Paper sx={{ margin: "auto", width: "100%", background: "#101010", borderRadius: "12px", minHeight: "225px", padding: 2  }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#7E8B74" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>To Asset : Chain B</Typography>
                                                        <Typography sx={{ fontSize: "14px" }}> {token2Balance}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Button startIcon={token2.logoURI&&token2.logoURI !== null ?
                                                            <Avatar src={token2.logoURI?token2.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Avatar src={token2.logoURI?token2.logoURI:fren} sx={{ width: "30px", height: "30px", color: "white" }}>{token2.symbol&&token2.symbol.substring(0, 1)}</Avatar>} sx={{ fontSize: "16px", color: "white" }} >{token2.symbol}</Button>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token2.name?token2.name:"FREN (Fungible Coin)"}</Typography>
                                                    </Stack>
                                                    <Stack alignItems="flex-start" sx={{ pt: "4px", zIndex: "2" }}>
                                                        <Chip size='small' label='Receiving' sx={{ color: "white", background: "#37AF43", borderRadius: "10px 10px 10px 0px" }} /> 
                                                    </Stack>
                                                    <Paper sx={{ margin: "-12px 0 8px", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }} onClick={() => setSwapSelectData(0, setSwapSelectState(false))}>
                                                        <Stack direction="column" sx={{ p: "14px 8px", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom>{maxAmount}</Typography>
                                                                <Typography gutterBottom>{token2.symbol ? token2.symbol : "FrenChain"}</Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography sx={{ fontSize: "14px", color: `${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}` }}></Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Paper>
                                                    {dexsOrder && dexsOrder.length > 1 &&
                                                        <Box>
                                                            {swapSelectState && dexsOrder.length > 2 &&
                                                                <Paper sx={{ margin: "0 0 8px", cursor: "pointer", background: "#161714", color: "white", border: "1px solid #7E8B74", borderRadius: "12px" }} onClick={() => setDexsOrder([dexsOrder[0], dexsOrder[2], dexsOrder[1]], setSwapSelectState(false))}>
                                                                    <Stack direction="column" sx={{ p: "14px 8px", color: "#7E8B74" }}>
                                                                        <Stack direction="row" justifyContent="space-between">
                                                                            <Typography gutterBottom>{routerAddress[Number(dexsOrder[2].num)].name}</Typography>
                                                                            <Typography gutterBottom>{dexsOrder[2].amountOut}</Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Paper>
                                                            }
                                                        </Box>
                                                    }
                                                </Stack>
                                            </Paper>                                            
                                        </FlexibleContainer>
                                    }
                                    {isMobile&&swapTabValue === 0 && <BasicStack direction="column" alignItems="center">
                                            <Paper sx={{ width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>From</Typography>
                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>Balance: {token1Balance?token1Balance:0} <a onClick={() => setMaxAmount(token1Balance, setSwapAmount(token1Balance))}>Max</a></Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "10px 0" }}>
                                                        <Button startIcon={token1.logoURI&&token1.logoURI !== null ?
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Avatar src={token1.logoURI?token1.logoURI:fren} sx={{ width: "30px", height: "30px", color: "white" }}>{token1.symbol?token1.symbol.substring(0, 1):fren}</Avatar>} sx={{ fontSize: "16px", color: "white" }} >{token1.symbol}</Button>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:"FREN (ERC20)"}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <IconButton aria-label="swap" sx={{ color: "white" }} onClick={tokenChange}>
                                                <ArrowCircleDownIcon />
                                            </IconButton>
                                            <Paper sx={{ margin: "0 0 24px", width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#7E8B74" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>To (estimated)</Typography>
                                                        <Typography sx={{ fontSize: "14px" }}> {token2Balance}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: "10px 0 6px" }}>
                                                        <Button startIcon={token2.logoURI&&token2.logoURI !== null ?
                                                            <Avatar src={token2.logoURI?token2.logoURI:fren} sx={{ width: "30px", height: "30px" }} />
                                                            :
                                                            <Avatar src={token2.logoURI?token2.logoURI:fren} sx={{ width: "30px", height: "30px", color: "white" }}>{token2.symbol&&token2.symbol.substring(0, 1)}</Avatar>} sx={{ fontSize: "16px", color: "white" }} >{token2.symbol}</Button>
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px", width: "88.8%" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token2.name?token2.name:"FREN (Fungible Coin)"}</Typography>
                                                    </Stack>
                                                    <Stack alignItems="flex-start" sx={{ pt: "4px", zIndex: "2" }}>
                                                        <Chip size='small' label='Receiving' sx={{ color: "white", background: "#37AF43", borderRadius: "10px 10px 10px 0px" }} /> 
                                                    </Stack>
                                                    <Paper sx={{ margin: "-12px 0 8px", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }} onClick={() => setSwapSelectData(0, setSwapSelectState(false))}>
                                                        <Stack direction="column" sx={{ p: "14px 8px", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom>{maxAmount}</Typography>
                                                                <Typography gutterBottom>{token2.symbol ? token2.symbol : "FrenChain"}</Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography sx={{ fontSize: "14px", color: `${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}` }}></Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Paper>
                                                    {dexsOrder && dexsOrder.length > 1 &&
                                                        <Box>
                                                            <Paper sx={{ margin: "0 0 8px", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 1 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }}
                                                                onClick={() => setDexsOrder(dexsOrder&&dexsOrder.length > 2 ? [dexsOrder[0], dexsOrder[1], dexsOrder[2]] : [dexsOrder[0], dexsOrder[1]], setSwapSelectData(1))}>
                                                                <Stack direction="column" sx={{ p: "14px 8px", color: `${swapSelectData !== 1 && "#7E8B74"}` }}>
                                                                    <Stack direction="row" justifyContent="space-between">
                                                                        <Stack direction="row" spacing={1} onClick={() => setSwapSelectState(dexsOrder.length > 2 ? swapSelectState ? false : true : false)}>
                                                                            <Typography gutterBottom>
                                                                                {routerAddress.length - 1 >= dexsOrder[1].num && routerAddress[Number(dexsOrder[1].num)].name}
                                                                            </Typography>
                                                                            {dexsOrder.length > 2 &&
                                                                                <ExpandMoreIcon />
                                                                            }
                                                                        </Stack>
                                                                        <Typography gutterBottom>{dexsOrder[1].amountOut}</Typography>
                                                                    </Stack>
                                                                    <Stack direction="row" justifyContent="space-between">
                                                                        <Typography sx={{ fontSize: "14px", color: `${swapSelectData === 1 ? "#34F14B" : "#7E8B74"}` }}></Typography>
                                                                    </Stack>
                                                                </Stack>
                                                            </Paper>
                                                            {swapSelectState && dexsOrder.length > 2 &&
                                                                <Paper sx={{ margin: "0 0 8px", cursor: "pointer", background: "#161714", color: "white", border: "1px solid #7E8B74", borderRadius: "12px" }} onClick={() => setDexsOrder([dexsOrder[0], dexsOrder[2], dexsOrder[1]], setSwapSelectState(false))}>
                                                                    <Stack direction="column" sx={{ p: "14px 8px", color: "#7E8B74" }}>
                                                                        <Stack direction="row" justifyContent="space-between">
                                                                            <Typography gutterBottom>{routerAddress[Number(dexsOrder[2].num)].name}</Typography>
                                                                            <Typography gutterBottom>{dexsOrder[2].amountOut}</Typography>
                                                                        </Stack>
                                                                        <Stack direction="row" justifyContent="space-between">
                                                                            <Typography sx={{ fontSize: "14px" }}></Typography>
                                                                            <Typography sx={{ fontSize: "14px" }}></Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Paper>
                                                            }
                                                        </Box>
                                                    }
                                                </Stack>
                                            </Paper>
                                            <Box component="ul" sx={{textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                <CardContent>
                                            {
                                                active ?
                                                    <Box sx={{ width: "100%", textAlign: 'center', alignItems:'center', margin: 'auto', display: 'flex', padding: 1, flexDirection: 'row' }}>
                                                        {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Amount to swap</Typography></SwapButton>}
                                                        {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography></SwapButton>}
                                                        {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography></SwapButton>}
                                                        {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography></SwapButton>}
                                                        {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Give permission to use {token1.symbol}</SwapButton>}
                                                        {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>Transport</SwapButton>}
                                                        {swapBtnState === 6 && <SwapButton disabled={true}>Loading...</SwapButton>}
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
                    </Grid>}
                </Stack>
            </ThemeProvider> <
        Cwallet isOpenDialog = { isOpenDialog } setIsOpenDialog = { setIsOpenDialog } chain = { chainState } setChain = { setChainState } tokenDialogState = { tokenDialogState } setTokenDialogState = { setTokenDialogState } selectToken = { selectToken } swapSettingDialogState = { swapSettingDialogState } setSwapSettingDialogState = { setSwapSettingDialogState } poolCreateDialogState = { poolCreateDialogState } setPoolCreateDialogState = { setPoolCreateDialogState } setPools = { setPools } setImportAlert = { setImportAlert }
        /> < / >
    );
}