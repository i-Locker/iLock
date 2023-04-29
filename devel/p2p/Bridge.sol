// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
/**
 *                                         ...........
 *                                 .::--==================--:..
 *                            .:-===++*#%%@@@@@@@@@@@@@%%##*+===--:.
 *                        .:-==+*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*===-:
 *                     .:-==*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+==-:
 *                   :-==*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+==-.
 *                 :==+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-.
 *               :==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+=-.
 *             .==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*=------=+#@@@@@@@@@@@@@@@#==-
 *            -==#@@@@@@@@@@@@@@@@@@@@%#####%@@@@@#-------------#@@@@@@@@@@@@@@@*==:
 *          .==+@@@@@@@@@@@@@@@@@@%+-:::::::--+#@@---------------=@@@@@@@@@@@@@@@%==-
 *         .==*@@@@@@@@@@@@@@@@@%=:::::::::------*%---------------#@@@@@@@@@@@@@@@@+=-
 *        :==#@@@@@@@@@@@@@@@@@*-:::::----------------------=+#######%@@@@@@@@@@@@@@*==.
 *       .==#@@@@@@@@@@@@@@@@@+---------------------------*%#+---------+%@@@@@@@@@@@@*==
 *      .==*@@@@@@@@@@@@@@@@@*----------------------------=--------------=@@@@@@@@@@@@+=-
 *      -=+@@@@@@@@@@@@@@@@@%-----------=+****+=--------------------++**#**@@@@@@@@@@@%==:
 *     :==%@@@@@@@@@@@@@@@@@*-------=###++====+*%%*-------------+#@%*+==--=+%@@@@@@@@@@#==
 *     ==*@@@@@@@@@@@@@@@@@@=-----=%#=------------*@*---------*@#+----------=@@@@@@@@@@@==:
 *    .==%@@@@@@@@@@@@@@@@@@------=-----------------#%------=@#=------------=@@@@@@@@@@@*==
 *    :==@@@@@@@@@@@@@@@@@%+-------------------=+***+%%-----#*--------------#@@@@@@@@@@@%==.
 *    -=+@@@@@@@@@@@@@@@@+---------------=+#%@%#*+===+@=-------------------#@@@@@@@@@@@@@==:
 *    -=*@@@@@@@@@@@@@@%===-----------=*%@%*=---------=#---==-----------=*@@@@@@@@@@@@@@@==:
 *    -=*@@@@@@@@@@@@@%======-------=#@@*=------------=#----+**++++++*###++%@@@@@@@@@@@@@==:
 *    -=+@@@@@@@@@@@@@=========----#@@+--------------=%=-------=++++*%*----#@@@@@@@@@@@@@==:
 *    :==@@@@@@@@@@@@#===========--+*=--------------*%=----------=**+---=*%@@@@@@@@@@@@@%==.
 *    .==%@@@@@@@@@@@#==============-------------+#%+-------=+***+-=+*#**+%@@@@@@@@@@@@@*==
 *     ==*@@@@@@@@@@@%================-----=+*###*=----=+**###*****#%#===%@@@@@@@@@@@@@@==:
 *     :==%@@@@@@@@@@@+==================-=*++=--=+**##*##**+====*#*===+@@@@@@@@@@@@@@@#==
 *      -=+@@@@@@@@@@@@+===================+*####*++==*#+=====*#*=====#@@@@@@@@@@@@@@@%==:
 *      .==*@@@@@@@@@@@@#============+*###*++=====+*##+==+*##*=====+#@@@@@@@@@@@@@@@@@+=-
 *       .==#@@@@@@@@@@@@@*==========@+=+#########*++*###*+=====+#@@@@@@@@@@@@@@@@@@@+=-
 *        :==#@@@@@@@@@@@@@@%*=======+#############**+======*#%@@@@@@@@@@@@@@@@@@@@@+==
 *         .==*@@@@@@@@@@@@@@@@%#*+===================++*%@@@@@@@@@@@@@@@@@@@@@@@@@+=-
 *          .-=+@@@@@@@@@@@@@@@@@@@@@%%#####*#####%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%==-
 *            -==#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*==:
 *             .-=+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-
 *               :==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-.
 *                 :==+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*==-.
 *                   .-==*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+==-.
 *                      :-==*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+==-.
 *                         :-===*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+===-.
 *                            .:-====+*##%%@@@@@@@@@@@@%%##*+===-::.
 *                                 .::--==================--:..
 *                                          ..........
 */

/**▪  ▄.▄.▄▄▄▄.▪▄▄▄▄.▄▄▄ ▄▄▄· ▄▄.·▄ ▄▄▄▄· ▪  ▄  ▄·▄▄▄▄ .·▄▄▄▄
 *██ •█▌█▌•██ ·▀▀▄. ▀▄▄█·▐█ ▌▪██▪▐█ █▀▀█ ██ •█▌▐█ ▀▀▄▪ ▐█▪ ██
 *▐█·▐█▐▐▌ ▐█.▪▐▀▀▪▄▐▀▀▄ ██ ▄▄██▀▐█ █▀▀█·▐█·▐█▐▐▌▐▀▀▪▄·▐█· ██
 *▐█·██▐█▌ ▐█▌·▐█▄▄▌▐█•█▌▐███▌██ ▐█ █▪ █·▐█ ██▐█▌▐█▄▄▌·▐█. ██
 * █▪ ▀▪▀ •▀▀▀ .▀▀▀▀·▀ ▀• ▀▀▀· ▀ •▀ ▀• ▀  █▪ ▀ ▀ •▀▀▀▀  ▀▀▀▀▀
 * 
 */

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` Bridge.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` Bridge.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` Bridge.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` Bridge.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` Bridge. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` Bridge. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` Bridge. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` Bridge. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see {ERC20Detailed}.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

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
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

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
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            codehash := extcodehash(account)
        }
        return (codehash != accountHash && codehash != 0x0);
    }

    /**
     * @dev Converts an `address` into `address payable`. Note that this is
     * simply a type cast: the actual underlying value is not changed.
     *
     * _Available since v2.4.0._
     */
    function toPayable(address account)
        internal
        pure
        returns (address payable)
    {
        return payable(account);
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     *
     * _Available since v2.4.0._
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        // solhint-disable-next-line avoid-call-value
        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }
}

/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for ERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transfer.selector, to, value)
        );
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transferFrom.selector, from, to, value)
        );
    }

    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require(
            (value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        callOptionalReturn(
            token,
            abi.encodeWithSelector(token.approve.selector, spender, value)
        );
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(
            value
        );
        callOptionalReturn(
            token,
            abi.encodeWithSelector(
                token.approve.selector,
                spender,
                newAllowance
            )
        );
    }

    function safeDecreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(
            value,
            "SafeERC20: decreased allowance below zero"
        );
        callOptionalReturn(
            token,
            abi.encodeWithSelector(
                token.approve.selector,
                spender,
                newAllowance
            )
        );
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves.

        // A Solidity high level call has three parts:
        //  1. The target address is checked to verify it contains contract code
        //  2. The call itself is made, and success asserted
        //  3. The return value is decoded, which in turn checks the size of the returned data.
        // solhint-disable-next-line max-line-length
        require(address(token).isContract(), "SafeERC20: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");

        if (returndata.length > 0) {
            // Return data is optional
            // solhint-disable-next-line max-line-length
            require(
                abi.decode(returndata, (bool)),
                "SafeERC20: ERC20 operation did not succeed"
            );
        }
    }
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
    struct iLocker {
        uint256 donation_in_ETH;
        bool donationsEnabled;
        Lock[] ALL_iLOCKS;
        uint256 latest_id;
        /**
         *  @notice The operators can disable the unlockTimestamp (make a iLock withdrawable) if the iLock creator permits this.
         */
        address payable operators;
        address payable[] PeerNodes;
        /**
         *  @notice An incremental counter that stores the latest lockId (zero means no locks yet).
         */
        Counters.Counter lockIdCounter;
    }
    struct i_Locks_ {
        uint256[] iLocks;
        Lock[] _my_iLocks;
    }

    function isValidLock(uint256 lockId) external view returns (bool);

    function createLock(
        IERC20 token,
        string memory symbol,
        bool isEth,
        address holder,
        uint256 amount,
        uint256 unlockTimestamp
    ) external payable returns (uint256, address);

    function withdraw(
        uint256 lockId,
        address payable recipient,
        bool isEth
    ) external payable;
}

interface IBRIDGE {
    function unlockToken(
        address ethTokenAddr,
        uint256 amount,
        address payable recipient,
        bytes32 hash_
    ) external payable returns (bool);

    function lockTokenFor(
        address ethTokenAddr,
        address userAddr,
        uint256 amount,
        address recipient
    ) external payable returns (bool);

    function lockToken(
        address ethTokenAddr,
        uint256 amount,
        address recipient
    ) external payable returns (bool);
    
    function unlock_iLocker(
        address ethTokenAddr,
        uint256 amount,
        address payable recipient,
        uint256 lockId
    ) external payable returns (bool);
}

contract iBRIDGE_ERC20 is ReentrancyGuard, IBRIDGE {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    mapping(bytes32 => bool) public usedEvents_;

    event Locked(
        address indexed token,
        address indexed holder,
        address indexed sender,
        uint256 amount,
        address recipient
    );

    event Unlocked(
        address ethToken,
        uint256 amount,
        address indexed sender,
        address recipient,
        bytes32 hash
    );

    address payable public IlOCKER;
    address payable public Operators;

    bool fees_enabled;

    uint256 internal BP = 10000;
    uint256 internal fee_in_ETH;
    uint256 internal fee_in_ERC20;

    uint256[] public iLocks;

    mapping(address => bool) Feeless;

    modifier onlyOperators() {
        require(address(msg.sender) == address(Operators), "!authorized");
        _;
    }

    constructor(address payable iLocker) {
        IlOCKER = iLocker;
    }

    function setFees(uint256 fiERC20, uint256 fiETH)
        public
        virtual
        onlyOperators
    {
        fee_in_ERC20 = fiERC20;
        fee_in_ETH = fiETH;
    }

    function set_iLocker(address payable ilocker_)
        public
        virtual
        onlyOperators
    {
        IlOCKER = ilocker_;
    }

    function setFeeless(address _wallet, bool onOff)
        public
        virtual
        onlyOperators
    {
        Feeless[_wallet] = onOff;
    }

    function LockedAssets() public view returns (uint256[] memory) {
        return iLocks;
    }

    function Payout(address payable ethTokenAddr, address payable _wallet, uint amount, bool isEth)
        public
        virtual
        onlyOperators
    {
        if (isEth) {
            (bool sent, ) = _wallet.call{value: amount}("");
            require(sent, "Failed to send Ether");
        } else {
            IERC20 ethToken = IERC20(ethTokenAddr);
            ethToken.safeTransfer(_wallet, amount);
        }
    }

    /**
     * @dev lock tokens to be minted on "chain B"
     * @param ethTokenAddr is the ethereum token contract address
     * @param amount amount of tokens to lock
     * @param recipient recipient address on the "chain B"
     */
    function lockToken(
        address ethTokenAddr,
        uint256 amount,
        address recipient
    ) public payable override nonReentrant returns (bool) {
        require(
            recipient != address(0),
            "EthManager/recipient is a zero address"
        );
        require(amount > 0, "EthManager/zero token locked");
        if (!Feeless[msg.sender]) {
            if (uint256(msg.value) >= uint256(fee_in_ETH)) {
                (bool sent, ) = Operators.call{value: msg.value}("");
                require(sent, "Failed to send Ether");
            } else {
                IERC20 ethToken = IERC20(ethTokenAddr);
                uint256 ERC20_fee = ((uint256(amount) * uint256(fee_in_ERC20)) /
                    uint256(BP));
                amount = uint256(amount) - ERC20_fee;
                ethToken.safeTransferFrom(msg.sender, address(this), amount);
            }
        } else {
            IERC20 ethToken = IERC20(ethTokenAddr);
            ethToken.safeTransferFrom(msg.sender, address(this), amount);
            (bool success, uint256 lockId) = ILOCKER(IlOCKER).createLock(
                ethToken,
                false,
                payable(address(this)),
                amount,
                block.timestamp + 10 minutes,
                true
            );
            iLocks.push(lockId);
            require(success, "iLock Creation Failed");
            emit Locked(
                address(ethToken),
                msg.sender,
                msg.sender,
                amount,
                recipient
            );
        }
        return true;
    }

    /**
     * @dev lock tokens for a user address to be minted on "chain B"
     * @param ethTokenAddr is the ethereum token contract address
     * @param userAddr is token holder address
     * @param amount amount of tokens to lock
     * @param recipient recipient address on the "chain B"
     */
    function lockTokenFor(
        address ethTokenAddr,
        address userAddr,
        uint256 amount,
        address recipient
    ) public payable override nonReentrant returns (bool) {
        require(
            recipient != address(0),
            "recipient is a zero address"
        );
        require(amount > 0, "zero token locked");
        if (!Feeless[msg.sender]) {
            if (uint256(msg.value) >= uint256(fee_in_ETH)) {
                (bool sent, ) = Operators.call{value: msg.value}("");
                require(sent, "Failed to send Ether");
            } else {
                amount =
                    uint256(amount) -
                    ((uint256(amount) * uint256(fee_in_ERC20)) / uint256(BP));
            }
        } else {
            IERC20 ethToken = IERC20(ethTokenAddr);
            ethToken.safeTransferFrom(userAddr, address(this), amount);
            (bool success, uint256 lockId) = ILOCKER(IlOCKER).createLock(
                ethToken,
                false,
                payable(address(this)),
                amount,
                block.timestamp + 10 minutes,
                true
            );
            iLocks.push(lockId);
            require(success, "iLock Creation Failed");
            emit Locked(
                address(ethToken),
                userAddr,
                msg.sender,
                amount,
                recipient
            );
        }
        return true;
    }

    /**
     * @dev unlock tokens
     * @param ethTokenAddr is the ethereum token contract address
     * @param amount amount of unlock tokens
     * @param recipient recipient of the unlock tokens
     * @param hash_ transaction hash of the burn event on "chain B"
     */
    function unlockToken(
        address ethTokenAddr,
        uint256 amount,
        address payable recipient,
        bytes32 hash_
    ) public payable override nonReentrant returns (bool) {
        require(
            !usedEvents_[hash_],
            "event cannot be reused"
        );
            usedEvents_[hash_] = true;
        if (!Feeless[msg.sender]) {
            if (uint256(msg.value) >= uint256(fee_in_ETH)) {
                (bool sent, ) = Operators.call{value: msg.value}("");
                require(sent, "Failed to send Ether");
            } else {
                amount =
                    uint256(amount) -
                    ((uint256(amount) * uint256(fee_in_ERC20)) / uint256(BP));
            }
        } else {
            IERC20 ethToken = IERC20(ethTokenAddr);
            usedEvents_[hash_] = true;
            ethToken.safeTransfer(recipient, amount);
            emit Unlocked(ethTokenAddr, amount, msg.sender, recipient, hash_);
        }
        return true;
    }

    function unlock_iLocker(
        address ethTokenAddr,
        uint256 amount,
        address payable recipient,
        uint256 lockId
    ) public payable override nonReentrant onlyOperators returns (bool) {
            ILOCKER(IlOCKER).withdraw(lockId, recipient);
            emit Unlocked(ethTokenAddr, amount, msg.sender, recipient, bytes32(lockId));
        return true;
    }
}
