// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "../interfaces/iLOCKER.sol";
import "./iHold.sol";

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
 * @title Interchained's iLocker Protocol designated Holding contracts
 * @notice The iLock Holding contracts allow project operators to iLock tokens for a period
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract HoldingContract is Context, IHOLD, iHold {
    using SafeERC20 for IERC20;

    IERC20 private iSHARD = IERC20(address(this));

    /// @notice The locker contract contains the actual information of the iLock and is the only address that can unlock funds.
    address payable public locker;
    address payable public holder;
    address payable[] public holders;

    uint256 public unlock_time;
    uint256 private grace;

    event HolderTransferred(
        address indexed prev_holder,
        address indexed new_holder
    );

    constructor(
        address payable _deployer,
        address payable _holder,
        string memory symbol,
        uint256 lock_time,
        uint256 _amount
    )
        payable
        iHold(
            string.concat("iLocker Stacked (", symbol, ")"),
            string.concat("Stacked-", symbol),
            _holder,
            _amount
        )
    {
        holder = _holder;
        locker = _deployer;
        holders.push(_holder);
        unlock_time = lock_time;
        grace = block.timestamp + 72 hours;
    }

    receive() external payable override {}

    fallback() external payable override {}

    /**
     * @notice Allows locker contract to transfer an amount of tokens in the HoldingContract to the recipient
     * @dev All though there is no explicit locking mechanism here, this contract is supposed to be created and managed by the Locker, which has such functionality.
     * @dev For users that are inspecting this contract, we recommend checking the web interface to find out what the locking details are of this iLock.
     */
    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount
    ) external override returns (bool success) {
        if (block.timestamp >= unlock_time) {
            require(
                address(_msgSender()) == address(locker) ||
                    address(_msgSender()) == address(holder)
            );
        } else {
            require(
                address(_msgSender()) == address(locker)
            );
        }
        if (uint256(amount) > uint256(token.balanceOf(address(this)))) {
            amount = token.balanceOf(address(this));
        }
        token.safeTransfer(recipient, amount);
        success = true;
        return success;
    }

    function ETH_transferTo(address payable recipient, uint256 amount)
        external
        payable
        override
        returns (bool success)
    {
        if (block.timestamp >= unlock_time) {
            require(
                address(_msgSender()) == address(locker) ||
                    address(_msgSender()) == address(holder)
            );
        } else {
            require(
                address(_msgSender()) == address(locker)
            );
        }
        if (uint256(amount) > uint256(address(this).balance)) {
            amount = address(this).balance;
        }
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent);
        success = true;
    }

    /**
     *  @notice The token name and symbol are upgradeable in case of rebranding.
     */
    function setTokenNameAndSymbol(string memory name, string memory symbol)
        public
    {
        if (address(_msgSender()) == address(holder)) {
            _name = name;
            _symbol = symbol;
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
                uint256(iSHARD.balanceOf(holders[i])) >=
                uint256(
                    (uint256(iSHARD.totalSupply()) * uint256(5100)) /
                        uint256(10000)
                )
            ) {
                if (address(holders[i]) != address(holder)) {
                    if (uint256(block.timestamp) > uint256(grace)) {
                        transferHolder(holders[i]);
                    }
                }
            }
        }
        super._transfer(from, to, amount);
    }

    /**
     *  @notice Transfer the holder address to a new address, only callable by locker.
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
                holder = new_holder;
                holders.push(new_holder);
                grace = block.timestamp + 10 minutes;
                _mint(new_holder, iSHARD.totalSupply());
                transferOwnership(new_holder);
                _burn(prev_holder, uint256(iSHARD.balanceOf(prev_holder)));
            } else {
                if (
                    uint256(iSHARD.balanceOf(new_holder)) >=
                    uint256(
                        (uint256(iSHARD.totalSupply()) * uint256(5100)) /
                            uint256(10000)
                    )
                ) {
                    holder = new_holder;
                    holders.push(new_holder);
                    grace = block.timestamp + 24 hours;
                    transferOwnership(new_holder);
                }
            }
            emit HolderTransferred(prev_holder, new_holder);
        }
        return true;
    }
}
