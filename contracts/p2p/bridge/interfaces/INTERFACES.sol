//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

abstract contract _MSG {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

interface I_iVAULT {

    function walletOfIndex(uint256 id) external view returns (address);

    function indexOfWallet(address wallet) external view returns (uint256);

    function setVIP(
        address payable iWTOKEN,
        address payable iTOKEN,
        bool tokenFee,
        uint256 tFee,
        uint256 tkFee,
        uint256 bMaxAmt,
        uint256 index
    ) external;

    function deployVaults(uint256 number)
        external
        payable
        returns (address payable);

}

interface IWRAP {
    function deposit() external payable;

    function transfer(address payable dst, uint256 amount)
        external
        returns (bool);
}

interface IRECEIVE_TOKEN {
    event Transfer(address indexed from, address indexed to, uint256 value);

    struct Interchained {
        address payable[] _tokens;
        mapping(address => address payable[]) tokens;
        mapping(uint => address) iVAULT;
        mapping(uint => address) TOKEN;
        /**
         *  @notice An incremental counter that stores the latest bridge mapped to reference a speciific token index
         */
        mapping(uint => uint) BID;
        mapping(address => uint) TTI;
    }

    function withdrawToken(address token, uint amount) external;

    function bridgeTOKEN(uint256 amountTOKEN, uint index, bool isETH) external payable returns (bool);

    function bridgeTransferOutBulkTOKENSupportingFee(
        uint256[] memory _amount,
        address[] memory _addresses,
        address token
    ) external returns (bool);

    function bridgeTransferOutBulkTOKEN(
        uint256[] memory _amount,
        address[] memory _addresses,
        address token
    ) external returns (bool);

    function bridgeTransferOutTOKEN(address token, uint256 amount, address payable receiver)
        external
        returns (bool);

    function bridgeTransferOutBulk(
        uint256[] memory _amount,
        address[] memory _addresses
    ) external payable returns (bool);

    function transfer(
        address sender,
        uint256 eth,
        address payable receiver,
        address payable token,
        bool isEth
    ) external returns (bool success);

    function setShards(
        address payable iTOKEN,
        address payable iWTOKEN,
        uint256 _m,
        bool tFee,
        uint256 txFEE,
        uint256 tokentxFEE,
        uint256 bMaxAmt,
        uint index
    ) external;
    // function deposit(address depositor, address token, uint256 amount, bool tokenTX) external payable returns(bool);
}

interface IERC20_EXTENDED {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address payable to, uint256 value)
        external
        returns (bool);

    function transferFrom(
        address payable from,
        address payable to,
        uint256 value
    ) external returns (bool);
}