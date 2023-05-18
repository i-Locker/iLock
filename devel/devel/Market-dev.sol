// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../utils/INTERFACES.sol";
import "hardhat/console.sol";

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