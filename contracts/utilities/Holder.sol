// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./iHold.sol";

interface IHOLD {
    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount
    ) external returns (bool success);

    function ETH_transferTo(address payable recipient, uint256 amount)
        external
        payable
        returns (bool success);

    function transferHolder(address payable new_holder)
        external
        returns (bool success);

    function Withdrawal(IERC20 token, uint256 amount)
        external
        payable
        returns (bool success);
}

/**
 * @title Chain's HoldingContract to manage individually locked positions.
 * @notice The HoldingContract stores an individually locked position, it can only be unlocked by the main locker address, which should be a Chain locker.
 * @author Muse
 */
contract HoldingContract is Context, IHOLD, iHold {
    using SafeERC20 for IERC20;

    /// @notice The locker contract contains the actual information of the iLock and is the only address that can unlock funds.
    address payable public immutable locker;
    address payable public holder;

    uint256 public genesis;
    uint256 internal lock_amount;
    uint256 public unlock_time;

    bool public Ether;

    event HolderTransferred(
        address indexed prev_holder,
        address indexed new_holder
    );

    modifier onlyLocker() {
        require(address(_msgSender()) == address(locker), "only locker");
        _;
    }

    modifier onlyHolder() {
        require(address(_msgSender()) == address(holder), "only holder");
        _;
    }

    constructor(
        address _deployer,
        address _holder,
        uint256 lock_time,
        bool isEth,
        uint256 _amount
    ) payable iHold("iLocker", "iLocker", _amount, payable(_holder)) {
        Ether = isEth;
        unlock_time = lock_time;
        holder = payable(_holder);
        genesis = block.timestamp;
        locker = payable(_deployer);
    }

    receive() external payable override {}

    fallback() external payable override {}

    /**
     * @notice Allows locker contract to transfer an amount of tokens in the HoldingContract to the recipient
     * @dev All though there is no explicit locking mechanism here, this contract is supposed to be created and managed by the Locker, which has such functionality.
     * @dev For users that are inspecting this contract, we recommend checking the web interface to find out what the locking details are of this iLock.
     */
    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount
    ) external override onlyLocker returns (bool success) {
        if (uint256(amount) > uint256(token.balanceOf(address(this)))) {
            amount = token.balanceOf(address(this));
        }
        token.safeTransfer(recipient, amount);
        success = true;
        return success;
    }

    function withdrawNestedETH() public payable {
        iHold(payable(address(this))).withdraw_ETH();
    }

    function withdrawNestedERC20(address token, uint256 amount) public payable {
        iHold(payable(address(this))).withdraw_ERC20(token,amount);
    }

    function withdrawNestEgg() public payable {
        withdrawNestedERC20(address(this),IERC20(address(iHold(payable(address(this))))).balanceOf(address(this)));
    }

    function Withdrawal(IERC20 token, uint256 amount)
        external
        payable
        override
        onlyLocker
        returns (bool success)
    {
        if (!Ether) {
            if (uint256(amount) > uint256(token.balanceOf(address(this)))) {
                amount = token.balanceOf(address(this));
            }
            token.safeTransfer(payable(holder), amount);
            success = true;
        } else {
            if (uint256(amount) > uint256(address(this).balance)) {
                amount = address(this).balance;
            }
            (bool sent, ) = payable(holder).call{value: amount}("");
            success = sent;
        }
        require(success, "Transaction Failed");
        return success;
    }

    function ETH_transferTo(address payable recipient, uint256 amount)
        external
        payable
        override
        onlyLocker
        returns (bool success)
    {
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");
        success = true;
    }

    function lockedFor() external view returns (uint256) {
        return uint256(unlock_time) - uint256(block.timestamp);
    }

    /**
     *  @notice Transfer the holder address to a new address, only callable by locker.
     */
    function transferHolder(address payable new_holder)
        external
        virtual
        override
        onlyLocker
        returns (bool success)
    {
        require(new_holder != holder, "already set");
        address payable prev_holder = holder;
        holder = new_holder;
        emit HolderTransferred(prev_holder, new_holder);
        return true;
    }
}
