// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../utilities/INTERFACES.sol";
import "hardhat/console.sol";
import "../accounts/EOA.sol";

/**
 * @title Pair
 * @dev externally owned address
 */
contract iPair is EOA {

    uint ratio;

    bool public enabled = true;

    address payable public Token_A;
    address payable public Token_B;
    address payable public Token_Base;
    address payable public MARKET;

    modifier isToken_A() {
        require(msg.sender == Token_A, "Caller is not Token A");
        _;
    }

    modifier isToken_B() {
        require(msg.sender == Token_B, "Caller is not Token B");
        _;
    }

    modifier isTokenBase() {
        require(address(Token_Base) == address(msg.sender), "Not TokenBase");
        _;
    }

    event PairCreated(address indexed tokenA, address indexed tokenB);
    
    constructor(address payable token_a, address payable token_b, address payable market) EOA(payable(msg.sender),market) { 
        Token_Base = payable(msg.sender); 
        console.log("{EOA: [ Owners, Operators ]} Smart Contract deployed by:", msg.sender);
        console.log("Token (A): ", token_a);
        console.log("Token (B): ", token_b);
        Token_A = token_a; 
        Token_B = token_b;
        MARKET = market;
    }

    receive() external payable {}
    fallback() external payable {}
    
    /**
     * @dev Change status
     */
    function status(bool switch_on_off) public virtual isTokenBase {
        enabled = switch_on_off;
    }

    /**
     * @dev Return TokenBase address 
     * @return address of owner
     */
    function TokenBase() external view returns (address payable) {
        return Token_Base;
    }

    /**
     * @dev Return TokenBalance address 
     * @return token_balance uint of token balance 
     */
    function TokenBalance(address holder,address token) public view returns (uint token_balance) {
        return (token_balance) = IERC20(token).balanceOf(holder);
    }

    
    /**
     * @dev Return Token_A_Balance address 
     * @return token_balance uint of token balance 
     */
    function Token_A_Balance() public view returns (uint token_balance) {
        return (token_balance) = TokenBalance(address(this),Token_A);
    }
    
    /**
     * @dev Return Token_B_Balance address 
     * @return token_balance uint of token balance 
     */
    function Token_B_Balance() public view returns (uint token_balance) {
        return (token_balance) = TokenBalance(address(this),Token_B);
    }
}