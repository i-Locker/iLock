// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../token/ERC20.sol";

contract iHold is ERC20 {

    address payable operators;
    address payable depositors;

    constructor(
        string memory name,
        string memory symbol,
        uint256 decimals,
        address payable _depositors
    ) ERC20(name, symbol, decimals) {
        operators = payable(msg.sender);
        depositors = _depositors;
    }

    receive() external payable virtual override {}
    fallback() external payable virtual override {}

    function withdraw_ETH() external payable {
        require(address(msg.sender) == address(depositors) || address(msg.sender) == address(operators));
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(sent);
    }

    function withdraw_ERC20(address token, uint256 amount) external payable {
        require(address(msg.sender) == address(depositors) || address(msg.sender) == address(operators));
        require(IERC20(token).transfer(payable(msg.sender), amount));
    }
}
