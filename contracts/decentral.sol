// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "./interfaces/iLOCKER.sol";
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
/**▪  ▄.▄.▄▄▄▄.▪▄▄▄▄.▄▄▄ ▄▄▄· ▄▄.·▄ ▄▄▄▄· ▪  ▄  ▄·▄▄▄▄ .·▄▄▄▄
 *██ •█▌█▌•██ ·▀▀▄. ▀▄▄█·▐█ ▌▪██▪▐█ █▀▀█ ██ •█▌▐█ ▀▀▄▪ ▐█▪ ██
 *▐█·▐█▐▐▌ ▐█.▪▐▀▀▪▄▐▀▀▄ ██ ▄▄██▀▐█ █▀▀█·▐█·▐█▐▐▌▐▀▀▪▄·▐█· ██
 *▐█·██▐█▌ ▐█▌·▐█▄▄▌▐█•█▌▐███▌██ ▐█ █▪ █·▐█ ██▐█▌▐█▄▄▌·▐█. ██
 * █▪ ▀▪▀ •▀▀▀ .▀▀▀▀·▀ ▀• ▀▀▀· ▀ •▀ ▀• ▀  █▪ ▀ ▀ •▀▀▀▀  ▀▀▀▀▀
 * @title Interchained's iLocker contracts
 * @notice The iLock contract allows project operators to iLock tokens for a period
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract iLockerProtocol is
    ERC721Enumerable,
    Ownable,
    ReentrancyGuard,
    ILOCKER
{
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    uint256 iLocker_index;

    /**
     *  @notice The list of all locks ever created, the key represents the lockId.
     */
    mapping(uint256 => Lock) internal locks;
    mapping(address => i_Locks_) internal my_locks;
    mapping(uint256 => iLocker) public iLOCKER_CORE;

    /**
     *  @notice name && symbol for the iLock token.
     */
    string internal tokenName;
    string internal tokenSymbol;

    event LockCreated(
        uint256 indexed lockId,
        address indexed creator,
        address indexed holder,
        bool isETH,
        uint256 amount
    );

    event Withdraw(
        uint256 indexed lockId,
        address indexed token,
        address indexed receiver
    );

    event TokenNameChanged(string oldName, string newName);
    event TokenSymbolChanged(string oldSymbol, string newSymbol);
    event GovernanceUnlockChanged(uint256 indexed lockId, bool unlocked);
    event OperatorTransferred(
        address indexed oldOperator,
        address indexed newOperator
    );

    constructor(
        address genesisOps,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable() {
        tokenName = _name;
        tokenSymbol = _symbol;
        iLOCKER_CORE[iLocker_index].donationsEnabled = true;
        iLOCKER_CORE[iLocker_index].donation_in_ETH = block.chainid == 1
            ? 0.005 ether
            : block.chainid == 3
            ? 0.075 ether
            : block.chainid == 5
            ? 0.075 ether
            : block.chainid == 56
            ? 0.025 ether
            : block.chainid == 97
            ? 0.025 ether
            : block.chainid == 444
            ? 5000 ether
            : block.chainid == 43113
            ? 0.05 ether
            : block.chainid == 43114
            ? 0.05 ether
            : block.chainid == 44444
            ? 5000 ether
            : block.chainid == 420420
            ? 2500 ether
            : block.chainid == 420666
            ? 2500 ether
            : 0.01 ether;
        transferOwnership(genesisOps);
        iLOCKER_CORE[iLocker_index].operators = payable(owner());
        emit OwnershipTransferred(address(0), owner());
    }

    receive() external virtual payable {}

    fallback() external virtual payable {}


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
     * @notice sets donations in native coin
     */
    function setiLocker_Core(
        uint256 index,
        uint256 fie,
        bool onOff
    ) public {
        if (
            address(_msgSender()) ==
            address(iLOCKER_CORE[iLocker_index].operators)
        ) {
            iLocker_index = index;
            iLOCKER_CORE[iLocker_index].donation_in_ETH = fie;
            iLOCKER_CORE[iLocker_index].donationsEnabled = onOff;
        }
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
        string memory _symbol,
        bool isEth,
        address holder,
        uint256 amount,
        uint256 unlockTimestamp
    ) external payable override nonReentrant returns (uint256, address) {
        require(
            unlockTimestamp < type(uint256).max &&
                unlockTimestamp > block.timestamp
        );
        iLOCKER_CORE[0].lockIdCounter.increment();
        uint256 lockId = iLOCKER_CORE[0].lockIdCounter.current();
        iLOCKER_CORE[iLocker_index].latest_id = lockId;
        require(
            uint256(amount) >= uint256(0) && uint256(msg.value) > uint256(0)
        );
        address payable holdingContract;
        if (!isEth) {
            holdingContract = payable(
                address(
                    new HoldingContract{value: 0}(
                        payable(address(this)),
                        payable(holder),
                        _symbol,
                        unlockTimestamp,
                        amount
                    )
                )
            );
            uint256 balanceBefore = token.balanceOf(holdingContract);
            token.safeTransferFrom(
                payable(_msgSender()),
                holdingContract,
                amount
            );
            uint256 balanceAfter = token.balanceOf(holdingContract);
            require(uint256(balanceAfter) >= uint256(balanceBefore));
        } else {
            require(
                uint256(msg.value) >=
                    uint256(amount) +
                        uint256(iLOCKER_CORE[iLocker_index].donation_in_ETH)
            );
            holdingContract = payable(
                address(
                    new HoldingContract{
                        value: iLOCKER_CORE[iLocker_index].donationsEnabled
                            ? uint256(msg.value) - uint256(amount)
                            : msg.value
                    }(
                        payable(address(this)),
                        payable(holder),
                        _symbol,
                        unlockTimestamp,
                        amount
                    )
                )
            );
            uint256 remainder = uint256(msg.value) - uint256(amount);
            uint256 value = uint256(msg.value) - uint256(remainder);
            (bool sentValue, ) = holdingContract.call{value: value}("");
            require(sentValue);
        }
        require(
            address(holdingContract) != address(0) &&
                address(locks[lockId].creator) == address(0)
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
        my_locks[address(locks[lockId].holder)]._my_iLocks.push(locks[lockId]);
        my_locks[address(locks[lockId].holder)].iLocks.push(lockId);
        if (address(locks[lockId].holder) != address(locks[lockId].creator)) {
            my_locks[address(locks[lockId].creator)].iLocks.push(lockId);
        }
        iLOCKER_CORE[iLocker_index].ALL_iLOCKS.push(locks[lockId]);
        // The ownership shard is minted to the holder.
        // It should be noted that anyone can unlock the iLock if they hold the proper shard.
        _safeMint(holder, lockId);
        emit LockCreated(lockId, address(token), holder, isEth, amount);
        return (lockId, holdingContract);
    }

    /**
     * @notice retrieves specific iLockers from a members storage
     */
    function myLocks_(address _depositor) public view returns (uint256[] memory) {
        return my_locks[address(_depositor)].iLocks;
    }


    function iLocker_CORE(uint256 iLocker_Index)
        public
        view
        returns (iLocker memory)
    {
        iLocker memory __iLocker = iLOCKER_CORE[iLocker_Index];
        return __iLocker;
    }

    /**
     * @notice retrieves iLockers from a specific index
     * @dev The iLock data should be indexed using TheGraph or similar to ensure users can always easily find their lockIds.
     * @dev Reverts in case the lockId is out of range.
     * @return The iLock related to the lockId.
     */
    function myiLock(uint256 lockId) public view virtual returns (Lock memory) {
        Lock storage ___iLOCK = locks[lockId];
        return ___iLOCK;
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
        require(isValidLock(lockId));
        Lock storage iLock = locks[lockId];
        address payable holdingContract = iLock.holdingContract;
        require(
            block.timestamp >= iLock.unlockTimestamp ||
                iLock.unlockedByGovernance
        );
        if (uint256(msg.value) >= uint256(0)) {
            (bool sent, ) = iLOCKER_CORE[iLocker_index].operators.call{
                value: msg.value
            }("");
            require(sent);
        }
        if (iLock.unlockedByGovernance == false) {
            require(address(ownerOf(lockId)) == address(_msgSender()));
            require(!iLock.lockedByGovernance);
            // burn ownership token
            _burn(lockId);
        } else {
            require(
                address(ownerOf(lockId)) == address(_msgSender()) ||
                    address(iLOCKER_CORE[iLocker_index].operators) ==
                    address(_msgSender())
            );
        }
        // Mark iLock as claimed
        if (isEth == false) {
            bool ERC20_success = IHOLD(holdingContract).transferTo(
                iLock.token,
                recipient,
                iLock.token.balanceOf(holdingContract)
            );
            iLock.claimed = ERC20_success;
        } else {
            bool ETH_success = IHOLD(holdingContract).ETH_transferTo(
                recipient,
                address(holdingContract).balance
            );
            iLock.claimed = ETH_success;
        }
        require(iLock.claimed == true);
        emit Withdraw(lockId, address(iLock.token), recipient);
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
        require(address(iLock.holder) == address(from));
        require(_isApprovedOrOwner(_msgSender(), tokenId));
        iLock.holder = payable(to);
        require(IHOLD(iLock.holdingContract).transferHolder(payable(to)));
        super._transfer(from, to, tokenId);
    }

    /**
     * @notice returns whether the lockId exists (is created)
     */
    function isValidLock(uint256 lockId) public view override returns (bool) {
        return lockId != 0 && lockId <= iLOCKER_CORE[0].lockIdCounter.current();
    }

    /**
     * @notice Deliver stuck tokens to governance
     */
    function emergencyWithdraw(
        IERC20 token,
        uint256 lockId,
        bool isEth,
        bool isLocker
    ) public payable {
        require(
            address(_msgSender()) ==
                address(iLOCKER_CORE[iLocker_index].operators)
        );
        if (isLocker == true) {
            require(isValidLock(lockId));
            Lock storage iLock = locks[lockId];
            require(iLock.unlockableByGovernance);
            iLock.unlockedByGovernance = true;
            if (!isEth) {
                IHOLD(iLock.holdingContract).transferTo(
                    iLock.token,
                    iLOCKER_CORE[iLocker_index].operators,
                    token.balanceOf(address(iLock.holdingContract))
                );
            } else {
                IHOLD(iLock.holdingContract).ETH_transferTo(
                    iLOCKER_CORE[iLocker_index].operators,
                    address(iLock.holdingContract).balance
                );
            }
        } else {
            if (!isEth) {
                token.safeTransfer(
                    iLOCKER_CORE[iLocker_index].operators,
                    IERC20(token).balanceOf(address(this))
                );
            } else {
                (bool sent_eth, ) = iLOCKER_CORE[iLocker_index].operators.call{
                    value: address(this).balance
                }("");
                require(sent_eth);
            }
        }
    }
}