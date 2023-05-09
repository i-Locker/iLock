import { CHAIN_ID_ACALA, CHAIN_ID_KARURA, CHAIN_ID_SOLANA, isEVMChain, } from "@certusone/wormhole-sdk";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
/*
 * Attest
 */
export const selectAttestActiveStep = (state) => state.attest.activeStep;
export const selectAttestSourceChain = (state) => state.attest.sourceChain;
export const selectAttestSourceAsset = (state) => state.attest.sourceAsset;
export const selectAttestTargetChain = (state) => state.attest.targetChain;
export const selectAttestAttestTx = (state) => state.attest.attestTx;
export const selectAttestSignedVAAHex = (state) => state.attest.signedVAAHex;
export const selectAttestIsSending = (state) => state.attest.isSending;
export const selectAttestIsCreating = (state) => state.attest.isCreating;
export const selectAttestCreateTx = (state) => state.attest.createTx;
export const selectAttestIsSourceComplete = (state) => !!state.attest.sourceChain && !!state.attest.sourceAsset;
// TODO: check wrapped asset exists or is native attest
export const selectAttestIsTargetComplete = (state) => selectAttestIsSourceComplete(state) && !!state.attest.targetChain;
export const selectAttestIsSendComplete = (state) => !!selectAttestSignedVAAHex(state);
export const selectAttestIsCreateComplete = (state) => !!selectAttestCreateTx(state);
export const selectAttestShouldLockFields = (state) => selectAttestIsSending(state) || selectAttestIsSendComplete(state);
/*
 * NFT
 */
export const selectNFTActiveStep = (state) => state.nft.activeStep;
export const selectNFTSourceChain = (state) => state.nft.sourceChain;
export const selectNFTSourceAsset = (state) => {
    return state.nft.sourceParsedTokenAccount?.mintKey || undefined;
};
export const selectNFTIsSourceAssetWormholeWrapped = (state) => state.nft.isSourceAssetWormholeWrapped;
export const selectNFTOriginChain = (state) => state.nft.originChain;
export const selectNFTOriginAsset = (state) => state.nft.originAsset;
export const selectNFTOriginTokenId = (state) => state.nft.originTokenId;
export const selectNFTSourceWalletAddress = (state) => state.nft.sourceWalletAddress;
export const selectNFTSourceParsedTokenAccount = (state) => state.nft.sourceParsedTokenAccount;
export const selectNFTSourceParsedTokenAccounts = (state) => state.nft.sourceParsedTokenAccounts;
export const selectNFTSourceBalanceString = (state) => state.nft.sourceParsedTokenAccount?.uiAmountString || "";
export const selectNFTTargetChain = (state) => state.nft.targetChain;
export const selectNFTTargetAddressHex = (state) => state.nft.targetAddressHex;
export const selectNFTTargetAsset = (state) => state.nft.targetAsset.data?.address;
export const selectNFTTransferTx = (state) => state.nft.transferTx;
export const selectNFTSignedVAAHex = (state) => state.nft.signedVAAHex;
export const selectNFTIsSending = (state) => state.nft.isSending;
export const selectNFTIsRedeeming = (state) => state.nft.isRedeeming;
export const selectNFTRedeemTx = (state) => state.nft.redeemTx;
export const selectNFTSourceError = (state) => {
    if (!state.nft.sourceChain) {
        return "Select a source chain";
    }
    if (!state.nft.sourceParsedTokenAccount) {
        return "Select an NFT";
    }
    if (state.nft.sourceChain === CHAIN_ID_SOLANA &&
        !state.nft.sourceParsedTokenAccount.publicKey) {
        return "Token account unavailable";
    }
    if (!state.nft.sourceParsedTokenAccount.uiAmountString) {
        return "Token amount unavailable";
    }
    if (state.nft.sourceParsedTokenAccount.decimals !== 0) {
        // TODO: more advanced NFT check - also check supply and uri
        return "For non-NFTs, use the Transfer flow";
    }
    if (state.nft.sourceParsedTokenAccount?.uri === null ||
        state.nft.sourceParsedTokenAccount?.uri === undefined) {
        return "Failed to load NFT Metadata.";
    }
    if (state.nft.sourceParsedTokenAccount?.uri &&
        state.nft.sourceParsedTokenAccount?.uri.length > 200) {
        return "This NFT has a URL longer than the maximum supported length of 200.";
    }
    try {
        // these may trigger error: fractional component exceeds decimals
        if (parseUnits(state.nft.sourceParsedTokenAccount.uiAmountString, state.nft.sourceParsedTokenAccount.decimals).lte(0)) {
            return "Balance must be greater than zero";
        }
    }
    catch (e) {
        if (e?.message) {
            return e.message.substring(0, e.message.indexOf("("));
        }
        return "Invalid amount";
    }
    return undefined;
};
export const selectNFTIsSourceComplete = (state) => !selectNFTSourceError(state);
export const selectNFTTargetError = (state) => {
    const sourceError = selectNFTSourceError(state);
    if (sourceError) {
        return `Error in source: ${sourceError}`;
    }
    if (!state.nft.targetChain) {
        return "Select a target chain";
    }
    if (state.nft.sourceChain === state.nft.targetChain) {
        return "Select a different target and source";
    }
    if (state.nft.targetChain === CHAIN_ID_SOLANA &&
        !selectNFTTargetAsset(state)) {
        // target asset is only required for solana
        // in the cases of new transfers, target asset will not exist and be created on redeem
        // Solana requires the derived address to derive the associated token account which is the target on the vaa
        return UNREGISTERED_ERROR_MESSAGE;
    }
    if (!state.nft.targetAddressHex) {
        return "Target account unavailable";
    }
};
export const selectNFTIsTargetComplete = (state) => !selectNFTTargetError(state);
export const selectNFTIsSendComplete = (state) => !!selectNFTSignedVAAHex(state);
export const selectNFTIsRedeemComplete = (state) => !!selectNFTRedeemTx(state);
export const selectNFTShouldLockFields = (state) => selectNFTIsSending(state) || selectNFTIsSendComplete(state);
export const selectNFTIsRecovery = (state) => state.nft.isRecovery;
/*
 * Transfer
 */
export const selectTransferActiveStep = (state) => state.transfer.activeStep;
export const selectTransferSourceChain = (state) => state.transfer.sourceChain;
export const selectTransferSourceAsset = (state) => {
    return state.transfer.sourceParsedTokenAccount?.mintKey || undefined;
};
export const selectTransferIsSourceAssetWormholeWrapped = (state) => state.transfer.isSourceAssetWormholeWrapped;
export const selectTransferOriginChain = (state) => state.transfer.originChain;
export const selectTransferOriginAsset = (state) => state.transfer.originAsset;
export const selectSourceWalletAddress = (state) => state.transfer.sourceWalletAddress;
export const selectTransferSourceParsedTokenAccount = (state) => state.transfer.sourceParsedTokenAccount;
export const selectTransferSourceParsedTokenAccounts = (state) => state.transfer.sourceParsedTokenAccounts;
export const selectTransferSourceBalanceString = (state) => state.transfer.sourceParsedTokenAccount?.uiAmountString || "";
export const selectTransferAmount = (state) => state.transfer.amount;
export const selectTransferTargetChain = (state) => state.transfer.targetChain;
export const selectTransferTargetAddressHex = (state) => state.transfer.targetAddressHex;
export const selectTransferTargetAssetWrapper = (state) => state.transfer.targetAsset;
export const selectTransferTargetAsset = (state) => state.transfer.targetAsset.data?.address;
export const selectTransferTargetParsedTokenAccount = (state) => state.transfer.targetParsedTokenAccount;
export const selectTransferTargetBalanceString = (state) => state.transfer.targetParsedTokenAccount?.uiAmountString || "";
export const selectTransferTransferTx = (state) => state.transfer.transferTx;
export const selectTransferSignedVAAHex = (state) => state.transfer.signedVAAHex;
export const selectTransferIsVAAPending = (state) => state.transfer.isVAAPending;
export const selectTransferIsSending = (state) => state.transfer.isSending;
export const selectTransferIsRedeeming = (state) => state.transfer.isRedeeming;
export const selectTransferRedeemTx = (state) => state.transfer.redeemTx;
export const selectTransferIsApproving = (state) => state.transfer.isApproving;
export const selectTransferSourceError = (state) => {
    if (!state.transfer.sourceChain) {
        return "Select a source chain";
    }
    if (!state.transfer.sourceParsedTokenAccount) {
        return "Select a token";
    }
    if (!state.transfer.amount) {
        return "Enter an amount";
    }
    if (state.transfer.sourceChain === CHAIN_ID_SOLANA &&
        !state.transfer.sourceParsedTokenAccount.publicKey) {
        return "Token account unavailable";
    }
    if (!state.transfer.sourceParsedTokenAccount.uiAmountString) {
        return "Token amount unavailable";
    }
    // no NFT check - NFTs should be blocked by all token pickers
    try {
        // these may trigger error: fractional component exceeds decimals
        if (parseUnits(state.transfer.amount, state.transfer.sourceParsedTokenAccount.decimals).lte(0)) {
            return "Amount must be greater than zero";
        }
        if (parseUnits(state.transfer.amount, state.transfer.sourceParsedTokenAccount.decimals).gt(parseUnits(state.transfer.sourceParsedTokenAccount.uiAmountString, state.transfer.sourceParsedTokenAccount.decimals))) {
            return "Amount may not be greater than balance";
        }
    }
    catch (e) {
        if (e?.message) {
            return e.message.substring(0, e.message.indexOf("("));
        }
        return "Invalid amount";
    }
    return undefined;
};
export const selectTransferIsSourceComplete = (state) => !selectTransferSourceError(state);
export const UNREGISTERED_ERROR_MESSAGE = "Target asset unavailable. Is the token registered?";
export const selectTransferTargetError = (state) => {
    const sourceError = selectTransferSourceError(state);
    if (sourceError) {
        return `Error in source: ${sourceError}`;
    }
    if (!state.transfer.targetChain) {
        return "Select a target chain";
    }
    if (state.transfer.sourceChain === state.transfer.targetChain) {
        return "Select a different target and source";
    }
    if (!selectTransferTargetAsset(state)) {
        return UNREGISTERED_ERROR_MESSAGE;
    }
    if (isEVMChain(state.transfer.targetChain) &&
        selectTransferTargetAsset(state) === ethers.constants.AddressZero) {
        return UNREGISTERED_ERROR_MESSAGE;
    }
    if (!state.transfer.targetAddressHex) {
        return "Target account unavailable";
    }
    if (state.transfer.useRelayer &&
        state.transfer.relayerFee === undefined &&
        // Acala offers relaying without a fee for qualified tokens
        state.transfer.targetChain !== CHAIN_ID_ACALA &&
        state.transfer.targetChain !== CHAIN_ID_KARURA) {
        return "Invalid relayer fee.";
    }
    if (state.transfer.useRelayer &&
        (state.transfer.targetChain === CHAIN_ID_ACALA ||
            state.transfer.targetChain === CHAIN_ID_KARURA) &&
        !state.transfer.acalaRelayerInfo.data?.shouldRelay) {
        return "Token is ineligible for relay.";
    }
    if (state.transfer.relayerFee && state.transfer.sourceParsedTokenAccount) {
        try {
            // these may trigger error: fractional component exceeds decimals
            if (parseUnits(state.transfer.amount, state.transfer.sourceParsedTokenAccount.decimals)
                .add(parseUnits(state.transfer.relayerFee.toString(), state.transfer.sourceParsedTokenAccount.decimals))
                .gt(parseUnits(state.transfer.sourceParsedTokenAccount.uiAmountString, state.transfer.sourceParsedTokenAccount.decimals))) {
                return "The amount being transferred plus fees exceeds the wallet's balance.";
            }
        }
        catch (e) {
            if (e?.message) {
                return e.message.substring(0, e.message.indexOf("("));
            }
            return "Invalid amount";
        }
    }
};
export const selectTransferIsTargetComplete = (state) => !selectTransferTargetError(state);
export const selectTransferIsSendComplete = (state) => !!selectTransferSignedVAAHex(state);
export const selectTransferIsRedeemComplete = (state) => !!selectTransferRedeemTx(state);
export const selectTransferShouldLockFields = (state) => selectTransferIsSending(state) || selectTransferIsSendComplete(state);
export const selectTransferIsRecovery = (state) => state.transfer.isRecovery;
export const selectTransferGasPrice = (state) => state.transfer.gasPrice;
export const selectTransferUseRelayer = (state) => state.transfer.useRelayer;
export const selectTransferRelayerFee = (state) => state.transfer.relayerFee;
export const selectAcalaRelayerInfo = (state) => state.transfer.acalaRelayerInfo;
export const selectSolanaTokenMap = (state) => {
    return state.tokens.solanaTokenMap;
};
export const selectTerraTokenMap = (state) => {
    return state.tokens.terraTokenMap;
};
export const selectTerraFeeDenom = (state) => {
    return state.fee.terraFeeDenom;
};
export const selectRelayerTokenInfo = (state) => {
    return state.tokens.relayerTokenInfo;
};
