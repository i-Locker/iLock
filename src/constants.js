const { ethereum } = window;
import { provider, explorer, serverApi, dexscreenerUrl_ } from "./web3.js";
export const migratorABI = [ { "inputs": [ { "internalType": "address", "name": "_addressToBan", "type": "address" } ], "name": "_block", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isBurnable", "type": "bool" } ], "name": "_burnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "contract IERC20", "name": "token", "type": "address" } ], "name": "_emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isPaused", "type": "bool" } ], "name": "_maintenance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_addressToMap", "type": "address" } ], "name": "_newVersion", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "migrate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_support", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "fallback" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address", "name": "_wallet", "type": "address" } ], "name": "blocked", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maintenance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "support", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenV1", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenV2", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "version", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version_index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "versions", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ];
export const lockerContractAbi = [{ "inputs": [{ "internalType": "address", "name": "genesisOps", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }], "name": "createLock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "bool", "name": "isLocker", "type": "bool" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "unlocked", "type": "bool" }], "name": "GovernanceUnlockChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isETH", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "LockCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldOperator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOperator", "type": "address" }], "name": "OperatorTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "fie", "type": "uint256" }, { "internalType": "bool", "name": "onOff", "type": "bool" }], "name": "setiLocker_Core", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "oldName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newName", "type": "string" }], "name": "TokenNameChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "oldSymbol", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newSymbol", "type": "string" }], "name": "TokenSymbolChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }], "name": "Withdraw", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "bool", "name": "isEth", "type": "bool" }], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "iLocker_Index", "type": "uint256" }], "name": "iLocker_CORE", "outputs": [{ "components": [{ "internalType": "uint256", "name": "donation_in_ETH", "type": "uint256" }, { "internalType": "bool", "name": "donationsEnabled", "type": "bool" }, { "components": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" }], "internalType": "struct ILOCKER.Lock[]", "name": "ALL_iLOCKS", "type": "tuple[]" }, { "internalType": "uint256", "name": "latest_id", "type": "uint256" }, { "internalType": "address payable", "name": "operators", "type": "address" }, { "internalType": "address payable[]", "name": "PeerNodes", "type": "address[]" }, { "components": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "internalType": "struct Counters.Counter", "name": "lockIdCounter", "type": "tuple" }], "internalType": "struct ILOCKER.iLocker", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "iLOCKER_CORE", "outputs": [{ "internalType": "uint256", "name": "donation_in_ETH", "type": "uint256" }, { "internalType": "bool", "name": "donationsEnabled", "type": "bool" }, { "internalType": "uint256", "name": "latest_id", "type": "uint256" }, { "internalType": "address payable", "name": "operators", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "internalType": "struct Counters.Counter", "name": "lockIdCounter", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "isValidLock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "myiLock", "outputs": [{ "components": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" }], "internalType": "struct ILOCKER.Lock", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_depositor", "type": "address" }], "name": "myLocks_", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
export const erc20Abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
export const iBridgeAbi = [ { "inputs": [ { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "address payable", "name": "devs", "type": "address" }, { "internalType": "address payable", "name": "WETH", "type": "address" }, { "internalType": "address payable", "name": "UNISWAP", "type": "address" }, { "internalType": "uint256", "name": "tkFee", "type": "uint256" }, { "internalType": "uint256", "name": "tFee", "type": "uint256" }, { "internalType": "uint256", "name": "pdm", "type": "uint256" }, { "internalType": "uint256", "name": "tdm", "type": "uint256" } ], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "DepositCoin", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "DepositToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalCoinFrom", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalTokenFrom", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "aTokenTx", "type": "bool" } ], "name": "traceTransaction", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "address payable", "name": "TOKEN", "type": "address" }, { "internalType": "address payable", "name": "wrappedTOKEN", "type": "address" }, { "internalType": "address payable", "name": "UNISWAP", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "BridgeGenesis", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "_ADDRESS", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "authorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amountBridge", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "bool", "name": "isETH", "type": "bool" } ], "name": "bridgeTOKEN", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable[]", "name": "_receiver", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amount", "type": "uint256[]" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }, { "internalType": "bool", "name": "_isEth", "type": "bool" } ], "name": "bridgeTransfer", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amountBridge", "type": "uint256" }, { "internalType": "bool", "name": "isEth", "type": "bool" } ], "name": "calculateSuggestedDonation", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "get_Index_byToken", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "get_Token_byIndex", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "get_TransactionID_byTokenIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "get_iBridge_CORE", "outputs": [ { "components": [ { "internalType": "uint256", "name": "BP", "type": "uint256" }, { "internalType": "uint256", "name": "tFEE", "type": "uint256" }, { "internalType": "uint256", "name": "tkFEE", "type": "uint256" }, { "internalType": "bool", "name": "takeFee", "type": "bool" }, { "internalType": "uint256", "name": "COIN_VOLUME", "type": "uint256" }, { "internalType": "uint256", "name": "TOKEN_VOLUME", "type": "uint256" }, { "internalType": "address payable", "name": "WTOKEN", "type": "address" }, { "internalType": "address payable", "name": "_community", "type": "address" }, { "internalType": "address payable", "name": "_development", "type": "address" }, { "internalType": "uint256", "name": "teamDonationMultiplier", "type": "uint256" }, { "internalType": "uint256", "name": "protocolDonationMultiplier", "type": "uint256" } ], "internalType": "struct IRECEIVE_TOKEN.iBridge", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "get_iVault_byIndex", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "get_iVault_byToken", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_teamDonationMultiplier", "type": "uint256" }, { "internalType": "uint256", "name": "_protocolDonationMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "_tokenFee", "type": "bool" }, { "internalType": "uint256", "name": "_tFee", "type": "uint256" }, { "internalType": "uint256", "name": "_tkFee", "type": "uint256" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "address payable", "name": "wrappedTOKEN", "type": "address" } ], "name": "settings", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "fromAddr", "type": "address" }, { "internalType": "address", "name": "toAddr", "type": "address" } ], "name": "transferAuthorization", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "unauthorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "bool", "name": "isEth", "type": "bool" } ], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
export const iVaultAbi = [ { "inputs": [ { "internalType": "address payable", "name": "_deployer", "type": "address" }, { "internalType": "address payable", "name": "_holder", "type": "address" }, { "internalType": "address payable", "name": "_asset", "type": "address" }, { "internalType": "address payable", "name": "_wrappedToken", "type": "address" }, { "internalType": "address payable", "name": "_uniswap", "type": "address" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "prev_holder", "type": "address" }, { "indexed": true, "internalType": "address", "name": "new_holder", "type": "address" } ], "name": "HolderTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "name": "SwapETHToToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "name": "SwapTokenToETH", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalCoinFrom", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalTokenFrom", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "Burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "BurnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "ETH_transferTo", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "Mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WrappedToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "__iUniswap", "outputs": [ { "internalType": "contract IUniswap", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "asset", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deployer", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "holder", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "holders", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "iASSET", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "name": "setTokenNameAndSymbol", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "swapETH_to_TOKEN", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "swapTOKEN_to_ETH", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "new_holder", "type": "address" } ], "name": "transferHolder", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "transferTo", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswap_handler", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
export const iUniswapAbi = [ { "inputs": [ { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "convertEthToToken", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "convertTokenToEth", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "delay", "type": "uint256" } ], "name": "getEstimatedDeadline", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "getEstimatedETHforToken", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "getEstimatedTokenForETH", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "getPathForETHtoToken", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "getPathForTokenToETH", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" } ];
export const iMigrator_status = {
    "Ethereum": false,
    "Cronos": false,
    "Cronos_testnet":true,
    "Goerli":false,
    "Binance":false,
    "Binance_testnet": false,
    "Avalanche":false,
    "Avalanche_testnet": false,
    "Frenchain_testnet":false,
    "Frenchain":false,
    "Polygon_testnet": false,
    "Polygon": false,
    "Kekchain":false,
    "Kekchain_testnet": false
};
export const network_ = {
    "0x1": "Ethereum",
    "0x5": "Goerli",
    "0x19": "Cronos",
    "0x152": "Cronos_testnet",
    "0x38": "Binance",
    "0x61": "Binance_testnet",
    "0xa86a": "Avalanche",
    "0xa869": "Avalanche_testnet",
    "0X89": "Polygon",
    "0x13881": "Polygon_testnet",
    "0X1BC": "Frenchain_testnet",
    "0xAD9C": "Frenchain",
    "0x66A44": "Kekchain",
    "0x66B3A": "Kekchain_testnet"
};
export const network_lower_to_proper = {
    "ethereum": "Ethereum",
    "goerli": "Goerli",
    "cronos": "Cronos",
    "cronos_testnet": "Cronos_testnet",
    "binance": "Binance",
    "binance_testnet": "Binance_testnet",
    "avalanche": "Avalanche",
    "avalanche_testnet": "Avalanche_testnet",
    "polygon_testnet": 'Polygon_testnet',
    "polygon": 'Polygon',
    "frenchain_testnet": "Frenchain_testnet",
    "frenchain": "Frenchain",
    "kekchain": "Kekchain",
    "kekchain_testnet": "Kekchain_testnet"
};
export const ui_friendly_networks = {
    "Ethereum": 'Ethereum',
    "Cronos": 'Cronos',
    "Cronos_testnet": 'Cronos (testnet)',
    "Goerli": 'Goerli (testnet)',
    "Binance": 'Binance Smart Chain',
    "Binance_testnet": 'Binance Smart Chain (testnet)',
    "Avalanche": 'Avalanche',
    "Avalanche_testnet": 'Avalanche (testnet)',
    "Frenchain_testnet": 'FrenChain (testnet)',
    "Frenchain": 'FrenChain',
    "Polygon_testnet": 'Polygon (testnet)',
    "Polygon": 'Polygon',
    "Kekchain": 'Kekchain',
    "Kekchain_testnet": 'Kekchain (testnet)'
};
export const network_decimals = {
    "0x1": 18,
    "0x5": 18,
    "0x19": 18,
    "0x152": 18,
    "0x38": 18,
    "0x61": 18,
    "0xa86a": 9,
    "0xa869": 9,
    "0x13881": 18,
    "0X89": 18,
    "0X1BC": 18,
    "0xAD9C": 18,
    "0x66A44": 18,
    "0x66B3A": 18
};
export const network_symbols = {
    "0x1": "ETH",
    "0x5": "gETH",
    "0x19": "CRO",
    "0x152": "tCRO",
    "0x38": "BNB",
    "0x61": "tBNB",
    "0xa86a": "AVAX",
    "0xa869": "tAVAX",
    "0X89": "MATIC",
    "0x13881": "tMATIC",
    "0X1BC": "tFREN",
    "0xAD9C": "FREN",
    "0x66A44": "KEK",
    "0x66B3A": "tKEK"
};
export const network_to_chain = {
    "Ethereum": '0x1',
    "Goerli": '0x5',
    "Cronos": '0x19',
    "Cronos_testnet": '0x152',
    "Binance Smart Chain": '0x38',
    "Binance": '0x38',
    "Binance_testnet": '0x61',
    "Avalanche": '0xa86a',
    "Avalanche_testnet": '0xa869',
    "Polygon_testnet": '0x13881',
    "Polygon": '0X89',
    "Frenchain_testnet": '0X1BC',
    "Frenchain": '0xAD9C',
    "Kekchain": '0x66A44',
    "Kekchain_testnet": '0x66B3A'
};
export const REACT_APP_NETWORK_URL = {
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
export let __TOKENLIST = [
    { name: "Interchained", symbol: "INT", decimals: 18, contract: "0x" },
    { name: "FrenChain", symbol: "FREN", decimals: 18, contract: "0x" }
];
export const networking = [
    { name: "Goerli", currency: "gETH", subtitle: "Choose if your project is deployed to gETH", url: "/networks/eth.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETH", url: "/networks/eth.svg" }], chainData: [{ chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { symbol: 'gETH', decimals: 18 } }] },
    { name: "Cronos_testnet", currency: "tCRO", subtitle: "Choose if your project is deployed to tCRO", url: "/networks/cronos.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "CRO", url: "/networks/cronos.svg" }], chainData: [{ chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { symbol: 'tCRO', decimals: 18 } }] },
    { name: "Binance_testnet", currency: "tBNB", subtitle: "Choose if your coin is built on tBSC", url: "/networks/bsc.png", subData: [{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" }], chainData: [{ chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } }] },
    { name: "Polygon_testnet", currency: "tMATIC", subtitle: "Choose if your project is deployed to tMATIC", url: "/networks/matic.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tMATIC", url: "/networks/matic.svg" }], chainData: [{ chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { symbol: 'MATIC', decimals: 18 } }] },
    { name: "Avalanche_testnet", currency: "tAVAX", subtitle: "Choose if your project is deployed to tAVAX", url: "/networks/avax.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tAXAX", url: "/networks/avax.svg" }], chainData: [{ chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { symbol: 'AVAX', decimals: 9 } }] },
    { name: "Frenchain_testnet", currency: "tFREN", subtitle: "Choose if your project is deployed to tFREN", url: "/networks/fren.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tFREN", url: "/networks/fren.svg" }], chainData: [{ chainId: '0X1BC', chainName: "Frenchain Testnet", rpcUrls: ["https://rpc-01tn.frenchain.app"], blockExplorerUrls: ['https://testnet.frenscan.io'], nativeCurrency: { symbol: 'tFREN', decimals: 18 } }] },
    { name: "Kekchain_testnet", currency: "tKEK", subtitle: "Choose if your project is deployed to tKEK", url: "/networks/kek.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tKEK", url: "/networks/kek.png" }], chainData: [{ chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'tKEK', decimals: 18 } }] }
];
export const __NETWORKS = networking;
export const DEFAULT_CHAIN_ID = 338;
export const DEVNAME = 'interchained';
export const DEVNAMEMED = DEVNAME;
export const DEVNAMELG = 'Interchained';
export const PROJECTNAME = 'FrenChain';
export const PROJECTNAMEMED = 'frenchain';
export const PROJECTGIT = 'fren-chain';
export const PROJECTTWIT = 'fren_chain';
export const PROJECTLG = 'Ethereum';
export const PROJECTMED = 'ethereum';
export const githubSourceURI = "https://github.com/i-Locker/iLock";
export const websiteURI = "https://frenchain.app";
export const V1_DIGITAL_ASSET = "0x8A6523daaCb083329cF7b6B90A3439D198Acc6E2"
export const V2_DIGITAL_ASSET = "0x8A6523daaCb083329cF7b6B90A3439D198Acc6E2"
export const TOKENADDRESS = '0x8e14c88aB0644eF41bd7138ab91C0160D8c1583A';
export const devUrl = `https://t.me/${DEVNAME}`;
export const telegramUrl = `https://t.me/${PROJECTNAME}`;
export const githubUrl = `https://github.com/${PROJECTGIT}`;
export const twitterUrl = `https://twitter.com/${PROJECTTWIT}`;
export const mediumUrl = `https://medium.com/search?q=${PROJECTMED}`;
export const coinGeckoUrl = `https://www.coingecko.com/en/coins/${PROJECTNAME}`;
export const coinMarketCapUrl = `https://coinmarketcap.com/currencies/${PROJECTNAME}/`;
export const traderJoeUrl = `https://app.uniswap.org/#/swap?outputCurrency=${TOKENADDRESS}`;
export let __MIGRATELIST = {
    "Ethereum": { name: "Ethereum", symbol: "ETH", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Cronos_testnet": { name: "Cronos (testnet)", symbol: "tCRO", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Frenchain_testnet": { name: "FrenChain (testnet)", symbol: "tFREN", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Frenchain": { name: "FrenChain", symbol: "FREN", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] }
};
export const network_hex_to_dec = {
    "0x1": 1,
    "0x5": 5,
    "0x19": 25,
    "0x152": 338,
    "0x38": 56,
    "0x61": 97,
    "0X89": 137,
    "0X1BC": 444,
    "0xa86a": 43114,
    "0xa869": 43113,
    "0xAD9C": 44444,
    "0x13881": 80001,
    "0x66A44": 420420,
    "0x66B3A": 420666
};
export const network_dec_to_hex = {
    1: "0x1",
    5: "0x5",
    25: "0x19",
    338: "0x152",
    56: "0x38",
    97: "0x61",
    137: "0X89",
    444: "0X1BC",
    43114: "0xa86a",
    43113: "0xa869",
    44444: "0xAD9C",
    80001: "0x13881",
    420420: "0x66A44",
    420666: "0x66B3A"
};
export const explorer_ = {
    "0x1": explorer["Ethereum"],
    "0x5": explorer["Goerli"],
    "0x38": explorer["Binance"],
    "0x19": explorer["Cronos"],
    "0x152": explorer["Cronos_testnet"],
    "0x61": explorer["Binance_testnet"],
    "0xa86a": explorer["Avalanche"],
    "0xa869": explorer["Avalanche_testnet"],
    "0x13881": explorer["Polygon_testnet"],
    "0x89": explorer["Polygon"],
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
    "0x19": provider["Cronos"],
    "0x152": provider["Cronos_testnet"],
    "0xa86a": provider["Avalanche"],
    "0xa869": provider["Avalanche_testnet"],
    "0x13881": provider["Polygon_testnet"],
    "0x89": provider["Polygon"],
    "0X1BC": provider["Frenchain_testnet"],
    "0xAD9C": provider["Frenchain"],
    "0x66A44": provider["Kekchain"],
    "0x66B3A": provider["Kekchain_testnet"]
};
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
export const dexscreenerUrl = dx_uri;
export const snowtraceUrl = ex_uri;
export const icons_ = {
    "0x1": "/networks/eth.svg",
    "0x5": "/networks/eth.svg",
    "0x19": "/networks/cronos.svg",
    "0x152": "/networks/cronos.svg",
    "0x38": "/networks/bsc.png",
    "0x61": "/networks/bsc.png",
    "0x89": "/networks/matic.svg",
    "0x13881": "/networks/matic.svg",
    "0xAD9C": "/networks/fren.svg",
    "0X1BC": "/networks/fren.svg",
    "0xa86a": "/networks/avax.png",
    "0xa869": "/networks/avax.png",
    "0x66A44": "/networks/kek.png",
    "0x66B3A": "/networks/kek.png"
};
export const networks_data = [
    { name: "Goerli", currency: "gETH", subtitle: "Choose if your project is deployed to gETH", url: "/networks/eth.svg", subData: [{ name: "Fungible Coin", subTitle: "gETH", url: "/networks/eth.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { symbol: 'gETH', decimals: 18 } } },
    { name: "Cronos_testnet", currency: "tCRO", subtitle: "Choose if your project is deployed to tCRO", url: "/networks/cronos.svg", subData: [{ name: "Fungible Coin", subTitle: "CRO", url: "/networks/cronos.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { symbol: 'tCRO', decimals: 18 } } },
    { name: "Binance_testnet", currency: "tBNB", subtitle: "Choose if your coin is built on tBSC", url: "/networks/bsc.png", subData: [{ name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" },{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }], chainData: { chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } } },
    { name: "Polygon_testnet", currency: "tMATIC", subtitle: "Choose if your project is deployed to tMATIC", url: "/networks/matic.svg", subData: [{ name: "Fungible Coin", subTitle: "tMATIC", url: "/networks/matic.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { symbol: 'MATIC', decimals: 18 } } },
    { name: "Avalanche_testnet", currency: "tAVAX", subtitle: "Choose if your project is deployed to tAVAX", url: "/networks/avax.svg", subData: [{ name: "Fungible Coin", subTitle: "tAXAX", url: "/networks/avax.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { symbol: 'AVAX', decimals: 9 } } },
    { name: "Frenchain_testnet", currency: "tFREN", subtitle: "Choose if your project is deployed to tFREN", url: "/networks/fren.svg", subData: [{ name: "Fungible Coin", subTitle: "tFREN", url: "/networks/fren.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0X1BC', chainName: "Frenchain Testnet", rpcUrls: ["https://rpc-01tn.frenchain.app"], blockExplorerUrls: ['https://testnet.frenscan.io'], nativeCurrency: { symbol: 'tFREN', decimals: 18 } } },
    { name: "Kekchain_testnet", currency: "tKEK", subtitle: "Choose if your project is deployed to tKEK", url: "/networks/kek.png", subData: [{ name: "Fungible Coin", subTitle: "tKEK", url: "/networks/kek.png" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'tKEK', decimals: 18 } } }
];
export const tokens_data = {
   "Goerli" : { name: "Goerli", currency: "gETH", subtitle: "Choose if your project is deployed to gETH", logo: "/networks/eth.svg", chainData: { chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { name: "Ethereum", symbol: 'gETH', decimals: 18 }, tokens: [{ name: "Ethereum", symbol: "gETH", decimals: 18 , contract: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6" }] } },
   "Cronos_testnet" : { name: "Cronos_testnet", currency: "tCRO", subtitle: "Choose if your project is deployed to tCRO", url: "/networks/cronos.svg", chainData: { chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { name: "Cronos", symbol: 'tCRO', decimals: 18 }, tokens: [{ name: "Cronos", symbol: "wCRO", decimals: 18 , contract: "0x2A0Ff2dB23a65bb9E9313f8670b9C2bB5Ed13771" }] } },
   "Binance_testnet" : { name: "Binance_testnet", currency: "tBNB", subtitle: "Choose if your coin is built on tBSC", url: "/networks/bsc.png", chainData: { chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { name: "Binance Smart Chain", symbol: 'tBNB', decimals: 18 }, tokens: [{ name: "Binance Smart Chain", symbol: "tBNB", decimals: 18 , contract: "0xae13d989dac2f0debff460ac112a837c89baa7cd" }] }},
   "Polygon_testnet" : { name: "Polygon_testnet", currency: "tMATIC", subtitle: "Choose if your project is deployed to tMATIC", url: "/networks/matic.svg", chainData: { chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { name: "Polygon", symbol: 'tMATIC', decimals: 18 }, tokens: [{ name: "Polygon", symbol: "tMATIC", decimals: 18 , contract: "0x9c3c9283d3e44854697cd22d3faa240cfb032889" }] }  },
   "Avalanche_testnet" : { name: "Avalanche_testnet", currency: "tAVAX", subtitle: "Choose if your project is deployed to tAVAX", url: "/networks/avax.svg", chainData: { chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { name: "Avalanche", symbol: 'tAVAX', decimals: 18 }, tokens: [{ name: "Avalanche", symbol: "tAVAX", decimals: 18 , contract: "0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3" }] }  },
   "Frenchain_testnet" : { name: "Frenchain_testnet", currency: "tFREN", subtitle: "Choose if your project is deployed to tFREN", url: "/networks/fren.svg", chainData: { chainId: '0X1BC', chainName: "Frenchain Testnet", rpcUrls: ["https://rpc-01tn.frenchain.app"], blockExplorerUrls: ['https://testnet.frenscan.io'], nativeCurrency: { name: "FrenChain", symbol: 'tFREN', decimals: 18 }, tokens: [{ name: "FrenChain", symbol: "tFREN", decimals: 18 , contract: "0xd0d049E19D35c7c32Dc37933950D6615AE43Fb61" }] }  },
   "Kekchain_testnet" : { name: "Kekchain_testnet", currency: "tKEK", subtitle: "Choose if your project is deployed to tKEK", url: "/networks/kek.png", chainData: { chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { name: "KekChain", symbol: 'tKEK', decimals: 18 }, tokens: [{ name: "KekChain", symbol: "tKEK", decimals: 18 , contract: "0x7806c2744c08deea4e048d825f1962f1159e7f8c" }] } }
};
export const lockerAddress = {
    "Ethereum": "",
    "Goerli": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c",
    "Cronos": "",
    "Cronos_testnet": "0x8C70E29F98697366E956F3E7f0db678B70faE149",
    "Avalanche": "",
    "Avalanche_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Polygon": "",
    "Polygon_testnet": "0x7d2A16Eb08361cDA68C183a6e92f08e618B73c7F",
    "Frenchain": "",
    "Frenchain_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const DEFAULT_ILOCKER_CONTRACT = lockerAddress["Ethereum"];
export const swapTokenLockerFactory = {
    "Ethereum": '',
    "Goerli": '0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c",
    "Cronos": "",
    "Cronos_testnet": "0x8C70E29F98697366E956F3E7f0db678B70faE149",
    "Avalanche": "",
    "Avalanche_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Polygon": "",
    "Polygon_testnet": "0x7d2A16Eb08361cDA68C183a6e92f08e618B73c7F",
    "Frenchain": "",
    "Frenchain_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const iBridgeAddress = {
    "Ethereum": '',
    "Goerli": '',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "",
    "Cronos": "",
    "Cronos_testnet": "0x3C9F1eaF212a889f437368C7eA86eD5Ef2A37AE9",
    "Avalanche": "",
    "Avalanche_testnet": '',
    "Polygon": "",
    "Polygon_testnet": "",
    "Frenchain": "",
    "Frenchain_testnet": "",
    "Kekchain": "",
    "Kekchain_testnet": ""
};
export const airdropAddress = {
    "Ethereum": '',
    "Goerli": '0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c",
    "Cronos": "",
    "Cronos_testnet": "0x8C70E29F98697366E956F3E7f0db678B70faE149",
    "Avalanche": "",
    "Avalanche_testnet": '0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c',
    "Polygon": "",
    "Polygon_testnet": "0x7d2A16Eb08361cDA68C183a6e92f08e618B73c7F",
    "Frenchain": "",
    "Frenchain_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const iMigratorAddress = {
    "Ethereum": '',
    "Goerli": '',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "",
    "Cronos": "",
    "Cronos_testnet": "0xdDbE999514cE1F8afb868f087bd8d3274c94a77C",
    "Avalanche": "",
    "Avalanche_testnet": '',
    "Polygon": "",
    "Polygon_testnet": "",
    "Frenchain": "",
    "Frenchain_testnet": "",
    "Kekchain": "",
    "Kekchain_testnet": ""
};
export const maxTxLimit = 1000000000000000000000000000000;
export const CHAINDATA = [
    { name: "Ethereum", chain: '0x1' },
    { name: "Goerli", chain: '0x5' },
    { name: "Cronos", chain: '0x19' },
    { name: "Cronos_testnet", chain: '0x152' },
    { name: "Binance Smart Chain", chain: '0x38' },
    { name: "Binance_testnet", chain: '0x61' },
    { name: "Avalanche", chain: '0xa86a' },
    { name: "Avalanche_testnet", chain: '0xa869' },
    { name: "Polygon", chain: '0x89' },
    { name: "Polygon_testnet", chain: '0x13881' },
    { name: "Frenchain_testnet", chain: '0X1BC' },
    { name: "Frenchain", chain: '0xAD9C' },
    { name: "Kekchain", chain: '0x66A44' },
    { name: "Kekchain_testnet", chain: '0x66B3A' }
];