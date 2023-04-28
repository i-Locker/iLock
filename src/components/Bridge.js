import React, { useEffect, useState, useRef } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Box,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    IconButton,
    Chip,
    Avatar,
    Alert,
    Collapse,
    Link
} from '@mui/material';
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';
import Cwallet from "../assets/constants/Cwallet";
import { CustomTab } from '../config/style';
import { erc20Abi, network_, network_dec_to_hex, iBridgeAddress, network_lower_to_proper } from "../constants";
import { fetch_Balance, get_iVault_Quote_EthToToken, get_iVault_Quote_TokenToEth, get_iVault_byIndex, calculateSuggestedDonation, getEtherBalance } from "../web3";
import { getBalance } from "../config/app";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { styled, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import './swap.css';
import axios from 'axios';
import { Router_address } from "../config/abi/router/dexRouter";
import { Factory_address } from "../config/abi/router/dexFactory";
import fren from '../assets/img/common/fren.svg';
import Filter from '../assets/img/common/filter.png';
import Refresh from '../assets/img/common/refresh.png';
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

export default function Bridge({ chainState, setChainState }) {
    const { active, account, chainId, connector } = useWeb3React();
    const [swapTabValue, setSwapTabValue] = useState(0);
    const [activeRate, setActiveRate] = useState(12);
    const [bridgeAddress, setBridgeAddress] = React.useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [tokenDialogState, setTokenDialogState] = useState(false);
    const [poolCreateDialogState, setPoolCreateDialogState] = useState(false);
    const [swapSettingDialogState, setSwapSettingDialogState] = useState(false);
    const [pools, setPools] = useState([]);
    const [token1, setToken1] = useState(chainState["tokens"][0] && chainState["tokens"][0].length > 0 ? chainState["tokens"][0] : "");
    const [token2, setToken2] = useState(chainState["tokens"][1] && chainState["tokens"][1].length > 0 ? chainState["tokens"][1] : "");
    const [token1Balance, setToken1Balance] = useState(0);
    const [token2Balance, setToken2Balance] = useState(0);
    const [etherBalance, setEtherBalance] = useState(0);
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

    return ( <
        >
        <ThemeProvider theme={theme}>
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
                            <SwapPaper variant='outlined' sx={{ background: "#191919", borderRadius: "12px", maxWidth: "476px", width: "100%", borderColor: "white" }}>
                                <Box sx={{ m: "0 8% 25px" }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" justifyContent="space-between" sx={{ width: "45%", maxWidth: "200px" }} spacing={1}>
                                            <CustomTab text={["Bridge"]} padding={20} tabValue={swapTabValue} setTabValue={setSwapTabValue} position={"top"} />
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {/* <CircularProgress variant="determinate" value={progress} size={20} /> */}
                                            <IconButton sx={{ color: "white" }}><Typography component="img" src={Refresh}></Typography></IconButton>
                                            <IconButton sx={{ color: "white" }} onClick={()=>swapSettingDialogOpen()}><Typography component="img" src={Filter}></Typography></IconButton>
                                        </Stack>
                                    </Stack>
                                    {swapTabValue === 0 &&
                                        <Stack direction="column" alignItems="center">
                                            <Paper sx={{ width: "100%", background: "#101010", borderRadius: "12px", mt: "25px" }}>
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
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token1.name?token1.name:"FREN (ERC20)"}</Typography>
                                                        <Typography sx={{ fontSize: "14px" }}>~${token1.priceUSD?Number(Number(token1.priceUSD*maxAmount).toFixed(2)):(maxAmount*0.00020575).toFixed(2)}</Typography>
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
                                                        <Input className='swap_input' color="primary" placeholder='0.0' type='number' variant="standard" value={maxAmount} onChange={(e) => setSwapAmount(e.target.value, setMaxAmount(e.target.value))} sx={{ color: "white", fontSize: "20px" }} />
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>{token2.name?token2.name:"FREN (Fungible Coin)"}</Typography>
                                                        <Typography sx={{ fontSize: "14px" }}>~${token2.priceUSD?Number(Number(token2.priceUSD*maxAmount).toFixed(2)):(maxAmount*0.00020575).toFixed(2)}</Typography>
                                                    </Stack>
                                                    <Stack alignItems="flex-start" sx={{ pt: "4px", zIndex: "2" }}>
                                                        <Chip size='small' label='Primary' sx={{ color: "white", background: "#37AF43", borderRadius: "10px 10px 10px 0px" }} /> 
                                                    </Stack>
                                                    <Paper sx={{ margin: "-12px 0 8px", cursor: "pointer", background: "#161714", color: "white", border: `1px solid ${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}`, borderRadius: "12px" }} onClick={() => setSwapSelectData(0, setSwapSelectState(false))}>
                                                        <Stack direction="column" sx={{ p: "14px 8px", color: `${swapSelectData !== 0 && "#7E8B74"}` }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom>{token2.symbol ? token2.symbol : "FrenChain"}</Typography>
                                                                <Typography gutterBottom>{maxAmount}</Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography sx={{ fontSize: "14px", color: `${swapSelectData === 0 ? "#34F14B" : "#7E8B74"}` }}>Tx cost 41682.3131 FREN</Typography>
                                                                <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>~$8.88 (-0.69%)</Typography>
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
                                                                        <Typography sx={{ fontSize: "14px", color: `${swapSelectData === 1 ? "#34F14B" : "#7E8B74"}` }}>Tx cost 0.0233 = (~$80.43)</Typography>
                                                                        <Typography sx={{ fontSize: "14px", color: "#7E8B74" }}>~$2,426 (-0.06%)</Typography>
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
                                                                            <Typography sx={{ fontSize: "14px" }}>Tx cost 0.0233 = (~$80.43)</Typography>
                                                                            <Typography sx={{ fontSize: "14px" }}>~$2,426 (-0.06%)</Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Paper>
                                                            }
                                                        </Box>
                                                    }
                                                </Stack>
                                            </Paper>
                                            {
                                                active ?
                                                    <Box sx={{ width: "100%" }}>
                                                        {swapBtnState === 0 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Enter amount to swap</Typography></SwapButton>}
                                                        {swapBtnState === 1 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>No Liquidity Pool</Typography></SwapButton>}
                                                        {swapBtnState === 2 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient balance to pay for gas</Typography></SwapButton>}
                                                        {swapBtnState === 3 && <SwapButton disabled={true} sx={{ background: "#37474f" }}><Typography sx={{ color: "#78909c", py: "3px", fontWeight: "600" }}>Insufficient {token1.symbol} balance</Typography></SwapButton>}
                                                        {swapBtnState === 4 && <SwapButton onClick={tokenApprove}>Give permission to use {token1.symbol}</SwapButton>}
                                                        {swapBtnState === 5 && <SwapButton onClick={tokenSwap}>swap</SwapButton>}
                                                        {swapBtnState === 6 && <SwapButton disabled={true}>Loading...</SwapButton>}
                                                    </Box>
                                                    :
                                                    <SwapButton onClick={() => setIsOpenDialog(true)}>Connect Wallet</SwapButton>
                                            }
                                        </Stack>
                                    }
                                    {swapTabValue === 1 &&
                                        <Stack direction="column" alignItems="center">
                                            <Paper sx={{ width: "100%", background: "#101010", borderRadius: "12px", mt: "25px" }}>
                                                <Stack direction="column" sx={{ p: "12px 24px" }}>
                                                    <Typography gutterBottom sx={{ fontSize: "14px", color: "#7E8B74" }}>From</Typography>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ p: "10px 0" }}>
                                                        <Button startIcon={<Avatar sx={{ width: "30px", height: "30px" }} src={token1.logoURI&&token1.logoURI} />} endIcon={<ExpandMoreIcon />} sx={{ fontSize: "16px", color: "white" }} onClick={() => setTokenDialogState(1)}>{token1.symbol&&token1.symbol}</Button>
                                                        <Input className='swap_input' color="primary" type='number' variant="standard" sx={{ color: "white" }}></Input>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#34F14B" }}>
                                                        <Typography sx={{ fontSize: "14px" }}>Wrapped Ether</Typography>
                                                        <Typography sx={{ fontSize: "14px" }}>~$3,216</Typography>
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
                                                        <Typography gutterBottom sx={{ fontSize: "14px" }}>Balance: 0.00</Typography>
                                                    </Stack>
                                                    <Stack alignItems="flex-start" sx={{ p: "10px 0" }}>
                                                        <Button startIcon={<Avatar sx={{ width: "30px", height: "30px" }} src={token2.logoURI&&token2.logoURI} />} endIcon={<ExpandMoreIcon />} sx={{ fontSize: "16px", color: "white" }} onClick={() => setTokenDialogState(2)}>{token2.symbol&&token2.symbol}</Button>
                                                    </Stack>
                                                    <Paper sx={{ margin: "0 0 8px", background: "#161714", border: "1px solid #7E8B74", borderRadius: "12px" }}>
                                                        <Stack direction="column" sx={{ p: "14px 8px", color: "white" }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom>1inch</Typography>
                                                                <Typography gutterBottom>3 214.09829</Typography>
                                                            </Stack>
                                                            <Typography sx={{ fontSize: "14px", color: "#34F14B" }}>Tx cost 0.0233 = (~$80.43)</Typography>
                                                        </Stack>
                                                    </Paper>
                                                    <Paper sx={{ background: "#161714", border: "1px solid #7E8B74", borderRadius: "12px" }}>
                                                        <Stack direction="column" sx={{ p: "14px 8px", color: "#34F14B" }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom>1inch</Typography>
                                                                <Typography gutterBottom>3 214.09829</Typography>
                                                            </Stack>
                                                            <Typography sx={{ fontSize: "14px", color: "#34F14B" }}>Tx cost 0.0233 = (~$80.43)</Typography>
                                                        </Stack>
                                                    </Paper>
                                                </Stack>
                                            </Paper>
                                            <Button variant='contained' color='primary' sx={{ width: "100%", color: "white", fontWeight: "700", fontSize: "16px", borderRadius: "12px" }}>Connect Wallet</Button>
                                        </Stack>
                                    }
                                </Box>
                            </SwapPaper>
                            <Stack direction="column" sx={{ maxWidth: "476px", width: "100%", m: "20px 0 230px" }} spacing={1}>
                                {rateState === 0 ?
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Link underline='none' sx={{ color: "white" }} onClick={() => setRateState(1)}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography sx={{ fontSize: "14px" }}>Rate</Typography>
                                                <ExpandMoreIcon />
                                            </Stack>
                                        </Link>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography sx={{ fontSize: "14px" }}>1 {token2.symbol?token2.symbol:"FREN"} = {Number((token2.priceUSD?token2.priceUSD:1 / token1.priceUSD?token1.priceUSD:1).toFixed(5))} {token1.symbol} (~${Number(token2.priceUSD?token2.priceUSD.toFixed(5) : 0.00020575)})</Typography>
                                            <InfoOutlinedIcon />
                                        </Stack>
                                    </Stack>
                                    :
                                    <Stack direction="column" spacing={1}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Link underline='none' sx={{ color: "white" }} onClick={() => setRateState(0)}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography sx={{ fontSize: "14px" }}>{`1 ${token1.symbol} Price`}</Typography>
                                                    <ExpandLessIcon />
                                                </Stack>
                                            </Link>
                                            <Typography sx={{ fontSize: "14px" }}>{`${Number((token1.priceUSD / token2.priceUSD).toFixed(5))} ${token2.symbol} (~$${token1.priceUSD && Number(token1.priceUSD.toFixed(5))})`}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography sx={{ fontSize: "14px" }}>{`1 ${token2.symbol} Price`}</Typography>
                                            <Typography sx={{ fontSize: "14px" }}>{`${Number((token2.priceUSD / token1.priceUSD).toFixed(5))} ${token1.symbol} (~$${token2.priceUSD && Number(token2.priceUSD.toFixed(5))})`}</Typography>
                                        </Stack>
                                        {dexsOrder &&
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography sx={{ fontSize: "14px" }}>Minimum received</Typography>
                                                <Typography sx={{ fontSize: "14px" }}>{`${Number((dexsOrder[swapSelectData].amountOut-(dexsOrder[swapSelectData].amountOut * slippage / 100)).toFixed(5))} ${token2.symbol}`}</Typography>
                                            </Stack>
                                        }
                                    </Stack>
                                }
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography sx={{ fontSize: "14px" }}>Route</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={{ fontSize: "14px" }}>{`${token1.symbol?token1.symbol:"FrenChain"} > ${token2.symbol?token2.symbol:"FrenChain"}`}</Typography>
                                        <ExpandLessIcon />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>}
                </Stack>
            </ThemeProvider> 
        <Cwallet isOpenDialog = { isOpenDialog } setIsOpenDialog = { setIsOpenDialog } chain = { chainState } setChain = { setChainState } tokenDialogState = { tokenDialogState } setTokenDialogState = { setTokenDialogState } selectToken = { selectToken } swapSettingDialogState = { swapSettingDialogState } setSwapSettingDialogState = { setSwapSettingDialogState } poolCreateDialogState = { poolCreateDialogState } setPoolCreateDialogState = { setPoolCreateDialogState } setPools = { setPools } setImportAlert = { setImportAlert } />
    </>
    );
}