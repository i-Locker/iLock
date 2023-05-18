import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
// ** Import Material UI Components
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from '@mui/material/Modal';
import {
    Grid,
    Card,
    Stack,
    Typography,
    Select,
    MenuItem,
    Input,
    Chip,
    Avatar,
    Alert,
    Collapse,
    RadioGroup
} from '@mui/material';
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
import { CHAINDATA, networks_data, explorer_, rpc_, icons_, network_, lockerAddress, network_symbols, network_decimals, network_hex_to_dec, PROJECTNAME, websiteURI, ui_friendly_networks, network_dec_to_hex, tokens_data, iBridgeAddress } from "../constants";
import { getTokenMetadata, getERC20Metadata } from "../api";
import { toggleDrawer } from '../components/Header';
import Loader from '../components/Loader';
import DateTime from '../components/DateTime';
import iBridge from '../components/Bridge';
import Web3 from 'web3';
import Cwallet from "../assets/constants/Cwallet";
import { CustomTab } from '../config/style';
import { erc20Abi, network_lower_to_proper } from "../constants";
import { fetch_Balance, get_iVault_Quote_EthToToken, get_iVault_Quote_TokenToEth, get_iVault_byIndex, calculateSuggestedDonation } from "../web3";
import { getBalance } from "../config/app";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './swap.css';
import axios from 'axios';
import { Router_address } from "../config/abi/router/dexRouter";
import { Factory_address } from "../config/abi/router/dexFactory";
import fren from '../assets/img/common/fren.svg';
import Filter from '../assets/img/common/filter.png';
import Refresh from '../assets/img/common/refresh.png';
import { styled, createTheme } from '@mui/material/styles'
import { alterLoaderText } from '../components/Loader';
import { deposit, approve, allowance, getTokenBalance, getERC20balance, getERC20allowance, getData, explorer, updateProfile, getEtherBalance, w3, getETHtoChecksum, _toBN, _getBN, _getUIfmt } from "../web3";
import { ThemeProvider } from '@emotion/react';
export let handle_Date;
const theme = createTheme({
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
const Bridge = (props) => {

    const { account, connector, chainId, active } = useWeb3React();
    const [activeStep, setActiveStep] = React.useState(0);
    const [receiveAmount, setReceiveAmount] = React.useState(0);
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
    const [bridgeAmount, setLockAmount] = useState(0);
    const [tokenDecimals, setTokenDecimals] = useState(0);
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenBalanceString, setTokenBalanceString] = useState("");
    const [etherBalance, setEtherBalance] = useState(0);
    const [chainState, setChainState] = useState("");
    const [tokenBalance, setTokenBalance] = useState(0);
    const [tokenAllowance, setTokenAllowance] = useState(0);
    const [withdrawDate, setWithdrawDate] = useState(undefined);
    const [dateUseful, setDateUseful] = useState(false);
    const [addressDemand, setAddressDemand] = useState(false);
    const [isAllowed, setIsAllowed] = useState(0);
    const [lockAmountMax, setLockAmountMax] = useState(false);
    const [swapTabValue, setSwapTabValue] = useState(0);
    const [activeRate, setActiveRate] = useState(12);
    const [bridgeAddress, setBridgeAddress] = React.useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [tokenDialogState, setTokenDialogState] = useState(false);
    const [poolCreateDialogState, setPoolCreateDialogState] = useState(false);
    const [swapSettingDialogState, setSwapSettingDialogState] = useState(false);
    const [pools, setPools] = useState([]);
    const [token1, setToken1] = useState(""); // chainState["tokens"][0] && chainState["tokens"][0].length > 0 ? chainState["tokens"][0] : 
    const [token2, setToken2] = useState(""); // chainState["tokens"][1] && chainState["tokens"][1].length > 0 ? chainState["tokens"][1] : "
    const [token1Balance, setToken1Balance] = useState(0);
    const [token2Balance, setToken2Balance] = useState(0);
    const [token3, setToken3] = useState('WETH');
    const [swapSelectState, setSwapSelectState] = useState(false);
    const [dexsOrder, setDexsOrder] = useState("");
    const [swapSelectData, setSwapSelectData] = useState(0);
    const [swapBtnState, setSwapBtnState] = useState(0);
    const [routerAddress, setRouterAddress] = useState(Router_address[0].length > 0 ? Router_address[0].dexs : "");
    const [factoryAddress, setFactoryAddress] = useState(Factory_address[0].length > 0 ? Factory_address[0].dexs : "");
    const [maxAmount, setMaxAmount] = useState(0);
    const [importAlert, setImportAlert] = useState({ state1: false, state2: "success", data: "" });
    const [rateState, setRateState] = useState(0);
    const [slippage, setSlippage] = useState(1);

    const web3 = new Web3(window.ethereum);
    const BN = web3.utils.BN;

    useEffect(() => {
        if (importAlert) {
            setTimeout(function() {
                setImportAlert({ state1: false, state2: "success", data: "" });
            }, 5000);
        }
        if (chainId) {
            const Engine = async (chainId, account, connector, token) => {
                let provider = await connector.getProvider();
                // if (chainId != 444 || chainId != 44444) {
                //     try {
                //         await provider.request({
                //             method: 'wallet_switchEthereumChain',
                //             params: [{ chainId: await network_dec_to_hex[44444] }],
                //         });
                //         console.log("You have succefully switched to ", network)
                //     } catch (e) {
                //         //
                //     };
                // };
                console.log("Engine token ", token);
                console.log("Engine chainId ", chainId, network_dec_to_hex[chainId]);
                console.log("Engine network_ ", network_[network_dec_to_hex[chainId]]);
                console.log("Engine get_iVault_byIndex: ", await get_iVault_byIndex(provider, 0, account, network_[network_dec_to_hex[chainId]]));
                // console.log("Engine get_iVault_Quote_EthToToken: ", await get_iVault_Quote_EthToToken(provider, await get_iVault_byIndex(provider, 0, account, network_[network_dec_to_hex[chainId]]), token, account, 0, network_[network_dec_to_hex[chainId]]));
                // console.log("Engine get_iVault_Quote_TokenToEth: ", await get_iVault_Quote_TokenToEth(provider, await get_iVault_byIndex(provider, 0, account, network_[network_dec_to_hex[chainId]]), token, account, 0, network_[network_dec_to_hex[chainId]]));
            };
            Engine(chainId, account, connector, token1.address);
            Engine(chainId, account, connector, token2.address);
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
                            // let pj1 = {"total":1,"data":[{"id":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth","address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","symbol":"WETH","name":"WETH","description":"Wrapped Ether/WETH","txns24h":247012,"txns24hChange":-0.19774991149695192,"verified":true,"decimals":18,"volume24h":0.0,"volume24hUSD":1088457168.4826467,"volume24hETH":561166.7892331104,"volumeChange24h":0.0,"liquidityUSD":6848874429.3484,"liquidityETH":3572646.3197278,"liquidityChange24h":0.0,"logoURI":"https://assets-stage.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png","priceUSD":1921.7411221446696,"priceETH":1.0,"priceUSDChange24h":-0.015828325165292936,"priceETHChange24h":0.0,"timestamp":1616361199,"blockNumber":0,"AMM":"uniswap","network":"eth","tokenListsNames":["1inch","Aave Token List","CoinGecko","Uniswap Labs List","Zerion","Zapper Token List","Wrapped Tokens","Roll Social Money","Furucombo","Kleros Tokens","MyCrypto Token List","Uniswap Labs Default","Balancer","SushiSwap Menu","KyberSwap Token List Ethereum"],"marketCap":5269391195.878679,"marketCapChange24h":1.9690666257144935,"liquidityUSDChange24h":-0.0017124215369804558,"liquidityETHChange24h":0.005644837805377931,"volumeUSDChange24h":0.03277133122391191,"volumeETHChange24h":0.044853465598931094}]};
                            let pj1 = { "total": 1, "data": [{ "id": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth", "address": "0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a", "symbol": "FREN", "name": "FrenChain (ERC20)", "description": "FrenChain/FREN", "txns24h": 2, "txns24hChange": -0.5, "verified": true, "decimals": 18, "volume24h": 0.0, "volume24hUSD": 235.84081844012337, "volume24hETH": 0.12303964262357231, "volumeChange24h": 0.0, "liquidityUSD": 31783.183491244, "liquidityETH": 16.581487310242, "liquidityChange24h": 0.0, "logoURI": "https://assets-stage.dex.guru/icons/0x8e14c88ab0644ef41bd7138ab91c0160d8c1583a-eth.png", "priceUSD": 0.00021155709187981557, "priceETH": 1.1037066929948508e-07, "priceUSDChange24h": -0.036307376632898423, "priceETHChange24h": -0.007719123029520966, "timestamp": 1667493912, "blockNumber": 1, "AMM": "all", "network": "eth", "tokenListsNames": ["CoinGecko"], "marketCap": 0.0, "marketCapChange24h": 0.0, "liquidityUSDChange24h": -0.032555487289210386, "liquidityETHChange24h": -0.0038559326740329647, "volumeUSDChange24h": -0.9497107384650174, "volumeETHChange24h": -0.948233885660636 }] };
                            setToken1(pj1["data"][0]);
                        };
                    });
                };
            } catch (e) {
                // let pj1 = {"total":1,"data":[{"id":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth","address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","symbol":"WETH","name":"WETH","description":"Wrapped Ether/WETH","txns24h":247012,"txns24hChange":-0.19774991149695192,"verified":true,"decimals":18,"volume24h":0.0,"volume24hUSD":1088457168.4826467,"volume24hETH":561166.7892331104,"volumeChange24h":0.0,"liquidityUSD":6848874429.3484,"liquidityETH":3572646.3197278,"liquidityChange24h":0.0,"logoURI":"https://assets-stage.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png","priceUSD":1921.7411221446696,"priceETH":1.0,"priceUSDChange24h":-0.015828325165292936,"priceETHChange24h":0.0,"timestamp":1616361199,"blockNumber":0,"AMM":"uniswap","network":"eth","tokenListsNames":["1inch","Aave Token List","CoinGecko","Uniswap Labs List","Zerion","Zapper Token List","Wrapped Tokens","Roll Social Money","Furucombo","Kleros Tokens","MyCrypto Token List","Uniswap Labs Default","Balancer","SushiSwap Menu","KyberSwap Token List Ethereum"],"marketCap":5269391195.878679,"marketCapChange24h":1.9690666257144935,"liquidityUSDChange24h":-0.0017124215369804558,"liquidityETHChange24h":0.005644837805377931,"volumeUSDChange24h":0.03277133122391191,"volumeETHChange24h":0.044853465598931094}]};
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

    useEffect(() => {
        async function ___SWAP_CORE(token1, token2, account, chainId) {
            try {
                if (maxAmount && maxAmount > 0) {
                    setSwapAmount(maxAmount);
                };
                let provider = await connector.getProvider();
                console.log("network_ ", network_[network_dec_to_hex[chainId]], "token1 ", token1, "token2: ", token2);
                let balance_COIN = await getEtherBalance(provider, account, network_[network_dec_to_hex[chainId]]);
                console.log("balance: (balance_COIN) ", balance_COIN[0]);
                setEtherBalance(balance_COIN ? balance_COIN : 0);
                let balance1_v2 = await fetch_Balance(provider, token1.address, account, network_[network_dec_to_hex[chainId]]);
                setToken1Balance(balance1_v2 ? balance1_v2 : 0);
                console.log("balance: (token1) ", balance1_v2, token1.address, token1.name, token1.symbol, token1.decimals);
                let balance2_v2 = await fetch_Balance(provider, token2.address, account, network_[network_dec_to_hex[chainId]]);
                console.log("balance: (token2) ", balance2_v2, token2.address, token2.name, token2.symbol, token2.decimals);
                setToken2Balance(balance2_v2 ? balance2_v2 : 0);
            } catch(e) {
                console.log("err: ",e);
            };
        };
        if (account) {
            ___SWAP_CORE(token1, token2, account, chainId);
        } else {
            return;
        };
    }, [token1, token2, account,connector,chainId])

    let num = 0;
    useEffect(() => {
        if (num > 0) {
            swapTabChange(swapTabValue);
        }
        num++;
    }, [swapTabValue]);

    useEffect(() => {
        async function ___SWAP_ORDERS(token1, token2, dexsOrder, swapSelectData, routerAddress) {
            if (!maxAmount || maxAmount === '' || Number(maxAmount) <= 0) {
                setSwapBtnState(0);
                return;
            } else {
                let factoryInst = new web3.eth.Contract(factoryAddress[Number(dexsOrder[swapSelectData].num)].abi, factoryAddress[Number(dexsOrder[swapSelectData].num)].address);
                let pair = await factoryInst.methods.getPair(token1.address, token2.address).call();
                if (pair === '0x0000000000000000000000000000000000000000' || !pair) {
                    setSwapBtnState(1);
                    return;
                } else {
                    let eth_balance = await web3.eth.getBalance(account);
                    if (eth_balance === '0') {
                        setSwapBtnState(2);
                        return;
                    };
                };
                try {
                    let token1Inst = new web3.eth.Contract(erc20Abi, token1.address);
                    let balance = await token1Inst.methods.balanceOf(account).call();
                    let balance_v2 = await getBalance(balance, token1.decimals);
                    if (!balance_v2 || balance_v2 < maxAmount) {
                        setSwapBtnState(3);
                    } else {
                        let allowance = await token1Inst.methods.allowance(account, routerAddress[dexsOrder[swapSelectData].num].address).call();
                        let allowance_v2 = await getBalance(allowance, token1.decimals);
                        if (allowance_v2 && allowance_v2 >= maxAmount) {
                            setSwapBtnState(5);
                        } else {
                            setSwapBtnState(4);
                        };
                    };
                } catch (e) {
                    //
                } finally {
                    clearTimeout(t);
                };
            };
        };
        const t = setTimeout(() => {
            setSwapAmount(maxAmount);
        }, 10000);
        if (!token1 | !token2 | !dexsOrder | !swapSelectData | !routerAddress) {
            //
        } else {
            ___SWAP_ORDERS(token1, token2, dexsOrder, swapSelectData, routerAddress);
        };
    }, [token1, token2, dexsOrder, swapSelectData, routerAddress, erc20Abi]);

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

    const TokenSelect3 = (event) => {
        setToken3(event.target.value);
    };

    const tokenChange = () => {
        let token_var = token1;
        setToken1(token2);
        setToken2(token_var);
    }


    const swapSettingDialogOpen = () => {
        setSwapSettingDialogState(true);
    }

    const setSwapAmount = async (newValue) => {
        if (!newValue || newValue <= 0) {
            setSwapBtnState(5);
            console.log("swapBtnState: ",swapBtnState);
            setDexsOrder();
            return false;
        }
        newValue = (new BN(newValue).mul(new BN(10).pow(new BN(token1.decimals)))).toString();
        
        let provider = await connector.getProvider();
        let isEth = true;
            console.log("res: ",newValue, isEth, account, network_[network_dec_to_hex[chainId]]);
        calculateSuggestedDonation(provider, newValue, isEth, account, network_[network_dec_to_hex[chainId]]).then((res)=>{
            console.log("res: ",res);
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
    async function start_(tokenContract,tokenDecimals) {
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
                if(tokenContract&&tokenDecimals) {
                    start_(tokenContract,tokenDecimals);
                };
            } catch (e) {
                console.log(e);
                window.alert("Token not found, please try again...");
            } finally {
                alterLoaderText("Deploy iLocker");
                if (!bridgeAmount) {
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
            if (!bridgeAmount) {
                //
            } else {
                try {
                    let provider = await connector.getProvider();
                    const allowanceAmount = await getERC20allowance(provider, tokenContract, account, lockerAddress[network], network);
                    console.log("allowanceAmount/bridgeAmount: ", parseFloat(allowanceAmount), bridgeAmount * 10 ** tokenDecimals, parseFloat(allowanceAmount) >= parseFloat(bridgeAmount * 10 ** tokenDecimals));
                    setTokenAllowance(allowanceAmount);
                    let allowanceAmountFormatted = await _getBN(allowanceAmount, parseFloat(tokenDecimals));
                    let allowanceAmountFormatted_UI = await _getUIfmt(allowanceAmount, parseFloat(tokenDecimals));
                    console.log("allowanceAmountFormatted: ", allowanceAmount, parseFloat(allowanceAmountFormatted).toFixed(0), parseFloat(allowanceAmountFormatted_UI).toFixed(0));
                    if (parseFloat(allowanceAmount) < parseFloat(bridgeAmount * 10 ** tokenDecimals)) {
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
        setActiveStep(step);
    };

    const fetchEtherBalance = (eb) => {
        setEtherBalance(eb);
    };

    const selectLockAmountMax = () => {
        const _amount = addressDemand ? (test_data.userBalance / Math.pow(10, tokenDecimals)).toFixed(2) : etherBalance;
        setLockAmount(_amount);
        console.log("_amount: ", bridgeAmount);
        setLockAmountMax(true);
    }

    function handleLocker(e) {
        setLockAmount(parseFloat(e.target.value));
        setLockAmountMax(false);
        handleAllowance(e);
        handleReceiveAmount(bridgeAmount);
        console.log("_amount: ", bridgeAmount);
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
            const lockAmountFormatted = (bridgeAmount).toFixed(2).toString();
            console.log("tokenBalance: ", tokenBalance, tokenBalanceFormatted, parseFloat(tokenBalance) > 0);
            setTokenBalanceString(tokenBalanceFormatted);
            console.log("allowanceAmount/bridgeAmount: ", lockAmountFormatted, allowanceAmountFormatted, parseFloat(allowanceAmount), bridgeAmount * 10 ** tokenDecimals);
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
    const handleReceiveAmount = async () => {
        setReceiveAmount(bridgeAmount);
    };
    const showLockup = async (network, lockId) => {
        navigate(`/lockers/${network.toLowerCase()}/${lockId}`);
    };

    const depositToken = async (e) => {
        try {
            let tokenAmount;
            tokenAmount = bridgeAmount;
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
        let ap = bridgeAmount * 10 ** tokenDecimals;
        let amountFormatted = await _getBN(bridgeAmount, tokenDecimals);
        console.log("approving: ", bridgeAmount, tokenDecimals, ap, "\n ", amountFormatted);
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
                </TableRow> 
            </>
        )
    }
    return (
        <ThemeProvider theme={theme}>
        <Container className={classes.root} maxWidth="lg" style={{paddingLeft:20, paddingRight:20}}>
            <Box className={classes.info}>
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{margin:'auto', alignItems:'center', textAlign:'center'}} >
                    <Grid className={isMobile ? `${mobileClasses.root} grid text-center`  : "grid text-center"} style={{marginTop:40, alignItems:'center', textAlign:'center', minWidth: '100%'}} item xs={12} sm={12} md={12} >
                       {
                        activeStep == 0 ? <div style={{maxWidth:"88%", display:'inline-block', textAlign:'left'}}>
                            <h1>Use your digital assets on an Interchained compatible chain instantly.</h1>
                            <p>Transfer ERC20 or fungible coin cross-chain through interoperability enabled smart contracts.</p>
                            <Link
                                href={`${websiteURI}`}
                                target="_blank"
                                color="blue"
                                underline="none"
                                className={classes.button}
                            ><Button variant="contained">Powered by {`${PROJECTNAME}`}</Button></Link>
                        </div> : <></>
                       }
                    </Grid>
                    <Grid style={{marginTop:40, alignItems:'center', textAlign:'center', minWidth: '100%'}} item xs={12} sm={12} md={12} >
                        <Card className="card" style={{width: '100%'}}>
                            <CardHeader
                                className={dashboardClasses.cardHeader}
                                title="CrossChain Bridge"
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
                                            <p style={{textAlign:'center', alignItems:'center'}} color="textSecondary">
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
                                                Select the type of digital asset you would like to bridge.
                                            </p>
                                                <Stack direction="column" sx={{ p: "0 5.2%" }}>
                                                    {<Grid container justifyContent="space-between">
                                                        <ActiveGrid item={true} xs={12} md={7} sx={{ margin: "80px 0 130px" }} className='responsive3'>
                                                            <Paper sx={{ width: "100%", height: "630px", background: "#191919" }}>
                                                                <FormControl sx={{ width: "150px", margin: "20px 45px" }}>
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
                                                        <Grid xs={12} item={true} md={activeRate === 11 ? 12 : activeRate} container direction="column" alignItems="center">
                                                            <Collapse in={importAlert.state1} sx={{ mb: "-50px", mt: "50px" }}>
                                                                <Alert variant="filled" severity={importAlert.state2} sx={{ mb: 2 }}>{importAlert.data}</Alert>
                                                            </Collapse>
                                                            
                                                            <SwapPaper variant='outlined' sx={{ background: "#191919", margin: "auto", padding: 1, borderRadius: "12px", maxWidth: "100%", width: "100%", maxHeight: "777px", height: "100%", borderColor: "white", textAlign:'center',alignItems:'center'}}>
                                                                <Box sx={{ m: "0 8% 25px" }}>
                                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                        <Stack direction="row" justifyContent="space-between" sx={{ width: "45%", maxWidth: "200px" }} spacing={1}>
                                                                            <CustomTab text={["Bridge"]} padding={20} tabValue={swapTabValue} setTabValue={setSwapTabValue} position={"top"} />
                                                                        </Stack>
                                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                                            <IconButton sx={{ color: "white" }}><Typography component="img" src={Refresh}></Typography></IconButton>
                                                                            <IconButton sx={{ color: "white" }} onClick={()=>swapSettingDialogOpen()}><Typography component="img" src={Filter}></Typography></IconButton>
                                                                        </Stack>
                                                                    </Stack>
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
                                                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:"FREN (ERC20)"}</Typography>
                                                                                        {/*
                                                                                            <Typography sx={{ fontSize: "14px" }}>~${token1.priceUSD?Number(Number(token1.priceUSD*maxAmount).toFixed(2)):(maxAmount*0.00020575).toFixed(2)}</Typography>
                                                                                        */}
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
                                                                                        {/*
                                                                                            <Typography sx={{ fontSize: "14px" }}>~${token2.priceUSD?Number(Number(token2.priceUSD*maxAmount).toFixed(2)):(maxAmount*0.00020575).toFixed(2)}</Typography>
                                                                                        */}
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
                                                                                        {/*
                                                                                            <Typography sx={{ fontSize: "14px" }}>~${token2.priceUSD?Number(Number(token2.priceUSD*maxAmount).toFixed(2)):(maxAmount*0.00020575).toFixed(2)}</Typography>
                                                                                        */}
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
                                                                    {swapTabValue === 1 &&
                                                                        <Stack direction="column" alignItems="center">
                                                                            <Paper sx={{ width: "100%", background: "#101010", borderRadius: "12px" }}>
                                                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                                                    <Typography gutterBottom sx={{ fontSize: "14px", color: "#7E8B74" }}>From</Typography>
                                                                                    <Stack direction="row" justifyContent="space-between" sx={{ p: "10px 0" }}>
                                                                                        <Button startIcon={<Avatar sx={{ width: "30px", height: "30px" }} src={token1.logoURI&&token1.logoURI} />} endIcon={<ExpandMoreIcon />} sx={{ fontSize: "16px", color: "white" }} onClick={() => setTokenDialogState(1)}>{token1.symbol&&token1.symbol}</Button>
                                                                                        <Input className='swap_input' color="primary" type='number' variant="standard" sx={{ color: "white" }}></Input>
                                                                                    </Stack>
                                                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                                                        <Typography sx={{ fontSize: "14px" }}></Typography>
                                                                                    </Stack>
                                                                                </Stack>
                                                                            </Paper>
                                                                            <IconButton aria-label="swap" sx={{ color: "white" }}>
                                                                                <ArrowCircleDownIcon />
                                                                            </IconButton>
                                                                            <Paper sx={{ margin: "0 0 24px", width: "100%", color: "white", border: "1px solid #808080", background: "#191919", borderRadius: "12px" }}>
                                                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#7E8B74" }}>
                                                                                        <Typography gutterBottom sx={{ fontSize: "14px" }}>To (estimated)</Typography>
                                                                                        <Typography gutterBottom sx={{ fontSize: "14px" }}>Balance: </Typography>
                                                                                    </Stack>
                                                                                    <Stack alignItems="flex-start" sx={{ p: "10px 0" }}>
                                                                                        <Button startIcon={<Avatar sx={{ width: "30px", height: "30px" }} src={token2.logoURI&&token2.logoURI} />} endIcon={<ExpandMoreIcon />} sx={{ fontSize: "16px", color: "white" }} onClick={() => setTokenDialogState(2)}>{token2.symbol&&token2.symbol}</Button>
                                                                                    </Stack>
                                                                                    <Paper sx={{ margin: "0 0 8px", background: "#161714", border: "1px solid #7E8B74", borderRadius: "12px" }}>
                                                                                        <Stack direction="column" sx={{ p: "14px 8px", color: "white" }}>
                                                                                            <Stack direction="row" justifyContent="space-between">
                                                                                                <Typography gutterBottom></Typography>
                                                                                                <Typography gutterBottom></Typography>
                                                                                            </Stack>
                                                                                            <Typography sx={{ fontSize: "14px", color: "#34F14B" }}></Typography>
                                                                                        </Stack>
                                                                                    </Paper>
                                                                                    <Paper sx={{ background: "#161714", border: "1px solid #7E8B74", borderRadius: "12px" }}>
                                                                                        <Stack direction="column" sx={{ p: "14px 8px", color: "#34F14B" }}>
                                                                                            <Stack direction="row" justifyContent="space-between">
                                                                                                <Typography gutterBottom></Typography>
                                                                                                <Typography gutterBottom></Typography>
                                                                                            </Stack>
                                                                                            <Typography sx={{ fontSize: "14px", color: "#34F14B" }}></Typography>
                                                                                        </Stack>
                                                                                    </Paper>
                                                                                </Stack>
                                                                            </Paper>
                                                                            <Button variant='contained' color='primary' sx={{ width: "100%", color: "white", fontWeight: "700", fontSize: "16px", borderRadius: "12px" }}>Connect Wallet</Button>
                                                                        </Stack>
                                                                    }
                                                                </Box>
                                                            </SwapPaper>
                                                        </Grid>
                                                    </Grid>}
                                        </Stack> 
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
                onClose={()=>handleClose(true)}
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
                onClose={()=>handleSnackbarClose(true)}
                message="Successfully Copied to Clipboard"
            />
          </Container>
      </ThemeProvider> 
    )
}
const mapStateToProps = state => ({
    statistics: state.statistics,
})

export default connect(mapStateToProps)(Bridge);