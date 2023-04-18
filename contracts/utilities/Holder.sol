// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "./ILOCKER.sol";
import "./iHold.sol";

/**
 * @title Chain's HoldingContract to manage individually locked positions.
 * @notice The HoldingContract stores an individually locked position, it can only be unlocked by the main locker address, which should be a Chain locker.
 * @author Muse
 */
contract HoldingContract is Context, IHOLD, iHold {
    using SafeERC20 for IERC20;

    IERC20 private iSHARD = IERC20(address(this));

    /// @notice The locker contract contains the actual information of the iLock and is the only address that can unlock funds.
    address payable public immutable locker;
    address payable public holder;
    address payable[] public holders;

    uint256 public unlock_time;

    bool public Ether;

    event HolderTransferred(
        address indexed prev_holder,
        address indexed new_holder
    );

    constructor(
        address payable _deployer,
        address payable _holder,
        string memory symbol,
        uint256 lock_time,
        bool isEth,
        uint256 _amount
    )
        payable
        iHold(
            string.concat("iLocker Stacked (", symbol, ")"),
            string.concat("Stacked-", symbol),
            _amount,
            _holder
        )
    {
        Ether = isEth;
        holder = _holder;
        holders.push(holder);
        locker = _deployer;
        unlock_time = lock_time;
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
    ) external override returns (bool success) {
        require(address(_msgSender()) == address(locker), "!locker");
        if (uint256(amount) > uint256(token.balanceOf(address(this)))) {
            amount = token.balanceOf(address(this));
        }
        token.safeTransfer(recipient, amount);
        success = true;
        return success;
    }

    function ETH_transferTo(address payable recipient, uint256 amount)
        external
        payable
        override
        returns (bool success)
    {
        require(address(_msgSender()) == address(locker), "!locker");
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent);
        success = true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (address(from) == address(holder)) {
            if (
                uint256(iSHARD.balanceOf(from)) <
                uint256(
                    (uint256(iSHARD.totalSupply()) * uint256(5100)) /
                        uint256(10000)
                )
            ) {
                for (uint256 i = 0; i < holders.length; i++) {
                    if (
                        uint256(iSHARD.balanceOf(holders[i])) >=
                        uint256(
                            (uint256(iSHARD.totalSupply()) * uint256(5100)) /
                                uint256(10000)
                        )
                    ) {
                        transferHolder(holders[i]);
                    }
                }
            }
            super._transfer(from, to, amount);
        }
    }

    /**
     *  @notice Transfer the holder address to a new address, only callable by locker.
     */
    function transferHolder(address payable new_holder)
        public
        virtual
        override
        returns (bool success)
    {
        require(address(_msgSender()) == address(locker), "!locker");
        require(address(holder) != address(new_holder), "!new");
        address payable prev_holder = holder;
        holder = new_holder;
        holders.push(new_holder);
        transferDepositors(new_holder);
        transferOwnership(new_holder);
        _mint(new_holder, iSHARD.totalSupply());
        _burn(prev_holder, uint256(iSHARD.balanceOf(prev_holder)));
        emit HolderTransferred(prev_holder, new_holder);
        return true;
    }
}
