const { ethereum } = window;
import { provider, explorer, serverApi, dexscreenerUrl_ } from "./web3.js";
export const lockerContractAbi = [ { "inputs": [ { "internalType": "address", "name": "initialOwner", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "bool", "name": "unlocked", "type": "bool" } ], "name": "changeLockStatusByGovernance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" } ], "name": "createLock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "bool", "name": "isLocker", "type": "bool" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "ETHLockCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "unlocked", "type": "bool" } ], "name": "GovernanceUnlockChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "LockCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldOperator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOperator", "type": "address" } ], "name": "OperatorTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "fie", "type": "uint256" }, { "internalType": "bool", "name": "onOff", "type": "bool" } ], "name": "set_fee_in_ETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "oldName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newName", "type": "string" } ], "name": "TokenNameChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "oldSymbol", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newSymbol", "type": "string" } ], "name": "TokenSymbolChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "bool", "name": "isEth", "type": "bool" } ], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "activity", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "All_iLocks", "outputs": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "donation_in_ETH", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feesInETH", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" } ], "name": "getLock", "outputs": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getLock_byIndex", "outputs": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "holder", "type": "address" } ], "name": "Holder_iLock", "outputs": [ { "components": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock[]", "name": "_my_iLocks", "type": "tuple[]" } ], "internalType": "struct ILOCKER.i_Locks_", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" } ], "name": "isValidLock", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastLockId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "My_nested_iLocks", "outputs": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" } ], "name": "myiLock", "outputs": [ { "components": [ { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" } ], "internalType": "struct ILOCKER.Lock", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "myLocks_", "outputs": [ { "internalType": "uint256[]", "name": "_my_locks", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenOfOwnerByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];
export const erc20Abi = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
export const network_ = {
    "0x1": "Ethereum",
    "0x5": "Goerli",
    "0x38": "Binance",
    "0x61": "Binance_testnet",
    "0xa86a": "Avalanche",
    "0xa869": "Avalanche_testnet",
    "0X1BC": "Frenchain_testnet",
    "0xAD9C": "Frenchain",
    "0x66A44": "Kekchain",
    "0x66B3A": "Kekchain_testnet"
};
export const network_lower_to_proper = {
    "ethereum": "Ethereum",
    "goerli": "Goerli",
    "binance": "Binance",
    "binance_testnet": "Binance_testnet",
    "avalanche": "Avalanche",
    "avalanche_testnet": "Avalanche_testnet",
    "frenchain_testnet": "Frenchain_testnet",
    "frenchain": "Frenchain",
    "kekchain": "Kekchain",
    "kekchain_testnet": "Kekchain_testnet"
};
export const ui_friendly_networks = {
    "Ethereum": 'Ethereum',
    "Goerli": 'Goerli (testnet)',
    "Binance": 'Binance Smart Chain',
    "Binance_testnet": 'Binance Smart Chain (testnet)',
    "Avalanche": 'Avalanche',
    "Avalanche_testnet": 'Avalanche (testnet)',
    "Frenchain_testnet": 'FrenChain (testnet)',
    "Frenchain": 'FrenChain',
    "Kekchain": 'Kekchain',
    "Kekchain_testnet": 'Kekchain (testnet)'
};
export const network_decimals = {
    "0x1": 18,
    "0x5": 18,
    "0x38": 18,
    "0x61": 18,
    "0xa86a": 9,
    "0xa869": 9,
    "0X1BC": 18,
    "0xAD9C": 18,
    "0x66A44": 18,
    "0x66B3A": 18
};
export const network_symbols = {
    "0x1": "ETH",
    "0x5": "gETH",
    "0x38": "BNB",
    "0x61": "tBNB",
    "0xa86a": "AVAX",
    "0xa869": "tAVAX",
    "0X1BC": "tFREN",
    "0xAD9C": "FREN",
    "0x66A44": "KEK",
    "0x66B3A": "tKEK"
};
export const network_to_chain = {
    "Ethereum": '0x1',
    "Goerli": '0x5',
    "Binance Smart Chain": '0x38',
    "Binance_testnet": '0x61',
    "Avalanche": '0xa86a',
    "Avalanche_testnet": '0xa869',
    "Frenchain_testnet": '0X1BC',
    "Frenchain": '0xAD9C',
    "Kekchain": '0x66A44',
    "Kekchain_testnet": '0x66B3A'
};
export const network_hex_to_dec = {
    "0x1": 1,
    "0x5": 5,
    "0x38": 56,
    "0x61": 97,
    "0xa86a": 43114,
    "0xa869": 43113,
    "0X1BC": 444,
    "0xAD9C": 44444,
    "0x66A44": 420420,
    "0x66B3A": 420666
};
export const network_dec_to_hex = {
    1: "0x1",
    5: "0x5",
    56: "0x38",
    97: "0x61",
    43114: "0xa86a",
    43113: "0xa869",
    444: "0X1BC",
    44444: "0xAD9C",
    420420: "0x66A44",
    420666: "0x66B3A"
};
export const explorer_ = {
    "0x1": explorer["Ethereum"],
    "0x5": explorer["Goerli"],
    "0x38": explorer["Binance"],
    "0x61": explorer["Binance_testnet"],
    "0xa86a": explorer["Avalanche"],
    "0xa869": explorer["Avalanche_testnet"],
    "0X1BC": explorer["Frenchain_testnet"],
    "0xAD9C": explorer["Frenchain"],
    "0x66A44": explorer["Kekchain"],
    "0x66B3A": explorer["Kekchain_testnet"]
};
export const rpc_ = {
    "0x1": provider["Ethereum"],
    "0x5": provider["Goerli"],
    "0x38": provider["Binance"],
    "0x61": provider["Binance_testnet"],
    "0xa86a": provider["Avalanche"],
    "0xa869": provider["Avalanche_testnet"],
    "0X1BC": provider["Frenchain_testnet"],
    "0xAD9C": provider["Frenchain"],
    "0x66A44": provider["Kekchain"],
    "0x66B3A": provider["Kekchain_testnet"]
};
export const icons_ = {
    "0x1": "/networks/eth.svg",
    "0x5": "/networks/eth.svg",
    "0x38": "/networks/bsc.png",
    "0x61": "/networks/bsc.png",
    "0xAD9C": "/networks/fren.svg",
    "0X1BC": "/networks/fren.svg",
    "0xa86a": "/networks/avax.png",
    "0xa869": "/networks/avax.png",
    "0x66A44": "/networks/kek.png",
    "0x66B3A": "/networks/kek.png"
};
export const networks_data = [
    { name: "Ethereum", currency: "ETH", subtitle: "Choose if your project is deployed to ETH", url: "/networks/eth.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "ETH", url: "/networks/eth.svg" }], chainData: { chainId: '0x1', chainName: "Ethereum", rpcUrls: ["https://mainnet.infura.io/v3/"], blockExplorerUrls: ['https://etherscan.io'], nativeCurrency: { symbol: 'MATIC', decimals: 18 } } },
    { name: "Goerli", currency: "gETH", subtitle: "Choose if your project is deployed to gETH", url: "/networks/eth.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETH", url: "/networks/eth.svg" }], chainData: { chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://goerli.infura.io/v3/"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { symbol: 'gETH', decimals: 18 } } },
    { name: "Binance", currency: "BNB", subtitle: "Choose if your coin is built on BSC", url: "/networks/bsc.png", subData: [{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" }], chainData: { chainId: '0x38', chainName: "Binance Smart Chain", rpcUrls: ["https://bsc-dataseed1.ninicoin.io"], blockExplorerUrls: ['https://bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } } },
    { name: "Binance_testnet", currency: "tBNB", subtitle: "Choose if your coin is built on BSC", url: "/networks/bsc.png", subData: [{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" }], chainData: { chainId: '0x38', chainName: "Binance Smart Chain", rpcUrls: ["https://bsc-dataseed1.ninicoin.io"], blockExplorerUrls: ['https://bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } } },
    { name: "Frenchain", currency: "FREN", subtitle: "Choose if your project is deployed to FREN", url: "/networks/fren.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "FREN", url: "/networks/fren.svg" }], chainData: { chainId: '0xAD9C', chainName: "Frenchain", rpcUrls: ["https://rpc-02.frenscan.io"], blockExplorerUrls: ['https://frenscan.io'], nativeCurrency: { symbol: 'FREN', decimals: 18 } } },
    { name: "Frenchain_testnet", currency: "tFREN", subtitle: "Choose if your project is deployed to tFREN", url: "/networks/fren.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tFREN", url: "/networks/fren.svg" }], chainData: { chainId: '0X1BC', chainName: "Frenchain Testnet", rpcUrls: ["https://rpc-01tn.frenchain.app"], blockExplorerUrls: ['https://testnet.frenscan.io'], nativeCurrency: { symbol: 'tFREN', decimals: 18 } } },
    { name: "Kekchain", currency: "KEK", subtitle: "Choose if your project is deployed to KEK", url: "/networks/kek.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "KEK", url: "/networks/kek.png" }], chainData: { chainId: '0x66A44', chainName: "Kekchain", rpcUrls: ["https://mainnet.kekchain.com"], blockExplorerUrls: ['https://mainnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'KEK', decimals: 18 } } },
    { name: "Kekchain_testnet", currency: "tKEK", subtitle: "Choose if your project is deployed to tKEK", url: "/networks/kek.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tKEK", url: "/networks/kek.png" }], chainData: { chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'tKEK', decimals: 18 } } }
];
export const devUrl = 'https://t.me/interchained';
export const telegramUrl = `https://t.me/frenchain`;
export const githubUrl = 'https://github.com/fren-chain';
export const twitterUrl = `https://twitter.com/fren_chain`;
export const mediumUrl = 'https://medium.com/search?q=ethereum';
export const TOKENADDRESS = '0x8e14c88aB0644eF41bd7138ab91C0160D8c1583A';
export const coinGeckoUrl = `https://www.coingecko.com/en/coins/frenchain`;
export const coinMarketCapUrl = `https://coinmarketcap.com/currencies/frenchain/`;
export const traderJoeUrl = `https://app.uniswap.org/#/swap?outputCurrency=${TOKENADDRESS}`;
let dx_uri;
let ex_uri;
try {
    if (ethereum.chainId != undefined) {
        dx_uri = `https://dexscreener.com/${network_[ethereum.chainId.toString()]}/${TOKENADDRESS}`;
        ex_uri = `${explorer_[ethereum.chainId.toString()]}/token/${TOKENADDRESS}`;
    }
} catch (e) {
    console.log("e (no network): ", e);
};
export const websiteURI = "https://frenchain.app";
export const dexscreenerUrl = dx_uri;
export const snowtraceUrl = ex_uri;
export const lockerAddress = {
    "Ethereum": "0x8ba74905c9ab0aa185e04498e2f83f8cdec20561",
    "Goerli": "0x8ba74905c9ab0aa185e04498e2f83f8cdec20561",
    "Binance Smart Chain": "0x2ac8a31ac8325974a57efc34672f3e348b2e715f",
    "Binance_testnet": "0xd5f128FF1D1665d46c1F5668AecFed7C57FBeEBc",
    "Avalanche": "0x8ba74905c9ab0aa185e04498e2f83f8cdec20561",
    "Avalanche_testnet": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Frenchain": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Frenchain_testnet": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Kekchain": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const DEFAULT_ILOCKER_CONTRACT = lockerAddress["Ethereum"];
export const swapTokenLockerFactory = {
    "Ethereum": '0xc4cc543e1f80cac1bddd35999e3300eb50029ba9',
    "Goerli": '0xc4cc543e1f80cac1bddd35999e3300eb50029ba9',
    "Binance Smart Chain": "0x8768833012a7f09d9d77368cf69a1a487164e5d7",
    "Binance_testnet": "0xd5f128FF1D1665d46c1F5668AecFed7C57FBeEBc",
    "Avalanche": "0xa21121b3dfd558a3a91d508049d1454073c134d4",
    "Avalanche_testnet": "0x01c211e90F042D87faeDe2158b0D1025dF4734E7",
    "Frenchain": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Frenchain_testnet": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Kekchain": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const airdropAddress = {
    "Ethereum": '0x2e4a2c24f87a2c39b41e7c4d17a9da730b2c411d',
    "Goerli": '0x2e4a2c24f87a2c39b41e7c4d17a9da730b2c411d',
    "Binance Smart Chain": "0xf205dcb07fabdaf4fa0aab9d6d073f792b257d8d",
    "Binance_testnet": "0xd5f128FF1D1665d46c1F5668AecFed7C57FBeEBc",
    "Avalanche": "0xe9cac8190614cdac2e9caf44b2e407700a785603",
    "Avalanche_testnet": '0x57Ba1d27eb608583F1339aD4FfADAD072b6507Fa',
    "Frenchain": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Frenchain_testnet": "0x5FCCa8AEf0a280b77E68a695B153a674d9b03408",
    "Kekchain": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const maxTxLimit = 1000000000000000000000000000000;
export const CHAINDATA = [
    { name: "Ethereum", chain: '0x1' },
    { name: "Goerli", chain: '0x5' },
    { name: "Binance Smart Chain", chain: '0x38' },
    { name: "Binance_testnet", chain: '0x61' },
    { name: "Avalanche", chain: '0xa86a' },
    { name: "Avalanche_testnet", chain: '0xa869' },
    { name: "Frenchain_testnet", chain: '0X1BC' },
    { name: "Frenchain", chain: '0xAD9C' },
    { name: "Kekchain", chain: '0x66A44' },
    { name: "Kekchain_testnet", chain: '0x66B3A' }
];