// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
    
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}
interface ILOCKER {
    struct Lock {
        /// @notice The unique identifier of the iLock
        uint256 lockId;
        /// @notice The token which was locked
        IERC20 token;
        /// @notice The creator of the iLock which might no longer own the iLock shard
        address payable creator;
        /// @notice The holder of the iLock which owns the iLock shard
        address payable holder;
        /// @notice The amount of tokens initially locked
        uint256 amount;
        /// @notice Whether this Lock was claimed
        bool claimed;
        /// @notice Whether this Lock contains ETH
        bool Ether;
        /// @notice The unix timestamp in seconds after which withdrawing the tokens is allowed
        uint256 unlockTimestamp;
        /// @notice The address of the holding contract
        address payable holdingContract;
        /// @notice Indicates that the Locker governance (operator) can disable the timelock (unlockTimestamp) on this iLock.
        /// @notice This could be useful in case the iLock owner is scared about deployment issues for example.
        bool unlockableByGovernance;
        /// @notice Indicates whether the Locker governance (operator) has unlocked this iLock for early withdrawal by the iLock owner.
        /// @notice Can only be set to true by Locker governance (operator) if unlockableByGovernance is set to true.
        bool unlockedByGovernance;
        bool lockedByGovernance;
    }
    struct i_Locks_ {
        Lock[] _my_iLocks;
    }
    function isValidLock(uint256 lockId) external view returns (bool);    
    function createLock(
        IERC20 token,
        bool isEth,
        address holder,
        uint256 amount,
        uint256 unlockTimestamp
    )
        external
        payable
        returns (
            bool,
            uint256,
            address
        );
    function withdraw(uint256 lockId, address payable recipient)
        external
        payable;
}
interface IBRIDGE {
    function unlockToken(
        address ethTokenAddr,
        uint256 amount,
        address recipient,
        bytes32 receiptId
    ) external payable returns(bool);
    
    function lockTokenFor(
        address ethTokenAddr,
        address userAddr,
        uint256 amount,
        address recipient
    ) external payable returns(bool);
    
    function lockToken(
        address ethTokenAddr,
        uint256 amount,
        address recipient
    ) external payable returns(bool);
}
interface IDEPLOY_IMARKETS {
    function Deploy_iMarket(address payable tokenA, address payable tokenB, uint donation) external returns(address payable new_market);
}
interface IDEPLOY_ILOCKS {
    function iLock(string memory _name, string memory _symbol, address holder) external returns(address payable new_locker); 
}
interface iEOA {
    function changeOwner(address payable newOwner) external;
}
interface IMARKET {
    function new_Pair(address payable token_a, address payable token_b) external returns(address payable _pair);
}
interface IHOLD {
    function transferTo(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external returns (bool success);

    function ETH_transferTo(address recipient, uint256 amount)
        external
        payable
        returns (bool success);

    function setAllowance(
        IERC20 token,
        address spender,
        uint256 amount
    ) external returns (bool success);

    function Approve(
        IERC20 token,
        address spender
    ) external returns (bool success);

    function transferHolder(address payable new_holder)
        external
        returns (bool success);
    
    function Withdrawal(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external returns (bool success);
}
interface ILOCK {}
interface ISWAP {
    struct Account {
        uint id;
        address payable eoa;
        address payable[] vaults;
    }
    struct Asset {
        Account primary;
        Account[] remote;
    }
    struct Assets {
        Asset[] accounts;
    }
    // pair.id => asset.id
    struct Pair {
        uint id;
        Asset alpha;
        Asset omega;
    }
    // pairs.id => assets.id
    struct Pairs {
        Assets assets;
    }
    // pool.id => pair.id
    struct Pool {
        uint id;
        Pair assets;
    }
    // pools.id => pairs.id
    struct Pools {
        Pairs[] pairs;
    }
    // market.id => pair.id
    struct Market {
        uint id;
        Pool pool;
    }
    // markets.id => pairs.id
    struct Markets {
        Pools[] pools;
    }
    // swap.id => pool.id
    struct Swap {
        uint id;
        Account taker;
        Account maker;
        Market market;
    }
    // swaps.id => pools.id
    struct Swaps {
        Markets markets;
    }
    struct Liquidity {
        Assets holdings;
    }
    struct Member {
        uint id;
        Swaps swaps;
        Assets accounts;
        Liquidity liquidity;
        address payable eoa;
    }
}