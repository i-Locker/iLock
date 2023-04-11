// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../utils/INTERFACES.sol";
import "hardhat/console.sol";

/**
 * @title Pair
 * @dev externally owned address
 */
contract Pair is ISWAP {

    uint ratio;

    bool public enabled = true;
    bool public entered = true;

    address payable public Token_A;
    address payable public Token_B;
    address payable public Token_Base;

    // multiple accounts per member
    mapping(address => mapping(uint => ISWAP.Account)) account;

    // modifier to check if caller is token a
    modifier isToken_A() {
        require(msg.sender == Token_A, "Caller is not Token A");
        _;
    }

    // modifier to check if caller is token b
    modifier isToken_B() {
        require(msg.sender == Token_B, "Caller is not Token B");
        _;
    }

    // modifier to check if a function is running
    modifier hasEntered() {
        require(entered == false, "Please wait");
        _;
    }

    // modifier to check if caller is deployer
    modifier isTokenBase() {
        require(address(Token_Base) == address(msg.sender), "Not TokenBase");
        _;
    }

    // event for EVM logging
    event PairCreated(address indexed tokenA, address indexed tokenB);
    
    constructor(address payable token_a, address payable token_b)  { 
        Token_Base = payable(msg.sender); 
        console.log("{EOA: [ Owners, Operators ]} Smart Contract deployed by:", msg.sender);
        console.log("Token (A): ", token_a);
        console.log("Token (B): ", token_b);
        Token_A = token_a; 
        Token_B = token_b; 
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
    
    // /**
    //  * @dev Return TokenBalance address 
    //  * @return ratio uint of token ratio 
    //  */
    // function TokenRatio() public returns (uint) {
    //     (uint token_a_balance) = Token_A_Balance();
    //     (uint token_b_balance) = Token_B_Balance();
    //     uint rA = 1_000_000_000_000 ether / token_a_balance;
    //     uint rB = 1_000_000_000_000 ether / token_b_balance;
    //     bool aB;
    //     if(rA>rB){
    //         aB = true;
    //     } else {
    //         aB = false;
    //     }
    //     return ratio;
    // }

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

/**
 * @title Market
 * @dev externally owned address
 */
contract Market {

    uint bp;
    uint _pairs;
    uint _community;

    bool public enabled = true;

    address payable vault;
    address payable pair;
    address payable[] pairs;
    address payable operators;

    // modifier to check if a pair is active
    modifier isActive() {
        require(enabled == true, "Not active");
        _;
    }

    modifier isOperator() {
        require(address(operators) == address(msg.sender), "Not operators");
        _;
    }

    // event for EVM logging
    event NewPair(address indexed tokenA, address indexed tokenB);

    constructor(address payable tokenA,address payable tokenB, uint _donation) {
        new_Pair(tokenA, tokenB);
        _community = _donation;
        operators = payable(msg.sender);
        _pairs++;
        bp = uint(10000);
    }

    receive() external payable {}
    fallback() external payable {}
    
    /**
     * @dev Change owner
     * @param token_a address of token_a 
     * @param token_b address of token_b 
     */
    function new_Pair(address payable token_a, address payable token_b) public returns(address payable _pair) {
        (_pair) = payable(address(new Pair(token_a,token_b)));
        uint last_pair = _pairs;
        _pairs+=1; 
        pairs.push(pair);
        require(uint(_pairs) == uint(last_pair)+uint(1));
        emit NewPair(token_a, token_b);
    }
 
    /**
     * @dev Alter donation
     */
    function change_donation(uint _donation) public virtual isOperator { 
        _community = _donation;
    }

    /**
     * @dev Alter activity
     */
    function change_activity(bool on_off) public virtual isOperator {
        enabled = on_off;
    }

    /**
     * @dev View status
     */
    function active() public view returns(bool) {
        return enabled;
    }

    /**
     * @dev Calculate donation
     */
    function get_donation(uint _tTotal) public view returns(uint dTotal) {
        dTotal = (_tTotal * _community) / bp;
    }

} 