import { CHAIN_ID_ALGORAND, CHAIN_ID_APTOS, CHAIN_ID_INJECTIVE, CHAIN_ID_NEAR, CHAIN_ID_SOLANA, CHAIN_ID_TERRA2, CHAIN_ID_XPLA, isEVMChain, isTerraChain, CHAIN_ID_SEI, CHAIN_ID_SUI, } from "@certusone/wormhole-sdk";
import { useMemo } from "react";
import { getEmptyDataWrapper } from "../store/helpers";
import useAlgoMetadata from "./useAlgoMetadata";
import useAptosMetadata from "./useAptosMetadata";
import useEvmMetadata from "./useEvmMetadata";
import useInjectiveMetadata from "./useInjectiveMetadata";
import useMetaplexData from "./useMetaplexData";
import useNearMetadata from "./useNearMetadata";
import useSolanaTokenMap from "./useSolanaTokenMap";
import useTerraMetadata from "./useTerraMetadata";
import useTerraTokenMap from "./useTerraTokenMap";
import useXplaMetadata from "./useXplaMetadata";
import useSeiMetadata from "./useSeiMetadata";
import useSuiMetadata from "./useSuiMetadata";
const constructSolanaMetadata = (addresses, solanaTokenMap, metaplexData) => {
    const isFetching = solanaTokenMap.isFetching || metaplexData?.isFetching;
    const error = solanaTokenMap.error || metaplexData?.isFetching;
    const receivedAt = solanaTokenMap.receivedAt && metaplexData?.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const metaplex = metaplexData?.data?.get(address);
        const tokenInfo = solanaTokenMap.data?.find((x) => x.address === address);
        //Both this and the token picker, at present, give priority to the tokenmap
        const obj = {
            symbol: metaplex?.data?.symbol || tokenInfo?.symbol || undefined,
            logo: tokenInfo?.logoURI || undefined,
            tokenName: metaplex?.data?.name || tokenInfo?.name || undefined,
            decimals: tokenInfo?.decimals || undefined,
            raw: metaplex,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructTerraMetadata = (addresses, tokenMap, terraMetadata, chainId) => {
    const isFetching = tokenMap.isFetching || terraMetadata.isFetching;
    const error = tokenMap.error || terraMetadata.error;
    const receivedAt = tokenMap.receivedAt && terraMetadata.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const metadata = terraMetadata.data?.get(address);
        const tokenInfo = chainId === CHAIN_ID_TERRA2
            ? tokenMap.data?.mainnet[address]
            : tokenMap.data?.classic[address];
        const obj = {
            symbol: tokenInfo?.symbol || metadata?.symbol || undefined,
            logo: tokenInfo?.icon || metadata?.logo || undefined,
            tokenName: tokenInfo?.name || metadata?.tokenName || undefined,
            decimals: metadata?.decimals || undefined,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructXplaMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructEthMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: meta?.logo || undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructAlgoMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructAptosMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructInjectiveMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructSeiMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
const constructSuiMetadata = (addresses, metadataMap) => {
    const isFetching = metadataMap.isFetching;
    const error = metadataMap.error;
    const receivedAt = metadataMap.receivedAt;
    const data = new Map();
    addresses.forEach((address) => {
        const meta = metadataMap.data?.get(address);
        const obj = {
            symbol: meta?.symbol || undefined,
            logo: undefined,
            tokenName: meta?.tokenName || undefined,
            decimals: meta?.decimals,
        };
        data.set(address, obj);
    });
    return {
        isFetching,
        error,
        receivedAt,
        data,
    };
};
export default function useMetadata(chainId, addresses) {
    const terraTokenMap = useTerraTokenMap(isTerraChain(chainId));
    const solanaTokenMap = useSolanaTokenMap();
    const solanaAddresses = useMemo(() => {
        return chainId === CHAIN_ID_SOLANA ? addresses : [];
    }, [chainId, addresses]);
    const terraAddresses = useMemo(() => {
        return isTerraChain(chainId) ? addresses : [];
    }, [chainId, addresses]);
    const xplaAddresses = useMemo(() => {
        return chainId === CHAIN_ID_XPLA ? addresses : [];
    }, [chainId, addresses]);
    const ethereumAddresses = useMemo(() => {
        return isEVMChain(chainId) ? addresses : [];
    }, [chainId, addresses]);
    const algoAddresses = useMemo(() => {
        return chainId === CHAIN_ID_ALGORAND ? addresses : [];
    }, [chainId, addresses]);
    const aptosAddresses = useMemo(() => {
        return chainId === CHAIN_ID_APTOS ? addresses : [];
    }, [chainId, addresses]);
    const injAddresses = useMemo(() => {
        return chainId === CHAIN_ID_INJECTIVE ? addresses : [];
    }, [chainId, addresses]);
    const nearAddresses = useMemo(() => {
        return chainId === CHAIN_ID_NEAR ? addresses : [];
    }, [chainId, addresses]);
    const seiAddresses = useMemo(() => {
        return chainId === CHAIN_ID_SEI ? addresses : [];
    }, [chainId, addresses]);
    const suiAddresses = useMemo(() => {
        return chainId === CHAIN_ID_SUI ? addresses : [];
    }, [chainId, addresses]);
    const metaplexData = useMetaplexData(solanaAddresses);
    const terraMetadata = useTerraMetadata(terraAddresses, chainId);
    const xplaMetadata = useXplaMetadata(xplaAddresses);
    const ethMetadata = useEvmMetadata(ethereumAddresses, chainId);
    const algoMetadata = useAlgoMetadata(algoAddresses);
    const aptosMetadata = useAptosMetadata(aptosAddresses);
    const injMetadata = useInjectiveMetadata(injAddresses);
    const nearMetadata = useNearMetadata(nearAddresses);
    const seiMetadata = useSeiMetadata(seiAddresses);
    const suiMetadata = useSuiMetadata(suiAddresses);
    const output = useMemo(() => chainId === CHAIN_ID_SOLANA
        ? constructSolanaMetadata(solanaAddresses, solanaTokenMap, metaplexData)
        : isEVMChain(chainId)
            ? constructEthMetadata(ethereumAddresses, ethMetadata)
            : isTerraChain(chainId)
                ? constructTerraMetadata(terraAddresses, terraTokenMap, terraMetadata, chainId)
                : chainId === CHAIN_ID_XPLA
                    ? constructXplaMetadata(xplaAddresses, xplaMetadata)
                    : chainId === CHAIN_ID_APTOS
                        ? constructAptosMetadata(aptosAddresses, aptosMetadata)
                        : chainId === CHAIN_ID_ALGORAND
                            ? constructAlgoMetadata(algoAddresses, algoMetadata)
                            : chainId === CHAIN_ID_INJECTIVE
                                ? constructInjectiveMetadata(injAddresses, injMetadata)
                                : chainId === CHAIN_ID_NEAR
                                    ? constructAlgoMetadata(nearAddresses, nearMetadata)
                                    : chainId === CHAIN_ID_SEI
                                        ? constructSeiMetadata(seiAddresses, seiMetadata)
                                        : chainId === CHAIN_ID_SUI
                                            ? constructSuiMetadata(suiAddresses, suiMetadata)
                                            : getEmptyDataWrapper(), [
        chainId,
        solanaAddresses,
        solanaTokenMap,
        metaplexData,
        ethereumAddresses,
        ethMetadata,
        terraAddresses,
        terraTokenMap,
        terraMetadata,
        xplaAddresses,
        xplaMetadata,
        algoAddresses,
        algoMetadata,
        aptosAddresses,
        aptosMetadata,
        injAddresses,
        injMetadata,
        nearAddresses,
        nearMetadata,
        seiAddresses,
        seiMetadata,
        suiAddresses,
        suiMetadata,
    ]);
    return output;
}
