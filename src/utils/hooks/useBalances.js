import { useEffect, useState } from "react";
import { getERC20Token } from "../utilsFunctions";
import { ethers } from "ethers";
import { SupportedChainSymbols, SupportedChainLogo, SupportedChainName, } from "../constants/chains";
import { RGPADDRESSES } from "../addresses";
import { useSelector } from "react-redux";
import { useActiveWeb3React } from "./useActiveWeb3React";
export const useNativeBalance = () => {
    const { account, chainId, library } = useActiveWeb3React();
    const [Balance, setBalance] = useState("");
    const [Symbol, setSymbol] = useState(SupportedChainSymbols[56]);
    const [Name, setName] = useState(SupportedChainName[56]);
    const [Logo, setLogo] = useState(SupportedChainLogo[56]);
    const reloadBalance = localStorage.getItem("reload");
    const trxState = useSelector((state) => state.application.modal?.trxState);
    const refresh = useSelector((state) => state.application.refresh);
    const stateChanged = trxState === 2;
    useEffect(() => {
        const getBalance = async () => {
            if (account && chainId) {
                try {
                    console.log("refresh");
                    const balance = await library?.getBalance(account);
                    setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
                    setSymbol(SupportedChainSymbols[chainId]);
                    setName(SupportedChainName[chainId]);
                    setLogo(SupportedChainLogo[chainId]);
                }
                catch (err) {
                    console.log(err);
                    if (!reloadBalance) {
                        window.location.reload();
                        localStorage.setItem("reload", "true");
                    }
                }
            }
        };
        getBalance();
    }, [account, library, chainId, stateChanged, refresh]);
    return [Balance, Symbol, Name, Logo];
};
export const useRGPBalance = () => {
    const { chainId, account, library } = useActiveWeb3React();
    const [RGPBalance, setRGPBalance] = useState("");
    const trxState = useSelector((state) => state.application.modal?.trxState);
    const refresh = useSelector((state) => state.application.refresh);
    const stateChanged = trxState === 2;
    useEffect(() => {
        const getBalance = async () => {
            if (account) {
                try {
                    const token = await getERC20Token(RGPADDRESSES[chainId], library);
                    const balance = await token.balanceOf(account);
                    setRGPBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
                }
                catch (err) {
                    setRGPBalance("");
                    console.log(err, "iruruuru");
                }
            }
        };
        getBalance();
    }, [account, chainId, stateChanged, refresh]);
    return [RGPBalance];
};
export const useTokenBalance = (address) => {
    const [balance, setBalance] = useState("");
    const { library } = useActiveWeb3React();
    useEffect(() => {
        const getTokenAmount = async (tokenAddress) => {
            try {
                const balance = await library?.getBalance(tokenAddress);
                setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
            }
            catch (err) {
                console.log(err);
                return 0;
            }
        };
        getTokenAmount(address);
    }, [address]);
    return [balance];
};
export const getTokenAmount = async (tokenAddress, library) => {
    try {
        const balance = await library?.getBalance(tokenAddress);
        return parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};
