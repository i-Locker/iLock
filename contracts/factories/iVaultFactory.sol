// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.13;
import "../p2p/bridge/iVault.sol";

contract iVault_Factory is iAuth, I_iVAULT {
    mapping(uint256 => address) private vaultMap;

    address private MoV;
    address payable private iVip;

    uint256 private receiverCount = 0;

    constructor(address payable ops)
        payable
        iAuth(
            address(_msgSender()),
            address(ops),
            address(0x4362eeD9fd20fA25251d040B0489a784d91Ec8B5)
        )
    {
        address payable VIP = deployVaults(uint256(1));
        iVip = VIP;
    }

    receive() external payable {}

    fallback() external payable {}

    function deployVaults(uint256 number)
        public
        payable
        override
        returns (address payable)
    {
        uint256 i = 0;
        address payable vault;
        while (uint256(i) <= uint256(number)) {
            i++;
            vaultMap[receiverCount + i] = address(new iVault(address(this)));
            if (uint256(i) == uint256(number)) {
                vault = payable(vaultMap[receiverCount + number]);
                receiverCount += number;
                break;
            }
        }
        return vault;
    }

    function safeAddr(address wallet_) private pure returns (bool) {
        if (uint160(address(wallet_)) > 0) {
            return true;
        } else {
            return false;
        }
    }

    function walletOfIndex(uint256 id) public view returns (address) {
        return address(vaultMap[id]);
    }

    function indexOfWallet(address wallet) public view returns (uint256) {
        uint256 n = 0;
        while (uint256(n) <= uint256(receiverCount)) {
            n++;
            if (address(vaultMap[n]) == address(wallet)) {
                break;
            }
        }
        return uint256(n);
    }

    function emergencyWithdrawEther()
        public
    {
        (bool sent, ) = iVip.call{value: address(this).balance}("");
        require(sent);
    }

    function setVIP(
        address payable iTOKEN,
        address payable iWETH,
        bool tokenFee,
        uint256 tFee,
        uint256 tkFee,
        uint256 bMaxAmt,
        uint256 index
    ) public virtual authorized {
        IRECEIVE_TOKEN(iVip).setShards(
            iTOKEN,
            iWETH,
            uint256(8000),
            tokenFee,
            tFee,
            tkFee,
            bMaxAmt,
            index
        );
    }
}
