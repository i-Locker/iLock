// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "../utilities/iLock.sol";

interface IDEPLOY_ILOCKS {
    function iLock(string memory _name, string memory _symbol, address holder) external returns(address payable new_locker); 
}
contract iDeploy_iLock is IDEPLOY_ILOCKS {

    string private tokenName = "iLock Deployer";
    string private tokenSymbol = "iLock_Deployer";

    address payable private operator;
    address payable private _iLock;
    address payable[] private _iLocks;
    address payable[] private _Deployers;
    
    uint private _iLocks_;
    uint private fee_in_ETH;
    uint private fee_in_ERC20;

    modifier onlyOperator() {
        require(msg.sender == operator, "only operator");
        _;
    }

    constructor() {
        operator = payable(msg.sender);
    }

    receive() external payable {}
    fallback() external payable {}

    function iLock_count() public view returns(uint){ return _iLocks_;}
    function feesInETH() public view returns(uint){ return fee_in_ETH;}
    function feesInERC20() public view returns(uint){ return fee_in_ERC20;}
    function iLocks() public view returns(address payable[] memory){ return _iLocks;}
    function transferOperations(address payable _newOps) public virtual onlyOperator { 
        operator = _newOps;
    }
    function set_Fees(uint feeInETH,uint feeInERC20) public virtual onlyOperator { 
        fee_in_ETH = feeInETH;
        fee_in_ERC20 = feeInERC20;
    }
    function iLock(string memory _name, string memory _symbol, address holder) public virtual returns(address payable new_locker){ 
        uint new_locker_id = _iLocks_;
        (address payable _iLocker) = payable(
            address(
                new iLocker(holder,_name,_symbol)
            )
        );
        _Deployers[new_locker_id] = payable(msg.sender);
        _iLocks[new_locker_id] = _iLocker;
        new_locker = _iLocks[new_locker_id];
        _iLocks_++;
        return new_locker;
    }
}
