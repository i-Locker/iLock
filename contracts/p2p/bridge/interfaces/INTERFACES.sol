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

    event WithdrawalTokenFrom(
        address caller,
        address[] indexed destination,
        address indexed origin,
        address token,
        uint256 liquidity,
        uint256 id
    );
    event WithdrawalCoinFrom(
        address caller,
        address[] indexed destination,
        address indexed origin,
        uint256 liquidity,
        uint256 id
    );
    event DepositToken(
        address indexed origin,
        address indexed destination,
        uint256 liquidity,
        address token,
        uint256 id
    );
    event DepositCoin(
        address indexed origin,
        address indexed destination,
        uint256 liquidity,
        uint256 id
    );
    event traceTransaction(
        address indexed origin,
        address indexed destination,
        uint256 liquidity,
        uint256 id,
        bool aTokenTx
    );

    struct iBridge {
        uint256 BP;
        uint256 tFEE;
        uint256 tkFEE;
        bool takeFee;
        uint256 COIN_VOLUME;
        uint256 TOKEN_VOLUME;
        address payable WTOKEN;
        address payable _community;
        address payable _development;
        uint256 teamDonationMultiplier;
        uint256 protocolDonationMultiplier;
    }
    struct Transaction {
        uint256 id;
        uint256 amountIn;
        uint256 amountOut;
        address payable caller;
        address payable origin;
        address payable destination;
    }
    struct DigitalAsset {
        uint256[] ids;
        Transaction[] txes;
        address payable[] withdrawn;
        address payable[] depositors;
        address payable token_address;
        address payable ivault_address;
    }
    struct Interchained {
        address payable[] _tokens;
        mapping(uint256 => uint256) TID;
        mapping(address => uint256) TTI;
        mapping(uint256 => address) TOKEN;
        mapping(uint256 => address) iVAULT;
        mapping(address => address payable[]) tokens;
    }

    function withdraw(address payable token, bool isEth) external payable;

    // function withdrawFrom(address payable token, uint256 amount)
    //     external
    //     payable;

    function bridgeTOKEN(
        uint256 amountBridge,
        uint256 index,
        bool isETH
    ) external payable;

    // function bridgeTransferOutBulkSupportingFee(
    //     uint256[] memory _amount,
    //     address payable[] memory _addresses
    // ) external payable;

    // function bridgeTransferOutBulkTOKENSupportingFee(
    //     uint256[] memory _amount,
    //     address payable[] memory _addresses,
    //     address payable token
    // ) external payable;

    // function bridgeTransferOutBulkTOKEN(
    //     uint256[] memory _amount,
    //     address payable[] memory _addresses,
    //     address payable token
    // ) external payable;

    // function bridgeTransferOut(uint256 amount, address payable receiver)
    //     external
    //     payable
    //     returns (bool);

    // function bridgeTransferOutTOKEN(
    //     address payable token,
    //     uint256 amount,
    //     address payable receiver
    // ) external payable returns (bool);

    // function bridgeTransferOutBulk(
    //     uint256[] memory _amount,
    //     address payable[] memory _addresses
    // ) external payable;

    function BridgeGenesis(
        address payable TOKEN,
        address payable wrappedTOKEN,
        address payable UNISWAP,
        address payable originator,
        uint256 index
    ) external payable;

    function bridgeTransfer(
        address payable[] memory _receiver,
        uint256[] memory _amount,
        uint256 _index,
        bool _isEth
    ) external payable;

    function settings(
        uint256 _teamDonationMultiplier,
        uint256 _protocolDonationMultiplier,
        bool tFee,
        uint256 txFEE,
        uint256 tokentxFEE,
        address payable holder,
        address payable wrappedTOKEN
    ) external;

    function get_TransactionID_byTokenIndex(uint256 index)
        external
        view
        returns (uint256);
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
