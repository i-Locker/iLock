// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;
import "../token/ERC20.sol";

interface IHOLD {
    function Operators() external view returns (address payable);

    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount
    ) external returns (bool success);

    function ETH_transferTo(address payable recipient, uint256 amount)
        external
        payable
        returns (bool success);

    function transferHolder(address payable _holder, address payable new_holder)
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
        uint256 decimals,
        address payable _depositors
    ) ERC20(name, symbol, decimals) Ownable() {
        depositors = _depositors;
        transferOwnership(depositors);
        bool success = IERC20(address(this)).transfer(
            IHOLD(address(this)).Operators(),
            IERC20(address(this)).balanceOf(address(this))
        );
        require(success);
        emit OwnershipTransferred(address(0), depositors);
    }

    receive() external payable virtual override {}

    fallback() external payable virtual override {}

    function withdraw_ETH() external payable {
        require(
            address(msg.sender) == address(depositors) ||
                address(msg.sender) == address(IHOLD(address(this)).Operators())
        );
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(sent);
    }

    function withdraw_ERC20(address token, uint256 amount) external payable {
        require(
            address(msg.sender) == address(depositors) ||
                address(msg.sender) == address(IHOLD(address(this)).Operators())
        );
        require(IERC20(token).transfer(payable(msg.sender), amount));
    }
}
