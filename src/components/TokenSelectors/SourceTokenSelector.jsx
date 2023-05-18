import { CHAIN_ID_ALGORAND, CHAIN_ID_APTOS, CHAIN_ID_INJECTIVE, CHAIN_ID_NEAR, CHAIN_ID_SEI, CHAIN_ID_SOLANA, CHAIN_ID_SUI, CHAIN_ID_XPLA, isEVMChain, isTerraChain, } from "@certusone/wormhole-sdk";
import { TextField, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetSourceParsedTokens from "../../hooks/useGetSourceParsedTokenAccounts";
import useIsWalletReady from "../../hooks/useIsWalletReady";
import { selectTransferSourceChain, selectTransferSourceParsedTokenAccount, } from "../../store/selectors";
import { setSourceParsedTokenAccount as setTransferSourceParsedTokenAccount, setSourceWalletAddress as setTransferSourceWalletAddress, } from "../../store/transferSlice";
import EvmTokenPicker from "./EvmTokenPicker";
import RefreshButtonWrapper from "./RefreshButtonWrapper";
export const TokenSelector = (props) => {
    const { disabled, nft } = props;
    const dispatch = useDispatch();
    const lookupChain = selectTransferSourceChain;
    const sourceParsedTokenAccount = useSelector(selectTransferSourceParsedTokenAccount);
    const walletIsReady = useIsWalletReady(lookupChain);
    const setSourceParsedTokenAccount = setTransferSourceParsedTokenAccount;
    const setSourceWalletAddress = setTransferSourceWalletAddress;
    const handleOnChange = useCallback((newTokenAccount) => {
        if (!newTokenAccount) {
            dispatch(setSourceParsedTokenAccount(undefined));
            dispatch(setSourceWalletAddress(undefined));
        }
        else if (newTokenAccount !== undefined && walletIsReady.walletAddress) {
            dispatch(setSourceParsedTokenAccount(newTokenAccount));
            dispatch(setSourceWalletAddress(walletIsReady.walletAddress));
        }
    }, [
        dispatch,
        walletIsReady,
        setSourceParsedTokenAccount,
        setSourceWalletAddress,
    ]);
    const maps = useGetSourceParsedTokens(nft);
    const resetAccountWrapper = maps?.resetAccounts || (() => { }); //This should never happen.
    //This is only for errors so bad that we shouldn't even mount the component
    const fatalError = !isEVMChain(lookupChain) &&
        !isTerraChain(lookupChain) &&
        maps?.tokenAccounts?.error; //Terra & EVM chains can proceed because they have advanced mode
    const content = fatalError ? (<RefreshButtonWrapper callback={resetAccountWrapper}>
      <Typography>{fatalError}</Typography>
    </RefreshButtonWrapper>) : isEVMChain(lookupChain) ? (<EvmTokenPicker value={sourceParsedTokenAccount || null} disabled={disabled} onChange={handleOnChange} tokenAccounts={maps?.tokenAccounts} resetAccounts={maps?.resetAccounts} chainId={lookupChain} nft={nft}/>) 
    : isTerraChain(lookupChain) ? (<TerraTokenPicker value={sourceParsedTokenAccount || null} disabled={disabled} onChange={handleOnChange} resetAccounts={maps?.resetAccounts} tokenAccounts={maps?.tokenAccounts} chainId={lookupChain}/>) : (<TextField variant="outlined" placeholder="Asset" fullWidth value={"Not Implemented"} disabled={true}/>);
    return <div>{content}</div>;
};
