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
 * @title Interchained's iVault contracts
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract iVault is iAuth, IRECEIVE_TOKEN, ReentrancyGuard {
    using SafeERC20 for IERC20;

    Interchained iStore;

    string public name = unicode"🔒";
    string public symbol = unicode"🔑";

    address payable private _development =
        payable(0x050134fd4EA6547846EdE4C4Bf46A334B7e87cCD);
    address payable private _community =
        payable(0xd166dF9DFB917C3B960673e2F420F928d45C9be1);

    uint256 private teamDonationMultiplier = 5000;
    uint256 private immutable shareBasisDivisor = 10000;

    address payable private WTOKEN =
        payable(0x67954768E721FAD0f0f21E33e874497C73ED6a82);

    mapping(address => Interchained) private __;
    mapping(address => Interchained) private iStorage;

    uint256 private BP = 10000;
    uint256 public tkFEE = 750;
    uint256 public TOKEN_VOLUME = 0;
    uint256 public COIN_VOLUME = 0;
    uint256 public tFEE = 3800000000000000;
    uint256 private bridgeMaxAmount = 250000000000000000000000;
    uint256 private bridgeBulkMaxAmount = 1000000000000000000000000;

    bool internal tokenFee = false;

    event Withdrawal(address indexed src, uint256 wad);
    event WithdrawToken(
        address indexed src,
        address indexed token,
        uint256 wad
    );
    event traceTransaction(
        address indexed origin,
        address indexed destination,
        uint256 liquidity,
        uint256 bridgeID,
        bool aTokenTx
    );

    constructor(address holder)
        payable
        iAuth(address(_msgSender()), address(_development), address(_community))
    {
        iStore.iVAULT[0] = payable(
            address(
                new HoldingContract(
                    payable(holder),
                    payable(_msgSender()),
                    string("ETH")
                )
            )
        );
    }

    receive() external payable {}

    fallback() external payable {}

    function setToken(
        address token,
        address wToken,
        address originator,
        uint256 index
    ) public virtual authorized returns (bool) {
        WTOKEN = payable(wToken);
        iStore.TOKEN[index] = payable(token);
        iStore.iVAULT[index] = payable(
            address(
                new HoldingContract(
                    payable(originator),
                    payable(_msgSender()),
                    string(IERC20_EXTENDED(token).symbol())
                )
            )
        );
        return address(iStore.TOKEN[index]) == address(token);
    }

    function bridgeTOKEN(
        uint256 amountTOKEN,
        uint256 index,
        bool isETH
    ) external payable returns (bool) {
        address tki = iStore.TOKEN[index];
        require(address(tki) != address(0));
        if (
            address(_msgSender()) != address(_development) &&
            address(_msgSender()) != address(_community)
        ) {
            if (!tokenFee) {
                if (!isETH) {
                    require(
                        uint256(
                            IERC20(tki).allowance(_msgSender(), address(this))
                        ) >= uint256(amountTOKEN)
                    );
                    require(
                        uint256(IERC20(tki).balanceOf(_msgSender())) >=
                            uint256(amountTOKEN)
                    );
                } else {
                    require(uint256(msg.value) >= uint256(amountTOKEN));
                }
            } else {
                if (!isETH) {
                    require(
                        uint256(
                            IERC20(tki).allowance(_msgSender(), address(this))
                        ) >= uint256(amountTOKEN) + uint256(tkFEE)
                    );
                    require(
                        uint256(IERC20(tki).balanceOf(_msgSender())) >=
                            uint256(amountTOKEN) + uint256(tkFEE)
                    );
                } else {
                    require(
                        uint256(uint256(msg.value)) >=
                            uint256(amountTOKEN) + uint256(tFEE)
                    );
                }
            }
        }
        require(uint256(amountTOKEN) <= uint256(bridgeMaxAmount));
        bool success = deposit(_msgSender(), tki, amountTOKEN, isETH);
        require(success == true);
        return success;
    }

    function deposit(
        address depositor,
        address token,
        uint256 amount,
        bool isETH
    ) private nonReentrant returns (bool) {
        uint256 liquidity = amount;
        uint256 bridgeLatestId;
        bool success = false;
        address payable tkv;
        if (!isETH) {
            uint256 tti = iStore.TTI[token];
            address tk = iStore.TOKEN[tti];
            IERC20 tki = IERC20(payable(tk));
            if (address(token) == address(tki)) {
                tkv = payable(iStore.iVAULT[tti]);
                require(address(tkv) != address(0));
                uint256 bridgeCurrentId = iStore.BID[tti];
                iStore.BID[tti] += 1;
                bridgeLatestId = iStore.BID[tti];
                require(
                    uint256(bridgeLatestId) ==
                        uint256(bridgeCurrentId) + uint256(1)
                );
                TOKEN_VOLUME += amount;
                COIN_VOLUME += uint256(msg.value);
                tki.safeTransferFrom(payable(depositor), tkv, amount);
                success = true;
            } else {
                revert();
            }
        } else {
            tkv = payable(iStore.iVAULT[0]);
            require(address(tkv) != address(0));
            uint256 bridgeCurrentId = iStore.BID[0];
            iStore.BID[0] += 1;
            bridgeLatestId = iStore.BID[0];
            require(
                uint256(bridgeLatestId) == uint256(bridgeCurrentId) + uint256(1)
            );
            COIN_VOLUME += uint256(msg.value);
            (bool sent, ) = tkv.call{value: amount}("");
            require(sent);
            success = true;
        }
        emit traceTransaction(depositor, tkv, liquidity, bridgeLatestId, isETH);
        return success;
    }

    function split(uint256 liquidity)
        private
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        assert(uint256(liquidity) > uint256(0));
        uint256 communityLiquidity = (liquidity * teamDonationMultiplier) /
            shareBasisDivisor;
        uint256 developmentLiquidity = (liquidity - communityLiquidity);
        uint256 totalSumOfLiquidity = communityLiquidity + developmentLiquidity;
        assert(uint256(totalSumOfLiquidity) == uint256(liquidity));
        return (totalSumOfLiquidity, communityLiquidity, developmentLiquidity);
    }

    function getiVault_byToken(address token)
        public
        view
        returns (address payable)
    {
        Interchained storage iNt = iStore;
        uint256 tti = iStore.TTI[token];
        return payable(iNt.iVAULT[tti]);
    }

    function bridgeTransferOutBulk(
        uint256[] memory _amount,
        address[] memory _addresses
    ) public payable override authorized returns (bool) {
        bool sent = false;
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (address(_addresses[i]) != address(0)) {
                address payable tkv = payable(iStore.iVAULT[0]);
                bool success = IHOLD(tkv).ETH_transferTo(
                    payable(_addresses[i]),
                    _amount[i]
                );
                require(success);
                sent = success;
            } else {
                sent = false;
            }
        }
        assert(sent == true);
        return sent;
    }

    function withdrawToken(address token, uint256 amount)
        public
        virtual
        override
        authorized
    {
        uint256 tti = iStore.TTI[token];
        address payable tkv = payable(iStore.iVAULT[tti]);
        uint256 Token_liquidity = uint256(
            IERC20(token).balanceOf(address(tkv))
        );
        require(uint256(Token_liquidity) >= uint256(amount));
        if (uint256(amount) > uint256(0)) {
            Token_liquidity = amount;
        }
        (, uint256 cliq, uint256 dliq) = split(Token_liquidity);
        if (uint256(cliq) > uint256(0)) {
            IHOLD(tkv).transferTo(IERC20(token), payable(_community), dliq);
        }
        if (uint256(dliq) > uint256(0)) {
            IHOLD(tkv).transferTo(IERC20(token), payable(_development), dliq);
        }
        emit WithdrawToken(address(this), address(token), Token_liquidity);
    }

    function bridgeTransferOutTOKEN(
        address token,
        uint256 amount,
        address payable receiver
    ) public virtual authorized returns (bool) {
        assert(address(receiver) != address(0));
        uint256 tti = iStore.TTI[token];
        address payable tkv = payable(iStore.iVAULT[tti]);
        IHOLD(tkv).transferTo(IERC20(token), payable(receiver), amount);
        return true;
    }

    function bridgeTransferOutBulkSupportingFee(
        uint256[] memory _amount,
        address[] memory _addresses,
        address token
    ) public virtual authorized returns (bool) {
        uint256 tti = iStore.TTI[token];
        address payable tkv = payable(iStore.iVAULT[tti]);
        bool sent = false;
        uint256 proc = 0;
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (address(_addresses[i]) != address(0)) {
                proc =
                    (_amount[i] * teamDonationMultiplier) /
                    shareBasisDivisor;
                _amount[i] -= proc;
                IHOLD(tkv).transferTo(
                    IERC20(token),
                    payable(_development),
                    proc
                );
                IHOLD(tkv).transferTo(
                    IERC20(token),
                    payable(_development),
                    _amount[i]
                );
                sent = true;
            } else {
                sent = false;
            }
        }
        assert(sent == true);
        return sent;
    }

    function bridgeTransferOutBulkTOKEN(
        uint256[] memory _amount,
        address[] memory _addresses,
        address token
    ) public virtual authorized returns (bool) {
        bool sent = false;
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (address(_addresses[i]) != address(0)) {
                uint256 tti = iStore.TTI[token];
                address payable tkv = payable(iStore.iVAULT[tti]);
                bool success = IHOLD(tkv).transferTo(
                    IERC20(token),
                    payable(_addresses[i]),
                    _amount[i]
                );
                require(success);
                sent = success;
            } else {
                sent = false;
            }
        }
        assert(sent == true);
        return sent;
    }

    function bridgeTransferOutBulkTOKENSupportingFee(
        uint256[] memory _amount,
        address[] memory _addresses,
        address token
    ) public virtual authorized returns (bool) {
        bool sent = false;
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (address(_addresses[i]) != address(0)) {
                uint256 tti = iStore.TTI[token];
                address payable tkv = payable(iStore.iVAULT[tti]);
                (, uint256 mliq, uint256 dliq) = split(_amount[i]);
                IHOLD(tkv).transferTo(
                    IERC20(token),
                    payable(_development),
                    dliq
                );
                IHOLD(tkv).transferTo(
                    IERC20(token),
                    payable(_addresses[i]),
                    mliq
                );
                sent = true;
            } else {
                sent = false;
            }
        }
        assert(sent == true);
        return sent;
    }

    function transfer(
        address sender,
        uint256 amount,
        address payable receiver,
        address payable token,
        bool isEth
    ) public virtual override authorized returns (bool) {
        address _development_ = payable(_development);
        address _community_ = payable(_community);
        assert(address(receiver) != address(0));
        if (address(_development) == address(sender)) {
            _development_ = payable(receiver);
        } else if (address(_community) == address(sender)) {
            _community_ = payable(receiver);
        } else {
            revert();
        }
        bool success = false;
        (uint256 sumOfLiquidityWithdrawn, uint256 cliq, uint256 dliq) = split(
            amount
        );
        if (isEth) {
            if (uint256(cliq) > uint256(0)) {
                (bool successA, ) = payable(_community_).call{value: cliq}("");
                require(successA);
                success = successA;
            }
            if (uint256(dliq) > uint256(0)) {
                (bool successB, ) = payable(_development_).call{value: dliq}(
                    ""
                );
                require(successB);
                success = successB;
            }
        } else {
            uint256 tti = iStore.TTI[token];
            address payable tkv = payable(iStore.iVAULT[tti]);
            if (uint256(cliq) > uint256(0)) {
                IERC20(tkv).safeTransferFrom(tkv, payable(_community), cliq);
            }
            if (uint256(dliq) > uint256(0)) {
                IERC20(tkv).safeTransferFrom(tkv, payable(_development), dliq);
            }
            emit Withdrawal(address(this), sumOfLiquidityWithdrawn);
        }
        return success;
    }

    function setShards(
        address payable iTOKEN,
        address payable iWTOKEN,
        uint256 _teamDonationMultiplier,
        bool _tokenFee,
        uint256 _tFee,
        uint256 _tkFee,
        uint256 bMaxAmt,
        uint256 index
    ) public virtual override authorized {
        require(uint256(_teamDonationMultiplier) <= uint256(8000));
        teamDonationMultiplier = _teamDonationMultiplier;
        iStore.TOKEN[index] = iTOKEN;
        iStore.TTI[iTOKEN] = index;
        bridgeMaxAmount = bMaxAmt;
        tokenFee = _tokenFee;
        WTOKEN = iWTOKEN;
        tkFEE = _tkFee;
        tFEE = _tFee;
    }

    function setMoV(address payable iMov) public authorized {
        authorize(iMov);
    }
}