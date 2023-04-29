import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { Contract } from "@ethersproject/contracts";
import ERC20Token from "./abis/erc20.json";
import { SupportedChainSymbols, WrappedSymbols } from "./constants/chains";
import { escapeRegExp } from ".";
import { inputRegex } from "../components/Farming/Modals/Filter";
import { useSelector } from "react-redux";
import { RPC } from "../config/connectors";
export const removeSideTab = (sideBarName) => {
    localStorage.setItem(sideBarName, "removed");
};
export const handleRangeChange = (setRange, e, max) => {
    if (e.target.value !== "" &&
        inputRegex.test(escapeRegExp(e.target.value.replace(/,/g, ".")))) {
        if (max
            ? parseFloat(e.target.value) >= 10000
            : parseFloat(e.target.value) <= 0) {
            setRange(max ? 10000 : 0);
        }
        else {
            setRange(parseFloat(e.target.value));
        }
    }
    else if (e.target.value === "") {
        setRange("");
    }
};
export const handleNewestToOldest = (setNewestToOldest, setOldestToNewset, oldestToNewest) => {
    if (oldestToNewest) {
        setOldestToNewset(false);
        setNewestToOldest(true);
    }
    else {
        setNewestToOldest(true);
    }
};
export const handleOldestToNewest = (setNewestToOldest, setOldestToNewset, newestToOldest) => {
    if (newestToOldest) {
        setNewestToOldest(false);
        setOldestToNewset(true);
    }
    else {
        setOldestToNewset(true);
    }
};
export const filterFarms = (newestToOldest, farmData, min, max, setSearchedFarmData, chainId) => {
    if (newestToOldest && farmData.contents) {
        let dataArray = [...farmData.contents];
        const arrayLength = dataArray.length;
        const firstItem = dataArray.splice(0, 1);
        const lastItem = dataArray.splice(chainId === 80001 ||
            chainId === 137 ||
            chainId === 42261 ||
            chainId === 42262
            ? 3
            : arrayLength - 2, chainId === 80001 ||
            chainId === 137 ||
            chainId === 42261 ||
            chainId === 42262
            ? 10
            : 1);
        const searchResult = dataArray.filter((item, idx) => item.ARYValue > min && item.ARYValue < max);
        const editSearch = [...searchResult];
        // editSearch.unshift(firstItem[0]);
        // editSearch.push(lastItem[0]);
        setSearchedFarmData(editSearch);
        return editSearch;
    }
    else if (!newestToOldest && farmData.contents) {
        let dataArray = [...farmData.contents];
        let normal = [...farmData.contents];
        let resortedArray = dataArray.reverse();
        const arrayLength = dataArray.length;
        const firstItem = dataArray.splice(0, chainId === 80001 ||
            chainId === 137 ||
            chainId === 42261 ||
            chainId === 42262
            ? 9
            : 1);
        const lastItem = dataArray.splice(dataArray.length - 1, 1);
        const searchResult = dataArray.filter((item) => item.ARYValue > min && item.ARYValue < max);
        const editSearch = [...searchResult];
        setSearchedFarmData(searchResult);
        return editSearch;
    }
};
export const checkSideTab = (sideBarName) => {
    const isSidebarActive = localStorage.getItem(sideBarName);
    if (isSidebarActive === "removed") {
        return true;
    }
    else {
        return false;
    }
};
export const changeFrequencyTodays = (frequency) => {
    let interval = 60 * 24;
    let date = new Date();
    let today = date.getTime() / (1000 * 60);
    let days = 1;
    if (frequency === "daily") {
        interval = 60 * 24;
    }
    else if (frequency === "weekly") {
        days = 7;
        interval = days * 24 * 60;
        today = today + 1;
    }
    else if (frequency === "monthly") {
        days = 30;
        // interval = days * 24 * 60
        today = today + 1;
    }
    else if (frequency === "30" || frequency === "5") {
        interval = parseInt(frequency);
        today = today + 1;
    }
    return { today, interval, days };
};
export const useProvider = () => {
    const ChainId = useSelector((state) => state.chainId.chainId);
    const [prov, setProv] = useState(new JsonRpcProvider(`https://bsc-dataseed.binance.org`, 56));
    useEffect(() => {
        const getProvider = () => {
            const defaultProvider = new JsonRpcProvider(RPC[ChainId], ChainId);
            setProv(defaultProvider);
        };
        getProvider();
    }, [ChainId]);
    return { prov };
};
export const provider = async () => {
    try {
        let ethProvider = await detectEthereumProvider();
        if (ethProvider !== window.ethereum && window.ethereum !== "undefined") {
            ethProvider = window.ethereum;
            return new Web3Provider(ethProvider);
        }
        return new Web3Provider(ethProvider);
    }
    catch (e) {
        console.log("provider error", e);
    }
};
export const signer = async (library) => {
    try {
        return await library?.getSigner();
    }
    catch (e) {
        console.log("provider error", e);
    }
};
export const getERC20Token = async (address, library) => {
    const type = library instanceof Web3Provider;
    const signerOrProvider = type ? library?.getSigner() : library;
    return new Contract(address, ERC20Token, signerOrProvider);
};
export const getDecimals = async (address, library) => {
    const token = await getERC20Token(address, library);
    const decimals = await token.decimals();
    return decimals;
};
export const switchNetwork = async (chainId, account, library) => {
    const polygonParams = {
        chainId: "0x89",
        chainName: "Matic",
        nativeCurrency: {
            name: "Matic",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://polygon-rpc.com"],
        blockExplorerUrls: ["https://polygonscan.com"],
    };
    const ropstenParams = {
        chainId: "0x3",
        chainName: "Ropsten Test Network",
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
        blockExplorerUrls: ["https://ropsten.etherscan.io"],
    };
    const binanceParams = {
        chainId: "0x38",
        chainName: "Binance Smart Chain",
        nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"],
    };
    const AvalancheParams = {
        chainId: "0xA86A",
        chainName: "Avalanche Network",
        nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io/"],
    };
    const oasisParams = {
        chainId: "0xa516",
        chainName: "Emerald Mainnet",
        nativeCurrency: {
            name: "ROSE",
            symbol: "ROSE",
            decimals: 18,
        },
        rpcUrls: ["https://emerald.oasis.dev"],
        blockExplorerUrls: ["https://explorer.emerald.oasis.dev"],
    };
    if (chainId === "0x1") {
        library?.send("wallet_switchEthereumChain", [{ chainId }, account]);
    }
    else if (chainId === "0x3") {
        try {
            await library?.send("wallet_switchEthereumChain", [
                { chainId: "0x3" },
                account,
            ]);
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library?.send("wallet_addEthereumChain", [
                        ropstenParams,
                        account,
                    ]);
                }
                catch (addError) {
                    // handle "add" error
                    console.error(`Add chain error ${addError}`);
                }
            }
            else if (switchError.code === 4001) {
                throw new Error("User rejected this request");
            }
            console.error(`Switch chain error ${switchError}`);
            // handle other "switch" errors
        }
    }
    else if (chainId === "0xA86A") {
        try {
            await library?.send("wallet_switchEthereumChain", [
                { chainId: "0xA86A" },
                account,
            ]);
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library?.send("wallet_addEthereumChain", [
                        AvalancheParams,
                        account,
                    ]);
                }
                catch (addError) {
                    // handle "add" error
                    console.error(`Add chain error ${addError}`);
                }
            }
            else if (switchError.code === 4001) {
                throw new Error("User rejected this request");
            }
            console.error(`Switch chain error ${switchError}`);
            // handle other "switch" errors
        }
    }
    else if (chainId === "0xA86A8") {
        try {
            await library?.send("wallet_switchEthereumChain", [
                { chainId: "0x38" },
                account,
            ]);
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library?.send("wallet_addEthereumChain", [
                        binanceParams,
                        account,
                    ]);
                }
                catch (addError) {
                    // handle "add" error
                    console.error(`Add chain error ${addError}`);
                }
            }
            console.error(`Switch chain error ${switchError}`);
            // handle other "switch" errors
        }
    }
    else if (chainId === "0x89") {
        try {
            await library?.send("wallet_switchEthereumChain", [
                { chainId: "0x89" },
                account,
            ]);
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library?.send("wallet_addEthereumChain", [
                        polygonParams,
                        account,
                    ]);
                }
                catch (addError) {
                    // handle "add" error
                    console.error(`Add chain error ${addError}`);
                }
            }
            console.error(`Switch chain error ${switchError}`);
            // handle other "switch" errors
        }
    }
    else if (chainId === "0xa516") {
        try {
            await library?.send("wallet_switchEthereumChain", [
                { chainId: "0xa516" },
                account,
            ]);
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library?.send("wallet_addEthereumChain", [
                        oasisParams,
                        account,
                    ]);
                }
                catch (addError) {
                    // handle "add" error
                    console.error(`Add chain error ${addError}`);
                }
            }
            console.error(`Switch chain error ${switchError}`);
            // handle other "switch" errors
        }
    }
};
export const getDeadline = (userDeadline) => {
    const time = Math.floor(new Date().getTime() / 1000 + userDeadline);
    return time;
};
export const isNative = (symbol, chainId) => {
    if (symbol === WrappedSymbols[chainId]) {
        return true;
    }
    else {
        return false;
    }
};
export const ISNATIVE = (symbol, chainId) => {
    if (symbol === SupportedChainSymbols[chainId]) {
        return true;
    }
    else {
        return false;
    }
};
export const formatAmountIn = (amount, decimals) => {
    return ethers.parseUnits(truncate(amount, decimals), decimals);
};
export function truncate(str, maxDecimalDigits) {
    if (str && str.toString()?.includes(".")) {
        const parts = str.toString().split(".");
        return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
};
export const formatAmount = (value) => parseFloat(value).toLocaleString();
export const getOutPutDataFromEvent = async (tokenAddress, eventsArray, decimal) => {
    const duplicateArray = [];
    eventsArray.map((event) => {
        if (event.address.toLowerCase() === tokenAddress.toLowerCase()) {
            duplicateArray.push(event);
        }
    });
    if (duplicateArray.length !== 0) {
        const convertedInput = (parseInt(duplicateArray[0].data, 16) /
            10 ** decimal).toFixed(7);
        return convertedInput;
    }
};