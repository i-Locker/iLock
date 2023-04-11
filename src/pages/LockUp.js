import React, { useEffect, useState } from 'react';

import { connect, useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { styled } from '@mui/material/styles';

// ** Import Material UI Components
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
// ** Import Assets
import useStyles from '../assets/styles';
import { TOKENDATA, USERBALANCE, TOKENLISTS } from "../redux/constants";

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { explorer_, networks_data, network_dec_to_hex, network_to_chain, network_lower_to_proper, rpc_, icons_, network_, network_symbols, network_decimals, network_hex_to_dec } from '../constants';
import Loader from '../components/Loader';
import { alterLoaderText } from '../components/Loader';
import { toggleDrawer } from '../components/Header';
import TransferOwnershipModal from '../components/TransferOwnership.js';
import WithdrawModal from '../components/Transfer.js';
import { _toggleOwnershipModal } from '../components/TransferOwnership.js';
import { _toggleWithdrawalModal } from '../components/Transfer.js';
import { transferOwnership_iLock, w3, isLockClaimed, getERC20balance, getEtherBalance, getLocker, getData, withdraw, explorer, getTokenBalance, } from '../web3';
import { getERC20Metadata } from "../api";

let connector_;
export let _wrap;
export let getLockId;
export let getAccount;
export let getNetwork;
export let linkWeb3;
export let _transfer;
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
const dateTime = async (date) => {
    return date.toLocaleString();
};
const LockUp = (props) => {
    const { lockId, wallet, token, chainName } = props.match.params;
    const { account, connector } = useWeb3React();
    connector_ = connector;
    const [amount, setAmount] = useState(0);
    const [_token, set_Token] = useState("");
    const [lockToken, setLockToken] = useState("");
    const [chainId, setChainId] = useState(0);
    const [network, setNetwork] = useState("");
    const [status_, setStatus_] = useState(false);
    const [ownable, setOwnable] = useState(false);
    const [ready, setReady] = useState(false);
    const [ether, setEther] = useState(false);
    const [notMiner, setNotMiner] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [unlockDate, setUnlockDate] = useState("");
    const [theHolder, setTheHolder] = useState("");
    const [theCreator, setTheCreator] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [tokenDecimals, setTokenDecimals] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [etherBalance, setEtherBalance] = useState(0);
    const [isWithdrawn, setIsWithdrawn] = useState("");
    const [unlockAble, setUnlockAble] = useState(false);
    const [doneForSure, setDoneForSure] = useState(false);
    const [tokenSet, setTokenSet] = useState(false);
    const [unlockTimestamp, setUnlockTimestamp] = useState("");
    const [modalInner, setModalInner] = useState("Transferring Ownership is irreversible. Provide an Address");
    const [holdingContract, setHoldingContract] = useState("");
    const [currentTimestamp, setCurrentTimestamp] = useState("");
    const dispatch = useDispatch();
    const data = useSelector(state => state.tokenLists);
    let tokenData = undefined;
    if (network) {
        console.log("net: ", account, network_lower_to_proper[chainName], network_to_chain[network], explorer_[network_dec_to_hex[chainId]]);
    } else {
        //
    };
    getLockId = async () => {
        return lockId;
    };
    getAccount = async () => {
        return account;
    };
    getNetwork = async () => {
        return network;
    };
    _wrap = async (to) => {
        console.log("_wrap: ", to);
        let provider = await connector_.getProvider();
        try {
            transferOwnership_iLock(provider, lockId, account, to, await getNetwork()).then((ownershipTransfer) => {
                console.log("transferOwnership: ", ownershipTransfer)
            });
            _toggleOwnershipModal("Thanks", "Processing", await getLockId(), await getNetwork());
        } catch (e) {
            console.log("err: ", e);
        };
        return "It's a Wrap!";
    };
    const _transfer_ownership = async (e) => {
        _toggleOwnershipModal(modalInner, "Ownership Transfer", await getLockId(), await getNetwork());
    };
    useEffect(async () => {
        if (!account) {
            toggleDrawer();
        };
        if (claimed||doneForSure) {
            setDoneForSure(true);
            alterLoaderText("Claimed");
            return;
        } else {
            alterLoaderText("Claimed");
        }
        if (chainName) {
            changeNetwork(network_lower_to_proper[chainName]);
            console.log('network: ', network);
        };
        const checkLocker = async (id, account, network) => {
            return await getLocker(account, network);
        };
        const setDate = async (utcSeconds) => {
            let d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            setUnlockDate(d);
            return d;
        };

        function epoch(date) {
            return Date.parse(date)
        };
        const __dispatch = async (newData) => {
            try {
                dispatch({ type: TOKENLISTS, payload: newData });
            } catch (e) {
                console.log(e);
            };
        };
        const __prepare = async (connector) => {
            // eslint-disable-next-line
            setModalInner(modalInner);
            try {
                connector.getChainId().then((chainId) => {
                    setChainId(chainId);
                    if (Number(chainId) === 1) setNetwork("Ethereum");
                    if (Number(chainId) === 3) setNetwork("Ropsten");
                    if (Number(chainId) === 5) setNetwork("Goerli");
                    if (Number(chainId) === 56) setNetwork("Binance Smart Chain");
                    if (Number(chainId) === 97) setNetwork("Binance_testnet");
                    if (Number(chainId) === 444) setNetwork("Frenchain_testnet");
                    if (Number(chainId) === 43114) setNetwork("Avalanche");
                    if (Number(chainId) === 43113) setNetwork("Avalanche_testnet");
                    if (Number(chainId) === 44444) setNetwork("Frenchain");
                    if (Number(chainId) === 420420) setNetwork("Kekchain");
                    if (Number(chainId) === 420666) setNetwork("Kekchain_testnet");
                });
            } catch (e) {
                console.log("err: ", e);
            };
        };
        if (lockId) {
            let lock_props;
            let props_out;
            let timer;
            timer = setTimeout(async () => {
                const iLock = {
                    "wallet": wallet,
                    "unclaimed": claimed,
                    "unlockTimestamp": unlockTimestamp,
                    "_token": _token,
                    "amount": amount,
                    "holdingContract": holdingContract
                };
                if (iLock["_token"] !== '' && iLock["amount"] !== 0 && iLock["holdingContract"] !== '') {
                    setStatus_(true);
                    try {
                        console.log("tokenBalance: ", lockToken, holdingContract, account, network);
                        const tokenBalance_holding_contract = await getTokenBalance(lockToken, holdingContract, network);
                        const tokenBalance_account = await getTokenBalance(lockToken, account, network);
                        console.log("tokenBalance: ", tokenBalance_holding_contract, tokenBalance_account);
                    } catch (e) {
                        console.log(e);
                    };
                } else {
                    setStatus_(false);
                };
                switch (status_) {
                    case true:
                        clearInterval(lock_props);
                        break;
                    case false:
                        props_out(lock_props);
                        break;
                    default:
                        break;
                };
            }, 3333);
            let unlockAbleCheck;
            props_out = async (lock_props) => {
                lock_props = setInterval(async () => {
                    try {
                        let provider = await connector.getProvider();
                        getLocker(provider, lockId, account, network).then(async (newData) => {
                            if (newData) {
                                if (newData[0]["getLock"][0] !== undefined) {
                                    console.log("newData1: ", newData[0]["getLock"]);
                                    console.log("newData2: ", newData[0]);
                                    if (parseFloat(newData[0]["amount"]) > 0) {
                                        if (newData[0]["Ether"] == false) {
                                        try {
                                            let bytes = await getERC20Metadata(provider, network, newData[0]["token"], account);
                                            if (bytes) {
                                                await setTokenDecimals(bytes[0]["decimals"]);
                                                setAmount(newData[0]["amount"] / 10 ** parseFloat(bytes[0]["decimals"]).toFixed(2));
                                                console.log("amount: ", amount);
                                            }
                                        } catch (e) {
                                            console.log("error: ", e);
                                        };
                                        }
                                    };
                                    if (newData[0]["lockerAddress"]) {
                                        set_Token(newData[0]["lockerAddress"]);
                                    };
                                    if (newData[0]["holdingContract"]) {
                                        setEtherBalance(await getEtherBalance(provider, newData[0]["holdingContract"]));
                                        setHoldingContract(newData[0]["holdingContract"]);
                                    };
                                    console.log("Ether: ", newData[0]["Ether"]);
                                    if (newData[0]["Ether"]) {
                                        setEther(newData[0]["Ether"]);
                                    };
                                    if (newData[0]["token"] && tokenSet == false) {
                                        setLockToken(newData[0]["token"]);
                                        try {
                                            let provider = await connector.getProvider();
                                            const bytes = await getERC20Metadata(provider, network, newData[0]["token"], newData[0]["holdingContract"]);
                                            if (bytes) {
                                                await setTokenDecimals(bytes[0]["decimals"]);
                                                setTokenBalance(parseFloat(bytes[0]["balanceOf"] / 10 ** bytes[0]["decimals"]).toFixed(2));
                                                console.log("tokenBalance: ", tokenBalance);
                                            }
                                            setTokenSet(true);
                                        } catch (e) {
                                            console.log("error: ", e);
                                        };
                                    };
                                    if (parseFloat(newData[0]["unlockTimestamp"]) > 0) {
                                        setUnlockTimestamp(newData[0]["unlockTimestamp"]);
                                        setDate(newData[0]["unlockTimestamp"]);
                                    };
                                    if (newData[0]["unclaimed"]) {
                                        setClaimed(newData[0]["unclaimed"]);
                                        if(newData[0]["unclaimed"]) {
                                            setDoneForSure(true);
                                            alterLoaderText("Claimed");
                                            clearInterval(lock_props);
                                            clearInterval(unlockAbleCheck);
                                            return;
                                        }
                                    };
                                    if (newData[0]["holder"]) {
                                        console.log("holder: ", newData[0]["holder"])
                                        setTheHolder(newData[0]["holder"]);
                                        await setOwnable(newData[0]["holder"].toString() == account.toString());
                                        console.log("ownable: ", newData[0]["holder"].toString() == account.toString());
                                    };
                                    if (newData[0]["creator"]) {
                                        console.log("creator: ", newData[0]["creator"])
                                        setTheCreator(newData[0]["creator"]);
                                    };
                                    setReady(true);
                                } else {
                                    setReady(false);
                                };
                                const dateToday = new Date();
                                try {
                                    const timestamp = epoch(dateToday);
                                    setCurrentTimestamp(timestamp);
                                    const unlock_Date = unlockDate;
                                    const unlock_Timestamp = unlockTimestamp;
                                    let unlock_able = timestamp > unlock_Date;
                                    console.log("unlock_able: ", unlock_able, timestamp, unlockDate, unlockTimestamp, unlock_Timestamp);
                                    if (isNaN(unlock_Date) || isNaN(timestamp)) {
                                        setUnlockAble(false);
                                        console.log("!unlockable or !prepared");
                                    } else {
                                        setUnlockAble(unlock_able);
                                    };
                                    unlockAbleCheck = setTimeout(async (provider, lockId, account, network) => {
                                        isLockClaimed(provider, lockId, account, network).then(async (claimed_already) => {
                                            if (claimed_already) {
                                                try {
                                                    console.log("claimed_already (claimed): ", claimed_already["claimed"]);
                                                    await setClaimed(claimed_already["claimed"]);
                                                } catch (e) {
                                                    console.log("e: ", e);
                                                }
                                            }
                                        });
                                        console.log("currentTimestamp: ", timestamp, currentTimestamp);
                                        if (unlock_Date) {
                                            try {
                                                let unlock_able = timestamp > unlock_Timestamp;
                                                console.log("unlock_able: ", unlock_able, timestamp, unlock_Date, isNaN(unlock_Date), isNaN(timestamp));
                                                setUnlockAble(unlock_able);
                                            } catch (e) {
                                                console.log("err: ", e);
                                            };
                                        };
                                    }, 10000, provider, lockId, account, network);
                                    setNotMiner(lockToken.toString() !== theCreator || lockToken.toString() !== theHolder || lockToken.toString() !== account);
                                    console.log("lockId: ", lockId);
                                    console.log("account: ", account);
                                    console.log("network: ", network);
                                    console.log("dateNow: ", timestamp);
                                    console.log("timestamp: ", timestamp);
                                    console.log("theHolder: ", theHolder);
                                    console.log("unlockDate: ", unlockDate);
                                    console.log("unlockAble: ", unlockAble);
                                    console.log("unlock_able: ", unlock_able);
                                    console.log("unlock_Date: ", unlock_Date);
                                    console.log("unlock_Timestamp: ", unlock_Timestamp);
                                    console.log("claimable: ", timestamp > unlock_Date);
                                } catch (e) {
                                    console.log("err: ", e);
                                };
                                __dispatch(newData);
                            };
                        });
                    } catch (e) {
                        console.log(e);
                    };
                }, 2000);
            };
            if (account) {
                __prepare(connector);
            } else {
                return () => clearInterval(timer);
            };
        };
    }, [account, wallet, lockId, network])

    const classes = useStyles.pools();
    const mobileClasses = useStyles.mobile();
    const isMobile = useMediaQuery('(max-width:600px)');

    const change_Network = async () => {
        if (account) {
            const provider = window.ethereum; {
                /*
                    checkEtherBalance(provider, account);
                */
            }
            const currentNetworkData = networks_data.filter((each) => each.name === network);
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: currentNetworkData[0].chainData.chainId }],
                });
                console.log("You have succefully switched to ", network)
            } catch (switchError) {
                {
                    /*
                    // This error code indicates that the chain has not been added to MetaMask.
                    */
                }
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
                        provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [{ ...params_network_add }]
                        }).catch((error) => {
                            console.log("provider_err: ", error);
                        });
                    } else if (switchError.code === 4001) {
                        console.log("Switch Request has rejected");
                    } else if (switchError.code === 4200) {
                        console.log("You have succefully switched to ", network)
                    };
                } catch (e) {
                    console.log("error: ", e);
                }
            };
        };
    };
    const changeNetwork = (name) => {
        setNetwork(name);
        dispatch({
            type: TOKENDATA,
            payload: {}
        });
        change_Network();
    }

    const fn = (val, decimal = 4) => {
        if (!isNaN(Number(val))) {
            const trimVal = Number(Number(val).toFixed(decimal));
            const decimalVal = trimVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return decimalVal;
        } else {
            return Number(0);
        }
    }

    const withdrawToken = async (id, receiver, isEth) => {
        if (!account) return;
        if (claimed) return;
        let provider = await connector.getProvider();
        let gasLimit;
        w3(provider, network).then(async (W3) => {
            let block = await W3.eth.getBlock("latest");
            console.log("(w3) block: ", block);
            console.log("(w3) gasLimit: ", block.gasLimit);
            gasLimit = block.gasLimit;
            console.log("Processing withdrawal: ", id, gasLimit, isEth, lockId, account, receiver, network);
            withdraw(provider, lockId, account, receiver, isEth, network, ownable, gasLimit).then(async (status) => {
                const newData = JSON.parse(JSON.stringify(data));
                if (status) {
                    console.log("Withdrawal processed: ", newData);
                    setClaimed(true);
                    setIsWithdrawn(true);
                    _toggleWithdrawalModal("Confirmed", "Transaction: ", id, network);
                };
            });
        });
    };
    _transfer = withdrawToken;

    const withdrawProperty = async (id) => {
        console.log("withdrawProperty: ", id);
        _toggleWithdrawalModal("Delegate a receiver wallet and submit the transfer", "Withdraw", id, network);
    }

    const transferOwnership = async (id) => {
        if (!account) return;
        let provider = await connector.getProvider()
        withdraw(provider, lockId, account, network).then(async (status) => {
            const newData = JSON.parse(JSON.stringify(data));
            if (status) console.log("Withdrawal processed: ", newData);
        })
    }

    const LockedEvent = (props) => {
        const { index, event } = props
        const withdrawDate = new Date(event.timestamp * 1000);
        let isWithdrawable = event.timestamp < currentTimestamp;
        setIsWithdrawn(event.isWithdrawn);
        const lockedTokenAmount = event.amount / Math.pow(10, event.decimals)
        const getTokenSymbol = event.symbol;
        const owner = event.owner;
        const lockedTime = new Date(event.depositEvent.timestamp * 1000);
        const countdownPercent = event.timestamp > currentTimestamp ? Math.ceil((event.timestamp - currentTimestamp) / (event.timestamp - event.depositEvent.timestamp) * 100) : 0;
        const getRemainTime = () => {
            if (event.timestamp < currentTimestamp) return `00D-00H-00M-00S`;
            return `${Math.floor((event.timestamp - currentTimestamp) / 86400)}D-${Math.floor(((event.timestamp - currentTimestamp) % 86400) / 3600)}H-${Math.floor(((event.timestamp - currentTimestamp) % 3600) / 60)}M-${(event.timestamp - currentTimestamp) % 60}S`
        }
        isWithdrawable = true;
        return (
            <Grid 
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                style={{borderBottom:'2px solid #e55370', fontSize: '13px'}}
                >
                    <Grid item  xs={2} sm={2} md={1} style={{textAlign:'center'}}>
                        <img src='/lock.png' style={{width:40}} alt='token image' />
                    </Grid>
                    <Grid item  xs={10} sm={10} md={5}>
                        <p>Lock Tokens - {fn(lockedTokenAmount, 2)} {getTokenSymbol}</p>
                        {!isWithdrawable ? <p><span><button>Locked</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>: 
                        (!isWithdrawn ? <p><span><button>Withdrawable</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>:
                        <p><span><button>Withdrawn</button></span> Locked {lockedTime.toDateString()} - unlocks {withdrawDate.toDateString()}</p>)}
                        <p>Owner: {owner}</p>
                    </Grid>

                    <Grid item  xs={12} sm={8} md={3} style={{textAlign:'center'}}>
                        <p >UNLOCK COUNTDOWN</p>
                        <BorderLinearProgress variant='determinate' value={countdownPercent} />
                        <p >{getRemainTime()}</p>
                    </Grid>
                    <Grid item  xs={12} sm={4} md={3} style={{textAlign:'center'}}>
                        {claimed && !isWithdrawable? <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.depositEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>: (
                            !claimed && !isWithdrawn ? (account && account.toLowerCase() === owner.toLowerCase() ? <Button onClick={() => withdrawProperty(lockId)} >WITHDRAW</Button> : <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.depositEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>) :
                            <Link style={{textDecoration: 'none'}} href={`${explorer[network]}/tx/${event.withdrawEvent.transactionHash}`} target='_blank' rel='noreferrer'>VIEW TX</Link>
                        )}
                        
                    </Grid>
                </Grid>
        )
    }

    let lockedTokenAmount = 0,
        lockedLiquidity = [];
    if (tokenData) tokenData.data.map(each => {
        if (!each.isWithdrawn && !each.isLiquidity) lockedTokenAmount += each.amount / Math.pow(10, each.decimals);
        if (!each.isWithdrawn && each.isLiquidity) {
            let index = lockedLiquidity.findIndex(eachLiquidity => eachLiquidity.token0.address === each.token0.address && eachLiquidity.token1.address === each.token1.address);
            if (index !== -1) lockedLiquidity.locked += each.amount * 100 / each.totalSupply;
            else lockedLiquidity.push({ token0: each.token0, token1: each.token1, locked: each.amount * 100 / each.totalSupply });
        }
    })
    return (
        <Container className={classes.root} maxWidth='lg'>
            <Box className={classes.info}>
                <Grid container spacing={3}>
                    {
                        claimed || !account ? <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}> <Loader /> </Typography> : account && !claimed && ready ? <Grid className={isMobile ? `${mobileClasses.root} grid`  : 'grid'} item xs={12} sm={12} md={12} >
                        <Card className='card'>
                            <CardContent>
                                <Typography className='title' color='textSecondary'>
                                    TimeLock Overview
                                </Typography>
                                <br />
                                { claimed ? <></> : !claimed && ether == false ? <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>ERC20 Balance</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                    {`${tokenBalance}`}
                                    </Grid>
                                </Grid> : isNaN(tokenBalance) ? <></> : <></>}
                                <Grid 
                                                                    container
                                                                    direction='row'
                                                                    justifyContent='space-between'
                                                                    alignItems='center'
                                                                >
                                                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                                                        <span>Ether</span>
                                                                    </Grid>
                                                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                                                    {`${ether}`}
                                                                    </Grid>
                                                                </Grid>
                                { claimed ? <></> : !claimed && ether == true ? <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>ETH Balance</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                    {`${isNaN(etherBalance) ? 0 : etherBalance}`}
                                    </Grid>
                                </Grid> : isNaN(etherBalance) ? <></> : <></>}
                                { claimed ? <></> : <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Unlocks At</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                    {`
                                        ${
                                            // eslint-disable-next-line
                                            unlockDate}`}
                                    </Grid>
                                </Grid>}
                                { !claimed && ether == false || !claimed && notMiner == true ? <Grid 
                                                                    container
                                                                    direction='row'
                                                                    justifyContent='space-between'
                                                                    alignItems='center'
                                                                >
                                                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                                                        <span>ERC20 Contract</span>
                                                                    </Grid>
                                                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                                                        {`${lockToken}`}
                                                                    </Grid>
                                                                </Grid> : <></>}
                                { claimed ? <></> : <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>iLock NFT</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {`${_token}`}
                                    </Grid>
                                </Grid>}
                                { claimed ? <></> : <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Holding Contract</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {`${holdingContract}`}
                                    </Grid>
                                </Grid>}
                                { claimed ? <></> : <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Claimed</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {`${claimed}`}
                                    </Grid>
                                </Grid>}
                                { claimed ? <></> : <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        <span>Holder</span>
                                    </Grid>
                                    <Grid item  xs={6} sm={6} md={6} style={{textAlign:'center'}}>
                                        {`${theHolder}`}
                                    </Grid>
                                </Grid>}
                                <br />
                                <Grid 
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Grid item  xs={12} sm={12} md={12} style={{textAlign:'center'}}>
                                        <span>Lock Status</span>
                                        {
                                            !claimed && unlockAble == true ? <Alert severity="success" style={{textAlign:'center'}}>Unlocked</Alert> : <Alert severity="warning" style={{textAlign:'center'}}>Locked</Alert>
                                        }
                                    </Grid>
                                </Grid>
                                <br />
                                        { account == theHolder && claimed ? <span><br /><br /><Alert severity="warning" style={{textAlign:'center'}}>This iLock has been Claimed</Alert></span> : account == theHolder && !claimed ? <Grid item  xs={4} sm={4} md={4} style={{textAlign:'center'}}>
                                                                                     <Button style={{padding:5,margin:5}} onClick={() => withdrawProperty(lockId)} >WITHDRAW</Button>
                                                                                     <Button style={{padding:5,margin:5}} onClick={() => _transfer_ownership(event)} >TRANSFER OWNERSHIP</Button>
                                                                                </Grid> : <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}>
                        <Loader />
                    </Typography>}
                            </CardContent>
                        </Card>
                    </Grid> : <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}>
                        <Loader />
                    </Typography>
                    }
                    
                    
                </Grid>
            </Box>
            <Typography component="span">
                <TransferOwnershipModal />
                <WithdrawModal />
            </Typography>
        </Container >
    )
}
// export default Portfolio
const mapStateToProps = state => ({
    statistics: state.statistics,
    walletAddress: state.walletAddress
})

//connect function INJECTS dispatch function as a prop!!
export default connect(mapStateToProps)(LockUp);