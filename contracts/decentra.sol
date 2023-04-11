// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./utilities/ILOCKER.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./utilities/Holder.sol";
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

/**
 * @title Interchained's iLocker contracts for FrenChain
 * @notice The iLock contract allows project operators to iLock tokens for a period
 * @author Muse & Interchained
 */
contract iDecentra is ERC721Enumerable, Ownable, ReentrancyGuard, ILOCKER {
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    Lock[] internal ALL_iLOCKS;

    /**
     *  @notice The operators can disable the unlockTimestamp (make a iLock withdrawable) if the iLock creator permits this.
     */
    address payable internal operators;

    /**
     *  @notice An incremental counter that stores the latest lockId (zero means no locks yet).
     */
    Counters.Counter private lockIdCounter;
    uint256 internal latest_id;

    uint256 public donation_in_ETH;
    bool internal donationsEnabled;

    /**
     *  @notice The list of all locks ever created, the key represents the lockId.
     */
    mapping(uint256 => Lock) internal locks;
    mapping(address => i_Locks_) EOA_iLocks;
    mapping(address => i_Locks_) internal my_locks;
    mapping(uint256 => bool) public activity;
    mapping(address => uint256[]) internal myLocks;

    /**
     *  @notice Changeable name for the iLock token.
     */
    string internal tokenName;

    /**
     *  @notice Changeable symbol for the iLock token.
     */
    string internal tokenSymbol;

    event ETHLockCreated(
        uint256 indexed lockId,
        address indexed creator,
        uint256 amount
    );

    event LockCreated(
        uint256 indexed lockId,
        address indexed token,
        address indexed creator,
        uint256 amount
    );

    event Withdraw(
        uint256 indexed lockId,
        address indexed token,
        address indexed receiver,
        uint256 amount
    );

    event TokenNameChanged(string oldName, string newName);
    event TokenSymbolChanged(string oldSymbol, string newSymbol);
    event GovernanceUnlockChanged(uint256 indexed lockId, bool unlocked);
    event OperatorTransferred(
        address indexed oldOperator,
        address indexed newOperator
    );

    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        tokenName = _name;
        tokenSymbol = _symbol;
        donationsEnabled = true;
        donation_in_ETH = 0.1 ether;
        transferOwnership(initialOwner);
        operators = payable(owner());
    }

    receive() external payable {}

    fallback() external payable {}

    /**
     * @notice sets donations in native coin
     */
    function set_fee_in_ETH(uint256 fie, bool onOff) public virtual {
        require(address(_msgSender()) == address(operators), "only operators");
        donation_in_ETH = fie;
        donationsEnabled = onOff;
    }

    /**
     * @notice retrieves donations in native coin
     */
    function feesInETH() public view returns (uint256) {
        return donation_in_ETH;
    }

    /**
     * @notice retrieves iLockers from a specific index
     */
    function getLock_byIndex(uint256 index) public view returns (Lock memory) {
        Lock storage iLock = locks[index];
        return iLock;
    }

    /**
     * @notice Creates a new iLock by transferring 'amount' to a newly created holding contract.
     * @notice An NFT with the lockId is minted to the user. This NFT is transferrable and represents the ownership of the iLock.
     * @param token The token to transfer in
     * @param amount The amount of tokens to transfer in
     * @param unlockTimestamp The timestamp from which withdrawals become possible
     */
    function createLock(
        IERC20 token,
        bool isEth,
        address holder,
        uint256 amount,
        uint256 unlockTimestamp
    ) external payable override nonReentrant returns (uint256, address) {
        require(
            unlockTimestamp < type(uint256).max &&
                unlockTimestamp > block.timestamp,
            "improper timestamp"
        );
        lockIdCounter.increment();
        uint256 lockId = lockIdCounter.current();
        latest_id = lockId;
        require(uint256(amount) >= uint256(0));
        address payable holdingContract;
        if (!isEth) {
            holdingContract = payable(
                address(
                    new HoldingContract{value: 0}(
                        address(this),
                        address(holder),
                        unlockTimestamp,
                        isEth,
                        amount
                    )
                )
            );
            if (uint256(msg.value) > uint256(0)) {
                uint256 balanceBefore = token.balanceOf(holdingContract);
                token.safeTransferFrom(
                    payable(_msgSender()),
                    holdingContract,
                    amount
                );
                uint256 balanceAfter = token.balanceOf(holdingContract);
                require(
                    uint256(balanceAfter) >= uint256(balanceBefore),
                    "Balance irregularity"
                );
            } else {
                revert("Failed deposit");
            }
        } else {
            require(
                uint256(msg.value) >= uint256(amount) + uint256(donation_in_ETH)
            );
            holdingContract = payable(
                address(
                    new HoldingContract{
                        value: donationsEnabled
                            ? uint256(msg.value) - uint256(amount)
                            : msg.value
                    }(
                        address(this),
                        address(holder),
                        unlockTimestamp,
                        isEth,
                        amount
                    )
                )
            );
            if (uint256(msg.value) > uint256(0)) {
                uint256 remainder = uint256(msg.value) - uint256(amount);
                uint256 value = uint256(msg.value) - uint256(remainder);
                (bool sentValue, ) = holdingContract.call{value: value}("");
                require(sentValue, "failed deposit");
            } else {
                revert("Failed deposit");
            }
        }
        require(
            address(holdingContract) != address(0) &&
                address(locks[lockId].creator) == address(0),
            "iLock already exists"
        );
        locks[lockId] = Lock({
            lockId: lockId,
            token: token,
            creator: payable(_msgSender()),
            holder: payable(holder),
            amount: amount,
            claimed: false,
            Ether: isEth,
            unlockTimestamp: unlockTimestamp,
            holdingContract: holdingContract,
            unlockableByGovernance: true,
            unlockedByGovernance: false,
            lockedByGovernance: false
        });
        if (address(holder) != address(_msgSender())) {
            EOA_iLocks[address(_msgSender())]._my_iLocks.push(locks[lockId]);
            myLocks[address(_msgSender())].push(lockId);
            my_locks[address(locks[lockId].holder)]._my_iLocks.push(
                locks[lockId]
            );
            myLocks[address(locks[lockId].holder)].push(lockId);
        } else {
            my_locks[address(locks[lockId].holder)]._my_iLocks.push(
                locks[lockId]
            );
            myLocks[address(locks[lockId].holder)].push(lockId);
        }
        ALL_iLOCKS.push(locks[lockId]);
        activity[lockId] = true;
        // The ownership shard is minted to the holder.
        // It should be noted that anyone can unlock the iLock if they hold the proper shard.
        _safeMint(holder, lockId);
        if (!isEth) {
            emit LockCreated(lockId, address(token), holder, amount);
        } else {
            emit ETHLockCreated(lockId, holder, amount);
        }
        return (lockId, holdingContract);
    }

    /**
     * @notice retrieves specific iLockers from a members storage
     */
    function myLocks_() public view returns (uint256[] memory _my_locks) {
        _my_locks = myLocks[address(_msgSender())];
    }

    /**
     * @notice retrieves specific iLockers from a members storage
     * @param lockId The id of the locked position
     */
    function myiLock(uint256 lockId) public view virtual returns (Lock memory) {
        Lock storage ___iLOCK = locks[lockId];
        return ___iLOCK;
    }

    /**
     * @notice retrieves iLockers from a members storage
     */
    function Holder_iLock(address holder)
        public
        view
        returns (i_Locks_ memory)
    {
        // while() toDo loop through this set, sort holders own iLocks : else drop();
        // Lock[] storage __iLOCKS = ALL_iLOCKS;
        i_Locks_ storage HOLDER_iLOCKS = my_locks[address(holder)];
        return HOLDER_iLOCKS;
    }

    /**
     * @notice retrieves iLockers from a contract storage
     */
    function All_iLocks() public view returns (Lock[] memory) {
        require(address(_msgSender()) == address(operators), "only operators");
        Lock[] storage __iLOCKS = ALL_iLOCKS;
        return __iLOCKS;
    }


    /**
     * @notice retrieves nested iLockers from a members storage
     */
    function My_nested_iLocks() public view returns (Lock[] memory) {
        i_Locks_ storage MY_iLOCKS = my_locks[address(_msgSender())];
        return MY_iLOCKS._my_iLocks;
    }

    /**
     * @notice Withdraws 'amount' amount of tokens from the locked position. Can only be called by the current owner of the iLock NFT.
     * @notice Once the remaining amount reaches zero, the NFT is burned.
     * @notice The ownership shard is therefore not fractional as it would complicate things for the user.
     * @param lockId The id of the locked position
     */
    function withdraw(
        uint256 lockId,
        address payable recipient,
        bool isEth
    ) external payable override nonReentrant {
        require(isValidLock(lockId), "invalid iLock id");
        Lock storage iLock = locks[lockId];
        address payable holdingContract = iLock.holdingContract;
        require(
            block.timestamp >= iLock.unlockTimestamp ||
                iLock.unlockedByGovernance,
            "still locked"
        );
        if (uint256(msg.value) >= uint256(0)) {
            (bool sent, ) = operators.call{value: msg.value}("");
            require(sent);
        }
        uint256 amount;
        if (iLock.unlockedByGovernance == false) {
            require(
                address(ownerOf(lockId)) == address(_msgSender()),
                "not owner of iLock"
            );
            require(!iLock.lockedByGovernance);
            // burn ownership token
            _burn(lockId);
        } else {
            require(
                address(ownerOf(lockId)) == address(_msgSender()) ||
                    address(operators) == address(_msgSender()),
                "not without a permit"
            );
        }
        // Mark iLock as claimed
        activity[lockId] = false;
        if (isEth == false) {
            amount = iLock.token.balanceOf(holdingContract);
            try IHOLD(holdingContract).Withdrawal(iLock.token, amount) returns (
                bool ERC20_success
            ) {
                iLock.claimed = ERC20_success;
            } catch {
                revert("Failed ERC20 transfer");
            }
        } else {
            amount = address(holdingContract).balance;
            try
                IHOLD(holdingContract).ETH_transferTo(recipient, amount)
            returns (bool ETH_success) {
                iLock.claimed = ETH_success;
            } catch {
                revert("Failed ETH transfer");
            }
        }
        require(iLock.claimed == true, "Distribution Failed");
        emit Withdraw(lockId, address(iLock.token), recipient, amount);
    }

    /**
     * @notice All though unnecessary, add reentrancy guard to token transfer in defense.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override nonReentrant {
        Lock storage iLock = locks[tokenId];
        require(iLock.holder == from);
        iLock.holder = payable(to);
        require(IHOLD(iLock.holdingContract).transferHolder(payable(to)));
        super._transfer(from, to, tokenId);
    }

    /**
     * @notice returns whether the lockId exists (is created)
     */
    function isValidLock(uint256 lockId) public view override returns (bool) {
        return lockId != 0 && lockId <= lockIdCounter.current();
    }

    /**
     * @notice Returns information about a specific Lock.
     * @dev The iLock data should be indexed using TheGraph or similar to ensure users can always easily find their lockIds.
     * @dev Reverts in case the lockId is out of range.
     * @return The iLock related to the lockId.
     */
    function getLock(uint256 lockId) external view returns (Lock memory) {
        require(isValidLock(lockId), "out of range");
        return locks[lockId];
    }

    /**
     * @notice Gets the incremental id of the most recent iLock. The first iLock is at id 1.
     * @dev A lastLockId of zero means there are no locks yet!
     * @return The id of the latest iLock.
     */
    function lastLockId() external view returns (uint256, uint256) {
        return (lockIdCounter.current(), latest_id);
    }

    /**
     * @notice Manage governance ability to unlock timelock.
     * @dev This can be useful in case the owner makes a mistake during deployment and the actual withdraw can only be done by the consent of both parties.
     */
    function changeLockStatusByGovernance(uint256 lockId, bool unlocked)
        external
        nonReentrant
    {
        require(
            address(ownerOf(lockId)) == address(_msgSender()) ||
                address(operators) == address(_msgSender()),
            "not without a permit"
        );
        require(isValidLock(lockId), "invalid iLock");
        Lock storage iLock = locks[lockId];
        require(iLock.unlockedByGovernance != unlocked, "already set");

        iLock.unlockedByGovernance = unlocked;

        emit GovernanceUnlockChanged(lockId, unlocked);
    }

    /** 
     * @notice Deliver stuck tokens to governance
     */
    function emergencyWithdraw(
        IERC20 token,
        uint256 lockId,
        uint256 amount,
        bool isEth,
        bool isLocker
    ) public payable {
        require(address(_msgSender()) == address(operators));
        if (isLocker == true) {
            require(isValidLock(lockId));
            Lock storage iLock = locks[lockId];
            require(iLock.unlockableByGovernance != false);
            iLock.unlockedByGovernance = true;
            if (!isEth) {
                if (uint256(amount) == uint256(0)) {
                    amount = IERC20(token).balanceOf(iLock.holdingContract);
                }
                try
                    IHOLD(iLock.holdingContract).transferTo(
                        iLock.token,
                        operators,
                        token.balanceOf(address(iLock.holdingContract))
                    )
                returns (bool transfer_success) {
                    require(transfer_success);
                } catch {
                    revert();
                }
            } else {
                if (uint256(amount) == uint256(0)) {
                    amount = address(iLock.holdingContract).balance;
                }
                try
                    IHOLD(iLock.holdingContract).ETH_transferTo(
                        operators,
                        amount
                    )
                returns (bool transfer_success) {
                    require(transfer_success);
                } catch {
                    revert();
                }
            }
        } else {
            if (!isEth) {
                if (uint256(amount) == uint256(0)) {
                    amount = IERC20(token).balanceOf(address(this));
                }
                token.safeTransfer(operators, amount);
            } else {
                if (uint256(amount) == uint256(0)) {
                    amount = address(address(this)).balance;
                }
                (bool sent_eth, ) = operators.call{value: amount}("");
                require(sent_eth);
            }
        }
    }

    /** 
     * @notice Override the token name to allow for rebranding.
     */
    function name() public view override returns (string memory) {
        return tokenName;
    }

    /**
     * @notice Override the token symbol to allow for rebranding.
     */
    function symbol() public view override returns (string memory) {
        return tokenSymbol;
    }

    /**
     * @notice compare strings
     */
    function stringsEqual(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
