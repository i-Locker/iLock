const { ethereum } = window;
import axios from 'axios';
import Web3 from "web3";
import {
    Multicall
} from 'ethereum-multicall';
import { ethers, formatUnits, parseUnits } from "ethers";
import liquidityPoolAbi from "./liquidityPool_abi.json";
import { iBridgeAddress, iUniswapAbi, iBridgeAbi, iVaultAbi, maxTxLimit, lockerAddress, swapTokenLockerFactory, airdropAddress, migratorABI, iMigratorAddress, DEFAULT_ILOCKER_CONTRACT, lockerContractAbi, erc20Abi, network_decimals, network_to_chain, network_lower_to_proper } from './constants';
export const serverApi = 'http://localhost:5000/api';
export const provider = {
    "Ethereum": "https://endpoints.omniatech.io/v1/eth/mainnet/public",
    "Goerli": "https://rpc.ankr.com/eth_goerli",
    "Cronos": "https://evm.cronos.org/",
    "Cronos_testnet": "https://evm-t3.cronos.org/",
    "Polygon_testnet": "https://rpc-mumbai.maticvigil.com",
    "Polygon": "https://polygon-rpc.com",
    "Binance Smart Chain": "https://bsc-dataseed.binance.org",
    "Binance": "https://bsc-dataseed.binance.org",
    "Binance_testnet": "https://data-seed-prebsc-2-s3.binance.org:8545",
    "Avalanche": "https://api.avax.network/ext/bc/C/rpc",
    "Avalanche_testnet": "https://api.avax-test.network/ext/bc/C/rpc",
    "Kekchain_testnet": "https://testnet.kekchain.com",
    "Kekchain": "https://mainnet.kekchain.com",
    "Frenchain_testnet": "https://rpc-01tn.frenchain.app",
    "Frenchain": "https://rpc-02.frenscan.io"
};
export const explorer = {
    "Ethereum": "https://etherscan.io",
    "Goerli": "https://goerli.etherscan.io",
    "Cronos": "https://cronoscan.com/",
    "Cronos_testnet": "https://cronos.org/explorer/testnet3/",
    "Binance Smart Chain": "https://bscscan.com",
    "Polygon_testnet": "https://mumbai.polygonscan.com",
    "Polygon": "https://polygonscan.com",
    "Binance": "https://bscscan.com",
    "Binance_testnet": "https://testnet.bscscan.com",
    "Avalanche": "https://snowtrace.io",
    "Avalanche_testnet": "https://testnet.snowtrace.io",
    "Kekchain": "https://mainnet-explorer.kekchain.com",
    "Kekchain_testnet": "https://testnet-explorer.kekchain.com",
    "Frenchain": "https://frenscan.io",
    "Frenchain_testnet": "https://testnet.frenscan.io"
};
export const _getBN = async (lockAmount, tokenDecimals) => {
    return await parseUnits(lockAmount.toString(), parseInt(tokenDecimals));
};
export const _getUIfmt = async (lockAmount, tokenDecimals) => {
    return await formatUnits(lockAmount.toString(), parseInt(tokenDecimals));
};
export const getETHtoChecksum = async (provider, account) => {
    let result;
    try {
        let web3 = new Web3(provider);
        result = await web3.utils.toChecksumAddress(account);
        console.log("toChecksumAddress: ",result);
        return result;
    } catch (e) {
        console.log(e);
    };
};
export const deposit = async (provider, tokenSymbol, isEth, token, amount, date, account, holder, network, decimals, gasLimit) => {
    let result;
    try {
        let unlockDate = new Date(date);
        let UTCTimestamp = Math.round(unlockDate.getTime() / 1000)
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        let feeInETH = await contract.methods.iLocker_CORE(0).call();
        feeInETH = feeInETH["donation_in_ETH"];
            console.log("feeInETH: ",feeInETH);
        gasLimit = parseFloat(gasLimit) > 30000000 ? parseFloat(gasLimit) * parseFloat(0.888) : gasLimit;
        feeInETH = parseFloat(web3.utils.fromWei(feeInETH.toString(), "ether")) * parseFloat(1.5);
        feeInETH = await web3.utils.toWei(feeInETH.toString(), "ether");
        console.log("depositing: ", isEth, lockerAddress[network], feeInETH, token, await _getBN(amount,decimals), UTCTimestamp, await getETHtoChecksum(provider,account), await getETHtoChecksum(provider,holder), network)
        if (isEth == false) {
            feeInETH = parseFloat(web3.utils.fromWei(feeInETH.toString(), "ether")) * parseFloat(1.05);
            feeInETH = await web3.utils.toWei(feeInETH.toString(), "ether");
            if (feeInETH) {
                result = await contract.methods["createLock"](token, tokenSymbol, isEth, holder, await _getBN(amount,decimals), UTCTimestamp).send({ from: await getETHtoChecksum(provider,account), value: feeInETH, gasLimit: gasLimit });
                console.log("deposited: ", result);
                return result;
            } else {
                return false;
            };
        } else {
            feeInETH = parseFloat(web3.utils.fromWei(feeInETH.toString(), "ether")) * parseFloat(1.25);
            feeInETH = await web3.utils.toWei(feeInETH.toString(), "ether");
            let sendingEther;
            sendingEther = parseFloat(web3.utils.fromWei(feeInETH.toString(), "ether")) + parseFloat(amount);
            sendingEther = await web3.utils.toWei(sendingEther.toString(), "ether");
            if (feeInETH) {
                result = await contract.methods["createLock"](await getETHtoChecksum(provider,account), tokenSymbol, isEth, await getETHtoChecksum(provider,holder), web3.utils.toWei(amount.toString(), 'ether'), UTCTimestamp).send({ from: await getETHtoChecksum(provider,account), value: sendingEther, gasLimit: gasLimit });
                console.log("deposited: ", result);
                return result;
            } else {
                return false;
            };
        }
    } catch (e) {
        console.log(e);
    };
};

export const w3 = async (provider, network) => {
    let w3;
    try {
        let web3 = new Web3(provider);
        w3 = web3;
        return w3;
    } catch (e) {
        console.log(e);
        let web3 = new Web3(provider[network]);
        w3 = web3;
        return w3;
    };
};

export const myLocks = async (provider, account, network) => {
    let result; let lockerDataByWallet;
    try {
        let web3 = new Web3(provider);
        const tokenContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network], account);
        let myLocks = await tokenContract.methods.myLocks_(account).call({ from: account });
        console.log("myLocks_: ", myLocks, account, network);
        let x = 0; let l_arr = [];
        while (x < myLocks.length) {
            let getLock = await tokenContract.methods.myiLock(myLocks[x]).call({ from: account });
            console.log("getLock: ", getLock);
            let iLock = {
                "lockId": getLock["lockId"],
                "holdingContract": getLock["holdingContract"],
                "token": getLock["token"],
                "amount": getLock["amount"],
                "holder": getLock["holder"],
                "getLock": [getLock],
                "lockerAddress": lockerAddress[network],
                "locker": lockerAddress[network]
            };
            l_arr.push(iLock);
            if (x == myLocks.length - 1) {
                lockerDataByWallet = [{ "data": l_arr, "token": ["token"], "getLock": [l_arr] }];
                break;
            } else {
                x++;
            };
        };
        return lockerDataByWallet;
    } catch (e) {
        console.log(e);
        return [{ "data": ["data"], "token": ["token"] }];
    };
};

export const transferOwnership_iLock = async (provider, lockId, account, to, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        console.log("myLocks_: ", account, to, lockId, network);
        let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        result = await contract.methods["transferFrom"](account, to, lockId).call({ from: account });
        return result.status;
    } catch (e) {
        console.log("yo: ", e);
    };
};

export const get_iVault_byIndex = async (provider, index, account, network) => {
    let result_iBridge;
    try {
        let web3 = new Web3(provider);
        console.log("get_iVault_byIndex: ", account, index, network);
        let contract_iBridge = new web3.eth.Contract(iBridgeAbi, iBridgeAddress[network]);
        result_iBridge = await contract_iBridge.methods["get_iVault_byIndex"](index).call({ from: account });
        return result_iBridge.toString();
    } catch (e) {
        console.log("yo: ", e);
    };
};

export const migrate_v1_to_v2 = async (provider, account, amount, network) => {
    try {
        let web3 = new Web3(provider);
        console.log("migrate: ", account, amount, network);
        let contract_Migrator = new web3.eth.Contract(migratorABI, iMigratorAddress[network], account);
        let result_migrations = await contract_Migrator.methods["migrate"](amount).send({ from: account });
        if(result_migrations["transactionHash"]) {            
            window.alert("Processed! TXID: ",result_migrations["transactionHash"]);
            console.log("result_migrations: ", result_migrations);
            return result_migrations;
        };
    } catch (e) {
        console.log("yo: ", e);
    };
};

export const get_iVault_Quote_EthToToken = async (provider, iVault, token, account, amount, network) => {
    let result_iVault;
    let result_iVault_iUniswap;
    try {
        let web3 = new Web3(provider);
        let contract_iVault = new web3.eth.Contract(iVaultAbi, iVault.toString());
            amount = 1 * 10**18;
        result_iVault = await contract_iVault.methods["uniswap_handler"]().call({ from: account });
        let contract_iVault_iUniswap = new web3.eth.Contract(iUniswapAbi, result_iVault.toString());
        console.log("get_iVault_Quote_EthToToken: ", account, iVault, token, amount.toString(), network, result_iVault); 
        result_iVault_iUniswap = await contract_iVault_iUniswap.methods["getEstimatedETHforToken"](token,amount.toString()).call({ from: account });
        console.log("result_iVault_iUniswap: ",result_iVault_iUniswap); 
        return result_iVault_iUniswap;
    } catch (e) {
        console.log("yo: ", e);
    };
};

export const get_iVault_Quote_TokenToEth = async (provider, iVault, token, account, amount, network) => {
    let result_iVault;
    let result_iVault_iUniswap;
    try {
        let web3 = new Web3(provider);
        console.log("get_iVault_Quote_EthToToken: ", account, iVault, network); 
        let contract_iVault = new web3.eth.Contract(iVaultAbi, iVault);
        result_iVault = await contract_iVault.methods["uniswap_handler"]().call({ from: account });
        let contract_iVault_iUniswap = new web3.eth.Contract(iUniswapAbi, result_iVault.toString());
        result_iVault_iUniswap = await contract_iVault_iUniswap.methods["getEstimatedTokenForETH"](token,amount).call({ from: account });
        console.log("contract_iVault_iUniswap: ", result_iVault_iUniswap);
        return result_iVault_iUniswap;
    } catch (e) {
        console.log("yo: ", e);
    };
};

export const calculateSuggestedDonation = async (provider, amount, isEth, account, network) => {
    let result_iBridge;
    try {
        let web3 = new Web3(provider);
        console.log("calculateSuggestedDonation: ", amount, isEth, account);
        let contract_iBridge = new web3.eth.Contract(iBridgeAbi, iBridgeAddress[network]);
        result_iBridge = await contract_iBridge.methods["calculateSuggestedDonation"](amount, true).call({ from: account });
        console.log("result_iBridge: ", result_iBridge);
        return result_iBridge;
    } catch (e) {
        console.log("yo: ", e);
    };
};


export const bridgeToken = async (provider, index, amount, isEth, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        console.log("get_iVault_byIndex: ", account, index, network);
        let contract_iBridge = new web3.eth.Contract(iBridgeAbi, iBridgeAddress[network]);
        result_iBridge = await contract_iBridge.methods["bridgeTOKEN"](amount,index,isEth).call({ from: account });
        feeInETH = feeInETH["donation_in_ETH"];
            console.log("feeInETH: ",feeInETH);
        feeInETH = feeInETH * 2;
        console.log("bridge: ", feeInETH, token, amount, account, holder, network)
        if (feeInETH) {
            //
        };
    } catch (e) {
        console.log(e);
    };
};

export const updateProfile = async (provider, newLocker, token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        console.log("updateProfile: ", newLocker, newLocker[0], newLocker[1], token, account, network);
        return await getLocker(provider, newLocker[0], account, network);
    } catch (e) {
        console.log(e);
    };
};

export const withdraw = async (provider, id, account, receiver, isETH, network, ownable, gasLimit) => {
    let result;
    if(receiver==undefined||!receiver) {
        receiver = account;
    };
    console.log("withdraw: ", id, account, receiver, isETH, network, ownable, gasLimit);
    console.log("account: ", account);
    console.log("receiver: ", receiver);
    try {
        let web3 = new Web3(provider);
        if (ownable !== true) {
            const contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
            let feeInETH = await contract.methods.iLocker_CORE(0).call();
            feeInETH = feeInETH["donation_in_ETH"];
            console.log("feeInETH: ",feeInETH);
            feeInETH = feeInETH * 1.5103090031291;
            feeInETH = web3.utils.fromWei(feeInETH.toString(), "ether");
            feeInETH = web3.utils.toWei(feeInETH.toString(), "ether");
            result = await contract.methods["withdraw"](id, await getETHtoChecksum(provider,receiver), isETH).send({ from: account, value: feeInETH, gasLimit: gasLimit });
            console.log("withdrawn: ", result);
            return result;
        } else {
            const contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
            let feeInETH = await contract.methods.iLocker_CORE(0).call();
            feeInETH = feeInETH["donation_in_ETH"];
            console.log("feeInETH: ",feeInETH);
            feeInETH = feeInETH * 1.0103090031291;
            feeInETH = web3.utils.fromWei(feeInETH.toString(), "ether");
            feeInETH = web3.utils.toWei(feeInETH.toString(), "ether");
            result = await contract.methods["withdraw"](id, await getETHtoChecksum(provider,receiver), isETH).send({ from: account, value: feeInETH, gasLimit: gasLimit });
            console.log("withdrawn: ", result);
            return result;
        };
    } catch (e) {
        console.log(e);
    };
};

export const isLockClaimed = async (provider, id, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        const contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        result = await contract.methods["myiLock"](id).call();
        console.log("isLockClaimed: ", id, account, result);
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const _toBN = async (provider, int) => {
    let result;
    try {
        let web3 = new Web3(provider);
        result = await web3.utils.toBN(int);
        console.log("toBN: ",await web3.utils.toBN(int));
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const approve_iMigrator = async (provider, token, account, migrateAmount, network) => {
    let result;
    console.log("approve: ", migrateAmount, iMigratorAddress[network]);
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token); 
        result = await contract.methods["approve"](iMigratorAddress[network], migrateAmount).send({ from: account });
        if (result.status) {
            return result;
        } else {
        };
    } catch (e) {
        console.log(e);
    };
};

export const approve = async (provider, token, account, lockAmount, network) => {
    let result;
            console.log("approve: ", lockAmount);
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token); 
        result = await contract.methods["approve"](lockerAddress[network], lockAmount).send({ from: account });
        if (result.status) {
            return result.status;
        } else {
            console.log("results: ", result);iMigratorAddress
        };
    } catch (e) {
        console.log(e);
    };
};

export const approveToken = async (provider, token, account, deployedContract) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token, account);
        result = await contract.methods["approve"](deployedContract, web3.utils.toBN("115792089237316195423570985008687907853269984665640564039457584007913129639935")).send({ from: account });
        return result.status;
    } catch (e) {
        console.log(e);
    };
};

export const allowance = async (token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider[network]);
        let contract = new web3.eth.Contract(erc20Abi, token, account);
        result = await contract.methods["allowance"](account, lockerAddress[network]).call({ from: account });
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const fetch_Balance = async (provider, token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token.toString(), account);
        result = await contract.methods["balanceOf"](account).call({ from: account });
        console.log("fetch_Balance: ",result);
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const getTokenBalance = async (provider, token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token.toString(), account);
        result = await contract.methods["balanceOf"](account).call({ from: account });
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const getERC20balance = async (provider, token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token, account);
        result = await contract.methods["balanceOf"](account).call({ from: account });
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const getERC20allowance = async (provider, token, account, spender, network) => {
    let result;
    try {
        let web3 = new Web3(provider);
        let contract = new web3.eth.Contract(erc20Abi, token, account);
        result = await contract.methods["allowance"](account, spender).call({ from: account });
        return result;
    } catch (e) {
        console.log(e);
    };
};

export const getEtherBalance = async (provider, account, network) => {
    let balance;
    let float;
    let ETH;
    try {
        let web3 = new Web3(provider);
        let checkSummed =  await getETHtoChecksum(provider,account);
        console.log("get_ether_balance_account: ", network, network_decimals[network_to_chain[network]],checkSummed)
        await web3.eth.getBalance(checkSummed.toString(), function(err, result) {
            if (err) {
                console.log(err);
            } else {
                balance = result;
                float = (balance / 10 ** network_decimals[network_to_chain[network]]).toString();
                ETH = result / 10**18;
                console.log("get_ether_balance: ", balance, float, result / 10**9,result / 10**18, (result / 10 ** network_decimals[network_to_chain[network]]).toString(), (balance / 10 ** network_decimals[network_to_chain[network]]).toString());
            };
        });
        if (balance&&float) {
            return [balance,float,ETH];
        };
    } catch (e) {
        console.log("hmm: ", e);
    };
};

export const getTokenData = async (token, account, network) => {
    let result;
    try {
        let web3 = new Web3(provider[network]);
        let contract = new web3.eth.Contract(erc20Abi, token);
        let name = await contract.methods["name"]().call({ from: account });
        let decimals = await contract.methods["decimals"]().call({ from: account });
        let symbol = await contract.methods["symbol"]().call({ from: account });
        let balanceOf = await contract.methods["balanceOf"](account).call({ from: account });
        let getLock = [{ "data": ["data"], "token": ["token"], "holder": getLock["holder"], "balanceOf": balanceOf, "name": getLock["name"], "symbol": getLock["symbol"], "decimals": getLock["decimals"] }];
        console.log("iLock", getLock)
        let result = [{ "getLock": getLock, "data": ["data"], "holder": getLock["holder"], "token": ["token"], "balanceOf": balanceOf, "name": getLock["name"], "symbol": getLock["symbol"], "decimals": getLock["decimals"] }];
        return result;
    } catch (e) {
        console.log("px", e);
    };
};

export const getRawData = async (account, network) => {
    try {
        let web3 = new Web3(provider[network]);
        let contract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
        let depositIds = await contract.methods["getAllDepositIds"]().call();
        if (!depositIds.length) return []
        const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
        let contractCallContext = {
            reference: "lockedToken",
            contractAddress: lockerAddress[network],
            abi: lockerContractAbi,
            calls: depositIds.map(each => {
                return { reference: 'lockedTokensCall', methodName: 'lockedToken', methodParameters: [each] }
            })
        }
        let response = await multicall.call(contractCallContext);
        const returnValues = [];
        response.results.lockedToken.callsReturnContext.map(each => {
            const returnValue = {
                id: each.methodParameters[0],
                token: each.returnValues[0],
                owner: each.returnValues[1],
                amount: BigInt(parseInt(each.returnValues[2].hex, 16)).toString(),
                timestamp: parseInt(each.returnValues[3].hex, 16),
                isWithdrawn: each.returnValues[4]
            }
            if (returnValue.owner.toLowerCase() === account.toLowerCase()) returnValues.push(returnValue);
        });
        return returnValues;
    } catch (e) {
        console.log(e);
    };
};

export const getData = async (provider, account, network) => {
    let lockerDataByWallet;
    try {
        let web3 = new Web3(provider);
        const tokenContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network], account);
        let myLocks = await tokenContract.methods.myLocks_(account).call({ from: account });
        let x = 0; let l_arr = [];
        while (x < myLocks.length) {
            let getLock = await tokenContract.methods.myiLock(myLocks[x]).call({ from: account });
            console.log("getLock: ", getLock, account, network);
            let iLock = {
                "lockId": getLock["lockId"],
                "holdingContract": getLock["holdingContract"],
                "token": getLock["token"],
                "amount": getLock["amount"],
                "holder": getLock["holder"],
                "getLock": [getLock],
                "lockerAddress": lockerAddress[network],
                "locker": lockerAddress[network]
            };
            l_arr.push(iLock);
            if (x == myLocks.length - 1) {
                lockerDataByWallet = [{ "data": l_arr, "token": ["token"], "getLock": [l_arr] }];
                break;
            } else {
                x++;
            };
        };
        return lockerDataByWallet;
    } catch (e) {
        console.log(e);
        return [{ "data": ["data"], "token": ["token"] }]
    };
};
export const get_iMigrator_Data = async (provider, account, network) => {
    let iMigrator;
    try {
        iMigrator = {
            "iMigratorAddress": iMigratorAddress[network],
            "migrator": iMigratorAddress[network]
        };
        return iMigrator;
    } catch (e) {
        console.log(e);
        return [{ "data": ["data"], "token": ["token"], "iMigratorAddress": iMigratorAddress[network], "migrator": iMigratorAddress[network] }]
    };
};
export const getLockers = async (provider, account, network) => {
    let lockerDataByWallet;
            console.log("getLockers: ", provider, account, network);
    try {
        let web3 = new Web3(provider);
        const tokenContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network], account);
        tokenContract.options.address = lockerAddress[network];
        if (tokenContract.options.address !== null || tokenContract.options.address !== undefined) {
            let i = 0;
            let getLock = [];
            let getLocks = await tokenContract.methods.myLocks_(account).call({ from: account });
            while(i<getLocks.length) {
	            getLock.push(await tokenContract.methods.myiLock(getLocks[i]).call({ from: account }));
            	if(i==getLocks.length-1) {
            		break;
            	} else {
            		i++;
            	};
            };
            console.log("getLock: ", getLock, getLocks, account);
            lockerDataByWallet = [{ "data": ["data"], "token": [getLock["token"]], "getLock": [getLock]}];
        } else {
            lockerDataByWallet = [{ "data": ["data"], "token": ["token"], "getLock": [undefined] }];
        };
        return lockerDataByWallet;
    } catch (e) {
        console.log(e);
        return [{ "data": ["data"], "token": ["token"], "getLock": [undefined] }];
    };
};
export const getLocker = async (provider_, lockId, account, network) => {
    let lockerDataByWallet;
    try {
        let web3 = new Web3(provider[network]);
        const tokenContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network], account);
        tokenContract.options.address = lockerAddress[network];
        if (tokenContract.options.address !== null || tokenContract.options.address !== undefined) {
            let getLock = await tokenContract.methods.myiLock(lockId).call({ from: account });
            console.log("getLock: ", getLock, account);
            lockerDataByWallet = [{ "data": ["data"], "token": [getLock["token"]], "Ether": getLock["Ether"], "creator": getLock["creator"], "holder": getLock["holder"], "lockToken": getLock["token"], "unclaimed": getLock["claimed"], "claimed": getLock["claimed"], "unlockTimestamp": getLock["unlockTimestamp"], "lockId": getLock["lockId"], "holdingContract": getLock["holdingContract"], "amount": getLock["amount"], "getLock": [getLock], "lockerAddress": [lockerAddress[network]] }];
        } else {
            lockerDataByWallet = [{ "data": ["data"], "token": ["token"], "getLock": [undefined] }];
        };
        return lockerDataByWallet;
    } catch (e) {
        console.log(e);
        return [{ "data": ["data"], "token": ["token"], "getLock": [undefined] }];
    };
};

export const getLockedTokenDetails = async (tokenAddress, account, network) => {

    const rawData = await getRawData(account, network);
    let web3 = new Web3(provider[network]);

    let tokenLocked = BigInt(0);
    rawData.map(each => {
        if (each.token === tokenAddress && !each.isWithdrawn) tokenLocked = tokenLocked + BigInt(each.amount);
    });
    // console.log(rawData)
    const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
    let symbol = await tokenContract.methods.symbol().call();
    let decimals = await tokenContract.methods.decimals().call();
    let totalSupply = await tokenContract.methods.totalSupply().call();
    let liquidityLocked = BigInt(0);
    let tokenLockHistory = [];

    const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    let contractCallContext = rawData.map((each, index) => {
        return {
            reference: index,
            contractAddress: each.token,
            abi: erc20Abi,
            calls: [{ reference: 'symbolsCall', methodName: 'symbol' }]
        }
    })
    let response = await multicall.call(contractCallContext);
    let symbols = [];
    for (const [key, value] of Object.entries(response.results)) {
        symbols.push(value.callsReturnContext[0].returnValues[0]);
    }
    // console.log(rawData)
    for (let i = 0; i < rawData.length; i++) {
        let each = rawData[i];
        let address = each.token;
        let ownerAddress = each.owner;
        let tokenAmount = each.amount;
        let timestamp = each.timestamp;
        let isWithdrawn = each.isWithdrawn;
        //default token
        if (address.toLowerCase() === tokenAddress.toLowerCase()) tokenLockHistory.push({ id: each.id, address: address, owner: ownerAddress, tokenAmount: tokenAmount, timestamp: timestamp, isWithdrawn: isWithdrawn });
        //pool token
        else if (symbols[i] === 'HUL') {
            let poolContract = new web3.eth.Contract(liquidityPoolAbi, each.token);
            let token0 = await poolContract.methods.token0().call();
            let token1 = await poolContract.methods.token1().call();
            if (token0.toLowerCase() === tokenAddress.toLowerCase() || token1.toLowerCase() === tokenAddress.toLowerCase()) {
                let totalSupply = await poolContract.methods.totalSupply().call();
                let baseTokenTotalAmount = await tokenContract.methods.balanceOf(address).call();
                let baseTokenAmount = BigInt(baseTokenTotalAmount) * BigInt(tokenAmount) / BigInt(totalSupply);
                if (!each.isWithdrawn) liquidityLocked = liquidityLocked + baseTokenAmount;
                tokenLockHistory.push({ id: each.id, isPool: true, address: address, owner: ownerAddress, tokenAmount: tokenAmount, baseTokenAmount: baseTokenAmount.toString(), timestamp: timestamp, isWithdrawn: isWithdrawn });
            };
        };
    };
    // let tokenSymbol = await tokenContract.methods.symbol().call();
    // let tokenDecimals = await tokenContract.methods.decimals().call();
    // let tokenLocked = await tokenContract.methods.balanceOf(lockerAddress).call();
    // let tokenTotalSupply = await tokenContract.methods.totalSupply().call();

    let lockerContract = new web3.eth.Contract(lockerContractAbi, lockerAddress[network]);
    let depositEvents = await lockerContract.getPastEvents("LogLocking", {
        fromBlock: 0
    });
    let withdrawEvents = await lockerContract.getPastEvents("LogWithdrawal", {
        fromBlock: 0
    });

    // let tokenTransferEvents = await tokenContract.getPastEvents("Transfer",{
    //     fromBlock: 0,
    //     toBlock: "latest",
    //     filter: {
    //         to: lockerAddress
    //     }
    // })
    // let tokenTransferTransactions = await Promise.all(tokenTransferEvents.map(each => web3.eth.getTransaction(each.transactionHash)))
    // tokenTransferTransactions = tokenTransferTransactions.filter(each => each.input.length === 266);


    for (let i = 0; i < depositEvents.length; i++) {
        let blockDetail = await web3.eth.getBlock(depositEvents[i].blockNumber);
        depositEvents[i].timestamp = blockDetail.timestamp;
    }
    for (let i = 0; i < withdrawEvents.length; i++) {
        let blockDetail = await web3.eth.getBlock(withdrawEvents[i].blockNumber);
        withdrawEvents[i].timestamp = blockDetail.timestamp;
    };
    let events = [],
        j = 0;
    for (let i = 0; i < depositEvents.length; i++) {
        if (withdrawEvents[j] && withdrawEvents[j].returnValues.index === depositEvents[i].returnValues.index) {
            events.push({ deposit: depositEvents[i], withdraw: withdrawEvents[j] });
            j++;
        } else {
            events.push({ deposit: depositEvents[i] });
        };
    };
    return {
        address: tokenAddress,
        symbol: symbol,
        decimals: decimals,
        totalSupply: totalSupply,
        liquidityLocked: liquidityLocked,
        tokenLocked: tokenLocked,
        history: tokenLockHistory,
        events: events
    };
};

export const checkWalletAddress = (walletAddress, network) => {
    let web3 = new Web3(provider[network]);
    return web3.utils.isAddress(walletAddress);
};

export const getLastDeployedContract = async (account, network) => {
    let lastDeployedAddress;
    try {
        const response = await axios.get(`${serverApi}/vesting/lastDeployed/${network}/${account}`);
        lastDeployedAddress = response.data;
    } catch (e) {
        console.log(e);
    };
    return lastDeployedAddress;
};

export const deployContract = async (provider, account, token, network) => {
    const web3 = new Web3(provider);
    const abi = [{ "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "createTokenLocker", "outputs": [{ "internalType": "address", "name": "locker", "type": "address" }], "stateMutability": "payable", "type": "function" }]
    const contract = new web3.eth.Contract(abi, swapTokenLockerFactory[network]);
    let result = contract.methods.createTokenLocker(token).send({
        from: account
    });
    return result;
};

export const sendTokenVesting = async (provider, deployedContract, csvData, token, account, network) => {
    let _users = [],
        _amounts = [],
        _lockHours = [],
        _sendAmount = BigInt(0);
    const web3 = new Web3(provider);
    let abi = [{ "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }];
    let contract = new web3.eth.Contract(abi, token);
    let decimals = await contract.methods.decimals().call();
    csvData.map(each => {
        _users.push(each.address);
        _amounts.push(BigInt(each.amount * Math.pow(10, decimals)).toString());
        switch (each.period[each.period.length - 1]) {
            case 'M':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 30 * 24);
                break;
            case 'W':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 7 * 24);
                break;
            case 'D':
                _lockHours.push(each.period.slice(0, each.period.length - 1) * 24);
                break;
            case 'h':
                _lockHours.push(each.period.slice(0, each.period.length - 1));

        };
        _sendAmount += BigInt(each.amount * Math.pow(10, decimals));
    });
    _sendAmount = _sendAmount.toString();
    abi = [{ "inputs": [{ "internalType": "address[]", "name": "_users", "type": "address[]" }, { "internalType": "uint128[]", "name": "_amounts", "type": "uint128[]" }, { "internalType": "uint32[]", "name": "_lockHours", "type": "uint32[]" }, { "internalType": "uint256", "name": "_sendAmount", "type": "uint256" }], "name": "sendLockTokenMany", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feesInETH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

    contract = new web3.eth.Contract(abi, deployedContract)
    let feeInETH = await contract.methods.iLocker_CORE(0).call();
    feeInETH = feeInETH["donation_in_ETH"];
    console.log(_users, _amounts, _lockHours, _sendAmount, account)
    let result = await contract.methods.sendLockTokenMany(_users, _amounts, _lockHours, _sendAmount).send({
        from: account,
        value: network !== "Avalanche" || network === "Avalanche" || network === "Avalanche_testnet" ? BigInt(feesInETH * Math.pow(10, 18)).toString() : feesInETH
    });
    return result;
};

export const getClaimTokenList = async (address, network) => {
    const web3 = new Web3(provider[network]);
    let factoryContract, abi, erc20Abi, allContracts, response, multicall, contractCallContext;
    abi = [{ "inputs": [], "name": "getAllContracts", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }];
    factoryContract = new web3.eth.Contract(abi, swapTokenLockerFactory[network]);
    allContracts = await factoryContract.methods.getAllContracts().call();
    console.log(allContracts)
    multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
    abi = [{ "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getLockData", "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }, { "internalType": "uint128", "name": "", "type": "uint128" }, { "internalType": "uint64", "name": "", "type": "uint64" }, { "internalType": "uint64", "name": "", "type": "uint64" }, { "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];
    erc20Abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]
    contractCallContext = allContracts.map((each, index) => {
        return {
            reference: index,
            contractAddress: each,
            abi: abi,
            calls: [
                { reference: 'getLockDataCall', methodName: 'getLockData', methodParameters: [address] },
                { reference: 'getTokenCall', methodName: 'getToken' }
            ]
        };
    })
    response = await multicall.call(contractCallContext);
    let returnData = [];
    contractCallContext = [];
    for (const [key, value] of Object.entries(response.results)) {
        let amount = BigInt(value.callsReturnContext[0].returnValues[0].hex).toString();
        let claimedAmount = BigInt(value.callsReturnContext[0].returnValues[1].hex).toString();
        let lockTimestamp = BigInt(value.callsReturnContext[0].returnValues[2].hex).toString();
        let lastUpdated = BigInt(value.callsReturnContext[0].returnValues[3].hex).toString();
        let lockHours = value.callsReturnContext[0].returnValues[4];
        let contract = allContracts[key];
        let token = value.callsReturnContext[1].returnValues[0];
        if (amount !== '0') {
            contractCallContext.push({
                reference: returnData.length,
                contractAddress: token,
                abi: erc20Abi,
                calls: [
                    { reference: 'nameCall', methodName: 'name' },
                    { reference: 'decimalsCall', methodName: 'decimals' },
                    { reference: 'symbolCall', methodName: 'symbol' }
                ]
            })
            returnData.push({
                amount: amount,
                claimedAmount: claimedAmount,
                lockTimestamp: lockTimestamp,
                lastUpdated: lastUpdated,
                lockHours: lockHours,
                contract: contract,
                token: {
                    address: token
                }
            })
        }
    }

    response = await multicall.call(contractCallContext);
    for (const [key, value] of Object.entries(response.results)) {
        let name = value.callsReturnContext[0].returnValues[0];
        let symbol = value.callsReturnContext[2].returnValues[0];
        let decimals = value.callsReturnContext[1].returnValues[0];
        returnData[key].token.name = name;
        returnData[key].token.symbol = symbol;
        returnData[key].token.decimals = decimals;
    }
    return returnData;
}

export const claimToken = async (provider, tokenDetail, account) => {
    let currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp - tokenDetail.lastUpdated < 3600) return { state: false, reason: 'Wait to next claim available' };
    const passedHours = Math.floor((currentTimestamp - tokenDetail.lockTimestamp) / 3600);
    let availableAmount = BigInt(Math.floor(tokenDetail.amount * passedHours / tokenDetail.lockHours) - tokenDetail.claimedAmount).toString();
    if (Number(availableAmount) > maxTxLimit) availableAmount = maxTxLimit.toString();
    const web3 = new Web3(provider);
    const abi = [{ "inputs": [{ "internalType": "uint128", "name": "_amount", "type": "uint128" }], "name": "claimToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }]
    const contract = new web3.eth.Contract(abi, tokenDetail.contract);
    const response = await contract.methods.claimToken(availableAmount).send({
        from: account
    });
    console.log(response);
}

export const airdrop = async (provider, csvData, token, account, network) => {
    let _users = [],
        _amounts = [];
    const web3 = new Web3(provider);
    let abi = [{ "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }];
    // console.log(token)
    let contract = new web3.eth.Contract(abi, token);
    let decimals = await contract.methods.decimals().call();
    csvData.map(each => {
        _users.push(web3.utils.toChecksumAddress(each.address));
        _amounts.push(BigInt(each.amount * Math.pow(10, decimals)).toString());
    })
    // console.log(_users)
    // console.log(_amounts)
    abi = [{ "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address[]", "name": "_users", "type": "address[]" }, { "internalType": "uint128[]", "name": "_amounts", "type": "uint128[]" }], "name": "airdrop", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "companyWallet", "outputs": [{ "internalType": "addresspayable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feesInETH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
    contract = new web3.eth.Contract(abi, airdropAddress[network]);
    let feeInETH = await contract.methods.iLocker_CORE(0).call();
    feeInETH = feeInETH["donation_in_ETH"];
    let result = await contract.methods.airdrop(token, _users, _amounts).send({
        from: account,
        value: network === "Avalanche" || network === "Avalanche_testnet" ? BigInt(feeInETH * Math.pow(10, 18)).toString() : feeInETH
    });
    return result;
}