// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.13;

import "./auth/iAuth.sol";
import "../../utilities/iVault.sol";

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
 * @title Interchained's iBRIDGE CrossChain 'iVault' contracts
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract iBRIDGE_CrossChain is iAuth, IRECEIVE_TOKEN, ReentrancyGuard {
    using SafeERC20 for IERC20;

    string public name = unicode"🔒";
    string public symbol = unicode"🔑";

    Interchained iStore;
    iBridge _iBridge_CORE_;
    DigitalAsset CrossChain;

    address payable public _ADDRESS = payable(address(this));

    mapping(address => Interchained) private iStorage;

    constructor(
        address payable holder,
        address payable devs,
        address payable WETH,
        address payable UNISWAP,
        uint256 tkFee,
        uint256 tFee,
        uint256 pdm,
        uint256 tdm
    ) payable iAuth(address(_msgSender()), address(holder), address(devs)) {
        _iBridge_CORE_.BP = 10000;
        _iBridge_CORE_.WTOKEN = WETH;
        _iBridge_CORE_.takeFee = false;
        _iBridge_CORE_.COIN_VOLUME = 0;
        _iBridge_CORE_.TOKEN_VOLUME = 0;
        _iBridge_CORE_._community = holder;
        _iBridge_CORE_._development = devs;
        _iBridge_CORE_.tkFEE = tkFee > 0 ? tkFee : 750;
        _iBridge_CORE_.tFEE = tFee > 0 ? tFee : 3800000000000000;
        _iBridge_CORE_.teamDonationMultiplier = tdm > 0 ? tdm : 5000;
        _iBridge_CORE_.protocolDonationMultiplier = pdm > 0 ? pdm : 500;
        iStore.iVAULT[0] = payable(
            address(
                new HoldingContract(
                    devs,
                    holder,
                    WETH,
                    WETH,
                    UNISWAP,
                    string("WETH")
                )
            )
        );
    }

    receive() external payable {}

    fallback() external payable {}

    function bridgeTOKEN(
        uint256 amountBridge,
        uint256 index,
        bool isETH
    ) public payable override nonReentrant {
        address payable tki = payable(iStore.TOKEN[index]);
        require(safeAddr(tki));
        (, , uint256 dliq) = split(amountBridge, _iBridge_CORE_.tkFEE);
        if (_iBridge_CORE_.takeFee == false) {
            if (isETH == false) {
                require(
                    uint256(
                        IERC20(tki).allowance(_msgSender(), address(this))
                    ) >= uint256(amountBridge)
                );
                require(
                    uint256(IERC20(tki).balanceOf(_msgSender())) >=
                        uint256(amountBridge)
                );
                require(safeAddr(tki));
                IERC20(tki).safeTransferFrom(
                    payable(_msgSender()),
                    _ADDRESS,
                    uint256(amountBridge)
                );
                bool success = deposit(tki, amountBridge, dliq, isETH);
                require(success == true);
            } else {
                require(uint256(msg.value) >= uint256(amountBridge));
                (bool sent, ) = iStore.iVAULT[0].call{
                    value: uint256(amountBridge)
                }("");
                require(sent);
                bool success = deposit(tki, amountBridge, dliq, isETH);
                require(success == true);
            }
        } else {
            if (isETH == false) {
                require(
                    uint256(
                        IERC20(tki).allowance(_msgSender(), address(this))
                    ) >= uint256(amountBridge) + uint256(dliq)
                );
                require(
                    uint256(IERC20(tki).balanceOf(_msgSender())) >=
                        uint256(amountBridge) + uint256(dliq)
                );
                require(safeAddr(tki));
                uint256 balanceBefore = uint256(
                    IERC20(tki).balanceOf(address(_ADDRESS))
                );
                IERC20(tki).safeTransferFrom(
                    payable(_msgSender()),
                    _ADDRESS,
                    uint256(amountBridge) + uint256(dliq)
                );
                uint256 balanceNow = uint256(
                    IERC20(tki).balanceOf(address(_ADDRESS))
                );
                require(
                    uint256(balanceNow) >=
                        (uint256(balanceBefore) +
                            (uint256(amountBridge) + uint256(dliq)))
                );
                IERC20(tki).safeTransfer(
                    payable(iStore.iVAULT[iStore.TTI[address(tki)]]),
                    amountBridge
                );
                bool success = deposit(tki, amountBridge, dliq, isETH);
                require(success == true);
            } else {
                require(
                    uint256(uint256(msg.value)) >=
                        uint256(amountBridge) + uint256(_iBridge_CORE_.tFEE)
                );
                (bool sent, ) = iStore.iVAULT[0].call{
                    value: uint256(amountBridge) + uint256(_iBridge_CORE_.tFEE)
                }("");
                require(sent);
                bool success = deposit(tki, amountBridge, dliq, isETH);
                require(success == true);
            }
        }
    }

    function deposit(
        address payable token,
        uint256 amount,
        uint256 donation,
        bool isETH
    ) private returns (bool) {
        if (isETH == false) {
            IERC20 tki = IERC20(payable(token));
            uint256 wdCurrentId = iStore.TID[iStore.TTI[address(tki)]];
            iStore.TID[iStore.TTI[address(tki)]] += 1;
            uint256 wdLatestId = iStore.TID[iStore.TTI[address(tki)]];
            require(uint256(wdLatestId) == uint256(wdCurrentId) + uint256(1));
            _iBridge_CORE_.TOKEN_VOLUME += amount;
            emit DepositToken(
                _msgSender(),
                iStore.iVAULT[iStore.TTI[address(tki)]],
                amount,
                address(tki),
                wdLatestId
            );
        } else {
            uint256 wdCurrentId = iStore.TID[0];
            iStore.TID[0] += 1;
            uint256 wdLatestId = iStore.TID[0];
            require(uint256(wdLatestId) == uint256(wdCurrentId) + uint256(1));
            _iBridge_CORE_.COIN_VOLUME += uint256(msg.value);
            bool success = IHOLD(iStore.iVAULT[0]).ETH_transferTo(
                _ADDRESS,
                donation,
                wdLatestId
            );
            require(success);
            emit DepositCoin(
                _msgSender(),
                iStore.iVAULT[0],
                amount,
                wdLatestId
            );
        }
        return true;
    }

    function split(uint256 liquidity, uint256 multiplier)
        private
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        assert(uint256(liquidity) > uint256(0));
        uint256 mLiquidity = (liquidity * multiplier) / _iBridge_CORE_.BP;
        uint256 rLiquidity = (liquidity - mLiquidity);
        uint256 totalSumOfLiquidity = mLiquidity + rLiquidity;
        require(uint256(totalSumOfLiquidity) == uint256(liquidity));
        return (totalSumOfLiquidity, mLiquidity, rLiquidity);
    }

    function withdraw(address payable token, bool isEth)
        public
        payable
        override
        authorized
    {
        address[] memory _receivers;
        if (!isEth) {
            require(safeAddr(token));
            (, uint256 cliq, uint256 dliq) = split(
                IERC20(token).balanceOf(address(this)),
                _iBridge_CORE_.teamDonationMultiplier
            );
            if (uint256(cliq) > uint256(0)) {
                IERC20(token).safeTransfer(_iBridge_CORE_._community, cliq);
                _receivers[0] = _iBridge_CORE_._community;
            }
            if (uint256(dliq) > uint256(0)) {
                IERC20(token).safeTransfer(_iBridge_CORE_._development, dliq);
                _receivers[1] = _iBridge_CORE_._development;
            }
        } else {
            (, uint256 cliq, uint256 dliq) = split(
                address(this).balance,
                _iBridge_CORE_.teamDonationMultiplier
            );
            if (uint256(cliq) > uint256(0)) {
                (bool successA, ) = _iBridge_CORE_._community.call{value: cliq}(
                    ""
                );
                require(successA);
                _receivers[0] = _iBridge_CORE_._community;
            }
            if (uint256(dliq) > uint256(0)) {
                (bool successB, ) = _iBridge_CORE_._development.call{
                    value: dliq
                }("");
                require(successB);
                _receivers[1] = _iBridge_CORE_._development;
            }
        }
    }

    // function bridgeTransferOutTOKEN(
    //     address payable token,
    //     uint256 amount,
    //     address payable receiver
    // ) public payable authorized returns (bool) {
    //     address[] memory _receivers;
    //     require(safeAddr(receiver));
    //     uint256 tti = iStore.TTI[token];
    //     uint256 wdCurrentId = get_TransactionID_byTokenIndex(tti);
    //     iStore.TID[tti] += 1;
    //     uint256 wdLatestId = get_TransactionID_byTokenIndex(tti);
    //     require(uint256(wdLatestId) == uint256(wdCurrentId) + uint256(1));
    //     address payable tkv = payable(iStore.iVAULT[tti]);
    //     require(safeAddr(tkv));
    //     require(safeAddr(token));
    //     _receivers[0] = receiver;
    //     IHOLD(tkv).transferTo(
    //         IERC20(token),
    //         payable(receiver),
    //         amount,
    //         wdLatestId
    //     );
    //     emit WithdrawalTokenFrom(
    //         _msgSender(),
    //         _receivers,
    //         address(tkv),
    //         address(token),
    //         amount,
    //         wdLatestId
    //     );
    //     return true;
    // }

    function bridgeTransfer(
        address payable[] memory _receiver,
        uint256[] memory _amount,
        uint256 _index,
        bool _isEth
    ) public payable override authorized {
        address payable tkv = payable(iStore.iVAULT[_index]);
        require(safeAddr(tkv));
        for (uint256 i = 0; i < _receiver.length; i++) {
            address[] memory _receivers;
            if (safeAddr(_receiver[i])) {
                _receivers[0] = _receiver[i];
                uint256 wdCurrentId = get_TransactionID_byTokenIndex(_index);
                iStore.TID[_index] += 1;
                uint256 wdLatestId = get_TransactionID_byTokenIndex(_index);
                require(
                    uint256(wdLatestId) == uint256(wdCurrentId) + uint256(1)
                );
                if (!_isEth) {
                    address payable token = get_Token_byIndex(_index);
                    require(safeAddr(token));
                    bool success = IHOLD(tkv).transferTo(
                        IERC20(token),
                        _receiver[i],
                        _amount[i],
                        wdLatestId
                    );
                    require(success);
                    emit WithdrawalTokenFrom(
                        _msgSender(),
                        _receivers,
                        address(tkv),
                        address(token),
                        _amount[i],
                        wdLatestId
                    );
                } else {
                    bool success = IHOLD(tkv).ETH_transferTo(
                        _receiver[i],
                        _amount[i],
                        wdLatestId
                    );
                    require(success);
                    emit WithdrawalCoinFrom(
                        _msgSender(),
                        _receivers,
                        address(tkv),
                        _amount[i],
                        wdLatestId
                    );
                }
            }
        }
    }

    function BridgeGenesis(
        address payable TOKEN,
        address payable wrappedTOKEN,
        address payable UNISWAP,
        address payable holder,
        uint256 index
    ) public payable override authorized {
        require(safeAddr(wrappedTOKEN));
        require(safeAddr(TOKEN));
        iStore.TTI[TOKEN] = index;
        iStore.TOKEN[index] = TOKEN;
        _iBridge_CORE_.WTOKEN = wrappedTOKEN;
        if (uint256(msg.value) > uint256(0)) {
            iStore.iVAULT[index] = payable(
                address(
                    new HoldingContract{value: msg.value}(
                        payable(_msgSender()),
                        holder,
                        TOKEN,
                        wrappedTOKEN,
                        UNISWAP,
                        string(IERC20_EXTENDED(TOKEN).symbol())
                    )
                )
            );
        } else {
            iStore.iVAULT[index] = payable(
                address(
                    new HoldingContract{value: 0}(
                        payable(_msgSender()),
                        holder,
                        TOKEN,
                        wrappedTOKEN,
                        UNISWAP,
                        string(IERC20_EXTENDED(TOKEN).symbol())
                    )
                )
            );
        }
        require(address(iStore.TOKEN[index]) == address(TOKEN));
    }

    function settings(
        uint256 _teamDonationMultiplier,
        uint256 _protocolDonationMultiplier,
        bool _tokenFee,
        uint256 _tFee,
        uint256 _tkFee,
        address payable holder,
        address payable wrappedTOKEN
    ) public override authorized {
        require(uint256(_teamDonationMultiplier) <= uint256(8000));
        _iBridge_CORE_.protocolDonationMultiplier = _protocolDonationMultiplier;
        _iBridge_CORE_.teamDonationMultiplier = _teamDonationMultiplier;
        _iBridge_CORE_._development = payable(_msgSender());
        _iBridge_CORE_.WTOKEN = wrappedTOKEN;
        _iBridge_CORE_.takeFee = _tokenFee;
        _iBridge_CORE_._community = holder;
        _iBridge_CORE_.tkFEE = _tkFee;
        _iBridge_CORE_.tFEE = _tFee;
    }

    function get_iBridge_CORE()
        public
        view
        returns (iBridge memory)
    {
        return _iBridge_CORE_;
    }

    function get_DigitalAsset()
        public
        view
        returns (DigitalAsset memory)
    {
        return CrossChain;
    }

    function get_TransactionID_byTokenIndex(uint256 index)
        public
        view
        override
        returns (uint256)
    {
        return iStore.TID[index];
    }

    function get_Index_byToken(address token) public view returns (uint256) {
        return iStore.TTI[token];
    }

    function get_Token_byIndex(uint256 index)
        public
        view
        returns (address payable)
    {
        return payable(iStore.TOKEN[index]);
    }

    function get_iVault_byToken(address token)
        public
        view
        returns (address payable)
    {
        return payable(get_iVault_byIndex(get_Index_byToken(token)));
    }

    function get_iVault_byIndex(uint256 index)
        public
        view
        returns (address payable)
    {
        return payable(iStore.iVAULT[index]);
    }

    function calculateSuggestedDonation(uint256 amountBridge, bool isEth)
        external
        view
        returns (uint256)
    {
        if (!isEth) {
            return
                ((uint256(amountBridge) * uint256(_iBridge_CORE_.tkFEE)) /
                    uint256(_iBridge_CORE_.BP));
        } else {
            return
                (uint256(amountBridge) + uint256(_iBridge_CORE_.tFEE));
        }
    }

    function safeAddr(address wallet_) private pure returns (bool) {
        if (uint160(address(wallet_)) > 0) {
            return true;
        } else {
            return false;
        }
    }
}