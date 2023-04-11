import axios from 'axios';
import {
    Multicall
  } from 'ethereum-multicall';

import { erc20Abi, lockerContractAbi, lockerAddress } from "./constants";
import erc721Abi from "./erc721_abi.json";
import Web3 from "web3";
import dexscreener from 'dexscreener-api';
import { walletAddress } from './redux/reducers';

const provider = {
    "Ethereum": "https://mainnet.infura.io/v3/3587df9c45a740f9812d093074c6a505",
    "Binance Smart Chain": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "Binance": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "Avalanche": "https://api.avax.network/ext/bc/C/rpc",
    "Avalanche_testnet": "https://api.avax-test.network/ext/bc/C/rpc",
    "Kekchain_testnet": "https://testnet.kekchain.com",
    "Kekchain": "https://mainnet.kekchain.com",
    "Frenchain_testnet": "https://rpc-01tn.frenchain.app",
    "Frenchain": "https://rpc-02.frenscan.io"
};

export const explorer = {
    "Ethereum": "https://etherscan.io",
    "Binance Smart Chain": "https://bscscan.com",
    "Binance": "https://bscscan.com",
    "Avalanche": "https://snowtrace.io",
    "Avalanche_test": "https://testnet.snowtrace.io",
    "Kekchain": "https://mainnet-explorer.kekchain.com",
    "Kekchain_testnet": "https://testnet-explorer.kekchain.com",
    "Frenchain": "https://frenscan.io",
    "Frenchain_testnet": "https://testnet.frenscan.io"
};

const apiKey = 'SvMhtTsmQ239NmpwWjnnLWXtag5Jt8wYp7NF8F3Tear1QSaDRl9gnM34JZVXdLFV';
const apiConfig = {
    headers: {
        'x-api-key': apiKey
    }
}
const serverUrl = 'https://deep-index.moralis.io/api/v2';
const serverApi = 'http://localhost:5000/api';

export const getTokenPrice = async function (_chain, _tokenAddress) {
    let price;
    try {
        const pairsResponse = await dexscreener.getPairInformationByChain(_chain, _tokenAddress); console.log("pairsResponse: ",pairsResponse);
        price = 0;
    } catch (e) {
        price = 0;
        {/*
            *   // Get pair information by chain
            *   // // Get pairs matching base token address
            *   // const tokensResponse = await getPairsMatchingBaseTokenAddress("0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
            *   // // Search for pairs matching query
            *   // const searchResponse = await searchPairsMatchingQuery("WBNB USDC");
            *   // await axios.get(`${serverUrl}/erc20/${_tokenAddress}/price?chain=${_chain}`, apiConfig);
        */}
    }
    return price && price.data;
}
export const getERC20Metadata = async function (provider, _chain, _tokenAddress, address) {
    console.log("getERC20Metadata: ",_chain, _tokenAddress);
    let result; let decimals; let symbol; let name; let balanceOf;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(await erc20Abi, _tokenAddress);
        decimals = await contract.methods["decimals"]().call();
        symbol = await contract.methods["symbol"]().call();
        balanceOf = await contract.methods["balanceOf"](address).call();
        name = await contract.methods["name"]().call();
        result = [{
            "balanceOf":parseFloat(balanceOf),
            "balance":parseFloat(balanceOf),
            "userBalance":parseFloat(balanceOf),
            "decimals":parseFloat(decimals),
            "symbol":symbol,
            "tokenTitle":name,
            "name":name
        }]; 
    } catch(e) {
        console.log("booting the backup");
        try {
            let web3 = new Web3(provider);
            let contract = new web3.eth.Contract(await erc20Abi, _tokenAddress[0]);
            decimals = await contract.methods["decimals"]().call();
            symbol = await contract.methods["symbol"]().call();
            balanceOf = await contract.methods["balanceOf"](address).call();
            name = await contract.methods["name"]().call();
            result = [{
                "balanceOf":parseFloat(balanceOf),
                "balance":parseFloat(balanceOf),
                "userBalance":parseFloat(balanceOf),
                "decimals":parseFloat(decimals),
                "symbol":symbol,
                "tokenTitle":name,
                "name":name
            }]; 
        } catch(e) {
            console.log(e);
        } finally {
            console.log("result: ",result);
            // eslint-disable-next-line
            return result;
        }
    } finally {
        console.log("result: ",result);
        // eslint-disable-next-line
        return result;
    };
}
export const getTokenMetadata = async function (_chain, _tokenAddress) {
        console.log("getTokenMetadata: ",_chain, _tokenAddress);
    // replace moralis
    // 1) call() to contract => BASE_URI 
    // 2) call() to contract => TOKEN_URI||TOKEN_ID 
    // = async (provider, id, account, network) => {
    let result; let decimals; let symbol; let name;
    try {
        let web3 = new Web3(provider);
        // let ERC721_contract = new web3.eth.Contract(erc721Abi, _tokenAddress);
        let contract = new web3.eth.Contract(erc20Abi, _tokenAddress);
        decimals = await contract.methods["decimals"]().call();
        symbol = await contract.methods["symbol"]().call();
        name = await contract.methods["name"]().call();
        result = {
            "decimals":decimals,
            "symbol":symbol,
            "name":name
        };
        console.log("result: ",result);
        return result;
    } catch(e) {
        console.log(e);
    };
    // const tokenMetadata = await axios.get(`${serverUrl}/erc20/metadata?chain=${_chain}&addresses=${_tokenAddress}`, apiConfig);
}
export const getMyLockers = async function (account, network) {
    console.log("getMyLockers: ",account, network);
    let result; let _my_locks;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, lockerAddress[network]);
        _my_locks = await contract.methods["_my_locks"](account).call();
        let _my_lockers = [];
        for(let m = 0; m < _my_locks.length; m++) {
            _my_lockers.push(_my_locks[m]);
        };
        let i = 0;
        while(i<_my_lockers.length) {
            if(i==_my_lockers.length-1) {
                break;
            } else {
                i++;
            };
        };
        _my_locks = await contract.methods["_my_locks"](account).call();
        result = {
            "_my_locks":_my_locks
        };
        console.log("result: ",result);
        return result;
    } catch(e) {
        console.log(e);
    };
    // const tokenMetadata = await axios.get(`${serverUrl}/erc20/metadata?chain=${_chain}&addresses=${_tokenAddress}`, apiConfig);
}
export const getNFTTokenMetadata = async function (_chain, _tokenAddress) {
        console.log("getTokenMetadata: ",_chain, _tokenAddress);
    // replace moralis
    // 1) call() to contract => BASE_URI 
    // 2) call() to contract => TOKEN_URI||TOKEN_ID 
    // = async (provider, id, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc721Abi, _tokenAddress);
        result = await contract.methods["tokenURI"](1).call();
        console.log("result: ",result);
        return result.status;
    } catch(e) {
        console.log(e);
    };
    // const tokenMetadata = await axios.get(`${serverUrl}/erc20/metadata?chain=${_chain}&addresses=${_tokenAddress}`, apiConfig);
}

export const getTokenBalance = async function (_chain, _tokenAddress, _walletAddress) {
        console.log("getTokenBalance: ",_chain, _tokenAddress, _walletAddress);
    // replace moralis
    // call() to explorer => get_balance()
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, _tokenAddress);
        result = await contract.methods["balanceOf"](_walletAddress).call();
        console.log("result: ",result);
        return result.status;
    } catch(e) {
        console.log(e);
    };
    // const balances = await axios.get(`${serverUrl}/${_walletAddress}/erc20?chain=${_chain}&token_addresses=${_tokenAddress}`, apiConfig);
    // return balances.data;
}

export const runContractFunction = async function (_chain, _contractAddress, _functionName, _abi, _params) {
        console.log("runContractFunction: ",_chain, _contractAddress, _functionName, _abi, _params);
    // replace moralis
    // injected web3 via ethersJS||web3.js
    let result;
    try {
        // result = await axios.post(`${serverUrl}/${_contractAddress}/function?chain=${_chain}&function_name=${_functionName}`, {
        //     "abi": _abi,
        //     "params": _params
        // }, apiConfig);
    } catch (e) {
        result = null;
    }
    return result ? result.data : null;
}

export const getCurrentFee = async function (_chain, _tokenAddress, _walletAddress) {
    const dynamicFeeAbi = [{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getDynamicFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    if (await isExcludedFromFee(_chain, _tokenAddress, _walletAddress)) return 0;
    const dynamicFee = await runContractFunction(_chain, _tokenAddress, 'getDynamicFee', dynamicFeeAbi, {from:_walletAddress});
    return dynamicFee;
}

export const isExcludedFromFee = async function (_chain, _tokenAddress, _walletAddress) {
    const isExcludedFromFeeAbi = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
    return await runContractFunction(_chain, _tokenAddress, 'isExcludedFromFee', isExcludedFromFeeAbi, {account:_walletAddress});
}

export const getCommonFee = async function (_chain, _tokenAddress) {
    const liquidityAndMarketingFeeAbi = [{"inputs":[],"name":"_liquidityAndMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const taxFeeAbi = [{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    let commonFee = 0;
    await Promise.all([
        runContractFunction(_chain, _tokenAddress, '_liquidityAndMarketingFee', liquidityAndMarketingFeeAbi, {}),
        runContractFunction(_chain, _tokenAddress, '_taxFee', taxFeeAbi, {})
    ]).then(results => results.map(each => commonFee += Number(each)));
    return commonFee;
}

export const burntAndLeftTokenPercent = async function (_chain, _tokenAddress) {
    const burntVsCirculatingSupplyAbi = [{"inputs":[],"name":"burntVsCirculatingSupply","outputs":[{"internalType":"uint256","name":"burnt","type":"uint256"},{"internalType":"uint256","name":"circulating","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const data = await runContractFunction(_chain, _tokenAddress, 'burntVsCirculatingSupply', burntVsCirculatingSupplyAbi);
    return {burnt: Number(data[0]), left: Number(data[1]), leftPercent: data[1] / (Number(data[0]) + Number(data[1])) * 100};
}

export const totalFees = async function (_chain, _tokenAddress) {
    const totalFeesAbi = [{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const data = await runContractFunction(_chain, _tokenAddress, 'totalFees', totalFeesAbi);
    return data;
}

export const getTransactions = async function (_chain, _walletAddress) {
    const transactions = await axios.get(`${serverUrl}/${_walletAddress}/erc20/transfers?chain=${_chain}&offset=0&oder=desc`, apiConfig);
    return transactions.data;
}

export const getLogsByAddress = async function (_chain, _tokenAddress) {
    // replace moralis
    // enable param *(topic_hash) { user supplied topic hash }
    // add back (events) fn() from iStack tests
    let offset = 0;
    const response = await axios.get(`${serverUrl}/${_tokenAddress}/logs?chain=${_chain}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&offset=${offset}&oder=desc`, apiConfig);
    let logs = response.data.result;
    const total = response.data.total;
    const pages = Math.ceil(total / 500);
    let page = 1;
    let getLogFunctions = [];
    while (page < pages) {
        offset = page * 500;
        getLogFunctions.push(axios.get(`${serverUrl}/${_tokenAddress}/logs?chain=${_chain}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&offset=${offset}&oder=desc`, apiConfig));
        page++;
    }
    if (getLogFunctions.length) {
        await Promise.all(getLogFunctions).then(results => {
            results.map(each => {
                logs = logs.concat(each.data.result);
            })
        })
    }
    return logs;
}

function getAddress(topic) {
    if (topic === null || topic === '') return '';
    return `0x${topic.substring(topic.length - 40)}`;
}

function filterLogs(logs, _walletAddress) {
    return logs.filter(each => getAddress(each.topic1) === _walletAddress.toLowerCase() || getAddress(each.topic2) === _walletAddress.toLowerCase());
}

function getValue(topic) {
    return parseInt(topic, 16);
}

async function calculateBuySell(logs, _chain, _tokenAddress, _walletAddress) {
    let buy = 0, sell = 0, isFee = true;
    if (await isExcludedFromFee(_chain, _tokenAddress, _walletAddress)) isFee = false;
    logs.map(each => {
        if (getAddress(each.topic1) === _walletAddress.toLowerCase()) {
            if (isFee) {
                sell += getValue(each.data) / 97 * 100;
            } else {
                sell += getValue(each.data);
            }
        } else buy += getValue(each.data);
    })
    let result = {buy: buy, sell: sell};
    return result;
}

export const walletExchange = async function(_chain, _tokenAddress, _walletAddress) {
    let logs;
    await getLogsByAddress(_chain, _tokenAddress).then(data=> {
        logs = filterLogs(data, _walletAddress);
    })
    return await calculateBuySell(logs, _chain, _tokenAddress, _walletAddress);
}