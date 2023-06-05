import { CHAIN_ID_ACALA, CHAIN_ID_ALGORAND, CHAIN_ID_APTOS, CHAIN_ID_ARBITRUM, CHAIN_ID_AURORA, CHAIN_ID_AVAX, CHAIN_ID_BASE, CHAIN_ID_BSC, CHAIN_ID_CELO, CHAIN_ID_ETH, CHAIN_ID_FANTOM, CHAIN_ID_INJECTIVE, CHAIN_ID_KARURA, CHAIN_ID_KLAYTN, CHAIN_ID_MOONBEAM, CHAIN_ID_NEAR, CHAIN_ID_NEON, CHAIN_ID_OASIS, CHAIN_ID_OPTIMISM, CHAIN_ID_POLYGON, CHAIN_ID_SEPOLIA, CHAIN_ID_SOLANA, CHAIN_ID_SUI, CHAIN_ID_TERRA, CHAIN_ID_TERRA2, CHAIN_ID_XPLA, coalesceChainName, CONTRACTS, isEVMChain, isTerraChain, CHAIN_ID_SEI, cosmos, } from "@certusone/wormhole-sdk";
import { clusterApiUrl } from "@solana/web3.js";
import { getAddress } from "ethers/lib/utils";
import { CHAIN_CONFIG_MAP } from "../config";
import acalaIcon from "../icons/acala.svg";
import algorandIcon from "../icons/algorand.svg";
import aptosIcon from "../icons/aptos.svg";
import arbitrumIcon from "../icons/arbitrum.svg";
import auroraIcon from "../icons/aurora.svg";
import avaxIcon from "../icons/avax.svg";
import baseIcon from "../icons/base.svg";
import bscIcon from "../icons/bsc.svg";
import celoIcon from "../icons/celo.svg";
import ethIcon from "../icons/eth.svg";
import fantomIcon from "../icons/fantom.svg";
import karuraIcon from "../icons/karura.svg";
import klaytnIcon from "../icons/klaytn.svg";
import moonbeamIcon from "../icons/moonbeam.svg";
import neonIcon from "../icons/neon.svg";
import oasisIcon from "../icons/oasis-network-rose-logo.svg";
import optimismIcon from "../icons/optimism.svg";
import polygonIcon from "../icons/polygon.svg";
import seiIcon from "../icons/sei.svg";
import solanaIcon from "../icons/solana.svg";
import suiIcon from "../icons/sui.svg";
import terraIcon from "../icons/terra.svg";
import terra2Icon from "../icons/terra2.svg";
import xplaIcon from "../icons/xpla.svg";
import injectiveIcon from "../icons/injective.svg";
import nearIcon from "../icons/near.svg";
import { keyStores } from "near-api-js";
const urlParams = new URLSearchParams(window.location.search);
const paramCluster = urlParams.get("cluster");
export const CLUSTER = paramCluster === "devnet" ? "devnet" : "testnet";
export const CHAINS = CLUSTER === "testnet"
    ? [
        {
            id: CHAIN_ID_BSC,
            name: "Binance Smart Chain",
            logo: bscIcon,
        },
        {
            id: CHAIN_ID_ARBITRUM,
            name: "Arbitrum",
            logo: arbitrumIcon,
        },
        {
            id: CHAIN_ID_AVAX,
            name: "Avalanche",
            logo: avaxIcon,
        },
        {
            id: CHAIN_ID_ACALA,
            name: "Acala",
            logo: acalaIcon,
        },
        {
            id: CHAIN_ID_ALGORAND,
            name: "Algorand",
            logo: algorandIcon,
        },
        {
            id: CHAIN_ID_APTOS,
            name: "Aptos",
            logo: aptosIcon,
        },
        {
            id: CHAIN_ID_AURORA,
            name: "Aurora",
            logo: auroraIcon,
        },
        {
            id: CHAIN_ID_BASE,
            name: "Base Goerli",
            logo: baseIcon,
        },
        {
            id: CHAIN_ID_CELO,
            name: "Celo",
            logo: celoIcon,
        },
        {
            id: CHAIN_ID_ETH,
            name: "Ethereum (Goerli)",
            logo: ethIcon,
        },
        {
            id: CHAIN_ID_SEPOLIA,
            name: "Ethereum (Sepolia)",
            logo: ethIcon,
        },
        {
            id: CHAIN_ID_FANTOM,
            name: "Fantom",
            logo: fantomIcon,
        },
        {
            id: CHAIN_ID_INJECTIVE,
            name: "Injective",
            logo: injectiveIcon,
        },
        {
            id: CHAIN_ID_KARURA,
            name: "Karura",
            logo: karuraIcon,
        },
        {
            id: CHAIN_ID_KLAYTN,
            name: "Klaytn",
            logo: klaytnIcon,
        },
        {
            id: CHAIN_ID_MOONBEAM,
            name: "Moonbeam",
            logo: moonbeamIcon,
        },
        {
            id: CHAIN_ID_NEAR,
            name: "Near",
            logo: nearIcon,
        },
        {
            id: CHAIN_ID_NEON,
            name: "Neon",
            logo: neonIcon,
        },
        {
            id: CHAIN_ID_OASIS,
            name: "Oasis",
            logo: oasisIcon,
        },
        {
            id: CHAIN_ID_OPTIMISM,
            name: "Optimism (Goerli)",
            logo: optimismIcon,
        },
        {
            id: CHAIN_ID_POLYGON,
            name: "Polygon",
            logo: polygonIcon,
        },
        {
            id: CHAIN_ID_SEI,
            name: "Sei",
            logo: seiIcon,
        },
        {
            id: CHAIN_ID_SOLANA,
            name: "Solana",
            logo: solanaIcon,
        },
        {
            id: CHAIN_ID_SUI,
            name: "Sui",
            logo: suiIcon,
        },
        {
            id: CHAIN_ID_TERRA,
            name: "Terra Classic",
            logo: terraIcon,
        },
        {
            id: CHAIN_ID_TERRA2,
            name: "Terra",
            logo: terra2Icon,
        },
        {
            id: CHAIN_ID_XPLA,
            name: "XPLA",
            logo: xplaIcon,
        },
    ]
    : [
        {
            id: CHAIN_ID_BSC,
            name: "Binance Smart Chain",
            logo: bscIcon,
        },
        {
            id: CHAIN_ID_ETH,
            name: "Ethereum",
            logo: ethIcon,
        },
        {
            id: CHAIN_ID_OPTIMISM,
            name: "Optimism",
            logo: optimismIcon,
        },
        {
            id: CHAIN_ID_POLYGON,
            name: "Polygon",
            logo: polygonIcon,
        },
        {
            id: CHAIN_ID_ARBITRUM,
            name: "Arbitrum",
            logo: arbitrumIcon,
        },
        {
            id: CHAIN_ID_AVAX,
            name: "Avalanche",
            logo: avaxIcon,
        },
        {
            id: CHAIN_ID_BASE,
            name: "Base Goerli",
            logo: baseIcon,
        },
        {
            id: CHAIN_ID_BSC,
            name: "Binance Smart Chain",
            logo: bscIcon,
        },
    ];
export const CHAINS_WITH_NFT_SUPPORT = CHAINS.filter(({ id }) => id === CHAIN_ID_AVAX ||
    id === CHAIN_ID_BSC ||
    id === CHAIN_ID_ETH ||
    id === CHAIN_ID_SEPOLIA ||
    id === CHAIN_ID_POLYGON ||
    id === CHAIN_ID_OASIS ||
    id === CHAIN_ID_SOLANA ||
    id === CHAIN_ID_AURORA ||
    id === CHAIN_ID_FANTOM ||
    id === CHAIN_ID_KARURA ||
    id === CHAIN_ID_ACALA ||
    id === CHAIN_ID_KLAYTN ||
    id === CHAIN_ID_CELO ||
    id === CHAIN_ID_NEON ||
    id === CHAIN_ID_ARBITRUM ||
    id === CHAIN_ID_MOONBEAM ||
    id === CHAIN_ID_BASE ||
    id === CHAIN_ID_OPTIMISM);
export const CHAINS_BY_ID = CHAINS.reduce((obj, chain) => {
    obj[chain.id] = chain;
    return obj;
}, {});
export const getDefaultNativeCurrencySymbol = (chainId) => chainId === CHAIN_ID_SOLANA
    ? "SOL"
    : chainId === CHAIN_ID_ETH || chainId === CHAIN_ID_SEPOLIA
        ? "ETH"
        : chainId === CHAIN_ID_BSC
            ? "BNB"
            : chainId === CHAIN_ID_TERRA
                ? "LUNC"
                : chainId === CHAIN_ID_TERRA2
                    ? "LUNA"
                    : chainId === CHAIN_ID_POLYGON
                        ? "MATIC"
                        : chainId === CHAIN_ID_AVAX
                            ? "AVAX"
                            : chainId === CHAIN_ID_OASIS
                                ? "ROSE"
                                : chainId === CHAIN_ID_ALGORAND
                                    ? "ALGO"
                                    : chainId === CHAIN_ID_AURORA
                                        ? "ETH"
                                        : chainId === CHAIN_ID_FANTOM
                                            ? "FTM"
                                            : chainId === CHAIN_ID_KARURA
                                                ? "KAR"
                                                : chainId === CHAIN_ID_ACALA
                                                    ? "ACA"
                                                    : chainId === CHAIN_ID_KLAYTN
                                                        ? "KLAY"
                                                        : chainId === CHAIN_ID_CELO
                                                            ? "CELO"
                                                            : chainId === CHAIN_ID_NEON
                                                                ? "NEON"
                                                                : chainId === CHAIN_ID_XPLA
                                                                    ? "XPLA"
                                                                    : chainId === CHAIN_ID_APTOS
                                                                        ? "APTOS"
                                                                        : chainId === CHAIN_ID_ARBITRUM
                                                                            ? "ETH"
                                                                            : chainId === CHAIN_ID_MOONBEAM
                                                                                ? "GLMR"
                                                                                : chainId === CHAIN_ID_BASE
                                                                                    ? "ETH"
                                                                                    : chainId === CHAIN_ID_OPTIMISM
                                                                                        ? "ETH"
                                                                                        : chainId === CHAIN_ID_SUI
                                                                                            ? "SUI"
                                                                                            : "";
export const getDefaultNativeCurrencyAddressEvm = (chainId) => {
    return chainId === CHAIN_ID_ETH
        ? WETH_ADDRESS
        : chainId === CHAIN_ID_SEPOLIA
            ? WETH_ADDRESS_SEPOLIA
            : chainId === CHAIN_ID_BSC
                ? WBNB_ADDRESS
                : chainId === CHAIN_ID_POLYGON
                    ? WMATIC_ADDRESS
                    : chainId === CHAIN_ID_AVAX
                        ? WAVAX_ADDRESS
                        : chainId === CHAIN_ID_OASIS
                            ? WROSE_ADDRESS
                            : chainId === CHAIN_ID_AURORA
                                ? WETH_AURORA_ADDRESS
                                : chainId === CHAIN_ID_FANTOM
                                    ? WFTM_ADDRESS
                                    : chainId === CHAIN_ID_KARURA
                                        ? KAR_ADDRESS
                                        : chainId === CHAIN_ID_ACALA
                                            ? ACA_ADDRESS
                                            : chainId === CHAIN_ID_KLAYTN
                                                ? WKLAY_ADDRESS
                                                : chainId === CHAIN_ID_CELO
                                                    ? CELO_ADDRESS
                                                    : chainId === CHAIN_ID_NEON
                                                        ? WNEON_ADDRESS
                                                        : chainId === CHAIN_ID_MOONBEAM
                                                            ? WGLMR_ADDRESS
                                                            : "";
};
export const getExplorerName = (chainId) => chainId === CHAIN_ID_ETH || chainId === CHAIN_ID_SEPOLIA
    ? "Etherscan"
    : chainId === CHAIN_ID_BSC
        ? "BscScan"
        : isTerraChain(chainId)
            ? "Finder"
            : chainId === CHAIN_ID_POLYGON
                ? "Polygonscan"
                : chainId === CHAIN_ID_AVAX
                    ? "Snowtrace"
                    : chainId === CHAIN_ID_ALGORAND
                        ? "AlgoExplorer"
                        : chainId === CHAIN_ID_FANTOM
                            ? "FTMScan"
                            : chainId === CHAIN_ID_KLAYTN
                                ? "Klaytnscope"
                                : chainId === CHAIN_ID_SOLANA
                                    ? "Solscan"
                                    : chainId === CHAIN_ID_XPLA
                                        ? "XPLA Explorer"
                                        : chainId === CHAIN_ID_ARBITRUM
                                            ? "Arbiscan"
                                            : chainId === CHAIN_ID_MOONBEAM
                                                ? "Moonscan"
                                                : chainId === CHAIN_ID_BASE
                                                    ? "BaseScan"
                                                    : "Explorer";
export const ETH_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 5 : 1337;
export const SEPOLIA_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 11155111 : 1337;
export const BSC_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 97 : 1397;
export const POLYGON_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 80001 : 1381;
export const AVAX_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 43113 : 1381;
export const OASIS_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 42261 : 1381;
export const AURORA_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 1313161555 : 1381;
export const FANTOM_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 4002 : 1381;
export const KARURA_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 596 : 1381;
export const ACALA_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 597 : 1381;
export const KLAYTN_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 1001 : 1381;
export const CELO_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 44787 : 1381;
export const NEON_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 245022926 : 1381;
export const ARBITRUM_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 421613 : 1381;
export const MOONBEAM_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 1287 : 1381;
export const BASE_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 84531 : 1381;
export const OPTIMISM_NETWORK_CHAIN_ID = CLUSTER === "testnet" ? 420 : 1381;
export const getEvmChainId = (chainId) => chainId === CHAIN_ID_ETH
    ? ETH_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_SEPOLIA
        ? SEPOLIA_NETWORK_CHAIN_ID
        : chainId === CHAIN_ID_BSC
            ? BSC_NETWORK_CHAIN_ID
            : chainId === CHAIN_ID_POLYGON
                ? POLYGON_NETWORK_CHAIN_ID
                : chainId === CHAIN_ID_AVAX
                    ? AVAX_NETWORK_CHAIN_ID
                    : chainId === CHAIN_ID_OASIS
                        ? OASIS_NETWORK_CHAIN_ID
                        : chainId === CHAIN_ID_AURORA
                            ? AURORA_NETWORK_CHAIN_ID
                            : chainId === CHAIN_ID_FANTOM
                                ? FANTOM_NETWORK_CHAIN_ID
                                : chainId === CHAIN_ID_KARURA
                                    ? KARURA_NETWORK_CHAIN_ID
                                    : chainId === CHAIN_ID_ACALA
                                        ? ACALA_NETWORK_CHAIN_ID
                                        : chainId === CHAIN_ID_KLAYTN
                                            ? KLAYTN_NETWORK_CHAIN_ID
                                            : chainId === CHAIN_ID_CELO
                                                ? CELO_NETWORK_CHAIN_ID
                                                : chainId === CHAIN_ID_NEON
                                                    ? NEON_NETWORK_CHAIN_ID
                                                    : chainId === CHAIN_ID_ARBITRUM
                                                        ? ARBITRUM_NETWORK_CHAIN_ID
                                                        : chainId === CHAIN_ID_MOONBEAM
                                                            ? MOONBEAM_NETWORK_CHAIN_ID
                                                            : chainId === CHAIN_ID_BASE
                                                                ? BASE_NETWORK_CHAIN_ID
                                                                : chainId === CHAIN_ID_OPTIMISM
                                                                    ? OPTIMISM_NETWORK_CHAIN_ID
                                                                    : undefined;
export const BLOCKSCOUT_GET_TOKENS_URL = (chainId, walletAddress) => {
    const baseUrl = chainId === CHAIN_ID_OASIS
        ? CLUSTER === "testnet"
            ? "https://testnet.explorer.emerald.oasis.dev"
            : ""
        : chainId === CHAIN_ID_AURORA
            ? CLUSTER === "testnet"
                ? "https://explorer.testnet.aurora.dev"
                : ""
            : chainId === CHAIN_ID_ACALA
                ? CLUSTER === "testnet"
                    ? "https://blockscout.acala-dev.aca-dev.network"
                    : ""
                : chainId === CHAIN_ID_KARURA
                    ? CLUSTER === "testnet"
                        ? "https://blockscout.karura-dev.aca-dev.network"
                        : ""
                    : chainId === CHAIN_ID_CELO
                        ? CLUSTER === "testnet"
                            ? "https://alfajores-blockscout.celo-testnet.org"
                            : ""
                        : "";
    return baseUrl
        ? `${baseUrl}/api?module=account&action=tokenlist&address=${walletAddress}`
        : "";
};
export const RELAYER_COMPARE_ASSET = {
    [CHAIN_ID_SOLANA]: "solana",
    [CHAIN_ID_ETH]: "ethereum",
    [CHAIN_ID_TERRA]: "terra-luna",
    [CHAIN_ID_BSC]: "binancecoin",
    [CHAIN_ID_POLYGON]: "matic-network",
    [CHAIN_ID_AVAX]: "avalanche-2",
    [CHAIN_ID_OASIS]: "oasis-network",
    [CHAIN_ID_FANTOM]: "fantom",
    [CHAIN_ID_AURORA]: "ethereum",
    [CHAIN_ID_KLAYTN]: "klay-token",
    [CHAIN_ID_CELO]: "celo",
};
export const getCoinGeckoURL = (coinGeckoId) => `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`;
export const RELAYER_INFO_URL = CLUSTER === "testnet" ? "" : "/relayerExample.json";
export const RELAY_URL_EXTENSION = "/relayvaa/";
// also for karura
export const getChainShortName = (chainId) => {
    return chainId === CHAIN_ID_BSC ? "BSC" : CHAINS_BY_ID[chainId]?.name;
};
export const getIsTokenTransferDisabled = (sourceChain, targetChain, tokenAddress) => {
    const disabledTransfers = DISABLED_TOKEN_TRANSFERS[sourceChain]?.[tokenAddress];
    return disabledTransfers !== undefined
        ? disabledTransfers.length === 0 || disabledTransfers.includes(targetChain)
        : false;
};
export const USD_NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});
