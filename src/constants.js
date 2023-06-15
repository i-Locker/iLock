const { ethereum } = window;
import CRFI_TOKENLIST from './assets/tokens/ETH.json';
import ETNX_TOKENLIST from './assets/tokens/ETH.json';
import ETH_TOKENLIST from './assets/tokens/ETH.json';
import BSC_TOKENLIST from './assets/tokens/BSC.json';
import AVAX_TOKENLIST from './assets/tokens/AVAX.json';
import CRONOS_TOKENLIST from './assets/tokens/CRONOS.json';
import POLYGON_TOKENLIST from './assets/tokens/POLYGON.json';
import { provider, explorer, serverApi, dexscreenerUrl_ } from "./web3.js";
export const migratorABI = [ { "inputs": [ { "internalType": "address", "name": "_addressToBan", "type": "address" } ], "name": "_block", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isBurnable", "type": "bool" } ], "name": "_burnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "contract IERC20", "name": "token", "type": "address" } ], "name": "_emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "isPaused", "type": "bool" } ], "name": "_maintenance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_addressToMap", "type": "address" } ], "name": "_newVersion", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "migrate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "_support", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "fallback" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address", "name": "_wallet", "type": "address" } ], "name": "blocked", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maintenance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "support", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenV1", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenV2", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "version", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version_index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "versions", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ];
export const lockerContractAbi = [{ "inputs": [{ "internalType": "address", "name": "genesisOps", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }], "name": "createLock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "bool", "name": "isEth", "type": "bool" }, { "internalType": "bool", "name": "isLocker", "type": "bool" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "unlocked", "type": "bool" }], "name": "GovernanceUnlockChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isETH", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "LockCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldOperator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOperator", "type": "address" }], "name": "OperatorTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "fie", "type": "uint256" }, { "internalType": "bool", "name": "onOff", "type": "bool" }], "name": "setiLocker_Core", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "oldName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newName", "type": "string" }], "name": "TokenNameChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "oldSymbol", "type": "string" }, { "indexed": false, "internalType": "string", "name": "newSymbol", "type": "string" }], "name": "TokenSymbolChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }], "name": "Withdraw", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "bool", "name": "isEth", "type": "bool" }], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "iLocker_Index", "type": "uint256" }], "name": "iLocker_CORE", "outputs": [{ "components": [{ "internalType": "uint256", "name": "donation_in_ETH", "type": "uint256" }, { "internalType": "bool", "name": "donationsEnabled", "type": "bool" }, { "components": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" }], "internalType": "struct ILOCKER.Lock[]", "name": "ALL_iLOCKS", "type": "tuple[]" }, { "internalType": "uint256", "name": "latest_id", "type": "uint256" }, { "internalType": "address payable", "name": "operators", "type": "address" }, { "internalType": "address payable[]", "name": "PeerNodes", "type": "address[]" }, { "components": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "internalType": "struct Counters.Counter", "name": "lockIdCounter", "type": "tuple" }], "internalType": "struct ILOCKER.iLocker", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "iLOCKER_CORE", "outputs": [{ "internalType": "uint256", "name": "donation_in_ETH", "type": "uint256" }, { "internalType": "bool", "name": "donationsEnabled", "type": "bool" }, { "internalType": "uint256", "name": "latest_id", "type": "uint256" }, { "internalType": "address payable", "name": "operators", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }], "internalType": "struct Counters.Counter", "name": "lockIdCounter", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "isValidLock", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "myiLock", "outputs": [{ "components": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "creator", "type": "address" }, { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "claimed", "type": "bool" }, { "internalType": "bool", "name": "Ether", "type": "bool" }, { "internalType": "uint256", "name": "unlockTimestamp", "type": "uint256" }, { "internalType": "address payable", "name": "holdingContract", "type": "address" }, { "internalType": "bool", "name": "unlockableByGovernance", "type": "bool" }, { "internalType": "bool", "name": "unlockedByGovernance", "type": "bool" }, { "internalType": "bool", "name": "lockedByGovernance", "type": "bool" }], "internalType": "struct ILOCKER.Lock", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_depositor", "type": "address" }], "name": "myLocks_", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
export const erc20Abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
export const iBridgeAbi = [ { "inputs": [ { "internalType": "address payable", "name": "signor", "type": "address" }, { "internalType": "address payable", "name": "PROJECT", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "outputCurrency", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "chainA", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainB", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Coin_In", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainA", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainB", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Coin_Out", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainId", "type": "uint256" } ], "name": "Coin_Out_Failed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "signer", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "status", "type": "bool" } ], "name": "SignerUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainA", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainB", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Token_In", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainA", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainB", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Token_Out", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "orderID", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Token_Out_Failed", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "bytes32", "name": "payment_id_a", "type": "bytes32" }, { "internalType": "bytes32", "name": "payment_id_b", "type": "bytes32" } ], "name": "CheckPaid", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "_asset", "type": "address" } ], "name": "Supported", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "VIP", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_wallet", "type": "address" }, { "internalType": "bool", "name": "toggle", "type": "bool" } ], "name": "VIP_Awards", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "_iVault", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "_asset", "type": "address" }, { "internalType": "bool", "name": "choice", "type": "bool" } ], "name": "addAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "wallet", "type": "address" }, { "internalType": "bool", "name": "choice", "type": "bool" } ], "name": "blockWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "wallet", "type": "address" } ], "name": "blocked", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "outputCurrency", "type": "address" }, { "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "chainB", "type": "uint256" } ], "name": "coinIn", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "_orderID", "type": "uint256" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" } ], "name": "coinOut", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable[]", "name": "holder", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_orderID", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "chainId", "type": "uint256[]" } ], "name": "coinOutBulk", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "donation", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "donations", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "iSupportProject", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_signer", "type": "address" }, { "internalType": "bool", "name": "_status", "type": "bool" } ], "name": "manageSigner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_signer", "type": "address" }, { "internalType": "bool", "name": "_status", "type": "bool" } ], "name": "manage_signers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minDonation", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "order_book", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "orders", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "paid_orders", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reserves", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "feeAmount", "type": "uint256" }, { "internalType": "uint256", "name": "tFeeAmount", "type": "uint256" } ], "name": "setFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "supportWallet", "type": "address" } ], "name": "setSupport", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "iVaultWallet", "type": "address" } ], "name": "set_iVault", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "minimumSuggestedDonation", "type": "uint256" } ], "name": "setiSupport", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "signer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "name": "supportedAssets", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tDonation", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "donationToggle", "type": "bool" } ], "name": "toggleDonations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "tokenDonations", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "tokenAddress", "type": "address" }, { "internalType": "address payable", "name": "fromWallet", "type": "address" }, { "internalType": "address payable", "name": "toWallet", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "uint256", "name": "chainB", "type": "uint256" }, { "internalType": "bool", "name": "tokenFee", "type": "bool" } ], "name": "tokenIn", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "tokenAddress", "type": "address" }, { "internalType": "address payable", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_orderID", "type": "uint256" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" } ], "name": "tokenOut", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20[]", "name": "tokenAddress", "type": "address[]" }, { "internalType": "address payable[]", "name": "user", "type": "address[]" }, { "internalType": "uint256[]", "name": "tokenAmount", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_orderID", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "chainId", "type": "uint256[]" } ], "name": "tokenOutBulk", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "tokenReserves", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "withheld", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
export const iVaultAbi = [ { "inputs": [ { "internalType": "address payable", "name": "_deployer", "type": "address" }, { "internalType": "address payable", "name": "_holder", "type": "address" }, { "internalType": "address payable", "name": "_asset", "type": "address" }, { "internalType": "address payable", "name": "_wrappedToken", "type": "address" }, { "internalType": "address payable", "name": "_uniswap", "type": "address" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "prev_holder", "type": "address" }, { "indexed": true, "internalType": "address", "name": "new_holder", "type": "address" } ], "name": "HolderTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "name": "SwapETHToToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "destination", "type": "address" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "name": "SwapTokenToETH", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalCoinFrom", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address[]", "name": "destination", "type": "address[]" }, { "indexed": true, "internalType": "address", "name": "origin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "WithdrawalTokenFrom", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [ { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "Burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "BurnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "ETH_transferTo", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "holder", "type": "address" }, { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "Mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WrappedToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "__iUniswap", "outputs": [ { "internalType": "contract IUniswap", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "asset", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deployer", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "holder", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "holders", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "iASSET", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "name": "setTokenNameAndSymbol", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "swapETH_to_TOKEN", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "swapTOKEN_to_ETH", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "new_holder", "type": "address" } ], "name": "transferHolder", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "transferTo", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswap_handler", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
export const iUniswapAbi = [ { "inputs": [ { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "convertEthToToken", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "token", "type": "address" }, { "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "convertTokenToEth", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "delay", "type": "uint256" } ], "name": "getEstimatedDeadline", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "getEstimatedETHforToken", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "erc20Amount", "type": "uint256" } ], "name": "getEstimatedTokenForETH", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "getPathForETHtoToken", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "getPathForTokenToETH", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" } ];
export const iBridgeBaseFee = {
    "Ethereum": 0.005,
    "Cronos": 0.005,
    "Cronos_testnet": 0.005,
    "Goerli": 0.005,
    "Binance": 0.005,
    "Binance_testnet": 0.005,
    "Avalanche": 0.005,
    "Avalanche_testnet": 0.005,	
    "Electronero_testnet": 0.005,
    "Electronero": 0.005,
    "Polygon_testnet": 0.005,
    "Polygon": 0.005,
    "Crystaleum": 0.0005,
    "Crystaleum_testnet": 0.0005,
    "Kekchain": 0.005,
    "Kekchain_testnet": 0.005 
};
export const iMigrator_status = {
    "Avalanche_testnet": false,	
    "Electronero_testnet": false,
    "Kekchain_testnet": false,
    "Polygon_testnet": false,
    "Crystaleum_testnet": false,
    "Binance_testnet": false,
    "Cronos_testnet": true,
    "Electronero": false,
    "Avalanche":false,
    "Ethereum": false,
    "Kekchain": false,
    "Polygon": false,
    "Binance": false,
    "Cronos": false,
    "Goerli": false
};
export const network_ = {
    "0x1": "Ethereum",
    "0x5": "Goerli",
    "0x192b2": "Crystaleum_testnet",
    "0x19": "Cronos",
    "0x152": "Cronos_testnet",
    "0x38": "Binance",
    "0x61": "Binance_testnet",
    "0xa86a": "Avalanche",
    "0xa869": "Avalanche_testnet",
    "0X89": "Polygon",
    "0x13881": "Polygon_testnet",
    "0X1BC": "Electronero_testnet",
    "0xAD9C": "Electronero",
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
    "crystaleum": "Crystaleum",
    "crystaleum_testnet": "Crystaleum_testnet",
    "electronero": "Electronero",
    "electronero_testnet": "Electronero_testnet",
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
    "Electronero_testnet": 'Electronero (testnet)',
    "Electronero": 'Electronero',
    "Crystaleum_testnet": 'Crystaleum (testnet)',
    "Crystaleum": 'Crystaleum',
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
    "0x192b2": 18,
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
    "0x192b2": "CRFI",
    "0X1BC": "gETNX",
    "0xAD9C": "ETNX",
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
    "Electronero_testnet": '0X1BC',
    "Electronero": '0xAD9C',
    "Crystaleum_testnet": '0x192b2',
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
    "Crystaleum": "https://rpc.crystaleum.org",	
    "Crystaleum_testnet": "https://rpc.crystaleum.org",
    "Electronero_testnet": "https://rpc.electronero.org",
    "Electronero": "https://rpc-02.etnxscan.io"
};
console.log("test: ",ETH_TOKENLIST,BSC_TOKENLIST,AVAX_TOKENLIST,POLYGON_TOKENLIST);
export let __TOKENLIST = [
    { name: "Interchained", symbol: "INT", decimals: 18, contract: "0x" },
    { name: "Electronero", symbol: "ETNX", decimals: 18, contract: "0x" },
    { name: "Electronero_testnet", symbol: "gETNX", decimals: 18, contract: "0x" },
    { name: "Crystaleum", symbol: "CRFI", decimals: 18, contract: "0x" },
    { name: "Crystaleum_testnet", symbol: "CRFI", decimals: 18, contract: "0x" }
];
export const networking = [
    { name: "Goerli", currency: "gETH", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/eth.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETH", url: "/networks/eth.svg" }], chainData: [{ chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { symbol: 'gETH', decimals: 18 } }] },
    { name: "Cronos_testnet", currency: "tCRO", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/cronos.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "CRO", url: "/networks/cronos.svg" }], chainData: [{ chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { symbol: 'tCRO', decimals: 18 } }] },
    { name: "Binance_testnet", currency: "tBNB", subtitle: `Choose if the project is deployed on ${name}`, url: "/networks/bsc.png", subData: [{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }, { name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" }], chainData: [{ chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } }] },
    { name: "Polygon_testnet", currency: "tMATIC", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/matic.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tMATIC", url: "/networks/matic.svg" }], chainData: [{ chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { symbol: 'MATIC', decimals: 18 } }] },
    { name: "Avalanche_testnet", currency: "tAVAX", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/avax.svg", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tAXAX", url: "/networks/avax.svg" }], chainData: [{ chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { symbol: 'AVAX', decimals: 9 } }] },
    { name: "Electronero", currency: "ETNX", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/ETNX.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETNX", url: "/networks/ETNX.png" }], chainData: [{ chainId: '0X1BC', chainName: "Electronero Testnet", rpcUrls: ["https://rpc-01tn.electronero.app"], blockExplorerUrls: ['https://testnet.etnxscan.io'], nativeCurrency: { symbol: 'gETNX', decimals: 18 } }] },
    { name: "Electronero_testnet", currency: "gETNX", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/ETNX.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETNX", url: "/networks/ETNX.png" }], chainData: [{ chainId: '0X1BC', chainName: "Electronero Testnet", rpcUrls: ["https://rpc-01tn.electronero.app"], blockExplorerUrls: ['https://testnet.etnxscan.io'], nativeCurrency: { symbol: 'gETNX', decimals: 18 } }] },
    { name: "Crystaleum", currency: "CRFI", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/CRFI.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETNX", url: "/networks/CRFI.png" }], chainData: [{ chainId: '0X1BC', chainName: "Crystaleum", rpcUrls: ["https://rpc.crystaleum.org"], blockExplorerUrls: ['https://testnet-scan.crystaleum.org'], nativeCurrency: { symbol: 'CRFI', decimals: 18 } }] },
    { name: "Crystaleum_testnet", currency: "tCRFI", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/CRFI.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "gETNX", url: "/networks/CRFI.png" }], chainData: [{ chainId: '0X1BC', chainName: "Crystaleum", rpcUrls: ["https://rpc.crystaleum.org"], blockExplorerUrls: ['https://testnet-scan.crystaleum.org'], nativeCurrency: { symbol: 'CRFI', decimals: 18 } }] },
    { name: "Kekchain_testnet", currency: "tKEK", subtitle: `Choose if the project is deployed on ${name} `, url: "/networks/kek.png", subData: [{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }, { name: "Fungible Coin", subTitle: "tKEK", url: "/networks/kek.png" }], chainData: [{ chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'tKEK', decimals: 18 } }] }
];
export const __NETWORKS = networking;
export const DEFAULT_CHAIN_ID = 338;
export const DEVNAME = 'interchained';
export const DEVNAMEMED = DEVNAME;
export const DEVNAMELG = 'Interchained';
export const PROJECTNAME = 'FrenChain';
export const PROJECTNAMEMED = 'electronero';
export const PROJECTGIT = 'etnx-chain';
export const PROJECTTWIT = 'etnx_chain';
export const PROJECTLG = 'Ethereum';
export const PROJECTMED = 'ethereum';
export const githubSourceURI = "https://github.com/i-Locker/iLock";
export const websiteURI = "https://dapp.electronero.org";
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
    "Cronos": { name: "Cronos (mainnet)", symbol: "CRO", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Cronos_testnet": { name: "Cronos (testnet)", symbol: "tCRO", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Electronero": { name: "Electronero (mainnet)", symbol: "ETNX", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Electronero_testnet": { name: "Electronero (testnet)", symbol: "gETNX", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Crystaleum": { name: "Crystaleum (mainnet)", symbol: "CRFI", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
    "Crystaleum_testnet": { name: "Crystaleum (testnet)", symbol: "tCRFI", decimals: 18, contract: V2_DIGITAL_ASSET, tokens: [V1_DIGITAL_ASSET,V2_DIGITAL_ASSET] },
};
export const network_hex_to_dec = {
    "0x1": 1,
    "0x5": 5,
    "0x19": 25,
    "0x152": 338,
    "0x38": 56,
    "0x61": 97,
    "0x192b2": 103090,
    "0xFBAF5": 1030901,
    "0X89": 137,
    "0X1BC": 444,
    "0xa86a": 43114,
    "0xa869": 43113,
    "0xAD9C": 44444,
    "0x13881": 80001,
    "0x66A44": 420420,
    "0x66B3A": 420666
};
export const _token_map = {
    1: ETH_TOKENLIST,
    5: [],
    25: [],
    103090: CRFI_TOKENLIST,
    1090301: ETNX_TOKENLIST,
    56: BSC_TOKENLIST,
    97: [],
    137: POLYGON_TOKENLIST,
    338: CRONOS_TOKENLIST,
    444: [],
    43113: [],
    43114: AVAX_TOKENLIST,
    44444: [],
    80001: [],
    420420: [],
    420666: []
};
export const network_dec_to_hex = {
    1: "0x1",
    5: "0x5",
    25: "0x19",
    338: "0x152",
    56: "0x38",
    97: "0x61",
    137: "0X89",
    103090: "0x192b2",
    1030901: "0xFBAF5",
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
    "0x38": explorer["Binance_testnet"],
    "0x19": explorer["Cronos"],
    "0x152": explorer["Cronos_testnet"],
    "0x61": explorer["Binance_testnet"],
    "0xa86a": explorer["Avalanche"],
    "0xa869": explorer["Avalanche_testnet"],
    "0x13881": explorer["Polygon_testnet"],
    "0x89": explorer["Polygon"],
    "0x192b2": explorer["Crystaleum_testnet"],
    "0X1BC": explorer["Electronero_testnet"],
    "0xAD9C": explorer["Electronero"],
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
    "0x192b2": provider["Crystaleum_testnet"],
    "0X1BC": provider["Electronero_testnet"],
    "0xAD9C": provider["Electronero"],
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
    "0x192b2": "/networks/CRFI.png",
    "0xAD9C": "/networks/ETNX.png",
    "0X1BC": "/networks/ETNX.png",
    "0xa86a": "/networks/avax.png",
    "0xa869": "/networks/avax.png",
    "0x66A44": "/networks/kek.png",
    "0x66B3A": "/networks/kek.png"
};
export const networks_data = [
    { name: "Goerli", currency: "gETH", subtitle: `Choose if the project is deployed to Goerli`, url: "/networks/eth.svg", subData: [{ name: "Fungible Coin", subTitle: "gETH", url: "/networks/eth.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { symbol: 'gETH', decimals: 18 } } },
    { name: "Crystaleum_testnet", currency: "CRFI", subtitle: `Choose if the project is deployed to Crystaleum (testnet)`, url: "/networks/CRFI.png", subData: [{ name: "Fungible Coin", subTitle: "CRFI", url: "/networks/CRFI.png" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x192b2', chainName: "Ethereum Crystaleum", rpcUrls: ["https://rpc.crystaleum.org"], blockExplorerUrls: ['https://scan.crystaleum.org'], nativeCurrency: { symbol: 'CRFI', decimals: 18 } } },
    { name: "Electronero_testnet", currency: "gETNX", subtitle: `Choose if the project is deployed to Go Electronero Network (testnet)`, url: "/networks/ETNX.png", subData: [{ name: "Fungible Coin", subTitle: "gETNX", url: "/networks/ETNX.png" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: 'FBAF5', chainName: "Ethereum Electronero", rpcUrls: ["https://rpc-evm01.electronero.org"], blockExplorerUrls: ['https://scan.electronero.org'], nativeCurrency: { symbol: 'gETNX', decimals: 18 } } },
    { name: "Cronos_testnet", currency: "tCRO", subtitle: `Choose if the project is deployed to Cronos (testnet)`, url: "/networks/cronos.svg", subData: [{ name: "Fungible Coin", subTitle: "CRO", url: "/networks/cronos.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { symbol: 'tCRO', decimals: 18 } } },
    { name: "Binance_testnet", currency: "tBNB", subtitle: `Choose if your coin is built on to Binance (testnet)`, url: "/networks/bsc.png", subData: [{ name: "Fungible Coin", subTitle: "BNB", url: "/networks/bsc.png" },{ name: "Project Tokens", subTitle: "BEP-20", url: "/project.png" }], chainData: { chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { symbol: 'BNB', decimals: 18 } } },
    { name: "Polygon_testnet", currency: "tMATIC", subtitle: `Choose if the project is deployed to Polygon (testnet)`, url: "/networks/matic.svg", subData: [{ name: "Fungible Coin", subTitle: "tMATIC", url: "/networks/matic.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { symbol: 'MATIC', decimals: 18 } } },
    { name: "Avalanche_testnet", currency: "tAVAX", subtitle: `Choose if the project is deployed to Avalanche (testnet)`, url: "/networks/avax.svg", subData: [{ name: "Fungible Coin", subTitle: "tAXAX", url: "/networks/avax.svg" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { symbol: 'AVAX', decimals: 9 } } },
    { name: "Kekchain_testnet", currency: "tKEK", subtitle: `Choose if the project is deployed to KekChain (testnet)`, url: "/networks/kek.png", subData: [{ name: "Fungible Coin", subTitle: "tKEK", url: "/networks/kek.png" },{ name: "Project Tokens", subTitle: "ERC-20 compliant", url: "/project.png" }], chainData: { chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { symbol: 'tKEK', decimals: 18 } } }
];
export const tokens_data = {
   "Goerli" : { name: "Goerli", currency: "gETH", subtitle: `Choose if the project is deployed to Goerli`, logo: "/networks/eth.svg", chainData: { chainId: '0x5', chainName: "Ethereum Goerli", rpcUrls: ["https://rpc.ankr.com/eth_goerli"], blockExplorerUrls: ['https://goerli.etherscan.io'], nativeCurrency: { name: "Ethereum", symbol: 'gETH', decimals: 18 }, tokens: [{ name: "Ethereum", symbol: "gETH", decimals: 18 , contract: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6" }] } },
   "Electronero_testnet" : { name: "Electronero_testnet", currency: "gETNX", subtitle: `Choose if the project is deployed to Go Electronero Network (testnet)`, url: "/networks/ETNX.png", chainData: { chainId: 'FBAF5', chainName: "Electronero Testnet", rpcUrls: ["https://testnet.electronero.org"], blockExplorerUrls: ['https://testnet-scan.electronero.com/'], nativeCurrency: { name: "Cronos", symbol: 'tCRO', decimals: 18 }, tokens: [{ name: "Cronos", symbol: "wCRO", decimals: 18 , contract: "0x2A0Ff2dB23a65bb9E9313f8670b9C2bB5Ed13771" }] } },
   "Crystaleum_testnet" : { name: "Crystaleum_testnet", currency: "CRFI", subtitle: `Choose if the project is deployed to Crystaleum (testnet)`, url: "/networks/CRFI.png", chainData: { chainId: '0x192b2', chainName: "Crystaleum Testnet", rpcUrls: ["https://rpc.crystaleum.org","https://rpc-tn.crystaleum.org"], blockExplorerUrls: ['https://testnet-scan.crystaleum.com/'], nativeCurrency: { name: "Crystaleum", symbol: 'CRFI', decimals: 18 }, tokens: [{ name: "Wrapped Crystaleum", symbol: "wCRFI", decimals: 18 , contract: "0x" }] } },
   "Cronos_testnet" : { name: "Cronos_testnet", currency: "tCRO", subtitle: `Choose if the project is deployed to Cronos (testnet)`, url: "/networks/cronos.svg", chainData: { chainId: '0x152', chainName: "Cronos Testnet", rpcUrls: ["https://evm-t3.cronos.org"], blockExplorerUrls: ['https://testnet.cronoscan.com/'], nativeCurrency: { name: "Cronos", symbol: 'tCRO', decimals: 18 }, tokens: [{ name: "Cronos", symbol: "wCRO", decimals: 18 , contract: "0x2A0Ff2dB23a65bb9E9313f8670b9C2bB5Ed13771" }] } },
   "Binance_testnet" : { name: "Binance_testnet", currency: "tBNB", subtitle: `Choose if your coin is built on Binance`, url: "/networks/bsc.png", chainData: { chainId: '0x38', chainName: "Binance Smart Chain Testnet", rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"], blockExplorerUrls: ['https://testnet.bscscan.com/'], nativeCurrency: { name: "Binance Smart Chain", symbol: 'tBNB', decimals: 18 }, tokens: [{ name: "Binance Smart Chain", symbol: "tBNB", decimals: 18 , contract: "0xae13d989dac2f0debff460ac112a837c89baa7cd" }] }},
   "Polygon_testnet" : { name: "Polygon_testnet", currency: "tMATIC", subtitle: `Choose if the project is deployed to Polygon (testnet)`, url: "/networks/matic.svg", chainData: { chainId: '0x13881', chainName: "Polygon Testnet", rpcUrls: ["https://rpc-mumbai.maticvigil.com"], blockExplorerUrls: ['https://mumbai.polygonscan.com/'], nativeCurrency: { name: "Polygon", symbol: 'tMATIC', decimals: 18 }, tokens: [{ name: "Polygon", symbol: "tMATIC", decimals: 18 , contract: "0x9c3c9283d3e44854697cd22d3faa240cfb032889" }] }  },
   "Avalanche_testnet" : { name: "Avalanche_testnet", currency: "tAVAX", subtitle: `Choose if the project is deployed Avalanche (testnet)`, url: "/networks/avax.svg", chainData: { chainId: '0xa869', chainName: "Avalanche Testnet", rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"], blockExplorerUrls: ['https://testnet.snowtrace.io'], nativeCurrency: { name: "Avalanche", symbol: 'tAVAX', decimals: 18 }, tokens: [{ name: "Avalanche", symbol: "tAVAX", decimals: 18 , contract: "0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3" }] }  },
   "Kekchain_testnet" : { name: "Kekchain_testnet", currency: "tKEK", subtitle: `Choose if the project is deployed to KekChain (testnet)`, url: "/networks/kek.png", chainData: { chainId: '0x66B3A', chainName: "Kekchain Testnet", rpcUrls: ["https://testnet.kekchain.com"], blockExplorerUrls: ['https://testnet-explorer.kekchain.com'], nativeCurrency: { name: "KekChain", symbol: 'tKEK', decimals: 18 }, tokens: [{ name: "KekChain", symbol: "tKEK", decimals: 18 , contract: "0x7806c2744c08deea4e048d825f1962f1159e7f8c" }] } }
};
export const wrappedAddress = {
    "Ethereum": "",
    "Goerli": "",
    "Electronero": '',
    "Electronero_testnet": '',
    "Crystaleum": '',
    "Crystaleum_testnet": '',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "",
    "Cronos": "",
    "Cronos_testnet": "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    "Avalanche": "",
    "Avalanche_testnet": "",
    "Polygon": "",
    "Polygon_testnet": "",
    "Kekchain": "",
    "Kekchain_testnet": ""
};
export const lockerAddress = {
    "Ethereum": "",
    "Goerli": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Binance": "",
    "Electronero": '',
    "Electronero_testnet": '0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c',
    "Crystaleum": '',
    "Crystaleum_testnet": '',
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c",
    "Cronos": "",
    "Cronos_testnet": "0x8C70E29F98697366E956F3E7f0db678B70faE149",
    "Avalanche": "",
    "Avalanche_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Polygon": "",
    "Polygon_testnet": "0x7d2A16Eb08361cDA68C183a6e92f08e618B73c7F",
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const DEFAULT_ILOCKER_CONTRACT = lockerAddress["Ethereum"];
export const swapTokenLockerFactory = {
    "Ethereum": '',
    "Goerli": '0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c',
    "Binance": "",
    "Electronero": '',
    "Electronero_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Crystaleum": '',
    "Crystaleum_testnet": '',
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c",
    "Cronos": "",
    "Cronos_testnet": "0x8C70E29F98697366E956F3E7f0db678B70faE149",
    "Avalanche": "",
    "Avalanche_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Polygon": "",
    "Polygon_testnet": "0x7d2A16Eb08361cDA68C183a6e92f08e618B73c7F",
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const iBridgeAddress = {
    "Ethereum": '',
    "Goerli": '',
    "Electronero": '',
    "Electronero_testnet": '',
    "Crystaleum": '',
    "Crystaleum_testnet": '',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "0xBCae51873a3FC8B782DC2981Ddb98a5be8c9ADe3", // 0x4ADddcEB000A23F613F8E1300938b703226f4064
    "Cronos": "",
    "Cronos_testnet": "0x639E8bDEA73d1cA098AA4775B38102b0D1bb37b7", // 0x55652dea07d52D020E6ae4043E4B37bECc435006
    "Avalanche": "",
    "Avalanche_testnet": '',
    "Polygon": "",
    "Polygon_testnet": "0xdDbE999514cE1F8afb868f087bd8d3274c94a77C",
    "Kekchain": "",
    "Kekchain_testnet": ""
};
export const airdropAddress = {
    "Ethereum": '',
    "Electronero": '',
    "Electronero_testnet": "0x2e0bc1b028c1f3cf3Ce40B204E98fF0743DA8d4c",
    "Crystaleum": '',
    "Crystaleum_testnet": '',
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
    "Kekchain": "",
    "Kekchain_testnet": "0xCC8748Cb40575e42649d9652573eb8233CC30dEC"
};
export const iMigratorAddress = {
    "Ethereum": '',
    "Goerli": '',
    "Electronero": '',
    "Electronero_testnet": '',
    "Crystaleum": '',
    "Crystaleum_testnet": '',
    "Binance": "",
    "Binance Smart Chain": "",
    "Binance_testnet": "0xE5F70DaeB8d836b1C6a91FA4d04Eca58d392597c", // 0x25D77332E0570375Ef73Ed073f8E9a56fFD9ce5F
    "Cronos": "", 
    "Cronos_testnet": "0x11755Dc7e0b3CEF7277a8Dd3C0dc2b39881ec958", // 0x5C41055c0FF510847c92B0176749bec81569F92F, 0xdDbE999514cE1F8afb868f087bd8d3274c94a77C
    "Avalanche": "",
    "Avalanche_testnet": '',
    "Polygon": "",
    "Polygon_testnet": "",
    "Kekchain": "",
    "Kekchain_testnet": ""
};
export const maxTxLimit = 1000000000000000000000000000000;
export const CHAINDATA = [
    { name: "Ethereum", chain: '0x1' },
    { name: "Goerli", chain: '0x5' },
    { name: "Crystaleum", chain: '0x192b2' },
    { name: "Crystaleum_testnet", chain: '0x192b2' },
    { name: "Cronos", chain: '0x19' },
    { name: "Cronos_testnet", chain: '0x152' },
    { name: "Binance Smart Chain", chain: '0x38' },
    { name: "Binance_testnet", chain: '0x61' },
    { name: "Avalanche", chain: '0xa86a' },
    { name: "Avalanche_testnet", chain: '0xa869' },
    { name: "Polygon", chain: '0x89' },
    { name: "Polygon_testnet", chain: '0x13881' },
    { name: "Electronero_testnet", chain: 'FBAF5' },
    { name: "Electronero", chain: '0xAD9C' },
    { name: "Kekchain", chain: '0x66A44' },
    { name: "Kekchain_testnet", chain: '0x66B3A' }
];
export const token_lists = {
    1: ETH_TOKENLIST,
    5: [],
    25: [],
    56: BSC_TOKENLIST,
    103090: CRFI_TOKENLIST,
    1030901: ETNX_TOKENLIST,
    97: [],
    137: POLYGON_TOKENLIST,
    338: CRONOS_TOKENLIST,
    444: [],
    43113: [],
    43114: AVAX_TOKENLIST,
    44444: [],
    80001: [],
    420420: [],
    420666: []
};