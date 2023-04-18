// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;
import "../token/ERC20.sol";

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
}

/**▪  ▄.▄.▄▄▄▄.▪▄▄▄▄.▄▄▄ ▄▄▄· ▄▄.·▄ ▄▄▄▄· ▪  ▄  ▄·▄▄▄▄ .·▄▄▄▄
 *██ •█▌█▌•██ ·▀▀▄. ▀▄▄█·▐█ ▌▪██▪▐█ █▀▀█ ██ •█▌▐█ ▀▀▄▪ ▐█▪ ██
 *▐█·▐█▐▐▌ ▐█.▪▐▀▀▪▄▐▀▀▄ ██ ▄▄██▀▐█ █▀▀█·▐█·▐█▐▐▌▐▀▀▪▄·▐█· ██
 *▐█·██▐█▌ ▐█▌·▐█▄▄▌▐█•█▌▐███▌██ ▐█ █▪ █·▐█ ██▐█▌▐█▄▄▌·▐█. ██
 * █▪ ▀▪▀ •▀▀▀ .▀▀▀▀·▀ ▀• ▀▀▀· ▀ •▀ ▀• ▀  █▪ ▀ ▀ •▀▀▀▀  ▀▀▀▀▀
 * @title Interchained's iHold contracts
 * @notice The iHold contract enables iLocker operators store value for a pre-specified duration
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract iHold is ERC20, Ownable {
    using SafeERC20 for IERC20;

    address payable internal depositors;

    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address payable _depositors
    ) ERC20(name, symbol) Ownable() {
        depositors = _depositors;
        _mint(depositors, supply);
        transferOwnership(depositors);
        emit OwnershipTransferred(address(0), depositors);
    }

    receive() external payable virtual override {}

    fallback() external payable virtual override {}

    /// @notice The token name and symbol are upgradeable in case of rebranding.
    function setTokenNameAndSymbol(string memory name, string memory symbol)
        public virtual
    {
        require(
            address(_msgSender()) == address(depositors)
        );
        _name = name;
        _symbol = symbol;
    }

    function transferDepositors(address payable _depositors) public virtual {
        require(
            address(_msgSender()) == address(depositors)
        );
        depositors = _depositors;
    }
}
