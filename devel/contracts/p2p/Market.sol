// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../utilities/INTERFACES.sol";
import "hardhat/console.sol";
import "./iPair.sol";

/**
 * @title Market
 * @dev externally owned address
 */
contract iMarket is IMARKET {

    bool public enabled = true;

    uint private _pairs;
    uint private _community;
    uint constant private bp = uint(10000);

    address payable pair;
    address payable vault;
    address payable[] pairs;
    address payable operators;

    modifier isActive() {
        require(enabled == true, "Not active");
        _;
    }

    modifier isOperator() {
        require(address(operators) == address(msg.sender), "Not operators");
        _;
    }

    event NewPair(address indexed tokenA, address indexed tokenB);

    constructor(address payable tokenA,address payable tokenB, uint _donation) {
        bool operational = false;
        _community = _donation;
        operators = payable(msg.sender);
        (address payable new_pair) = new_Pair(tokenA, tokenB);
        if(address(new_pair)!=address(0)) {
            operational = true;
        } if(!operational) { revert(); }
        require(operational);
    }

    receive() external payable {}
    fallback() external payable {}
    
    /**
     * @dev Change owner
     * @param token_a address of token_a 
     * @param token_b address of token_b 
     */
    function new_Pair(address payable token_a, address payable token_b) public virtual override returns(address payable _pair) {
        uint last_pair = _pairs;
        (_pair) = payable(address(new iPair(token_a,token_b,payable(address(this)))));
        _pairs+=1; 
        require(uint(_pairs) == uint(last_pair)+uint(1));
        pairs.push(pair);
        emit NewPair(token_a, token_b);
    }

    function new_(address payable token_a, address payable token_b) public virtual override returns(address payable _pair) {
        uint last_pair = _pairs;
        (_pair) = payable(address(new iPair(token_a,token_b,payable(address(this)))));
        _pairs+=1; 
        require(uint(_pairs) == uint(last_pair)+uint(1));
        pairs.push(pair);
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