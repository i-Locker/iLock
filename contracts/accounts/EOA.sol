// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../utilities/INTERFACES.sol";
import "hardhat/console.sol";

/**
 * @title EOA
 * @dev externally owned address
 */
contract EOA is ISWAP, iEOA {

    bool entered;

    address payable private owner;
    address payable private operations;

    mapping(address => mapping(uint => ISWAP.Account)) account;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event OperationsSet(address indexed oldOps, address indexed newOps);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier isOperator() {
        require(msg.sender == operations, "Caller is not operator");
        _;
    }

    modifier hasEntered() {
        require(entered == false, "Please wait");
        _;
    }

    constructor(address payable mgmt, address payable ops) {
        console.log("{EOA: [ Owners, Operators ]} Smart Contract deployed by:", msg.sender);
        console.log("Owners: ", mgmt);
        console.log("Operations: ", ops);
        owner = mgmt; 
        operations = ops;
        emit OwnerSet(address(0), owner);
        emit OperationsSet(address(0), operations);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address payable newOwner) public isOwner {
        owner = newOwner;
        emit OwnerSet(owner, newOwner);
    }

    /**
     * @dev Change operator
     * @param newOperator address of new operator
     */
    function changeOperator(address payable newOperator) public isOperator {
        operations = newOperator;
        emit OperationsSet(operations, newOperator);
    }
    
    /**
     * @dev Change owner
     */
    function resign() public isOwner {
        owner = payable(address(0));
        emit OwnerSet(owner, payable(address(0)));
    }

    /**
     * @dev Change operator
     */
    function abort() public isOperator {
        operations = payable(address(0));
        emit OperationsSet(operations, payable(address(0)));
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address payable) {
        return owner;
    }

    /**
     * @dev Return operator address 
     * @return address of operator
     */
    function getOperator() external view returns (address payable) {
        return operations;
    }
}
