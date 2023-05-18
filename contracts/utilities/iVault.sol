// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "../interfaces/IUniswapV2Router02.sol";
import "../interfaces/iLOCKER.sol";
import "./iLock.sol";

interface IUniswap {
    function getEstimatedETHforToken(address token, uint256 erc20Amount)
        external
        view
        returns (uint256[] memory);

    function getEstimatedTokenForETH(address token, uint256 erc20Amount)
        external
        view
        returns (uint256[] memory);

    function getEstimatedDeadline(uint256 delay)
        external
        view
        returns (uint256);

    function convertEthToToken(
        address payable token,
        address payable recipient,
        uint256 erc20Amount
    ) external payable returns (bool);

    function convertTokenToEth(
        address payable token,
        address payable recipient,
        uint256 erc20Amount
    ) external payable returns (bool);

    function getPathForETHtoToken(address token)
        external
        view
        returns (address[] memory);

    function getPathForTokenToETH(address token)
        external
        view
        returns (address[] memory);
}

contract Uniswap is IUniswap {
    IUniswapV2Router02 public uniswapRouter;

    address payable public DEPLOYER;
    address payable public UNISWAP_ROUTER;

    mapping(uint256 => IERC20) public TOKEN;

    constructor(address payable token, address payable uniswap_router) {
        TOKEN[0] = IERC20(token);
        DEPLOYER = payable(msg.sender);
        if (block.chainid == 1 || block.chainid == 3) {
            UNISWAP_ROUTER = payable(
                0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
            );
            uniswapRouter = IUniswapV2Router02(
                payable(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D)
            );
        } else {
            UNISWAP_ROUTER = payable(uniswap_router);
            uniswapRouter = IUniswapV2Router02(uniswap_router);
        }
    }

    receive() external payable virtual {}

    fallback() external payable virtual {}

    function TOKEN_(uint256 index) public view returns (IERC20) {
        return TOKEN[index];
    }

    function safeAddr(address wallet_) private pure returns (bool) {
        if (uint160(address(wallet_)) > 0) {
            return true;
        } else {
            return false;
        }
    }

    function changeToken(uint256 index, address payable token_) public {
        require(safeAddr(token_));
        TOKEN[index] = IERC20(token_);
    }

    function changeRouter(address router_) public {
        require(safeAddr(router_));
        require(address(msg.sender) == address(DEPLOYER));
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER);
    }

    function convertEthToToken(
        address payable token,
        address payable recipient,
        uint256 erc20Amount
    ) public payable override returns (bool) {
        require(address(msg.sender) == address(DEPLOYER));
        uint256 deadline = block.timestamp + 30 seconds;
        uint256[] memory est = getEstimatedETHforToken(
            address(token),
            erc20Amount
        );
        uint256 estETHforToken = est[0] + ((est[0] * 256) / 10000);
        if (uint256(msg.value) >= uint256(estETHforToken)) {
            uint256 remainder = uint256(msg.value) - uint256(estETHforToken);
            uniswapRouter.swapETHForExactTokens{value: estETHforToken}(
                erc20Amount,
                getPathForETHtoToken(token),
                address(this),
                deadline
            );
            if (uint256(remainder) > uint256(0)) {
                (bool success, ) = recipient.call{value: remainder}("");
                require(success);
            }
        } else {
            revert();
        }
        return true;
    }

    function convertTokenToEth(
        address payable token,
        address payable recipient,
        uint256 erc20Amount
    ) public payable override returns (bool) {
        require(address(msg.sender) == address(DEPLOYER));
        uint256 deadline = block.timestamp + 30 seconds;
        uint256[] memory est = getEstimatedTokenForETH(
            address(token),
            erc20Amount
        );
        uint256 estTokenforETH = est[0] + ((est[0] * 256) / 10000);
        if (
            uint256(IERC20(token).balanceOf(address(this))) >=
            uint256(estTokenforETH)
        ) {
            uniswapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
                erc20Amount,
                0,
                getPathForTokenToETH(token),
                recipient,
                deadline
            );
        } else {
            revert();
        }
        return true;
    }

    function getEstimatedETHforToken(address token, uint256 erc20Amount)
        public
        view
        override
        returns (uint256[] memory)
    {
        return
            uniswapRouter.getAmountsIn(
                erc20Amount,
                getPathForETHtoToken(token)
            );
    }

    function getEstimatedTokenForETH(address token, uint256 erc20Amount)
        public
        view
        override
        returns (uint256[] memory)
    {
        return
            uniswapRouter.getAmountsOut(
                erc20Amount,
                getPathForTokenToETH(token)
            );
    }

    function getEstimatedDeadline(uint256 delay)
        public
        view
        override
        returns (uint256)
    {
        return block.timestamp + (delay * 1 seconds);
    }

    function getPathForETHtoToken(address token)
        public
        view
        override
        returns (address[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = safeAddr(token) ? token : address(TOKEN[0]);

        return path;
    }

    function getPathForTokenToETH(address token)
        public
        view
        override
        returns (address[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = safeAddr(token) ? token : address(TOKEN[0]);
        path[1] = uniswapRouter.WETH();

        return path;
    }
}

/**
 *                                         ...........
 *                                 .::--==================--:..
 *                            .:-===++*#%%@@@@@@@@@@@@@%%##*+===--:.
 *                        .:-==+*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*===-:
 *                     .:-==*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+==-:
 *                   :-==*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+==-.
 *                 :==+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-.
 *               :==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+=-.
 *             .==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*=------=+#@@@@@@@@@@@@@@@#==-
 *            -==#@@@@@@@@@@@@@@@@@@@@%#####%@@@@@#-------------#@@@@@@@@@@@@@@@*==:
 *          .==+@@@@@@@@@@@@@@@@@@%+-:::::::--+#@@---------------=@@@@@@@@@@@@@@@%==-
 *         .==*@@@@@@@@@@@@@@@@@%=:::::::::------*%---------------#@@@@@@@@@@@@@@@@+=-
 *        :==#@@@@@@@@@@@@@@@@@*-:::::----------------------=+#######%@@@@@@@@@@@@@@*==.
 *       .==#@@@@@@@@@@@@@@@@@+---------------------------*%#+---------+%@@@@@@@@@@@@*==
 *      .==*@@@@@@@@@@@@@@@@@*----------------------------=--------------=@@@@@@@@@@@@+=-
 *      -=+@@@@@@@@@@@@@@@@@%-----------=+****+=--------------------++**#**@@@@@@@@@@@%==:
 *     :==%@@@@@@@@@@@@@@@@@*-------=###++====+*%%*-------------+#@%*+==--=+%@@@@@@@@@@#==
 *     ==*@@@@@@@@@@@@@@@@@@=-----=%#=------------*@*---------*@#+----------=@@@@@@@@@@@==:
 *    .==%@@@@@@@@@@@@@@@@@@------=-----------------#%------=@#=------------=@@@@@@@@@@@*==
 *    :==@@@@@@@@@@@@@@@@@%+-------------------=+***+%%-----#*--------------#@@@@@@@@@@@%==.
 *    -=+@@@@@@@@@@@@@@@@+---------------=+#%@%#*+===+@=-------------------#@@@@@@@@@@@@@==:
 *    -=*@@@@@@@@@@@@@@%===-----------=*%@%*=---------=#---==-----------=*@@@@@@@@@@@@@@@==:
 *    -=*@@@@@@@@@@@@@%======-------=#@@*=------------=#----+**++++++*###++%@@@@@@@@@@@@@==:
 *    -=+@@@@@@@@@@@@@=========----#@@+--------------=%=-------=++++*%*----#@@@@@@@@@@@@@==:
 *    :==@@@@@@@@@@@@#===========--+*=--------------*%=----------=**+---=*%@@@@@@@@@@@@@%==.
 *    .==%@@@@@@@@@@@#==============-------------+#%+-------=+***+-=+*#**+%@@@@@@@@@@@@@*==
 *     ==*@@@@@@@@@@@%================-----=+*###*=----=+**###*****#%#===%@@@@@@@@@@@@@@==:
 *     :==%@@@@@@@@@@@+==================-=*++=--=+**##*##**+====*#*===+@@@@@@@@@@@@@@@#==
 *      -=+@@@@@@@@@@@@+===================+*####*++==*#+=====*#*=====#@@@@@@@@@@@@@@@%==:
 *      .==*@@@@@@@@@@@@#============+*###*++=====+*##+==+*##*=====+#@@@@@@@@@@@@@@@@@+=-
 *       .==#@@@@@@@@@@@@@*==========@+=+#########*++*###*+=====+#@@@@@@@@@@@@@@@@@@@+=-
 *        :==#@@@@@@@@@@@@@@%*=======+#############**+======*#%@@@@@@@@@@@@@@@@@@@@@+==
 *         .==*@@@@@@@@@@@@@@@@%#*+===================++*%@@@@@@@@@@@@@@@@@@@@@@@@@+=-
 *          .-=+@@@@@@@@@@@@@@@@@@@@@%%#####*#####%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%==-
 *            -==#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*==:
 *             .-=+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-
 *               :==+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#==-.
 *                 :==+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*==-.
 *                   .-==*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+==-.
 *                      :-==*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+==-.
 *                         :-===*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+===-.
 *                            .:-====+*##%%@@@@@@@@@@@@%%##*+===-::.
 *                                 .::--==================--:..
 *                                          ..........
 */

/**▪  ▄.▄.▄▄▄▄.▪▄▄▄▄.▄▄▄ ▄▄▄· ▄▄.·▄ ▄▄▄▄· ▪  ▄  ▄·▄▄▄▄ .·▄▄▄▄
 *██ •█▌█▌•██ ·▀▀▄. ▀▄▄█·▐█ ▌▪██▪▐█ █▀▀█ ██ •█▌▐█ ▀▀▄▪ ▐█▪ ██
 *▐█·▐█▐▐▌ ▐█.▪▐▀▀▪▄▐▀▀▄ ██ ▄▄██▀▐█ █▀▀█·▐█·▐█▐▐▌▐▀▀▪▄·▐█· ██
 *▐█·██▐█▌ ▐█▌·▐█▄▄▌▐█•█▌▐███▌██ ▐█ █▪ █·▐█ ██▐█▌▐█▄▄▌·▐█. ██
 * █▪ ▀▪▀ •▀▀▀ .▀▀▀▀·▀ ▀• ▀▀▀· ▀ •▀ ▀• ▀  █▪ ▀ ▀ •▀▀▀▀  ▀▀▀▀▀
 * @title Interchained's Holding contracts
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract HoldingContract is Context, IHOLD, iLock {
    using SafeERC20 for IERC20;

    IERC20 public iASSET;
    IERC20 public WrappedToken;
    IUniswap public __iUniswap;

    address payable public asset;
    address payable public holder;
    address payable public deployer;
    address payable[] public holders;
    address payable public uniswap_handler;

    constructor(
        address payable _deployer,
        address payable _holder,
        address payable _asset,
        address payable _wrappedToken,
        address payable _uniswap,
        string memory symbol
    )
        payable
        iLock(
            string.concat("iVault (", symbol, ")"),
            string.concat("Bridged-", symbol),
            _holder
        )
    {
        asset = _asset;
        holder = _holder;
        deployer = _deployer;
        holders.push(_holder);
        iASSET = IERC20(_asset);
        WrappedToken = IERC20(_wrappedToken);
        __iUniswap = IUniswap(new Uniswap(_asset, _uniswap));
        uniswap_handler = payable(address(__iUniswap));
    }

    receive() external payable virtual override {}

    fallback() external payable virtual override {}

    /**
     * @notice Allows deployer contract to transfer an amount of tokens in the HoldingContract to the recipient
     * @dev All though there is no explicit locking mechanism here, this contract is supposed to be created and managed by the Locker, which has such functionality.
     * @dev For users that are inspecting this contract, we recommend checking the web interface to find out what the locking details are of this iLock.
     */
    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount,
        uint256 id
    ) external override returns (bool success) {
        require(
            address(_msgSender()) == address(deployer) ||
                address(_msgSender()) == address(holder)
        );
        address[] memory _receivers;
        if (uint256(amount) > uint256(token.balanceOf(address(this)))) {
            amount = token.balanceOf(address(this));
        }
        _receivers[0] = address(recipient);
        token.safeTransfer(recipient, amount);
        success = true;
        emit WithdrawalTokenFrom(
            _msgSender(),
            _receivers,
            address(this),
            address(token),
            amount,
            id
        );
        return success;
    }

    function ETH_transferTo(
        address payable recipient,
        uint256 amount,
        uint256 id
    ) external payable override returns (bool success) {
        require(
            address(_msgSender()) == address(deployer) ||
                address(_msgSender()) == address(holder)
        );
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        address[] memory _receivers;
        _receivers[0] = address(recipient);
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent);
        success = true;
        emit WithdrawalCoinFrom(
            _msgSender(),
            _receivers,
            address(this),
            amount,
            id
        );
        return success;
    }

    function swapETH_to_TOKEN(
        address payable recipient,
        address payable token,
        uint256 amount
    ) external payable override returns (bool success) {
        require(
            address(_msgSender()) == address(deployer) ||
                address(_msgSender()) == address(holder)
        );
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        bool sent = IUniswap(address(this)).convertEthToToken(
            token,
            recipient,
            amount
        );
        require(sent);
        success = sent;
        emit SwapETHToToken(_msgSender(), recipient, address(this), amount);
        return success;
    }

    function swapTOKEN_to_ETH(
        address payable recipient,
        address payable token,
        uint256 amount
    ) external payable override returns (bool success) {
        require(
            address(_msgSender()) == address(deployer) ||
                address(_msgSender()) == address(holder)
        );
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        bool sent = IUniswap(address(this)).convertTokenToEth(
            token,
            recipient,
            amount
        );
        require(sent);
        success = sent;
        emit SwapTokenToETH(_msgSender(), recipient, address(this), amount);
        return success;
    }

    /**
     *  @notice The token name and symbol are upgradeable in case of rebranding.
     */
    function setTokenNameAndSymbol(string memory name, string memory symbol)
        public
        virtual
    {
        if (
            address(_msgSender()) == address(deployer) ||
            address(_msgSender()) == address(holder)
        ) {
            _name = name;
            _symbol = symbol;
        } else {
            revert();
        }
    }

    /**
     *  @notice Transfer overrides
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        for (uint256 i = 0; i < holders.length; i++) {
            if (
                uint256(iASSET.balanceOf(holders[i])) >=
                uint256(
                    (uint256(iASSET.totalSupply()) * uint256(5100)) /
                        uint256(10000)
                )
            ) {
                if (address(holders[i]) != address(holder)) {
                    transferHolder(holders[i]);
                }
            }
        }
        super._transfer(from, to, amount);
    }

    /**
     *  @notice Transfer the holder address to a new address, only callable by deployer.
     */
    function transferHolder(address payable new_holder)
        public
        virtual
        override
        returns (bool)
    {
        if (address(holder) == address(new_holder)) {} else {
            address payable prev_holder = holder;
            if (address(_msgSender()) == address(holder)) {
                _mint(new_holder, iASSET.totalSupply());
                _burn(prev_holder, uint256(iASSET.balanceOf(prev_holder)));
                holder = new_holder;
                holders.push(new_holder);
                transferOwnership(new_holder);
            } else {
                if (
                    uint256(iASSET.balanceOf(new_holder)) >=
                    uint256(
                        (uint256(iASSET.totalSupply()) * uint256(5100)) /
                            uint256(10000)
                    )
                ) {
                    holder = new_holder;
                    holders.push(new_holder);
                    transferOwnership(new_holder);
                }
            }
            emit HolderTransferred(prev_holder, new_holder);
        }
        return true;
    }
}