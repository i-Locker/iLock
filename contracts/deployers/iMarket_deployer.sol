// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "../p2p/Market.sol";

contract iDeploy_iMarkets is IDEPLOY_IMARKETS {

    string private tokenName = "iMarket Deployer";
    string private tokenSymbol = "iMarket_Deployer";

    address payable private operator;
    address payable[] private _iMarkets;
    address payable[] private _Deployers;
    
    uint private _iMarkets_;
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

    function iMarket_count() public view returns(uint){ return _iMarkets_;}
    function feesInETH() public view returns(uint){ return fee_in_ETH;}
    function feesInERC20() public view returns(uint){ return fee_in_ERC20;}
    function iMarkets() public view returns(address payable[] memory){ return _iMarkets;}
    function transferOperations(address payable _newOps) public virtual onlyOperator { 
        operator = _newOps;
    }
    function set_Fees(uint feeInETH,uint feeInERC20) public virtual onlyOperator { 
        fee_in_ETH = feeInETH;
        fee_in_ERC20 = feeInERC20;
    }
    function Deploy_iMarket(address payable tokenA, address payable tokenB, uint donation) public virtual returns(address payable new_market){ 
        uint new_market_id = _iMarkets_;
        (address payable _iMarket) = payable(
            address(
                new iMarket(tokenA,tokenB,donation)
            )
        );
        _Deployers[new_market_id] = payable(msg.sender);
        _iMarkets[new_market_id] = _iMarket;
        new_market = _iMarkets[new_market_id];
        _iMarkets_++;
    }
}
