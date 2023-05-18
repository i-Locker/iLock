import { useCombinedActiveList } from "../state/lists/hooks";
import { Token } from "@uniswap/sdk-core";
import { useUserAddedTokens } from "../state/user/hooks";
import { useActiveWeb3React } from "../utils/hooks/useActiveWeb3React";
import { useState, useEffect, useMemo } from "react";
import { isAddress } from "../utils";
import { getERC20Token } from "../utils/utilsFunctions";
import { useNativeBalance } from "../utils/hooks/useBalances";
import { useCombinedInactiveList } from "../state/lists/hooks";
import { DEFAULT_CHAIN_ID, network_symbols, network_dec_to_hex } from "../constants";
import { useSelector } from "react-redux";
export function useTokensFromMap(tokenMap, includeUserAdded) {
    const { chainId, account } = useActiveWeb3React();
    const ChainId = useSelector((state) => state.chainId.chainId);
    const userAddedTokens = useUserAddedTokens();
    return useMemo(() => {
        if (!ChainId) {
            return {};
        };
        const mapWithoutUrls = Object.keys(tokenMap[ChainId] ? tokenMap[ChainId] : {}).reduce((newMap, address) => {
            newMap[address] = tokenMap[ChainId][address].token;
            return newMap;
        }, {});
        if (includeUserAdded && account) {
            return (userAddedTokens
                .reduce((tokenMap, token) => {
                    tokenMap[token.address] = token;
                    return tokenMap;
                }, { ...mapWithoutUrls }));
        };
        return mapWithoutUrls;
    }, [ChainId, tokenMap, includeUserAdded]);
};
export function useAllTokens() {
    const allTokens = useCombinedActiveList();
    return useTokensFromMap(allTokens, true);
};
export const ExtendedEther = (chainId = 56, symbol, name, logo) => {
    let native = {
        chainId: chainId,
        decimals: 18,
        isNative: true,
        isToken: false,
        name,
        symbol,
        logoURI: logo,
    };
    return native;
};
export function useIsTokenActive(token) {
    const activeTokens = useAllTokens();
    if (!activeTokens || !token) {
        return false;
    }
    return !!activeTokens[token.address];
};
export function useAllInactiveTokens() {
    const inactiveTokensMap = useCombinedInactiveList();
    const inactiveTokens = useTokensFromMap(inactiveTokensMap, false);
    const activeTokensAddresses = Object.keys(useAllTokens());
    const filteredInactive = activeTokensAddresses ?
        Object.keys(inactiveTokens).reduce((newMap, address) => {
            if (!activeTokensAddresses.includes(address)) {
                newMap[address] = inactiveTokens[address];
            }
            return newMap;
        }, {}) :
        inactiveTokens;
    return filteredInactive;
};
export function useIsUserAddedToken(currency) {
    const userAddedTokens = useUserAddedTokens();
    if (!currency) {
        return false;
    }
    return !!userAddedTokens.find((token) => {
        if (token && currency && !currency.isNative) {
            return currency.address === token.address &&
                currency.chainId === token.chainId ?
                true :
                false;
        }
    });
};
export function useToken(tokenAddress) {
    const { chainId, library } = useActiveWeb3React();
    const tokens = useAllTokens();
    const [token, setToken] = useState();
    useEffect(() => {
        const getToken = async (tokenAddress, chainId) => {
            const address = isAddress(tokenAddress);
            const token = address ? tokens[address] : undefined;
            try {
                if (token) {
                    setToken(token);
                } else if (!chainId || !address) {
                    setToken(undefined);
                };
                if (address && !tokens[address]) {
                    const tokenContract = await getERC20Token(address, library);
                    const name = await tokenContract.name();
                    const tokenDecimal = await tokenContract.decimals();
                    const tokenSymbol = await tokenContract.symbol();
                    if(tokenDecimal&&tokenSymbol&&name) {
                        console.log("Token found: ",chainId, address, tokenDecimal, tokenSymbol, name);
                        try {
                            let newToken = new Token(chainId, address, tokenDecimal, tokenSymbol, name);
                            setToken(newToken);
                        } catch(e) {
                            console.log("e: ",e);
                        };
                    };
                };
            } catch (e) {
                console.log("no Token found");
            };
        };
        getToken(tokenAddress, chainId ? chainId : DEFAULT_CHAIN_ID);
    }, [tokenAddress, chainId, DEFAULT_CHAIN_ID]);
    return token;
};
export function useCurrency(currencyId) {
    const [, Symbol, Name, Logo] = useNativeBalance();
    const { chainId } = useActiveWeb3React();
    let chain_id;
    if(isNaN(chainId)) {
        // handle as hex
        chain_id = network_symbols[network_dec_to_hex[chainId]];
    } else {
        // handle as int
        chain_id = network_symbols[chainId];
    }
    const isNative = currencyId.toUpperCase() === Symbol;
    const token = useToken(isNative ? chain_id : currencyId);
    return isNative ?
        chainId && ExtendedEther(chainId, Symbol, Name, Logo) :
        token;
};