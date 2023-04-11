// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "../accounts/EOA.sol";

/**
 * @title iSWAP
 * @dev Smart contract storage replication utility
 */
contract iSWAP is EOA {

    uint256 members;
    uint256 accounts;

    address payable decentra = payable(address(this));
  
    Asset asset;
    Asset[] _assets;
    Member member;
    Member[] _members;

    // member id
    mapping(uint => address) _member;
    // account id
    mapping(uint => address) _account;
    // membership status
    mapping(address => bool) _membership;
    // account status
    mapping(uint => bool) _available;
    // member status
    mapping(address => bool) _permitted;
    // member accounts 
    mapping(address => mapping(uint => Member[])) _accounts;
    mapping(address => uint[]) my_accounts; 

    constructor(address payable mgmt, address payable ops) EOA(mgmt,ops) {
        console.log("{EOA: [ Owners, Operators ]} Smart Contract deployed by:", msg.sender);
        console.log("Owners: ", mgmt);
        console.log("Operations: ", ops);
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store_accounts(uint256 num) private {
        accounts = num;
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store_members(uint256 num) private {
        members = num;
    }

    /**
     * @dev Store value in variable
     * @param nominee address to nominate for membership
     */
    function new_member(address payable nominee) private {
        uint community = members+1;
        store_members(community);
        _permitted[nominee] = true;
        _membership[nominee] = _permitted[nominee];
        member.id = community;
        member.eoa = nominee; 
        // member.liquidity.holdings.accounts.push(asset);
        _accounts[nominee][community].push(member);
        _members.push(member);
        delete member;
    }

    /**
     * @dev Store value in variable
     * @param nominee address to nominate for membership
     */
    function ban_member(address payable nominee) public isOwner {
        _permitted[nominee] = false;
    }

    /**
     * @dev Store value in variable
     * @param nominee address to nominate for membership
     */
    function new_account(address payable nominee) private {
        uint nominees = accounts+1;
        store_accounts(nominees);
        my_accounts[nominee].push(nominees);
        _available[nominees] = true;
        // Member.liquidity.holdings.accounts Asset { primary/remote } => [ eoa||vaults||id ]
        member.id = nominees;
        member.eoa = nominee;
        // member.liquidity.holdings.accounts.push(asset);
        _accounts[nominee][nominees].push(member);
        _members.push(member);
        delete member;
    }
    
    /**
     * @dev MyAccount
     * @param account id
     */
    function MyAccount(uint account) public virtual returns(Member[] memory __member) {
        __member = _accounts[msg.sender][account];
    }


    /**
     * @dev MyAccounts
     */
    // function MyAccounts() public virtual returns(Member[] memory __member) {
    //     __member = _accounts[msg.sender][account];
    // }
    
    /**
     * @dev _myAccount_Ids
     */
    function _myAccount_Ids() public virtual returns(uint[] memory __accounts) {
        __accounts = my_accounts[msg.sender];
    }
    
    /**
     * @dev All_Accounts
     */
    function All_Accounts() public virtual returns(Member[] memory __member) {
        __member = _members;
    }

    /**
     * @dev Accounts
     * @param mgmt owners
     * @param account id
     */
    function Accounts(address mgmt,uint account) public virtual returns(Member[] memory __member) {
        __member = _accounts[mgmt][account];
    }
    
    /**
     * @dev Deploy EOA
     * @param mgmt owners
     * @param ops operations
     */
    function _deploy(address payable mgmt, address payable ops) private returns(address payable eoa) {
        eoa = payable(address(new EOA(mgmt,ops)));
    }

    /**
     * @dev Deply EOA
     * @param num limit
     */
    function deploy_EOA(uint256 num) public virtual {
        uint i = 0;
        while(uint(i)<uint(num)){ 
            if(uint(i)<uint(num)-uint(1)){ 
                break;
            } else { 
                if(_membership[msg.sender] != true){
                    store_members(members+1);
                }
                store_accounts(accounts+1);
                (address payable eoa) = _deploy(payable(msg.sender),decentra);
                new_account(eoa);
                i++; 
            } 
        }
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve_accounts() public view returns (uint256){
        return accounts;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve_members() public view returns (uint256){
        return members;
    }
}