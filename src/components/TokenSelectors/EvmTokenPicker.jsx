import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useEthereumProvider } from "../../contexts/EthereumProviderContext";
import useIsWalletReady from "../../hooks/useIsWalletReady";
import { selectNFTSourceParsedTokenAccount, selectTransferSourceParsedTokenAccount, } from "../../store/selectors";
import { ethNFTToNFTParsedTokenAccount, ethTokenToParsedTokenAccount, getEthereumNFT, getEthereumToken, isValidEthereumAddress, } from "../../utils/ethereum";
import TokenPicker, { BasicAccountRender } from "./TokenPicker";
export default function EvmTokenPicker(props) {
    const { value, onChange, tokenAccounts, disabled, resetAccounts, chainId, nft, } = props;
    const { provider, signerAddress } = useEthereumProvider();
    const { isReady } = useIsWalletReady(chainId);
    const selectedTokenAccount = useSelector(nft
        ? selectNFTSourceParsedTokenAccount
        : selectTransferSourceParsedTokenAccount);
    const shouldDisplayBalance = useCallback((tokenAccount) => {
        const selectedMintMatch = selectedTokenAccount &&
            selectedTokenAccount.mintKey.toLowerCase() ===
                tokenAccount.mintKey.toLowerCase();
        //added just in case we start displaying NFT balances again.
        const selectedTokenIdMatch = selectedTokenAccount &&
            selectedTokenAccount.tokenId === tokenAccount.tokenId;
        return !!(tokenAccount.isNativeAsset || //The native asset amount isn't taken from covalent, so can be trusted.
            (selectedMintMatch && selectedTokenIdMatch));
    }, [selectedTokenAccount]);
    const getAddress = useCallback(async (address, tokenId) => {
        if (provider && signerAddress && isReady) {
            try {
                const tokenAccount = await (nft
                    ? getEthereumNFT(address, provider)
                    : getEthereumToken(address, provider));
                if (!tokenAccount) {
                    return Promise.reject("Could not find the specified token.");
                }
                if (nft && !tokenId) {
                    return Promise.reject("Token ID is required.");
                }
                else if (nft && tokenId) {
                    return ethNFTToNFTParsedTokenAccount(tokenAccount, tokenId, signerAddress);
                }
                else {
                    return ethTokenToParsedTokenAccount(tokenAccount, signerAddress);
                }
            }
            catch (e) {
                return Promise.reject("Unable to retrive the specific token.");
            }
        }
        else {
            return Promise.reject({ error: "Wallet is not connected." });
        }
    }, [isReady, nft, provider, signerAddress]);
    const onChangeWrapper = useCallback(async (account) => {
        if (account === null) {
            onChange(null);
            return Promise.resolve();
        }
        onChange(account);
        return Promise.resolve();
    }, [onChange]);
    const RenderComp = useCallback(({ account }) => {
        return BasicAccountRender(account, nft || false, shouldDisplayBalance);
    }, [nft, shouldDisplayBalance]);
    return (<TokenPicker value={value} options={tokenAccounts?.data || []} RenderOption={RenderComp} useTokenId={nft} onChange={onChangeWrapper} isValidAddress={isValidEthereumAddress} getAddress={getAddress} disabled={disabled} resetAccounts={resetAccounts} error={""} showLoader={tokenAccounts?.isFetching} nft={nft || false} chainId={chainId}/>);
}
