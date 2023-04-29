import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../index';
import { updateUserSlippageTolerance, updateUserDeadline, } from '../actions';
import { Token } from '@uniswap/sdk-core';
import { useActiveWeb3React } from '../../../utils/hooks/useActiveWeb3React';
import { addSerializedToken, removeSerializedToken } from '../actions';
export function useUserSlippageTolerance() {
    const dispatch = useDispatch();
    const userSlippageTolerance = useSelector((state) => {
        return state.user.userSlippageTolerance;
    });
    const setUserSlippageTolerance = useCallback((slippage) => {
        dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }));
    }, [dispatch]);
    return [userSlippageTolerance, setUserSlippageTolerance];
}
function serializeToken(token) {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
    };
}
function deserializeToken(serializedToken) {
    return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}
export function useAddUserToken() {
    const dispatch = useDispatch();
    return useCallback((token) => {
        dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    }, [dispatch]);
}
export function useUserAddedTokens() {
    const { chainId } = useActiveWeb3React();
    const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens);
    return useMemo(() => {
        if (!chainId)
            return [];
        return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken);
    }, [serializedTokensMap, chainId]);
}
export function useRemoveUserAddedToken() {
    const dispatch = useDispatch();
    return useCallback((chainId, address) => {
        dispatch(removeSerializedToken({ chainId, address }));
    }, [dispatch]);
}
export function useUserTransactionTTL() {
    const dispatch = useDispatch();
    const userDeadline = useSelector((state) => {
        return state.user.userDeadline;
    });
    const setUserDeadline = useCallback((deadline) => {
        dispatch(updateUserDeadline({ userDeadline: deadline }));
    }, [dispatch]);
    return [userDeadline, setUserDeadline];
}
