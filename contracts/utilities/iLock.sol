// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;
import "../token/ERC20.sol";

interface IHOLD {
    event HolderTransferred(
        address indexed prev_holder,
        address indexed new_holder
    );
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
    event SwapTokenToETH(
        address caller,
        address indexed destination,
        address indexed origin,
        uint256 liquidity
    );

    event SwapETHToToken(
        address caller,
        address indexed destination,
        address indexed origin,
        uint256 liquidity
    );

    function swapETH_to_TOKEN(
        address payable recipient,
        address payable token,
        uint256 amount
    ) external payable returns (bool success);

    function swapTOKEN_to_ETH(
        address payable recipient,
        address payable token,
        uint256 amount
    ) external payable returns (bool success);

    function transferTo(
        IERC20 token,
        address payable recipient,
        uint256 amount,
        uint256 id
    ) external returns (bool success);

    function ETH_transferTo(
        address payable recipient,
        uint256 amount,
        uint256 id
    ) external payable returns (bool success);

    function transferHolder(address payable new_holder) external returns (bool);
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
 * @title Interchained's iLock contracts
 * @notice Community FOSS R&D supported by Kekchain, FrenChain, Electronero Network, Crystaleum
 * @author Interchained && Lucas && Decentral && Muse
 */
contract iLock is ERC20, Ownable {
    using SafeERC20 for IERC20;

    constructor(
        string memory name,
        string memory symbol,
        address payable _depositors
    ) ERC20(name, symbol) Ownable() {
        _name = name;
        _symbol = symbol;
        emit OwnershipTransferred(address(0), _depositors);
    }

    receive() external payable virtual override {}

    fallback() external payable virtual override {}

    function Mint(address payable holder, uint256 supply) public virtual {
        bool whale = IERC20(address(this)).balanceOf(_msgSender()) >=
            (uint256(5100) * uint256(IERC20(address(this)).totalSupply())) /
                uint256(10000);
        require(whale);
        _mint(holder, supply);
    }

    function Burn(uint256 supply) public virtual onlyOwner {
        _burn(_msgSender(), supply);
    }

    function BurnFrom(address from, uint256 supply) public virtual onlyOwner {
        _burn(from, supply);
    }
}